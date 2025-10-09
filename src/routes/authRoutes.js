import { Router } from "express";
import {authMiddleware} from "../../utils/middlewares.js";
import {forgotPasswordController, loginController, resetPasswordController} from '../controllers/authController.js'
const router = Router()



router.post("/login", loginController)


router.post("/forgot-password", authMiddleware, forgotPasswordController)
router.post("/reset-password/:token", authMiddleware, resetPasswordController)
export default router
