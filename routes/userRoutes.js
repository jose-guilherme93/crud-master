import {Router} from 'express'
import { 
    getUserByIdController,
    createUserController,
    deleteUserController,
     } from './controllers/userController.js'


const router = Router()

router.get('/:id', getUserByIdController)
router.post('/', createUserController)
router.delete('/:id', deleteUserController)

export default router