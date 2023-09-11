import Joi from 'joi'

export const authBodySchema = Joi.object({
  email: Joi.string().email().required(),

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
