
import { logger } from '../../logger.js'
import {pool} from '../../utils/connectDatabase.js'


export const getGameById = async (id) => {
    const query = `SELECT * FROM games WHERE id = $1`
    
        const getGames = await pool.query(query, [id])
        
        return getGames
   
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
   
        const responseQuery = await pool.query(query, params)

        return {
            data: responseQuery.rows,
            meta: {
                currentPage: page
            }
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
    
        const responseQuery = await pool.query(query, values)
        return responseQuery.rows[0]
} 
      

export const updateGameDB = async (id, updateGameData) => {

    const keys = Object.keys(updateGameData)
    const values = Object.values(updateGameData)

    
      
    const setValues = keys
    .map((key, index) => {

        return `${key} = $${index + 1}`
       

    }
)

    const query = `UPDATE games SET ${setValues} WHERE id = $${values.length + 1} RETURNING *`       
    const params = [...values, id]

    const responseQuery = await pool.query(query, params)

    return responseQuery
}
