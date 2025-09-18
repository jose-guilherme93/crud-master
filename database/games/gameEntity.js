import { pool } from '../connectDatabase.js'
import dotenv from 'dotenv'
import { logger } from '../../logger.js'
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
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    rating DECIMAL(3,1) CHECK (rating >= 0 AND rating <= 10),
    status game_status,
    review VARCHAR(5000),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP NULL
    );

`

const main = async () => {
    try {
        const responseEnumStatusQuery = await pool.query(enumStatusQuery )
        logger.info(responseEnumStatusQuery.rows)

        const responseGameCreateQuery = await pool.query(gameCreateQuery)
        logger.info(responseGameCreateQuery.rows)
    } catch (error) {
        logger.info(error)
    }    
}

main()