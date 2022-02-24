import express from "express";

import 
{ getAllUsers, getUserById, registerUser, authUser } 
from '../controllers/userControllerSQL.js'
// import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/user/register").post(registerUser);
router.post("/user/login", authUser);
// router.route("/profile").post(protect, updateUserProfile);

export default router;


