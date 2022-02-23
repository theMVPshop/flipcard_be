import express from "express";
import { getAllFlashcards, getFlashcardByProgram, createFlashcard } from "../controllers/flashcardController";
const router = express.Router();

router.route("/profile").get(getAllFlashcards)
router.route("/profile/:program").get(getFlashcardByProgram)
router.route("/cards").post(createFlashcard);


export default router;
