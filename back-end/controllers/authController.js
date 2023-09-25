import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authController = () => {
  const login = async (request, response, next) => {
    try {
      const { userName, password } = request.body
      const user = await prisma.users.findUnique({
        where: {
          userName
        }
      })
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

      const token = jwt.sign({
        name: user.firstName,
        role: user.role
      }, process.env.SECRET_KEY, { expiresIn: '10h' })

      const refreshToken = jwt.sign({
        name: user.firstName,
        role: user.role
      }, process.env.SECRET_REFRESH_KEY, { expiresIn: '20h' })

      return response.status(httpStatus.OK).json({
        message: 'Login successful',
        userName,
        token,
        refreshToken
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const refresh = async (request, response, next) => {
    try {
      const { refreshToken } = request.body
      const decodedToken = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY)

      const token = jwt.sign({
        name: decodedToken.name,
        role: decodedToken.role
      }, process.env.SECRET_KEY, { expiresIn: '10h' })

      return response.status(httpStatus.OK).json({
        message: 'Token refreshed succesfully',
        token
      })
    } catch (error) {
      next(error)
    }
  }

  const register = async (request, response, next) => {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        birthday
      } = request.body

      const salt = await bcrypt.genSalt(10)

      const hashedPassword = await bcrypt.hash(password, salt)

      const user = await prisma.users.create({
        data: {
          firstName,
          lastName,
          userName,
          email,
          birthday: new Date(birthday),
          password: hashedPassword
        }
      })
      return response.status(httpStatus.CREATED).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  return {
    login,
    refresh,
    register
  }
}

export default authController
