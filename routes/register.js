
import { pool } from "../database/connectDatabase.js"
import {users} from "../mockData.js"


export const userRegister = (req, res) => {
    const body = req.body
    
    const newUser = {
        id: crypto.randomUUID(),
        username: body.username,
        email: body.email,
        password: body.password,
        avatar: body.avatar,
    }
    if(!body || !body.email || !body.password ||!body.username ) {
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
        const response = await pool.query(query, [id, username, email, password, avatar])
        if( body.email === response.email || body.username === response.username ) {
            
            
            return console.log("email já registrado")

        }
        console.log("usuário inserido:", response.rows[0])
        return res.status(201).json(JSON.stringify(response.rows[0]))
    }


    catch (error) {
        console.log(error)
    }

}

insertUser()

}

