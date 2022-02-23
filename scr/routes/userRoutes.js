import express from "express";
// import {
// 	authUser,
// 	registerUser,
// 	updateUserProfile,
// } from "../controllers/userController.js";

import { getAllUsers, getUserById, registerUser, authUser } from '../controllers/userControllerSQL.js'
// import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);

export default router;
