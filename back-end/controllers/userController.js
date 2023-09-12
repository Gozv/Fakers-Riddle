import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'
import bcrypt from 'bcrypt'
import addSoftDelete from '../extensions/softDelete.js'

const userController = () => {
  const getUsers = async (_request, response, next) => {
    try {
      const users = await prisma.users.findMany({
        where: {
          deletedAt: null
        },
        include: {
          games: true,
          rooms: true
        }
      })
      return response.status(httpStatus.OK).json(users)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getUserById = async (request, response, next) => {
    try {
      const { id } = request.params
      const user = await prisma.users.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        },
        include: {
          games: true,
          rooms: true
        }
      })

      return response.status(httpStatus.OK).json(user)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateUser = async (request, response, next) => {
    try {
      const { id } = request.params
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        birthday,
        socketID
      } = request.body

      const user = request.user

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const updatedUser = await prisma.users.update({

        where: {
          id: Number(id)
        },

        data: {
          ...user,
          firstName,
          lastName,
          userName,
          email,
          password: hashedPassword,
          birthday,
          socketID
        }
      })

      return response.status(httpStatus.OK).json(updatedUser)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteUser = async (request, response, next) => {
    try {
      const { id } = request.params
      await addSoftDelete.users.delete({
        where: {
          id: Number(id)
        }
      })
      return response.status(httpStatus.OK).json({
        success: true,
        message: 'User deleted'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getUsers,
    getUserById,
    updateUser,
    deleteUser
  }
}

export default userController
