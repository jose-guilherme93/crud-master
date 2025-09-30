import {pool} from '../database/connectDatabase.js'
import { logger } from '../logger.js'

export const checkUser = async (username, email) => {
  const ifUserExistsQuery = `SELECT * FROM USERS WHERE username = $1 OR email = $2`
  const checkResult = await pool.query(ifUserExistsQuery,[username, email])
  return checkResult.rows
}

export const createUserDB = async (id, username, email, password, avatar ) => {

  id = crypto.randomUUID()

  const query = `INSERT INTO users (id, username, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `
    const result = await pool.query(query, [id, username, email, password, avatar])
    return result.rows[0]
}


export const deleteUserDB = async (id) => {
  const query = `UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING deleted_at; `
  
  const responseQuery = await pool.query(query, [id])
  
  return responseQuery
}

export const updateUser = async () => {

    
}

export const getUserByID = async (id) => {
    const query = `SELECT * from users WHERE id = $1;`
    
    const responseQuery = await pool.query(query, [id])
    
    return responseQuery
}