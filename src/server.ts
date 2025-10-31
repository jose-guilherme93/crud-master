
import { configDotenv } from 'dotenv'
configDotenv()
import express from 'express'


import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = process.env.SERVER_PORT || 3000

app.use(express.json())
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/games", gameRoutes)
app.use("/reviews",reviewsRoutes)

app.use((req, res) => {
  res.status(404).json({ message: `Rota não encontrada ${req.originalUrl}` })
})

app.listen(PORT, () => {
    console.info("server is running",)

})
