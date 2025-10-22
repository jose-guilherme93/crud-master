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
    const userId = fields.id
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

    const values = [idRecovery, userId, recoveryToken, expiresAt]

    const responseQuery = await pool.query(query, values)
    

    return responseQuery.rows[0]
  } catch (error) {
    console.error("❌ Erro ao inserir token:", error)
    throw error;
  }
};

export const insertTokenSession = async (sessionParameters, sessionToken) => {
  const {sessionId, userId, browser, ip, expiresAt} = sessionParameters
  try {
    const query = `
      INSERT INTO sessions (
        id,
        user_id,
        browser,
        ip,
        expires_at
      ) VALUES (
        $1, $2, $3, $4, $5
      )
      RETURNING *;
    `

    const values = [sessionId, userId, browser, ip, expiresAt];

    const responseQuery = await pool.query(query, values)

    return responseQuery.rows[0]
  } catch (error) {
    console.error("❌ Erro ao inserir token de sessão:", error)
    throw error;
  }
}