import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path'
dotenv.config({ path: path.resolve(process.cwd(), '.env') });


import { logger } from '../logger.js'
import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js'
const app = express()
const PORT = 3000

app.use(express.json())

app.use("/users", userRoutes)
app.use("/games", gameRoutes)
app.use("/reviews", reviewsRoutes)
// app.route("/login")
//     .post(userLogin)

// app.route("/register")
//     .post(userRegister)

// app.route("/profile", )
//     .get(verifyToken)


app.listen(PORT, () => {
    logger.info("server is running")

})
