import { Router } from "express"

import { getAllGames, getGameByIdController } from "../controllers/gameController.js"




const router = Router()

router.get("/:id", getGameByIdController)
router.get("/", getAllGames)

export default router