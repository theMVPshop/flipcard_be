import express from "express";

import {
  getAllAdmins,
  getAdminById,
  registerAdmin
} from "../controllers/adminController.js";

const router = express.Router();

router.get('/', getAllAdmins);
router.get("/:id", getAdminById);
router.post("/register", registerAdmin);
// router.post("/login", authAdmin);

export default router;
