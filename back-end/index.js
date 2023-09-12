import express from 'express'
import dotenv from 'dotenv'
import { expressjwt as jwt } from 'express-jwt'
import errorHandler from './middlewares/errorHandler.js'
import { authRoutes } from './router/authRouter.js'
import { userRoutes } from './router/userRouter.js'
import { characterRoutes } from './router/characterRouter.js'
import { gameRoutes } from './router/gameRouter.js'
import { gameUserRoutes } from './router/gameUserRouter.js'
import { roomRoutes } from './router/roomRouter.js'
import { messageRoutes } from './router/messageRouter.js'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(
  jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ['HS256']
  }).unless({ path: ['/api/:id'] })
)

app.use(express.json())

app.use('/api', authRoutes(), userRoutes(), characterRoutes(), roomRoutes(), gameRoutes(), gameUserRoutes(), messageRoutes())

app.use(errorHandler)

app.listen(PORT)
