import Joi from 'joi'

export const gameBodySchema = Joi.object({
  roomId: Joi.number()
    .integer()
    .required(),

  isActive: Joi.boolean().required(),

  numberOfFakers: Joi.number()
    .integer()
    .positive()
    .min(1)
    .max(2)
    .required()
})
