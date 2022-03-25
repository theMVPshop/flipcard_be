import express from "express"
import handleErrors from "../utils/handleErrors.js"

import { getAllUsers, getUserById, registerUser, authUser } from "../controllers/userController.js"

const router = express.Router()

router.get("/", getAllUsers)
router.get("/:id", getUserById)
router.post("/register", handleErrors(registerUser))
router.post("/login", authUser)
// router.route("/profile").post(protect, updateUserProfile);

export default router
