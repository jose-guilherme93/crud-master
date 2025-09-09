import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const users = [{
    id: "efnmolijm2i3jmiorm23omi",
    username: process.env.USERNAME_LOGIN,
    password: process.env.USER_PASSWORD},
    {id: "efnmolijm2i3jmiorm2erer3omi",
    username: "pedro",
    password: 23233444},
    {id: "efnmolijm2i3jmiormwrwerwerew23omi",
    username: "augusto",
    password: 123456}
]


export const UserLogin = (req,res) => {
    const body = req.body
    
    // if(!body || !body.username || !body.password) {
    //     res.status(401).json({message: "Dados incompletos"})
    // }

    // if(body.username !== users.username || body.password !== users.password ) {
    //    return res.status(401).json({ message: "falha no login. usuário não encontrado." })
    // }

    const userMatch = users.find(user => user.id)?.id;
    console.log(userMatch)

    const JWT_TOKEN = process.env.JSON_WEB_TOKEN
    

    if(body.id === userMatch ) {
       const token = jwt.sign({user: body.id}, JWT_TOKEN, {algorithm:"HS256" })
       
       return res.status(201).json({message:token})
    } 

   
}

export const UserRegister = (req, res) => {
    const body = req.body
    
    

}
