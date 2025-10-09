import { Router } from "express"

import { createGameController, getAllGames, getGameByIdController, updateGameController } from "../controllers/gameController.js"
import {validateIdParam} from '../../utils/middlewares.js'




const router = Router()

router.get("/:id", validateIdParam, getGameByIdController)
router.get("/", getAllGames)
router.post("/", createGameController)
router.put("/:id", validateIdParam, updateGameController)
export default router