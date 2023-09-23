import Joi from 'joi'

export const messageBodySchema = Joi.object({
  content: Joi.string().required(),

  gameUserID: Joi.number()
    .integer()
    .required()
})
