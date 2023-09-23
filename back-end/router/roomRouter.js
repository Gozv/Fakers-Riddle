import { Router } from 'express'
import { roomBodyValidation, paramsValidation } from '../middlewares/validations.js'
import roomController from '../controllers/roomController.js'

export const roomRoutes = () => {
  const {
    createRoom,
    getRooms,
    getRoomById,
    updateRoom,
    deleteRoom
  } = roomController()

  const roomRouter = Router()

  roomRouter.route('/rooms')
    .post(roomBodyValidation, createRoom)
    .get(getRooms)

  roomRouter.route('/rooms/:id')
    .get(paramsValidation, getRoomById)
    .put(paramsValidation, roomBodyValidation, updateRoom)
    .delete(paramsValidation, deleteRoom)

  return roomRouter
}
