import { Router } from 'express'
import gameUserController from '../controllers/gameUserController.js'
import { gameUserValidation, paramsValidation } from '../middlewares/validations.js'

export const gameUserRoutes = () => {
  const gameUserRouter = Router()

  const {
    createGameUser,
    getGameUsers,
    getGameUserById
  } = gameUserController()

  gameUserRouter.route('/game-user')
    .post(gameUserValidation, createGameUser)
    .get(getGameUsers)

  gameUserRouter.route('/game-user/:id')
    .get(paramsValidation, getGameUserById)

  return gameUserRouter
}
