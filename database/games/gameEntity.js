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
const checkTypeStatus = `SELECT * FROM pg_type WHERE typname = 'game_status';`

const createType = async () => {
    try {



        const responseEnumStatusQuery = await pool.query(checkTypeStatus)
        if (responseEnumStatusQuery.rows.length > 0) {
            logger.info("tipagem existente no banco, ignorando condição")

        } else {
            logger.info("tipagem criada com sucesso")
        }


        
       

    } catch (error) {
        logger.info(error)
    }    
}

createType()

const createTable = async () => {
    try {

const checkTableGames = `SELECT 1 FROM information_schema.tables WHERE table_name = 'games' AND table_schema = 'public';
`;

const responseTableCheck = await pool.query(checkTableGames);

    if (responseTableCheck.rows.length > 0) {
        logger.info("Tabela 'games' já existe. Pulando criação.");
} else {
   const responseGameCreateQuery = await pool.query(gameCreateQuery)
        console.log(responseGameCreateQuery)
        logger.info(JSON.stringify(responseGameCreateQuery.rows, null, 2))
}
    }
 catch (error) {
    logger.error(error)
}}

createTable()