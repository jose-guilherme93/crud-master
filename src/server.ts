
import { configDotenv } from 'dotenv'
configDotenv()
import express from 'express'


import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = Number(process.env.SERVER_PORT) || 3000

app.use(express.json())

app.get("/", (req, res) => res.status(200).json({
  message: "Gamecatalog API",
  version: "v0.1"
}))
app.get("/health", (req, res) => res.status(200).json({message: "Server UP"}))

app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/games", gameRoutes)
app.use("/reviews",reviewsRoutes)

app.use((req, res) => {
  res.status(404).json({ message: `Rota não encontrada ${req.originalUrl}` })
})

app.listen(PORT, "0.0.0.0" , () => {
    console.info("server is running",)

})
