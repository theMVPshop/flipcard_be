import mysql from "mysql"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../db/database.js"
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
  !req.body.email || !req.body.password //check for email and password
    ? res.status(400).json({ msg: "Please enter an email and password" }) //if not present, send error
    : (await poolQuery(
        mysql.format(
          "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?,?,?,?,?)", //insert user into database
          [
            req.body.email,
            await bcrypt.hash(req.body.password, saltRounds), //hash password
            req.body.first_name,
            req.body.last_name,
            req.body.program,
          ] //values to insert (replace ?s with values)
        )
      )) && res.status(201).json({ msg: "Your email has been registered!" }) //if successful, send success message

// alternate registerUser function
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

//check password and then login
const authUser = async (req, res, next) => {
  const getUser = "SELECT * FROM users WHERE LOWER(email) = LOWER(?)" //LOWER() is used to make email case insensitive
  let user, storedHash, authenticated, token //storedHash is the hashed password from the database
  user = await poolQuery(mysql.format(getUser, req.body.email)) //get user from database
  !user.length && res.status(400).json({ msg: "Invalid email or password" }) //send error if user doesn't exist
  storedHash = user[0].password //get hashed password from database
  authenticated = await bcrypt.compare(req.body.password, storedHash) //compare hashed password from database with hashed password from user
  token =
    authenticated && //if authenticated/passwords match
    jwt.sign({ id: user[0].user_id }, "the-super-strong-secret", { expiresIn: "1h" }) //generate token

  authenticated //if authenticated
    ? res.status(200).json({ msg: "Logged in!", token, user: user[0] }) //send token and user
    : res.status(403).json({ msg: "Invalid email or password)" }) //if not authenticated
}

export { registerUser, getAllUsers, getUserById, authUser }
