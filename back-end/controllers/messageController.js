import prisma from '../database/prisma.js'
import httpStatus from '../helpers/httpStatus.js'

const messageController = () => {
  const createMessage = async (request, response, next) => {
    try {
      const {
        content,
        gameUserID
      } = request.body
      const message = await prisma.messages.create({
        data: {
          content,
          gameUserID: Number(gameUserID)
        }
      })
      return response.status(httpStatus.OK).json(message)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getMessages = async (request, response, next) => {
    try {
      const messages = await prisma.messages.findMany({
        include: {
          GameUser: true
        }
      })
      return response.status(httpStatus.OK).json(messages)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getMessageById = async (request, response, next) => {
    try {
      const { id } = request.params

      const message = await prisma.messages.findFirst({
        where: {
          id: Number(id)
        },
        include: {
          GameUser: true
        }
      })
      return response.status(httpStatus.OK).json(message)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createMessage,
    getMessages,
    getMessageById
  }
}

export default messageController
