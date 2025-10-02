
import { logger } from '../../logger.js'
import {pool} from '../../utils/connectDatabase.js'


export const getGameById = async (id) => {
    const query = `SELECT * FROM games WHERE id = $1`
    try {
        const getGames = await pool.query(query, [id])
        
        return getGames
    } catch(error) {
        logger.error("error at createGame: ", error)
    }
}

export const getAllGamesDB = async (filters) => {
    const {
        limit = 10,
        page=1
        } = filters
    const offset = (page - 1) * limit;
    const query = `SELECT * FROM games
    LIMIT $1 OFFSET $2`

    const params = [
        limit,
        offset
    ]
    try {
        const responseQuery = await pool.query(query, params)

        return {
            data: responseQuery.rows,
            meta: {
                currentPage: page
            }
        } 
    } catch(error) {
        logger.error("error at get all games at db: ", error)
    }
}

export const createGame = async () => {
    try {

    } catch(error) {
        logger.error("error at createGame: ", error)
    }
}

export const deleteGame = async () => {
    try {

    } catch(error) {
        logger.error("error at deleteGame: ", error)
    }
}

export const updateGame = async () => {
    try {

    } catch(error) {
        logger.error("error at createGame: ", error)
    }
}
