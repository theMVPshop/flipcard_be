// const mysql = require('mysql')
// const pool = require('../db/database')
// import {instance} from '../db/database.js'
// import instance from '../db/database.js'
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const {errorHandler} = require('../middleware/errorMiddleware')

import mysql from 'mysql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {errorHandler} from '../middleware/errorMiddleware.js'

const saltRounds = 10

const getAllUsers = (req, res) => {
    pool.query("SELECT * FROM users", (err, rows) => {
        if(err) return errorHandler(res,err)
        return res.json(rows);
    })
}

const getUserById = (req, res) => {
    let sql = 'SELECT * FROM users WHERE User_ID = ?';
    const replacements = [req.params.User_ID]
    sql = mysql.format(sql, replacements)

    pool.query(sql, (err, rows) => {
        if(err) return errorHandler(res,err)
        return res.json(rows)
    })
}

const registerUser = (req, res) => {
    //Insert into users email, password, first_name, last_name, program
    let sql = "INSERT INTO users (email, password, first_name, last_name, program) VALUES (?, ?, ?, ?, ?)"
    //What goes into brackets
    const {email, password, first_name, last_name, program} = req.body

    bcrypt.hash(password, saltRounds, function(err,hash) {
        sql = mysql.format(sql, [email, hash, first_name, last_name, program])

    pool.query(sql, (err, result) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY') return res.status(409).send('Email is already registered!')
            return errorHandler(res, err)
        }
        return res.send('Sign-up successful')
    })
    })
}

const authUser = (req, res) => {
    const { email, password } = req.body;

    
}

export { registerUser, getAllUsers, getUserById, authUser }