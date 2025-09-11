import dotenv from "dotenv"
import { Pool } from "pg"
dotenv.config()


const poll = new Pool({
    connectionString: process.env.DATABASE_URL
})

const createUserTable = `
    CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    EMAIL VARCHAR(100) UNIQUE NOT NULL,
    PASSWORD VARCHAR(255) NOT NULL 
    )
`

const main = async () => {
    try {

        await poll.query(createUserTable)
        console.log("tabela criada com sucesso")
        
    } catch (err) {
        console.error(err)
    }
} 

main()