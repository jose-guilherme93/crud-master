import { Router } from "express";
import {authMiddleware} from "../../utils/middlewares.js";
import {forgotPasswordController,
    loginController,
    resetPasswordController,
recoveryController} from '../controllers/authController.js'
const router = Router()



router.post("/login", loginController)
router.post("/recovery", authMiddleware, recoveryController)


router.post("/forgot-password/:token", authMiddleware, forgotPasswordController)
router.post("/reset-password/", authMiddleware, resetPasswordController)
export default router
