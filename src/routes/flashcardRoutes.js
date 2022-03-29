import express from "express"
import {
  getAllFlashcards,
  getFlashcardByProgram,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcardById,
} from "../controllers/flashcardController.js"
import handleErrors from "../utils/handleErrors.js"

const router = express.Router()

router.get("/", handleErrors(getAllFlashcards))
router.get("/program/:program", handleErrors(getFlashcardByProgram))
router.get("/:Card_ID", handleErrors(getFlashcardById))
router.post("/", handleErrors(createFlashcard))
router.put("/", handleErrors(updateFlashcard))
router.delete("/", handleErrors(deleteFlashcardById))

export default router
