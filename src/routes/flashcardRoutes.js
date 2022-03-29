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
router.get("/:card_id", handleErrors(getFlashcardById))
router.post("/", handleErrors(createFlashcard))
router.put("/", handleErrors(updateFlashcard))
router.delete("/:card_id", handleErrors(deleteFlashcardById))

export default router
