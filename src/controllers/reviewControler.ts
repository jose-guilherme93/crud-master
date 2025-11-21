import type { Response, Request } from 'express'
import { logger } from '@/scripts/logger.js'
import { checkExistingReview, createReviewDB, getReviewByIdDB } from '../models/reviewModel.js'
import * as zod from 'zod'
import type { Review } from '@/types/review.js'

const reviewCreateSchema = zod.object({
  user_id: zod.string(),
  game_id: zod.string(),
  score: zod.number().min(0).max(10),
  review_text: zod.string().min(1).max(500),
}) satisfies zod.ZodType<Review>

const reviewSchema = zod.string()

export async function getReviewByGameIdController(req: Request, res: Response) {
  const parseReviewGameId = reviewSchema.safeParse(req.params.game_id)

  const searchReview = await getReviewByIdDB(parseReviewGameId.data!)
  res.status(200).json({ message: 'Review encontrado com sucesso', review: searchReview })
}

export async function createReviewController(req: Request, res: Response) {
  const reqParams: Review = {
    review_text: req.body.review_text,
    score: req.body.score,
    game_id: req.body.game_id,
    user_id: req.body.user_id,
  }
  reviewCreateSchema.safeParse(reqParams)
  try {

    const checkResult = await checkExistingReview(reqParams.user_id, reqParams.game_id)

    if (checkResult.rowCount! > 0) {
      logger.warn('Review já existe para este jogo e usuário.')
      return res.status(409).json({ error: 'Review já existe para este jogo e usuário.' })
    }

    const newReview = await createReviewDB(reqParams as Required<Review>)
    if(!newReview) {
      logger.error('Erro ao criar review no banco de dados.')
      return res.status(500).json({ error: 'Erro ao criar review no banco de dados.' })
    }
    res.status(201).json({ message: 'Review criado com sucesso', review: newReview })
  } catch (err) {
    logger.error('Erro ao criar review Controller:', err)
    res.status(500).json({ error: 'Erro ao criar review', message: 'game não encontrado' })
  }
}

export const deleteReviewController = async () => {

}

export const updateReviewController = async () => {

}
