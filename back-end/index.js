import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use('/api', (requet, response) => {
  return response.json({ message: 'HOLAA EN EL SERVIDOR' })
})

app.listen(PORT)
