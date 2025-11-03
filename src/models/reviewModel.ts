
import { pool } from "../utils/connectDatabase.js"


interface ReviewParams {
  user_id: number;
  game_id: number;
  score: number;
  review_text: string;
}

interface Review {
  id: number;
  user_id: number;
  game_id: number;
  score: number;
  review_text: string;
  created_at: Date;
}

export async function createReviewDB(params: ReviewParams): Promise<Review> {
  const query = `
    INSERT INTO reviews (user_id, game_id, score, review_text)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const {user_id, game_id, score, review_text} = params

  try {
    const response = await pool.query(query, [user_id, game_id, score, review_text])
    return response.rows[0]
  } catch (error) {
    console.error("Erro ao criar review:", error)
    throw error
  }
}
