import { createGame, getAllGamesDB, getGameById, updateGameDB } from "../models/gameModel.js";
import { logger } from "../scripts/logger.js";
export const getGameByIdController = async (req, res) => {
    const { id } = req.params
    
    const response = await getGameById(id)
    console.log("🚀 ~ getGameByIdController ~ response:", response)
    if(!id) {res.status(400).json({message: "forneça um id"})}
    else {

        res.status(200).json({message: response.rows[0]})
    }

}

export const getAllGames = async (req, res) => {

    try {
        const filters = {
            limit: req.query.limit ? parseInt(req.query.limit, 10) : 10,
            page: req.query.page ? parseInt(req.query.page, 10) : 1
            
        }
        const response = await getAllGamesDB(filters)
        console.log("🚀 ~ getAllGames ~ response:", response)
        res.status(200).json({response})
    } catch(error) {res.status(400).json({message: "error at get all games", error: error})}
}



export const createGameController = async (req, res) => {
    logger.info("creating a game...")
    try {
        const bodyParams = { 

        title: req.body.title,
        rating: req.body.rating,
        status: req.body.status,
        review: req.body.review,
        slug: req.body.slug,
        storyline: req.body.storyline,
        cover_url: req.body.cover_url,
        plataform: req.body.plataform,
        first_release_date: req.body.first_release_date,
    }
    if (
  !bodyParams.title ||
  !bodyParams.rating ||
  !bodyParams.status ||
  !bodyParams.review ||
  !bodyParams.slug ||
  !bodyParams.storyline ||
  !bodyParams.cover_url ||
  !bodyParams.plataform ||
  !bodyParams.first_release_date) {
  return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    
    const response = await createGame(bodyParams)

    if(createGame.length == 0) res.status(401)
    logger.info(`game ${response.title} created`)
    res.status(201).json({response})
    
} catch (error) {logger.log(error)}


}


export const updateGameController = async (req, res) => {
    const {id} = req.params
    
    const updateGameData = req.body
    logger.info(`body params to update a game: ${JSON.stringify(updateGameData)}`)
    updateGameData.updated_at = new Date()
    
     if(updateGameData.slug) {
        updateGameData.slug = updateGameData.slug
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9\-]/g, '')
     }

    
    try {
        logger.info("updating a game...")
        const updateGame = await updateGameDB(id, updateGameData)
        
        if(updateGame.rows.length > 0) {
            logger.info(`game ${updateGame.rows[0].title} updated.`)
            res.status(200).json({messsage: updateGame.rows[0]})
        } else {
            logger.info(`game with id ${id} not found`)
            res.status(400).json({message: "game não encontrado"})
        }

    } catch(error) {
        logger.error("erro ao atualizar game no banco: ", error)
    }


}