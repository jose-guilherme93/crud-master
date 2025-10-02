import { Router } from "express"

import { getGameByIdController } from "../controllers/gameController.js"



const router = Router()

router.get("/", getGameByIdController)

export default router