import {Router} from 'express'
import { createUserController } from './controllers/userController.js'

const router = Router()

router.post('/', createUserController)

export default router