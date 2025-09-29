
import express from 'express'
import { userLogin } from './routes/login.js'
import { userRegister } from './routes/register.js'
import { verifyToken } from './utils/middlewares.js'
import { profile } from './routes/profile.js'
import { logger } from './logger.js'
import userRoutes from './routes/userRoutes.js'


const app = express()
const PORT = 3000

app.use(express.json())
app.use("/users", userRoutes)

app.route("/login")
    .post(userLogin)

app.route("/register")
    .post(userRegister)

app.route("/profile", )
    .get(verifyToken, profile)


app.listen(PORT, () => {
    logger.info("server is running")

})
