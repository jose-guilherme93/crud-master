
import { pool } from "../database/connectDatabase.js"
import { logger } from "../../logger.js"


export const userRegister = (req, res) => {
    const {username, email, password, avatar} = req.body
    
    const newUser = {
        id: crypto.randomUUID(),
        username,
        email,
        password,
        avatar,
    }
    if(!email || !password ||!username) {
        return res.status(401).send("dados imcompletos")
    }

    
    const insertUser = async () => {
        const query = `
        INSERT INTO users (id, username, email, password, avatar)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `

    const {id, username, email, password, avatar} = newUser

    try {
        const existingUser = await pool.query(`
            SELECT * FROM users
            WHERE email = $1 OR username = $2`, 
            [email, username]
        )

        if( existingUser.rows.length > 0 ) {
            
            return res.status(409).send("email ou username já registrado")
            
        }

        const response = await pool.query(query, [id, username, email, password, avatar])
        
        res.status(201).json({
            message: "usuário cadastrado com sucesso",
            id:response.rows[0].id})
    }
    
    
    catch (error) {
        logger.info(error)
    }
    
}
insertUser()



}

