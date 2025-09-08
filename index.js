
import express from 'express'
import { UserLogin } from './routes.js'
const app = express()
const PORT = 3000


app.use(express.json())

app.route("/login")
    .post(UserLogin)




app.listen(PORT, () => {
    console.log("server is running")
} )