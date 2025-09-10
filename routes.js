import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const users = [{
    id: "efnmolijm2i3jmiorm23omi",
    username: "joseti",
    email: "jose-guilherme93@hotmail.com",
    password: "121212"},
    {id: "efnmolijm2i3jmiorm2erer3omi",
    username: "pedro",
    email: "jose-guilherme3@hotmail.com",
    password: 23233444},
]


export const userLogin = (req,res) => {
    const body = req.body
    
    if(!body || !body.email || !body.password) {
        res.status(401).send( "Dados incompletos")
    }

    const userMatch = users.find(user => user.email)?.email;
    console.log("userMatch:", userMatch)

    const JWT_TOKEN = process.env.JSON_WEB_TOKEN
    
    if(body.email === userMatch ) {

       const token = jwt.sign({user: body.email}, JWT_TOKEN, {algorithm:"HS256" })
       
       return res.status(201).json({message:token})
    } else {
        res.status(401).send("email ou senha incorretos")
    }
   
}

export const userRegister = (req, res) => {
    const body = req.body

    if(!body || !body.email || !body.password ||!body.username ) {
        return res.status(401).send("dados imcompletos")
    }

    users.push({id: crypto.randomUUID(), username: body.username, email:body.email, password:body.password})
    console.log(users)
    res.status(201).json({newUser: users})

}

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith("Bearer ")) {

        return res.status(401).json({message:"token não fornecido ou inválido"})
    }

    const token = authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JSON_WEB_TOKEN)
        req.user = decoded
        console.log("decoded",decoded)
        next()
    } catch (error) {
        res.status(401).json({message:"token inválido"})
    }
    
}


export const profile = (req, res) => {
    
        console.log("req.user:",req.user)
        res.status(200).json({
            
            message: "acesso autenticado ao perfil"
     })

} 