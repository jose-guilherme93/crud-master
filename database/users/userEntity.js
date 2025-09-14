import dotenv from "dotenv"
import { Pool } from "pg"
dotenv.config()


const poll = new Pool({
    connectionString: process.env.DATABASE_URL
})

const createUsersTable = `
    CREATE TABLE IF NOT EXISTS "users" (
    id VARCHAR(40) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
`

const main = async () => {
    try {

        await poll.query(createUsersTable)
        console.log("tabela criada com sucesso")
        
    } catch (err) {
        console.error(err)
    }
} 

main()