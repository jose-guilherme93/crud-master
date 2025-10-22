
import { logger } from "../../logger.js"
import { pool } from "../../utils/connectDatabase.js"
import { checkUser, createUserDB, deleteUserDB, getAllUsersDB, getSessionByIdDb, getUserByID, updateUserDB } from "../models/userModel.js"
import * as z from 'zod'

export const getAllUsers = async (req, res) => { 
    try {
        const getUsers = await getAllUsersDB()
       
        res.status(200).json({getUsers})
        
    } catch(error) {
        console.log(error)
    }

}


export const createUserController = async (req, res) => {
    
    const {username, email, password_hash, avatar} = req.body

    const newUser = {
      id: crypto.randomUUID(),
      username,
      email,
      password_hash,
      avatar
    };
    const check = await checkUser(username, email)

    if(check.length) {return res.status(409).json({message:"usuário já cadastrado"})}

    else {
        
        try {
            const id = crypto.randomUUID()
            
            const user = await createUserDB(newUser)
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
    logger.warn(`deleting user with id: ${id}`)
    try {
        const deleteUser = await deleteUserDB(id)
        if(deleteUser.rows.length > 0) {
            logger.info(`deleted_at at ${deleteUser.rows[0].deleted_at}`)
            res.status(200).json(deleteUser.rows[0])

        }   else {res.status(404).json({message: "id not found"})
        

    }

}   catch(error) {
        logger.error("erro na requisição: ", error)
        res.status(500).json({message:"internal server error"})
    }
}




export const updateUserByIdController = async (req, res) => {
    const { id } = req.params
    const updateUserFromUser = req.body
    const now = new Date();
    const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
    
    updateUserFromUser["updated_at"] = timestamp

    console.log("🚀 ~ updateUserByIdController ~ updateUserFromUser:", updateUserFromUser)
    

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



export const getSessionByIdController = async (req, res) => {
    const {id} = req.params

    try {
        logger.info(`searching sessions in DB`)
        const result = await getSessionByIdDb(id)
        result.rowCount > 0 ? logger.info("DB: consult ok") : ''
        res.status(200).json({message:result.rows})
       
    } catch(error) {
        logger.error("erro ao buscar sessões no banco: ", error)

        res.status(500).json({
            message: "internal server error",
            error: error
        })

    }
}