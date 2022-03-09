import express from "express";
import {
  getAllFlashcards,
  getFlashcardByProgram,
  getFlashcardById,
  createFlashcard,
  updateFlashCard
} from "../controllers/flashcardController.js";
const router = express.Router();

router.get("/", getAllFlashcards);
router.get("/program/:program", getFlashcardByProgram);
router.get("/:Card_ID", getFlashcardById)
router.post("/", createFlashcard);
router.put('/', updateFlashCard)

export default router;
