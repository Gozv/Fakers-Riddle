import { userBodySchema, paramsSchema, deleteShema } from '../validations/userSchema.js'
import { authBodySchema } from '../validations/authSchema.js'
import { roomBodySchema } from '../validations/roomSchema.js'
import { messageBodySchema } from '../validations/messageSchema.js'
import { gameUserBodySchema } from '../validations/gameUserSchema.js'
import { gameBodySchema } from '../validations/gameSchema.js'

export const paramsValidation = (request, _response, next) => {
  const params = request.params
  const { error } = paramsSchema.validate(params, { abortEarly: false })
  error ? next(error) : next()
}

export const userBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = userBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const authBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = authBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const deleteValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = deleteShema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const roomBodyValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = roomBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const messageValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = messageBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const gameUserValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = gameUserBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}

export const gameValidation = (request, _response, next) => {
  const bodyData = request.body
  const { error } = gameBodySchema.validate(bodyData, { abortEarly: false })
  error ? next(error) : next()
}
