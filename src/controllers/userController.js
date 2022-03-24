import mysql from "mysql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  let sql = "SELECT * FROM users WHERE User_ID = ?";
  const replacements = [req.params.id];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const registerUser = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(403).send({
      msg: "Email or Password is required",
    });
  }

  let { email, password, first_name, last_name, program } = req.body;
  let hash = await bcrypt.hash(password, saltRounds);

  let sql =
    "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)";
  sql = mysql.format(sql, [email, hash, first_name, last_name, program]);

  pool.query(sql, (err, result) => {
    if (err) {
      return res.status(400).json({
        message: "There was error creating this user",
        error: err,
      });
    }
    res.json({
      status: "success",
      message: "User created",
    });
  });
};

const authUser = (req, res) => {
  console.log('auth')
  let sql = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)";
  sql = mysql.format(sql, req.body.email);
  pool.query(sql, (err, result) => {
    console.log(result)
    //user does not exist
    if (err) {
      // throw err;
      return res.status(400).send({
        msg: err
      });
    }
    if (!result.length) {
      return res.status(401).send({
        msg: "Email or password is incorrect!",
      });
    }
    //check password
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      if (err) console.log("error", err);
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (err, Result) => {
          //wrong password
          if (err) {
            // throw err;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (Result) {
            console.log('2', Result)
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

// let sql = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)";
// sql = mysql.format(sql, req.body.email);
// //Insert into users email, password, first_name, last_name, program
// pool.query(sql, (err, result) => {
//   if (result.length) {
//     return res.status(409).send({
//       msg: "This email already exists!",
//     });
//   } else {
//     // email is available
//     bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
//       console.log('hash')
//       if (err) {
//         console.log('password error')
//         return res.status(403).send({

//           message: "Error"
//         });
//       } else {
//         let sql =
//           "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)";

//         sql = mysql.format(sql, [
//           req.body.email,
//           hash,
//           req.body.first_name,
//           req.body.last_name,
//           req.body.program,
//         ]);
//         //has hashed pw => add to database
//         pool.query(sql, (err, result) => {
//           if (err) {
//             // throw err;
//             return res.status(400).send({
//               msg: err,
//             });
//           }
//           return res.status(201).send({
//             msg: "Your email has been registered!",
//           });
//         });
//       }
//     });
//   }
// });
