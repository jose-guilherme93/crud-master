import {Router} from 'express'
import { createUserController, delateUserController } from './controllers/userController.js'

const router = Router()

router.post('/', createUserController)
router.delete('/:id', delateUserController)


export default router