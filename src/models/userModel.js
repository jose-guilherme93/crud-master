import {pool} from '../../utils/connectDatabase.js'


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

export const updateUserDB = async (id, userData ) => {

  const keys = Object.keys(userData)
  const values = Object.values(userData)

  const setString = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(', ');

  const query = `UPDATE users SET ${setString} WHERE id = $${keys.length + 1}  RETURNING *;
  `
  const params = [...values, id, ]

  const responseQuery = await pool.query(query, params)
  return responseQuery
}


export const getUserByID = async (id) => {
    const query = `SELECT * from users WHERE id = $1;`
    
    const responseQuery = await pool.query(query, [id])
    
    return responseQuery
}

export const getAllUsersDB = async () => {
  const query = `SELECT * FROM users ORDER BY id ASC LIMIT 50 OFFSET 0;`
  const responseQuery = pool.query(query)
  
  return responseQuery
}