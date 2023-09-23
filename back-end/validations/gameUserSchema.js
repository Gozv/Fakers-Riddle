import Joi from 'joi'

export const gameUserBodySchema = Joi.object({
  gameID: Joi.number()
    .integer()
    .required(),

  userID: Joi.number()
    .integer()
    .required(),

  characterID: Joi.number()
    .integer()
    .required()
})
