import { logger } from "../../logger.js"
import { createUserDB } from "../../models/userModel.js"

export const createUserController = async (req, res) => {

    const {username, email, password, avatar} = req.body
    const id = crypto.randomUUID()
   
    try {
        const user = await createUserDB(id, username, email, password, avatar)
        logger.info(user)
        res.status(201).json(user)
    }
    catch (error) {
        logger.error(error)
    }
}
