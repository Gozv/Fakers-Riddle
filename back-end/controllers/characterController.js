import httpStatus from '../helpers/httpStatus.js'
import prisma from '../database/prisma.js'

const characterController = () => {
  const getCharacters = async (_request, response, next) => {
    try {
      const characters = await prisma.characters.findMany({
        where: {
          deletedAt: null
        }
      })
      return response.status(httpStatus.OK).json(characters)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCharacterById = async (request, response, next) => {
    try {
      const { id } = request.params
      const character = await prisma.characters.findFirst({
        where: {
          id: Number(id),
          deletedAt: null
        }
      })

      return response.status(httpStatus.OK).json(character)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  return {
    getCharacters,
    getCharacterById
  }
}

export default characterController
