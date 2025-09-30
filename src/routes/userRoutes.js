import {Router} from 'express'
import { 
    getUserByIdController,
    createUserController,
    deleteUserController,
    updateUserByIdController,
     } from './controllers/userController.js'


const router = Router()

router.get('/:id', getUserByIdController)
router.post('/', createUserController)
router.delete('/:id', deleteUserController)
router.put('/:id', updateUserByIdController)
export default router