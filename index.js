
import express from 'express'
import { UserLogin, UserRegister } from './routes.js'
const app = express()
const PORT = 3000


app.use(express.json())

app.route("/login")
    .post(UserLogin)

app.route("/register")
    .post(UserRegister)


app.listen(PORT, () => {
    console.log("server is running")
} )