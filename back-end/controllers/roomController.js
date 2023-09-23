import prisma from '../database/prisma.js'
import addSoftDelete from '../extensions/softDelete.js'
import httpStatus from '../helpers/httpStatus.js'

const roomController = () => {
  const createRoom = async (request, response, next) => {
    try {
      const {
        name,
        userID,
        isPublic
      } = request.body
      const room = await prisma.rooms.create({
        data: {
          name,
          userID: Number(userID),
          isPublic: Boolean(isPublic)
        }
      })
      return response.status(httpStatus.OK).json(room)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  const getRooms = async (_request, response, next) => {
    try {
      const rooms = await prisma.rooms.findMany({
        where: {
          deletedAt: null
        },
        include: {
          User: true,
          games: true
        }
      })
      const roomsWithoutDelete = rooms.map(room => {
        const { User: user } = room
        return {
          ...room,
          User: user.deletedAt === null ? user : null
        }
      })
      return response.status(httpStatus.OK).json(roomsWithoutDelete)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const getRoomById = async (request, response, next) => {
    try {
      const { id } = request.params

      const room = await prisma.rooms.findFirst({
        where: {
          id: Number(id)
        },
        include: {
          User: true,
          games: true
        }
      })
      const roomWithoutDelete = () => {
        const { User: user } = room
        return {
          room,
          User: user.deletedAt === null ? user : null
        }
      }
      return response.status(httpStatus.OK).json(roomWithoutDelete)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const updateRoom = async (request, response, next) => {
    try {
      const { id } = request.params
      const { name, userID, isPublic } = request.body

      const updatedRoom = await prisma.rooms.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          userID: Number(userID),
          isPublic: Boolean(isPublic)
        }
      })
      return response.status(httpStatus.OK).json(updatedRoom)
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }

  const deleteRoom = async (request, response, next) => {
    try {
      const { id } = request.params

      await addSoftDelete.rooms.delete({
        where: {
          id: Number(id)
        }
      })
      return response.status(httpStatus.OK).json({
        success: true,
        message: 'Room deleted'
      })
    } catch (error) {
      next(error)
    } finally {
      await prisma.$disconnect()
    }
  }
  return {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
  }
}

export default roomController
