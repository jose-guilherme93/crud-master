import { createGame, getAllGamesDB, getGameById } from "../models/gameModel.js";

export const getGameByIdController = async (req, res) => {
    const { id } = req.body
    
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

    const response = await createGame(bodyParams)
    res.status(201).json({response})
} catch (error) {console.log(error)}

 
}