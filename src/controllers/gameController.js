import { getAllGamesDB, getGameById } from "../models/gameModel.js";

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