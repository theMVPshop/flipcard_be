import mysql from "mysql";
import instance from "../db/database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import { errorHandler } from "../middleware/errorMiddleware.js";
import handleSQLError from "../db/error.js";
import pool from "../db/database.js";

const saltRounds = 10;

const getAllFlashcards = (req, res) => {
  pool.query("SELECT * FROM flashcards", (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getFlashcardByProgram = (req, res) => {
  let sql = "SELECT * FROM flashcards WHERE program = ?";
  const replacements = [req.params.program];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const getFlashcardById = (req, res) => {
  let sql = "SELECT * FROM flashcards WHERE Card_ID = ?";
  const replacements = [req.params.Card_ID];
  sql = mysql.format(sql, replacements);

  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err);
    return res.json(rows);
  });
};

const createFlashcard = (req, res) => {
  // Insert into flashcard program, chapter, front_text, back_text, front_img, back_img
  let sql =
    "INSERT INTO flashcards (course, title, description, term, definition, front_img, back_img) VALUES (?, ?, ?, ?, ?, ?, ?)";
  // What goes into brackets
  const { course, title, description, term, definition, front_img, back_img } =
    req.body;
  sql = mysql.format(sql, [
    course,
    title,
    description,
    term,
    definition,
    front_img,
    back_img,
  ]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err);
    return res.json({ newId: results.insertId });
    return res.send("Card succesfully added");
  });
};

const updateFlashcard = (req, res) => {
  //Update flashcard and set course, title, description, term, defintion, front or back image
  let sql =
    "UPDATE flashcards SET course = ?, title = ?, description = ?, term = ?, definition = ?, front_img = ?, back_img = ?  WHERE Card_ID = ?  ";
  // (course, title, description, term, definition, front_img, back_img) VALUES (?, ?, ?, ?, ?, ?, ?)
  const {
    course,
    title,
    description,
    term,
    definition,
    front_img,
    back_img,
    Card_ID,
  } = req.body;
  sql = mysql.format(sql, [
    course,
    title,
    description,
    term,
    definition,
    front_img,
    back_img,
    Card_ID,
  ]);

  pool.query(sql, (err, results) => {
    if (err) throw err;
    return res.send(`Card ${Card_ID} successfully updated`);
  });
};

const deleteFlashcardById = (req, res) => {
  let sql = "DELETE FROM flashcards WHERE Card_ID = ?";
  const { Card_ID } = req.body;
  sql = mysql.format(sql, [Card_ID]);

  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(results, err);
    return res.json({ message: `Deleted flashcard ${Card_ID}` });
  });
};

export {
  getAllFlashcards,
  getFlashcardByProgram,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcardById,
};
