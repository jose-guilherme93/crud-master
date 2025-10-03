
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
        throw error
    }
}

export const createGame = async (bodyParams) => {
    const  {
        title,
        rating,
        status,
        review,
        plataform,
        first_release_date,
        storyline,
        cover_url,
         slug
     } = bodyParams
    
    const query = `INSERT INTO "games" (title, rating, status, review, plataform, first_release_date, storyline, cover_url, slug) 
  VALUES ($1,$2, $3, $4, $5, $6,$7,$8,$9) 
  RETURNING *;
`

     const values = [
        title, rating, status, review, plataform, first_release_date, storyline, cover_url, slug
     ]
    try {
        const responseQuery = await pool.query(query, values)
        return responseQuery.rows[0]
    } catch(error) {
        logger.error("error at createGame: ", error)
        throw error
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
