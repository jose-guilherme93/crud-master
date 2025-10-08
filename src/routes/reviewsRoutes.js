import { Router } from "express";
import { getReviewByIdController,createReviewController } from '../controllers/reviewControler.js'
const router = Router()

router.get("/", getReviewByIdController)
router.put("/", createReviewController)
export default router