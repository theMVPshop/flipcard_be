import mysql from "mysql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../db/database.js"
import handleSQLError from "../db/error.js"
import { AppError } from "../utils/appError.js"
import { promisify } from "util"

const poolQuery = promisify(pool.query).bind(pool)

const saltRounds = 10

const getAllUsers = (req, res) => {
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return "hello"
    return res.json(rows)
  })
}

const getUserById = (req, res) => {
  let sql = "SELECT * FROM users WHERE user_id = ?"
  const replacements = [req.params.id]
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows)
  })
}

//signup
const registerUser = async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError("Please provide an email and password", 400))

  const { email, password, first_name, last_name, program } = req.body
  const hash = await bcrypt.hash(password, saltRounds)
  let createUser =
    "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)"

  createUser = await poolQuery(
    mysql.format(createUser, [email, hash, first_name, last_name, program])
  )
  res.status(201).json({ msg: "Your email has been registered!" })
}

//check password and login
const authUser = async (req, res, next) => {
  let user, password, hash, authenticated, token
  const getUser = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)"
  user = await poolQuery(mysql.format(getUser, req.body.email))
  password = user[0].password
  hash = await bcrypt.hash(req.body.password, saltRounds)
  authenticated = await bcrypt.compare(req.body.password, password)
  token =
    authenticated &&
    jwt.sign({ id: user[0].user_id }, "the-super-strong-secret", { expiresIn: "1h" })

  authenticated
    ? res.status(200).json({ msg: "Logged in!", token, user: user[0] })
    : res.status(403).json({ msg: "Failed to login (check your email or password)" })
}

// const authUser = async (req, res, next) => {
//   let sql = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)"
//   sql = mysql.format(sql, req.body.email)

//   pool.query(sql, async (err, results) => {
//     if (!req.body.email || !req.body.password)
//       return next(new AppError(400, "You have entered the wrong Email or Password"))
//     if (err && err.sqlMessage) return next(new AppError(400, err.sqlMessage))
//     if (!results.length)
//       return next(new AppError(400), "You have entered the wrong Email or Password")
//     if (await bcrypt.compare(req.body.password, results[0].password)) {
//       console.log(await bcrypt.compare(req.body.password, results[0].password))
//       let token = jwt.sign({ id: results[0].user_id }, process.env.JWT_SECRET, {
//         expiresIn: "3h",
//       })
//       return res.status(200).json({
//         status: "success",
//         message: "You are logged in",
//         token: token,
//       })
//     } else return next(new AppError(400, "You have entered the wrong Email or Password"))
//   })
// }

export { registerUser, getAllUsers, getUserById, authUser }
