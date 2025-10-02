import { getGameById } from "../models/gameModel.js";

export const getGameByIdController = async (req, res) => {
    const { id } = req.body
    
    const response = await getGameById(id)
    if(!id) {res.status(400).json({message: "forneça um id"})}
    else {

        res.status(200).json({message: response.rows[0]})
    }

}