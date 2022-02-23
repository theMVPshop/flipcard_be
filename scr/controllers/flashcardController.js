const mysql = require('mysql')
const pool = require('../db/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {errorHandler} = require('../middleware/errorMiddleware')

const saltRounds = 10

const getAllFlashcards = (req,res) => {
    pool.query("SELECT * FROM flashcards", (err, rows) => {
        if(err) return errorHandler(res,err)
        return res.json(rows);
    })
}

const getFlashcardByProgram = (req,res) => {
    let sql = 'SELECT * FROM flashcards WHERE program = ?';
    const replacements = [req.params.program ]
    sql = mysql.format(sql,replacements)

    pool.query(sql, (err, rows) => {
        if(err) return errorHandler(res,err)
        return res.json(rows)
    })
}

const createFlashcard = (req, res) => {
    // Insert into flashcard program, chapter, front_text, back_text, front_img, back_img
    let sql = "INSERT INTO flashcards (program, chapter, front_text, back_text, front_img, back_img VALUES (?, ?, ?, ?, ?, ?)"
    // What goes into brackets
    const {program, chapter, front_text, back_text, front_img, back_img} = req.body
    sql = mysql.format(sql, [program, chapter, front_text, back_text, front_img, back_img])

    pool.query(sql, (err, results) => {
        if(err) return errorHandler(res,err)
        return res.json({newId: results.insertId})
        return res.send('Card succesfully added')
    })
}


module.exports = {
    getAllFlashcards,
    getFlashcardByProgram,
    createFlashcard
}