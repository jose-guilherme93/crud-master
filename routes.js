import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const users = {
    username: process.env.USERNAME_LOGIN,
    password: process.env.USER_PASSWORD
    
}



export const UserLogin = (req,res) => {
    const body = req.body
    console.log(body)
    if(!body || !body.username || !body.password) {
        res.status(401).json({message: "Dados incompletos"})
    }

    if(body.username !== users.username || body.password !== users.password ) {
       return res.status(401).json({ message: "falha no login. usuário não encontrado." })
    }

    if(body.username === users.username && body.password === users.password ) {
       const token = jwt.sign({user: body.username}, process.env.JSON_WEB_TOKEN, {algorithm:"HS256" })
       console.log(token)
       res.status(200).json({user: users.username,token: token})
    } 

   
}
