import express from "express"
import {
  getAllCardSets,
  getCardSetByCourse,
  getCardSetById,
  createCardSet,
  updateCardSetById,
  deleteCardSetById,
} from "../controllers/cardSetController.js"
import handleErrors from "../utils/handleErrors.js"

const router = express.Router()

router.get("/all-cardsets", handleErrors(getAllCardSets))
router.get("/course/:course", handleErrors(getCardSetByCourse))
router.get("/:set_id", handleErrors(getCardSetById))
router.post("/", handleErrors(createCardSet))
router.put("/:set_id", handleErrors(updateCardSetById))
router.delete("/:set_id", handleErrors(deleteCardSetById))

export default router
