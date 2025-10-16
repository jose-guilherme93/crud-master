import express from 'express'
import dotenv from 'dotenv'
import path from 'node:path'
import userRoutes from './routes/userRoutes.js'
import gameRoutes from './routes/gameRoutes.js'
import reviewsRoutes from './routes/reviewsRoutes.js'
import authRoutes from './routes/authRoutes.js'

dotenv.config({ path: path.resolve(process.cwd(), '.env'), quiet:true })


const app = express()
const PORT = 3000

app.use(express.json())

app.use("/users", userRoutes)
app.use("/games", gameRoutes)
app.use("/reviews",reviewsRoutes)
app.use("/auth", authRoutes)


app.use((req, res) => {
  res.status(404).json({ message: `Rota não encontrada ${req.originalUrl}` })
})

app.listen(PORT, () => {
    console.info("server is running",)

})
