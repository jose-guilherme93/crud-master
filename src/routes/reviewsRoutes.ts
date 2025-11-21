import express, { Router } from 'express'
import {
  createReviewController,
  deleteReviewController,
  updateReviewController,
  getReviewByGameIdController } from '@/controllers/reviewControler.js'
const router: Router = express.Router()

router.get('/:game_id', getReviewByGameIdController)
router.post('/', createReviewController)
router.delete('/', deleteReviewController)
router.put('/', updateReviewController)
export default router
