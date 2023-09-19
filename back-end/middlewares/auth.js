import jwt from 'jsonwebtoken'
import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from 'bcrypt'

export const adminAuth = async (request, response, next) => {
  try {
    const headers = request.headers
    const { authorization } = headers
    const token = authorization.split(' ')[1]

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY)
    const { role } = decodedToken
    const ADMMIN_ROLE = 'ADMIN'

    if (role !== ADMMIN_ROLE) {
      return response.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'You are not authorized to access this resouce'
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}

export const userAuth = async (request, response, next) => {
  try {
    const { id } = request.params
    const { password, userID } = request.body

    let user

    if (userID) {
      user = await prisma.users.findFirst({
        where: {
          id: Number(userID)
        }
      })
    } else if (id) {
      user = await prisma.users.findFirst({
        where: {
          id: Number(id)
        }
      })
    }

    if (!user) {
      return response.status(httpStatus.NOT_FOUND).json({
        message: 'Invalid credentials'
      })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return response.status(httpStatus.NOT_FOUND).json({
        message: 'Invalid credentials'
      })
    }
    next()
  } catch (error) {
    next(error)
  }
}
