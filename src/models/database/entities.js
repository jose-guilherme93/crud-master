
import { pool } from '../connectDatabase.js'
import dotenv from 'dotenv'
import { logger } from '../../../logger.js'
dotenv.config()


// user table
const userTableQuery = `CREATE TABLE IF NOT EXISTS "users" (
    icreateUsersTabled VARCHAR(40) PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
`

const createUserTable = async () => {
    try {

        await pool.query(userTableQuery)
        logger.info("tabela criada com sucesso")
        
    } catch (err) {
        logger.error(err)
    }
} 




// game table

const enumStatusQuery = `CREATE TYPE game_status AS ENUM ('Jogando','Zerado','Quero jogar','Abandonado')`

const gameCreateQuery = `CREATE TABLE IF NOT EXISTS "games"(
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

export const createType = async () => {
    try {

        const responseEnumStatusQuery = await pool.query(checkTypeStatus)
        if (responseEnumStatusQuery.rows.length > 0) {
            logger.info("tipagem existente no banco, ignorando condição")

        } else {

            logger.info("tipagem criada com sucesso")
             const responseEnumStatusQuery = await pool.query(enumStatusQuery)
        }

    } catch (error) {
        logger.info(error)
    }    
}

createType()



const createGamesTable = async () => {
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



