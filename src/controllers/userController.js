import mysql from "mysql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../db/database.js"
import AppError from "../utils/AppError.js"
import { promisify } from "util"

//turns "pool.query()" into a promise so that we can use async/await instead of callbacks
const poolQuery = promisify(pool.query).bind(pool)

//get all users
const getAllUsers = async (req, res, next) => {
  const users = await poolQuery("SELECT * FROM users")
  return res.json(users)
}

//get user by id
const getUserById = async (req, res, next) => {
  let user = "SELECT * FROM users WHERE user_id = ?"
  user = await poolQuery(mysql.format(user, req.params.id))
  return res.json(user)
}

//number of salt rounds for bcrypt hashing in auth functions below
const saltRounds = 10

//signup
const registerUser = async (req, res, next) =>
  !req.body.email || !req.body.password
    ? res.status(400).json({ msg: "Please enter an email and password" })
    : (await poolQuery(
        mysql.format(
          "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)",
          [
            req.body.email,
            await bcrypt.hash(req.body.password, saltRounds),
            req.body.first_name,
            req.body.last_name,
            req.body.program,
          ]
        )
      ))
    ? res.status(201).json({ msg: "Your email has been registered!" })
    : next(new AppError("Something went wrong", 500))

// const registerUser = async (req, res, next) => {
//   if (!req.body.email || !req.body.password)
//     return next(new AppError("Please provide an email and password", 400))

//   const { email, password, first_name, last_name, program } = req.body
//   const hash = await bcrypt.hash(password, saltRounds)

//   let createUser =
//     "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)"

//   createUser = await poolQuery(
//     mysql.format(createUser, [email, hash, first_name, last_name, program])
//   )

//   return res.status(201).json({ msg: "Your email has been registered!" })
// }

//check password and login
const authUser = async (req, res, next) => {
  const getUser = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)"
  let user, storedHash, authenticated, token
  user = await poolQuery(mysql.format(getUser, req.body.email))
  !user.length && res.status(400).json({ msg: "Invalid email or password" })
  storedHash = user[0].password
  authenticated = await bcrypt.compare(req.body.password, storedHash)
  token =
    authenticated &&
    jwt.sign({ id: user[0].user_id }, "the-super-strong-secret", { expiresIn: "1h" })

  authenticated
    ? res.status(200).json({ msg: "Logged in!", token, user: user[0] })
    : res.status(403).json({ msg: "Invalid email or password)" })
}

export { registerUser, getAllUsers, getUserById, authUser }
