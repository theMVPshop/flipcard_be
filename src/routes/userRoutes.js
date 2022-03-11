import express from "express";

import {
  getAllUsers,
  getUserById,
  registerUser,
  authUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/register", registerUser);
router.post("/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);

export default router;
