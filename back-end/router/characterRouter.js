import { Router } from 'express'
import characterController from '../controllers/characterController.js'
// import { paramsValidation } from '../middlewares/validations.js'

export const characterRoutes = () => {
  const characterRouter = Router()
  const {
    getCharacters,
    getCharacterById
  } = characterController()

  characterRouter.route('/characters')
    .get(getCharacters)

  characterRouter.route('/characters/:id')
    .get(getCharacterById)

  return characterRouter
}
