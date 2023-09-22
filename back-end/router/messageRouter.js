import { Router } from 'express'
import messageController from '../controllers/messageController.js'
import { messageValidation, paramsValidation } from '../middlewares/validations.js'

export const messageRoutes = () => {
  const {
    createMessage,
    getMessages,
    getMessageById
  } = messageController()

  const messageRouter = Router()

  messageRouter.route('/messages')
    .post(messageValidation, createMessage)
    .get(getMessages)

  messageRouter.route('/messages/:id')
    .get(paramsValidation, getMessageById)

  return messageRouter
}
