// const {
// 	resetPasswordRequestController,
// 	resetPasswordController,
// } = require("../controllers/resetPasswordController.js");
import { resetPasswordController, resetPasswordController} from '../controllers/resetPasswordController'

const router = require("express").Router();

router.post("/auth/requestResetPassword", resetPasswordRequestController);
router.post("/auth/resetPassword", resetPasswordController);

module.exports = router;
