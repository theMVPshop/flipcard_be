import express from "express"
import {
  getAllFlashcards,
  getFlashcardsByCourse,
  getFlashcardsByCardSet,
  getFlashcardById,
  createFlashcard,
  updateFlashcardById,
  deleteFlashcardById,
} from "../controllers/flashcardController.js"
import handleErrors from "../utils/handleErrors.js"
import checkJwt from '../utils/checkJwt.js'

const router = express.Router()

router.get("/all-flashcards", handleErrors(getAllFlashcards))
router.get("/course/:course", handleErrors(getFlashcardsByCourse))
router.get("/:set_id", handleErrors(getFlashcardsByCardSet))
router.get("/:card_id", handleErrors(getFlashcardById))
router.post("/", checkJwt, handleErrors(createFlashcard))
router.put("/:card_id", checkJwt, handleErrors(updateFlashcardById))
router.delete("/:card_id", checkJwt, handleErrors(deleteFlashcardById))

export default router
