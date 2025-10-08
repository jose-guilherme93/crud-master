
import { pool } from "../../utils/connectDatabase.js"


export async function createReviewDB(params) {
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
