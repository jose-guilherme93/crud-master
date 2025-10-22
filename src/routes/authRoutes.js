import { Router } from "express";
import {authMiddleware} from "../../utils/middlewares.js";
import { loginController} from '../controllers//auth/login.js'
import { recoveryController } from "../controllers/auth/recovery.js";
import {resetPasswordController} from '../controllers/auth/resetPassword.js'

const router = Router()



router.post("/login", loginController)
router.post("/recovery", authMiddleware, recoveryController)
router.post("/reset-password/", resetPasswordController)

export default router
