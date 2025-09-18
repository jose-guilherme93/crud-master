import dotenv from 'dotenv'
import crypto, { randomUUID } from 'crypto'
import { pool } from '../connectDatabase'
import { logger } from '../../logger.js'
dotenv.config()

const id = randomUUID()


const newUser = {
    id: id,
    username: "joeti",
    email: "jose-guihere93@hotmail.com",
    password: "1212",
    avatar: "ava",
}

const insertUser = async () => {
    const query = `
    INSERT INTO users (id, username, email, password, avatar)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `
    
    const { id, username, email, password, avatar } = newUser
    
    try {
        const response = await pool.query(query, [id, username, email, password, avatar])
        logger.info("usuário inserido:", response.rows[0])
    } catch (error) {
        logger.info(error)
    }   finally {
        await pool.end()
    }
}

insertUser()