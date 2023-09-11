import { Router } from 'express'
import gameUserController from '../controllers/gameUserController.js'

export const gameUserRoutes = () => {
  const gameUserRouter = Router()

  const {
    createGameUser,
    getGameUsers,
    getGameUserById
  } = gameUserController()

  gameUserRouter.route('/game-user')
    .post(createGameUser)
    .get(getGameUsers)

  gameUserRouter.route('/game-user/:id')
    .get(getGameUserById)

  return gameUserRouter
}
