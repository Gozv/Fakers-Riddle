import prisma from '../database/prisma.js'
import httpStatus from '../helpers/httpStatus.js'

const gameUserController = () => {
  const createGameUser = async (request, response, next) => {
    try {
      const { gameID, userID } = request.body

      const gameUser = await prisma.gameUser.create({
        data: {
          gameID,
          userID
        }
      })

      return response.status(httpStatus.CREATED).json(gameUser)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getGameUsers = async (request, response, next) => {
    try {
      const gameUsers = await prisma.gameUser.findMany({
        include: {
          Game: true,
          User: true,
          Character: true,
          messages: true
        }
      })
      const gameUsersWithoutDelete = gameUsers.map(gameUser => {
        const { User: user } = gameUser
        return {
          ...gameUser,
          User: user.deletedAt === null ? user : null
        }
      })
      return response.status(httpStatus.OK).json(gameUsersWithoutDelete)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getGameUserById = async (request, response, next) => {
    try {
      const { id } = request.params
      const gameUser = await prisma.gameUser.findUnique({
        where: {
          id: Number(id)
        },
        include: {
          Game: true,
          User: true,
          Character: true,
          messages: true
        }
      })

      const gameUserWithoutDelete = () => {
        const { User: user } = gameUser
        return {
          gameUser,
          User: user.deletedAt === null ? user : null
        }
      }

      return response.status(httpStatus.OK).json(gameUserWithoutDelete)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateGameUser = async (request, response, next) => {
    try {
      const { id } = request.params
      const { characterID } = request.body

      const updatedGameUser = await prisma.gameUser.update({
        where: {
          id: Number(id)
        },
        data: {
          characterID: Number(characterID)
        }
      })
      return response.status(httpStatus.OK).json(updatedGameUser)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect
    }
  }

  return {
    createGameUser,
    getGameUsers,
    getGameUserById,
    updateGameUser
  }
}

export default gameUserController
