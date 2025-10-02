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

export const getAllGames = async () => {
    try {

    } catch(error) {
        logger.error("error at createGame: ", error)
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
