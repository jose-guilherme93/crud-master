
import { createReviewDB } from "../models/reviewModel.js"
import { pool } from "../../utils/connectDatabase.js"
export const getReviewByIdController = async(req, res) => {
}

export const createReviewController = async(req, res) => {
    const reqParams = { 
        review_text: req.body.review_text,
        score: req.body.score,
        game_id: req.body.game_id,
        user_id: req.body.user_id


     }
    try {
    
    const checkQuery = `
      SELECT 1 FROM reviews
      WHERE user_id = $1 AND game_id = $2
      LIMIT 1;
    `;
    const checkResult = await pool.query(checkQuery, [reqParams.user_id, reqParams.game_id])

    if (checkResult.rowCount > 0) {
      return res.status(409).json({ error: "Review já existe para este jogo e usuário." })
    }

    const newReview = await createReviewDB(reqParams)
    res.status(201).json(newReview)
  } catch (err) {
    console.error("Erro ao criar review:", err);
    res.status(500).json({ error: "Erro ao criar review" })
  }
}