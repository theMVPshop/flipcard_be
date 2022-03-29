import express from "express"
import {
  getAllFlashcards,
  getFlashcardsByCourse,
  getFlashcardById,
  createFlashcard,
  updateFlashcard,
  deleteFlashcardById,
} from "../controllers/flashcardController.js"
import handleErrors from "../utils/handleErrors.js"

const router = express.Router()

router.get("/", handleErrors(getAllFlashcards))
router.get("/course/:course", handleErrors(getFlashcardsByCourse))
router.get("/:card_id", handleErrors(getFlashcardById))
router.post("/", handleErrors(createFlashcard))
router.put("/", handleErrors(updateFlashcard))
router.delete("/:card_id", handleErrors(deleteFlashcardById))

export default router
