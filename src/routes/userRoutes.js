import express from "express"
import handleError from "../utils/handleError.js"

import { getAllUsers, getUserById, registerUser, authUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/register", handleError(registerUser))
router.post("/login", handleError(authUser))
// router.route("/profile").post(protect, updateUserProfile);

export default router
