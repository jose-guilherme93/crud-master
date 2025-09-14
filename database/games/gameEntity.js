import { pool } from '../connectDatabase.js'
import dotenv from 'dotenv'

dotenv.config()

const enumStatusQuery = `

    CREATE TYPE game_status AS ENUM (
    'Jogando',
    'Zerado',
    'Quero jogar',
    'Abandonado',
    );
`

const gameQuery = `
    CREATE TABLE IF NOT EXISTS "games"(
    title VARCHAR(255),
    game_id VARCHAR(255) PRIMARY KEY,
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    status VARCHAR(20) CHECK (status IN ('Jogando', 'Zerado', 'Quero jogar', 'Abandonado')),
    review VARCHAR(5000),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
    );

`

// pool.query(enumStatusQuery)
// .then(response => console.log(response))
// .then(pool.query(gameQuery))
// .then(console.log("query bem sucedida"))
// .catch(error => console.log("error: ", error))
// .finally(pool.end())


const main = async () => {
    try {
        const response = await pool.query(gameQuery)
        console.log(response)
    } catch (error) {
        console.log(error)
    }    
}

main()