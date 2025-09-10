
import express from 'express'
import { profile, userLogin, userRegister, verifyToken } from './routes.js'
const app = express()
const PORT = 3000


app.use(express.json())

app.route("/login")
    .post(userLogin)

app.route("/register")
    .post(userRegister)

app.route("/profile", )
.post(verifyToken, profile)

app.listen(PORT, () => {
    console.log("server is running")

})
