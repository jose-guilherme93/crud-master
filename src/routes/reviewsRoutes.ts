import express, { Router } from 'express'
import { getReviewByIdController, 
  createReviewController,
  deleteReviewController,
  updateReviewController } from '../controllers/reviewControler.js'
const router: Router = express.Router()

router.get('/', getReviewByIdController)
router.post('/', createReviewController)
router.delete('/', deleteReviewController)
router.put('/', updateReviewController)
export default router