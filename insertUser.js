import dotenv from 'dotenv'
import { Pool } from 'pg'
dotenv.config()


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

const newUser = {
    username: "joseti",
    email: "jose-guilhere93@hotmail.com",
    password: "1212"
}

const insertUser = async () => {
    const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
    `
    
    const { username, email, password } = newUser
    
    try {
        const response = await pool.query(query, [username, email, password])
        console.log("usuário inserido:", response.rows[0])
    } catch (error) {
        console.log(error)
    }   finally {
        await pool.end()
    }
}

insertUser()