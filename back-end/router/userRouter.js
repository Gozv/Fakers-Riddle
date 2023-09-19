import { Router } from 'express'
import userController from '../controllers/userController.js'
import { userBodyValidation, paramsValidation, deleteValidation } from '../middlewares/validations.js'
import { userAuth, adminAuth } from '../middlewares/auth.js'

export const userRoutes = () => {
  const userRouter = Router()
  const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  } = userController()

  userRouter.route('/users')
    .get(adminAuth, getUsers)

  userRouter.route('/users/:id')
    .get(paramsValidation, userAuth, getUserById)
    .put(paramsValidation, userBodyValidation, userAuth, updateUser)
    .delete(paramsValidation, deleteValidation, userAuth, deleteUser)

  return userRouter
}
