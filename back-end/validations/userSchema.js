import Joi from 'joi'

export const userBodySchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(3)
    .max(30),

  lastName: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(3)
    .max(30),

  userName: Joi.string()
    .min(7)
    .max(8),

  email: Joi.string().email(),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .min(8)
    .max(20)
    .messages({
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)',
      'string.min': 'Password must have at least {#limit} characters',
      'string.max': 'Password must not be longer than {#limit} characters'
    }),

  birthday: Joi.date(),

  socketID: Joi.string()
    .required()
})

export const paramsSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9]+$/, 'numbers')
    .required()
})

export const deleteShema = Joi.object({
  userID: Joi.number()
    .integer()
    .required(),

  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
    )
    .min(8)
    .max(20)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (@$!%*?&)',
      'string.min': 'Password must have at least {#limit} characters',
      'string.max': 'Password must not be longer than {#limit} characters'
    })

})
