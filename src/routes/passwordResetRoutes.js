import {
  resetPasswordController,
  resetPasswordController,
} from "../controllers/resetPasswordController"

import router from "express"

router.Router()

router.post("/auth/requestResetPassword", resetPasswordRequestController)
router.post("/auth/resetPassword", resetPasswordController)

module.exports = router
