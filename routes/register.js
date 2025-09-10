import {users} from "../mockData.js"


export const userRegister = (req, res) => {
    const body = req.body
    
    if(!body || !body.email || !body.password ||!body.username ) {
        return res.status(401).send("dados imcompletos")
    }

    users.push({id: crypto.randomUUID(), username: body.username, email:body.email, password:body.password})
    
    res.status(201).json({newUser: users})

}