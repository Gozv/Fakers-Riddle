import { Router } from 'express'
import messageController from '../controllers/messageController.js'

export const messageRoutes = () => {
  const {
    createMessage,
    getMessages,
    getMessageById
  } = messageController()

  const messageRouter = Router()

  messageRouter.route('/messages')
    .post(createMessage)
    .get(getMessages)

  messageRouter.route('/messages/:id')
    .get(getMessageById)

  return messageRouter
}
