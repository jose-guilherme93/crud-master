import {pool} from '../database/connectDatabase.js'

export const createUserDB = async (id, username, email, password, avatar ) => {
  id = crypto.randomUUID()
      const query = `
        INSERT INTO users (id, username, email, password, avatar)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `
        const result = await pool.query(query, [id, username, email, password, avatar])
        return result.rows[0]
}

const updateUser = async () => {
    
}
const deleteUser = async () => {
    
}
const getUser = async (id) => {
    
}