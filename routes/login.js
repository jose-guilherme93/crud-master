import { users } from "../mockData.js";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { logger } from "../logger.js";

dotenv.config()
export const userLogin = (req,res) => {
    const body = req.body
    
    if(!body || !body.email || !body.password) {
        res.status(401).send( "Dados incompletos")
    }

    const userMatch = users.find(user => user.email)?.email;
    logger.info("userMatch:", userMatch)

    const JWT_TOKEN = process.env.JSON_WEB_TOKEN
    
    if(body.email === userMatch ) {

       const token = jwt.sign({user: body.email}, JWT_TOKEN, {algorithm:"HS256" })
       
       return res.status(201).json({message:token})
    } else {
        res.status(401).send("email ou senha incorretos")
    }
   
}