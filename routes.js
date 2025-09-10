import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const users = [{
    id: "efnmolijm2i3jmiorm23omi",
    username: process.env.USERNAME_LOGIN,
    email: "jose-guilherme93@hotmail.com",
    password: process.env.USER_PASSWORD},
    {id: "efnmolijm2i3jmiorm2erer3omi",
    username: "pedro",
    email: "jose-guilherme3@hotmail.com",
    password: 23233444},
    {id: "efnmolijm2i3jmiormwrwerwerew23omi",
    username: "augusto",
    email: "jose-guilherme653@hotmail.com",
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

    // const userMatch = users.find(user => user.id)?.id;
    // console.log(userMatch)

    // const JWT_TOKEN = process.env.JSON_WEB_TOKEN
    

    // if(body.email === userMatch ) {
    //    const token = jwt.sign({user: body.id}, JWT_TOKEN, {algorithm:"HS256" })
       
    //    return res.status(201).json({message:token})
    // } 

   
}

export const UserRegister = (req, res) => {
    const body = req.body

    if(!body || !body.email || !body.password ||!body.username ) {
        return res.status(401).send("dados imcompletos")
    }
    
    users.push({id: crypto.randomUUID(), username: body.username, email:body.email, password:body.password})
    console.log(users)
    res.status(201).json({newUser: users})

}
