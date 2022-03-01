import express from "express";
import { Admin } from "mongodb";

import { getAllAdmins, getAdminById, registerAdmin, authAdmin } from "../controllers/adminController";


const router = express.Router();

router.route('/admin/:id').get(getAdminById)
router.route("/admin/register").post(registerAdmin)
router.route('/admin/login').post(authAdmin)

export default router;
