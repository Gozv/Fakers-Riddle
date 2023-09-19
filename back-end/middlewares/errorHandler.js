import httpStatus from '../helpers/httpStatus.js'
import { Prisma } from '@prisma/client'

const ERROR_HANDLERS = {

  TokenExpiredError: (response, error) => {
    response
      .status(httpStatus.UNAUTHORIZED)
      .json({
        success: false,
        message: 'Refresh token expired, please log in again',
        error: error.message
      })
  },

  jwtmalformed: (response, error) => {
    response
      .status(httpStatus.UNAUTHORIZED)
      .json({
        success: false,
        message: 'Invalid token',
        error: error.message
      })
  },

  UnauthorizedError: (response, error) => {
    response
      .status(httpStatus.UNAUTHORIZED)
      .json({
        success: false,
        message: 'Invalid token',
        error: error.message
      })
  },

  ValidationError: (response, error) => {
    response
      .status(httpStatus.UNPROCESSABLE_ENTITY)
      .json({
        success: false,
        message: 'Validation error on request',
        error: error.message
      })
  },

  P2002: (response, error) => {
    response
      .status(httpStatus.BAD_REQUEST)
      .json({
        success: false,
        message: 'Unique constraint failed on one or more fields',
        error: error.message
      })
  },

  P2003: (response, error) => {
    response
      .status(httpStatus.BAD_REQUEST)
      .json({
        success: false,
        message: 'Foreign key constraint failed on requested field',
        error: error.message
      })
  },

  P2025: (response, error) => {
    response
      .status(httpStatus.NOT_FOUND)
      .json({
        success: false,
        message: 'The record does not exist',
        error: error.message
      })
  },

  defaultError: (response, error) => {
    response
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({
        success: false,
        isFromErrorHandler: true,
        message: error.message
      })
  }
}

const errorHandler = (error, _request, response, _next) => {
  let option = error.name

  if (error.isJoi) {
    option = 'ValidationError'
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    option = error.code
  }
  const handler = ERROR_HANDLERS[option] ?? ERROR_HANDLERS.defaultError
  handler(response, error)
}

export default errorHandler
