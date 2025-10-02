import {Router} from 'express'
import { 
    getUserByIdController,
    createUserController,
    deleteUserController,
    updateUserByIdController,
    getAllUsers,
     } from '../controllers/userController.js'


const router = Router()
router.get('/', getAllUsers)
router.get('/:id', getUserByIdController)
router.post('/', createUserController)
router.delete('/:id', deleteUserController)
router.put('/:id', updateUserByIdController)

export default router