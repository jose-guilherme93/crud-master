import { logger } from "../../logger.js"
import { checkUser, createUserDB } from "../../models/userModel.js"

export const createUserController = async (req, res) => {

    const {username, email, password, avatar} = req.body
    const check = await checkUser(username, email)

    if(check.length) {return res.send("usuário já cadastrado")}

    else {
        
        try {
            const id = crypto.randomUUID()
            
            const user = await createUserDB(id, username, email, password, avatar)
            logger.info(user)
            res.status(201).json(user)
        }
        catch (error) {
            logger.error(error)
        }
    }
}
