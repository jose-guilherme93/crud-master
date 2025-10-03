import { Router } from "express"

import { createGameController, getAllGames, getGameByIdController } from "../controllers/gameController.js"





const router = Router()

router.get("/:id", getGameByIdController)
router.get("/", getAllGames)
router.post("/", createGameController)

export default router