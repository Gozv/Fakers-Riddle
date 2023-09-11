import { Router } from 'express'
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
    .post(createRoom)
    .get(getRooms)

  roomRouter.route('/rooms/:id')
    .get(getRoomById)
    .put(updateRoom)
    .delete(deleteRoom)

  return roomRouter
}
