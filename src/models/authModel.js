import { pool } from "../../utils/connectDatabase.js"
import {generateBigIntId} from '../../utils/generateBigInt.js'

export const searchUserByEmail = async (email) => {

    const responseQuery = await pool.query('SELECT * FROM users WHERE email = $1', [email])
    return responseQuery.rows[0]
}

export const searchEmailRegistered = async (email, recoveryToken) => {

    
    const query = `SELECT * FROM users WHERE email = $1;`
    const responseQuery = await pool.query(query, [email])
    
    return responseQuery
}

export const insertTokenInDB = async (fields, recoveryToken) => {
  try {
    const { id } = fields
    const idRecovery = generateBigIntId()

    const query = `
      INSERT INTO recovery (
        id,
        user_id,
        code,
        expires_at,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, NOW(), NOW()
      )
      RETURNING *;
    `;

    const expiresAt = new Date(Date.now() + 60 * 60 * 1000)

    const values = [idRecovery, id, recoveryToken, expiresAt]

    const responseQuery = await pool.query(query, values)
    console.log("🚀 ~ insertTokenInDB ~ responseQuery:", responseQuery.rows[0])

    return responseQuery.rows[0]
  } catch (error) {
    console.error("❌ Erro ao inserir token:", error)
    throw error;
  }
};

