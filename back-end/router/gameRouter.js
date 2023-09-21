import { Router } from 'express'
import gameController from '../controllers/gameController.js'
import { gameValidation, paramsValidation } from '../middlewares/validations.js'

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
    .post(gameValidation, createGame)

  gameRouter.route('/games/:id')
    .get(paramsValidation, getGameById)
    .put(paramsValidation, updateGame)

  return gameRouter
}
