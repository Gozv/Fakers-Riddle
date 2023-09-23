import Joi from 'joi'

export const roomBodySchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(15)
    .required(),

  userID: Joi.number()
    .integer()
    .required(),

  isPublic: Joi.boolean().required()
})
