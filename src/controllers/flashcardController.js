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
const getFlashcardsByCourse = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM flashcards WHERE course = ?", req.params.course))
  )

//get flashcard by id
const getFlashcardById = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM flashcards WHERE card_id = ?", req.params.card_id))
  )

//create flashcard
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

//update flashcard
const updateFlashcard = async (req, res) =>
  (await poolQuery(
    mysql.format(
      "UPDATE flashcards SET course = ?, title = ?, description = ?, term = ?, definition = ?, front_img = ?, back_img = ?  WHERE card_id = ?", //updates flashcard in database
      [
        //values to replace ?'s above
        req.body.course,
        req.body.title,
        req.body.description,
        req.body.term,
        req.body.definition,
        req.body.front_img,
        req.body.back_img,
        req.body.card_id,
      ]
    )
  )) && res.json({ msg: `Flashcard${req.body.card_id} successfully updated` }) //if successful, send message

//delete flashcard
const deleteFlashcardById = async (req, res) =>
  (await poolQuery(mysql.format("DELETE FROM flashcards WHERE card_id = ?", req.params.card_id))) && //deletes flashcard from database
  res.json({ msg: `Flashcard ${req.params.card_id} successfully deleted` }) //if successful, send message

export {
  getAllFlashcards,
  getFlashcardsByCourse,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcardById,
}
