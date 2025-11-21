import type { Review } from '@/types/review.js'
import { pool } from '../utils/connectDatabase.js'
import { logger } from '@/scripts/logger.js'

interface ReviewParams {
  user_id: string
  game_id: string
  score: number
  review_text: string
}

export async function checkExistingReview(user_id: string, game_id: string) {
  const query = `
    SELECT * FROM reviews
    WHERE user_id = $1 AND game_id = $2;
  `
  try {
    const response = await pool.query(query, [user_id, game_id])
    return response
  } catch (error) {
    logger.error('Erro ao verificar review existente:', error)
    throw error
  }
}

export async function createReviewDB(params: ReviewParams): Promise<Review> {
  const query = `
    INSERT INTO reviews (user_id, game_id, score, review_text)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `

  const { user_id, game_id, score, review_text } = params

  try {
    const response = await pool.query(query, [user_id, game_id, score, review_text])
    return response.rows[0]
  } catch (error) {
    logger.error('Erro ao criar review DB:', error)
    throw error
  }
}

export async function getReviewByIdDB(parseReviewGameId: string): Promise<Review | null> {
  const query = `
    SELECT * FROM reviews
    WHERE game_id = $1;
  `

  try {
    const response = await pool.query(query, [parseReviewGameId])
    return response.rows[0] || null
  } catch (error) {
    logger.error('Erro ao buscar review por ID:', error)
    throw error
  }
}
