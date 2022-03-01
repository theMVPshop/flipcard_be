import mysql from 'mysql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {errorHandler} from '../middleware/errorMiddleware.js'

const saltRounds = 10

const getAllAdmins = (req, res) => {
    pool.query("SELECT * FROM admin", (err, rows) => {
        if(err) return errorHandler(res,err)
        return res.json(rows);
    })
}

const getAdminById = (req, res) => {
    let sql = 'SELECT * FROM admin WHERE Admin_ID = ?';
    const replacements = [req.params.Admin_ID]
    sql = mysql.format(sql, replacements)

    pool.query(sql, (err, rows) => {
        if(err) return errorHandler(res,err)
        return res.json(rows)
    })
}

const registerAdmin = (req, res) => {
    //Insert into users email, password, first_name, last_name, program
    let sql = "INSERT INTO admin (email, password, first_name, last_name) VALUES (?, ?, ?, ?)"
    //What goes into brackets
    const {email, password, first_name, last_name} = req.body

    bcrypt.hash(password, saltRounds, function(err,hash) {
        sql = mysql.format(sql, [email, hash, first_name, last_name])

    pool.query(sql, (err, result) => {
        if(err) {
            if(err.code === 'ER_DUP_ENTRY') return res.status(409).send('Email is already registered')
            return errorHandler(res, err)
        }
        return res.send('Sign-up successful')
    })
    })
}

export { getAllAdmins, getAdminById, registerAdmin }