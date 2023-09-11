import prisma from '../database/prisma.js'
import httpStatus from '../helpers/httpStatus.js'

const gameController = () => {
  const createGame = async (request, response, next) => {
    try {
      const {
        roomId,
        isActive,
        numberOfFakers

      } = request.body

      const game = await prisma.games.create({
        data: {
          roomId: Number(roomId),
          isActive: Boolean(isActive),
          numberOfFakers
        }
      })

      response.status(httpStatus.CREATED).json(game)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getGames = async (_request, response, next) => {
    try {
      const games = await prisma.games.findMany({
        include: {
          Room: true,
          players: true
        }
      })
      return response.http(httpStatus.OK).json(games)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getGameById = async (request, response, next) => {
    try {
      const { id } = request.params
      const game = await prisma.games.findFirst({
        where: {
          id: Number(id)
        },
        include: {
          Room: true,
          players: true
        }
      })
      return response.status(httpStatus.OK).json(game)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateGame = async (request, response, next) => {
    try {
      const { id } = request.params
      const { isActive } = request.body

      const updatedGame = await prisma.games.update({
        where: {
          id: Number(id)
        },
        data: {
          isActive: Boolean(isActive)
        }
      })
      return response.status(httpStatus.OK).json(updatedGame)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    createGame,
    getGames,
    getGameById,
    updateGame
  }
}

export default gameController
