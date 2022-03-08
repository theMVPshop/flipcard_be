import express from "express";
import {
  getAllFlashcards,
  getFlashcardByProgram,
  createFlashcard,
} from "../controllers/flashcardController.js";
const router = express.Router();

router.get("/", getAllFlashcards);
router.get("/:program", getFlashcardByProgram);
router.post("/", createFlashcard);

export default router;
