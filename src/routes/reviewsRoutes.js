import { Router } from "express";
import {validateBodyFields} from '../../utils/middlewares.js'
import { getReviewByIdController,createReviewController, deleteReviewController, updateReviewController } from '../controllers/reviewControler.js'
const router = Router()

router.get("/", getReviewByIdController)
router.post("/", validateBodyFields([
    'review_text', 
    'score',
    'game_id',
    'user_id'
    ]),
      createReviewController)
router.delete("/", deleteReviewController)
router.put("/", updateReviewController)
export default router