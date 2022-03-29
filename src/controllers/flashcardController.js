import mysql from "mysql"
import instance from "../db/database.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import handleSQLError from "../db/error.js"
import pool from "../db/database.js"
import { promisify } from "util"

const poolQuery = promisify(pool.query).bind(pool) //turns pool.query into a promise so we can use async/await instead of callbacks

const saltRounds = 10

//get all flashcards
const getAllFlashcards = async (req, res) => res.json(await poolQuery("SELECT * FROM flashcards"))

//get all flashcards by course
const getFlashcardByProgram = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM flashcards WHERE program = ?", req.params.program))
  )

//get flashcard by id
const getFlashcardById = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM flashcards WHERE card_id = ?", req.params.card_id))
  )

const createFlashcard = async (req, res, next) =>
  //create flashcard and set course, title, description, term, definition, front or back image
  (await poolQuery(
    mysql.format(
      "INSERT INTO flashcards (course, title, description, term, definition, front_img, back_img) VALUES (?, ?, ?, ?, ?, ?, ?)", //adds flashcard to database
      [
        //values to replace ?'s above
        req.body.course,
        req.body.title,
        req.body.description,
        req.body.term,
        req.body.definition,
        req.body.front_img,
        req.body.back_img,
      ]
    )
  )) && res.json({ msg: "Flashcard successfully added" }) //if successful, send message

const updateFlashcard = (req, res) => {
  //Update flashcard and set course, title, description, term, defintion, front or back image
  let sql =
    "UPDATE flashcards SET course = ?, title = ?, description = ?, term = ?, definition = ?, front_img = ?, back_img = ?  WHERE card_id = ?"
  // (course, title, description, term, definition, front_img, back_img) VALUES (?, ?, ?, ?, ?, ?, ?)
  const { course, title, description, term, definition, front_img, back_img, card_id } = req.body
  const replacements = [course, title, description, term, definition, front_img, back_img, card_id]
  sql = mysql.format(sql, replacements)

  pool.query(sql, (err, results) => {
    if (err) throw err
    return res.send(`Card ${card_id} successfully updated`)
  })
}

const deleteFlashcardById = (req, res) => {
  let sql = "DELETE FROM flashcards WHERE card_id = ?"
  const { card_id } = req.body
  sql = mysql.format(sql, [card_id])

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(results, err)
    return res.json({ message: `Deleted flashcard ${card_id}` })
  })
}

export {
  getAllFlashcards,
  getFlashcardByProgram,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcardById,
}
