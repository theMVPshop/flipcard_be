import mysql from "mysql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../db/database.js"
import { AppError } from "../utils/appError.js"
import { promisify } from "util"

const poolQuery = promisify(pool.query).bind(pool)

const saltRounds = 10

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

export { registerUser, getAllUsers, getUserById, authUser }
