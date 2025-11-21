import type { Response, Request } from 'express'
import { logger } from '@/scripts/logger.js'
import { checkExistingReview, createReviewDB, deleteReviewDB, getReviewByIdDB } from '../models/reviewModel.js'
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

const deleteReviewParamsSchema = zod.object({
  user_id: zod.uuid(),
  game_id: zod.string().min(1),
})
export async function deleteReviewController(req: Request, res: Response) {
  logger.info('deletando review...')
  const reqParams = {
    game_id:  req.params.game_id!,
    user_id: req.params.user_id!,
  }

  if (!reqParams.game_id || !reqParams.user_id) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios ausentes' })
  }

  const parsedParams = deleteReviewParamsSchema.safeParse(reqParams)
  if(parsedParams.error) {
    logger.error(`Parâmetros inválidos para deletar review:', ${parsedParams.error}`)
    return res.status(400).json({ error: 'Parâmetros inválidos para deletar review' })

  }
  try {
    const searchReview = await deleteReviewDB(reqParams)
    if(searchReview.rowCount! == 0) {
      logger.warn('Review não encontrado para deletar.')
      return res.status(404).json({ error: 'Review não encontrado para deletar' })
    }
    logger.info(`Review deletado com sucesso: ${searchReview}`)
    res.status(200).json({ message: 'Review deletado com sucesso' })
  } catch (err) {
    logger.error('Erro ao deletar review:', err)
    res.status(500).json({ error: 'Erro ao deletar review' })
  }
}
export const updateReviewController = async () => {

}
