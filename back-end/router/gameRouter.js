import { Router } from 'express'
import gameController from '../controllers/gameController.js'

export const gameRoutes = () => {
  const gameRouter = Router()

  const {
    createGame,
    getGames,
    getGameById,
    updateGame
  } = gameController()

  gameRouter.route('/games')
    .get(getGames)
    .post(createGame)

  gameRouter.route('/games/:id')
    .get(getGameById)
    .put(updateGame)

  return gameRouter
}
