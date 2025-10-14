import { Router } from "express";
import {authMiddleware} from "../../utils/middlewares.js";
import {forgotPasswordController,
    loginController,
    resetPasswordController,
recoveryController} from '../controllers/authController.js'
const router = Router()



router.post("/login", loginController)
router.post("/recovery", authMiddleware, recoveryController)


router.post("/forgot-password/:token", forgotPasswordController)
router.post("/reset-password/", resetPasswordController)
export default router
