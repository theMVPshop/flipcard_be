import express from "express";
import { getAllFlashcards, getFlashcardByProgram, createFlashcard } from "../controllers/flashcardController";
const router = express.Router();

router.route("/cards").get(getAllFlashcards)
router.route("/cards/:program").get(getFlashcardByProgram)
router.route("/cards").post(createFlashcard);


export default router;
