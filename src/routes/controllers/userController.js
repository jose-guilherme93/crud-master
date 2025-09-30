
import { logger } from "../../../logger.js"
import { checkUser, createUserDB, deleteUserDB, getUserByID, updateUserDB } from "../../models/userModel.js"

export const createUserController = async (req, res) => {

    const {username, email, password, avatar} = req.body
    const check = await checkUser(username, email)

    if(check.length) {return res.send("usuário já cadastrado")}

    else {
        
        try {
            const id = crypto.randomUUID()
            
            const user = await createUserDB(id, username, email, password, avatar)
            console.log(user)
            res.status(201).json(user)
        }
        catch (error) {

            logger.error(error)
        }
    }
}


export const deleteUserController = async (req, res) => {

const {id} = req.params

    try {
        const deleteUser = await deleteUserDB(id)
        if(deleteUser.rows.length > 0) {
            console.log("deleteUser function: ", deleteUser.rows[0])
            res.status(200).json(deleteUser.rows[0])

        } else {res.status(400).json({message:"Bad request"})
        

    }

}   catch(error) {
        logger.error("erro na requisição: ", error)
        res.status(500).json({message:"internal server error"})
    }
}




export const updateUserByIdController = async (req, res) => {
    const { id } = req.params
    const updateUserFromUser = req.body
    try {
       
        const updatedUser = await updateUserDB(id, updateUserFromUser)
        if (updatedUser.rows.length > 0) {
            res.status(200).json({ user: updatedUser.rows[0] })
        } else {
            res.status(404).json({ message: "NOT FOUND: usuário não encontrado" })
        }
    } catch (error) {
        logger.error("erro ao atualizar usuário: ", error)
        res.status(500).json({ message: "internal server error", error: error.detail })
    }
}





export const getUserByIdController = async (req, res) => {
    const {id} = req.params

    try {
        const getUser = await getUserByID(id)

        if(!getUser.rows.length) {
            return res.status(404).json({message: "NOT FOUND: usuário não encontrado"})
        } else {
            res.status(200).json({user: getUser.rows[0]})
        }


    } catch(error) {
        logger.error("erro ao buscar usuário no banco: ", error)

        res.status(500).json({
            message: "internal server error",
            error: error
        })

    }
}
