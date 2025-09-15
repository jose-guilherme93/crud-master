import { pool } from '../connectDatabase.js'
import dotenv from 'dotenv'

dotenv.config()

const enumStatusQuery = `

    CREATE TYPE game_status AS ENUM (
    'Jogando',
    'Zerado',
    'Quero jogar',
    'Abandonado'
    );
`

const gameCreateQuery = `
    CREATE TABLE IF NOT EXISTS "games"(
    title VARCHAR(255),
    game_id VARCHAR(255) PRIMARY KEY,
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    status game_status,
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
        const responseEnumStatusQuery = await pool.query(enumStatusQuery )
        console.log(responseEnumStatusQuery.rows)

        const responseGameCreateQuery = await pool.query(gameCreateQuery)
        console.log(responseGameCreateQuery.rows)
    } catch (error) {
        console.log(error)
    }    
}

main()