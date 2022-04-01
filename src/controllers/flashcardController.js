import mysql from "mysql"
import pool from "../db/database.js"
import { promisify } from "util"

const poolQuery = promisify(pool.query).bind(pool) //turns pool.query into a promise so we can use async/await instead of callbacks
//errors caught by errorHandler from ../utils

//get all flashcards
const getAllFlashcards = async (req, res) => res.json(await poolQuery("SELECT * FROM flashcards"))

//get all flashcards by course
const getFlashcardsByCourse = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM flashcards WHERE course = ?", req.params.course))
  )

//get flashcard by id
const getFlashcardById = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM flashcards WHERE card_id = ?", req.params.card_id))
  )

//get flashcards by set
const getFlashcardsByCardSet = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM flashcards WHERE set_id = ?", req.params.set_id))
  )

//create flashcard
const createFlashcard = async (req, res, next) => {
  //create flashcard and set course, title, description, term, definition, front or back image
  let sql = await poolQuery(
    mysql.format(
      "INSERT INTO flashcards (set_id, set_name, set_course, term, definition, front_img, back_img) VALUES (?, ?, ?, ?, ?, ?, ?)", //adds flashcard to database
      [
        //values to replace ?'s above
        req.body.set_id,
        req.body.set_name,
        req.body.set_course,
        req.body.term,
        req.body.definition,
        req.body.front_img,
        req.body.back_img,
      ]
    )
  )
  res.json({ msg: "Flashcard successfully added", id: sql.insertId }) //if successful, send message
}

//update flashcard
const updateFlashcardById = async (req, res) =>
  (await poolQuery(
    mysql.format(
      "UPDATE flashcards SET set_id = ? set_name = ? set_course = ? term = ?, definition = ?, front_img = ?, back_img = ?  WHERE card_id = ?", //updates flashcard in database
      [
        //values to replace ?'s above
        req.body.set_id,
        req.body.set_name,
        req.body.set_course,
        req.body.term,
        req.body.definition,
        req.body.front_img,
        req.body.back_img,
        req.params.card_id,
      ]
    )
  )) && res.json({ msg: `Flashcard ${req.params.card_id} successfully updated` }) //if successful, send message

//delete flashcard
const deleteFlashcardById = async (req, res) =>
  (await poolQuery(mysql.format("DELETE FROM flashcards WHERE card_id = ?", req.params.card_id))) && //deletes flashcard from database and if successful...
  res.json({ msg: `Flashcard id#${req.params.card_id} successfully deleted` }) //...sends message

export {
  getAllFlashcards,
  getFlashcardsByCourse,
  getFlashcardById,
  getFlashcardsByCardSet,
  createFlashcard,
  updateFlashcardById,
  deleteFlashcardById,
}
