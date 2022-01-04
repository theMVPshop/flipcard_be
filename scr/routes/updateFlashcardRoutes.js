import express from "express";
import { updateupdateFlashcardSet } from "../controllers/flashcardUpdateController";
const router = express.Router();

router.route("/profile").post(updateupdateFlashcardSet);

export default router;
