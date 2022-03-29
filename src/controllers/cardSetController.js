import mysql from "mysql"
import pool from "../db/database.js"
import { promisify } from "util"

const poolQuery = promisify(pool.query).bind(pool) //turns pool.query into a promise so we can use async/await instead of callbacks

//get all cardSets
const getAllCardSets = async (req, res) => res.json(await poolQuery("SELECT * FROM card_sets"))

//get all cardSets by course
const getCardSetByCourse = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM card_sets WHERE course = ?", req.params.course))
  )

//get cardSet by id
const getCardSetById = async (req, res) =>
  res.json(
    await poolQuery(mysql.format("SELECT * FROM card_sets WHERE set_id = ?", req.params.set_id))
  )

//create cardSet
const createCardSet = async (req, res, next) =>
  //create cardSet and set name & course
  (await poolQuery(
    mysql.format(
      "INSERT INTO card_sets (set_name, course) VALUES (?, ?)", //adds cardSet to database
      [
        //values to replace ?'s above
        req.body.set_name,
        req.body.course,
      ]
    )
  )) && res.json({ msg: `card_set '${req.body.set_name}' successfully added` }) //if successful, send message

//update cardSet
const updateCardSetById = async (req, res) =>
  (await poolQuery(
    mysql.format(
      "UPDATE card_sets SET set_name = ?, course = ? WHERE set_id = ?", //updates cardSet in database
      [
        //values to replace ?'s above
        req.body.set_name,
        req.body.course,
        req.params.set_id,
      ]
    )
  )) && res.json({ msg: `cardSet${req.params.set_id} successfully updated` }) //if successful, send message

//delete cardSet
const deleteCardSetById = async (req, res) =>
  (await poolQuery(mysql.format("DELETE FROM card_sets WHERE set_id = ?", req.params.set_id))) && //deletes cardSet from database
  res.json({ msg: `cardSet ${req.params.set_id} successfully deleted` }) //if successful, send message

export {
  getAllCardSets,
  getCardSetByCourse,
  getCardSetById,
  createCardSet,
  updateCardSetById,
  deleteCardSetById,
}
