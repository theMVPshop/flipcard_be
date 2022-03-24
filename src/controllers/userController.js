// const mysql = require('mysql')
// const pool = require('../db/database')
// import {instance} from '../db/database.js'
// import instance from '../db/database.js'
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const {errorHandler} = require('../middleware/errorMiddleware')

import mysql from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { errorHandler } from "../middleware/errorMiddleware.js";
// import instance from '../db/database.js'
import pool from "../db/database.js";
import handleSQLError from "../db/error.js";

const saltRounds = 10;

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return "hello";
    return res.json(rows);
  });
};

const getUserById = (req, res) => {
  let sql = "SELECT * FROM users WHERE user_id = ?";
  const replacements = [req.params.id];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const registerUser = (req, res) => {
  if (!req.body.email || !req.body.password)
    res.status(400).json({ msg: "email or password required" });
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) throw error;
    let sql =
      "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)";
    const { email, first_name, last_name, program } = req.body;
    sql = mysql.format(sql, [email, hash, first_name, last_name, program]);
    pool.query(sql, (err, result) => {
      if (err) throw err;
      return res.status(201).send({ msg: "Your email has been registered!" });
    });
  });
};
// const registerUser = (req, res) => {
//   let sql = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)";
//   sql = mysql.format(sql, req.body.email);
//   //Insert into users email, password, first_name, last_name, program
//   pool.query(sql, (err, result) => {
//     if (result.length) {
//       return res.status(409).send({
//         msg: "This email already exists!",
//       });
//     } else {
//       // email is available
//       bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//         if (err) {
//           return res.status(500).send({
//             msg: err,
//           });
//         } else {
//           let sql =
//             "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)";

//           sql = mysql.format(sql, [
//             req.body.email,
//             hash,
//             req.body.first_name,
//             req.body.last_name,
//             req.body.program,
//           ]);
//           //has hashed pw => add to database
//           pool.query(sql, (err, result) => {
//             if (err) {
//               throw err;
//               return res.status(400).send({
//                 msg: err,
//               });
//             }
//             return res.status(201).send({
//               msg: "Your email has been registered!",
//             });
//           });
//         }
//       });
//     }
//   });
// };

const authUser = (req, res) => {
  let sql = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)";
  sql = mysql.format(sql, req.body.email);
  pool.query(sql, (err, result) => {
    //user does not exist
    if (err) {
      throw err;
      return res.status(400).send({
        msg: err,
      });
    }
    if (!result.length) {
      return res.status(401).send({
        msg: "XEmail or password is incorrect!",
      });
    }
    //check password
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) throw err;
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          //wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              { id: result[0].user_id },
              "the-super-strong-secret",
              { expiresIn: "1h" }
            );
            let sql = "UPDATE users SET last_login = now() WHERE id = ?";
            sql = mysql.format(sql, result[0].user_id);
            pool.query(sql);
            return res.status(200).send({
              msg: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "email or password is incorrect!",
          });
        }
      );
    });
  });
};

export { registerUser, getAllUsers, getUserById, authUser };
