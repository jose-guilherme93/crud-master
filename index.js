
import express from 'express'
import { helloWorld } from './routes.js'
import { Router } from 'express'

const app = express()
const PORT = 3000


app.use(express.json())

app.get("/", helloWorld)



app.listen(PORT, () => {
    console.log("server is running")
} )