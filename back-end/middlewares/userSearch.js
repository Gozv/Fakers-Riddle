import prisma from '../database/prisma.js'

export const userSearch = async (request, _response, next) => {
  try {
    const { id } = request.params

    const user = await prisma.users.findFirst({
      where: {
        id: Number(id)
      }
    })
    request.user = user
    next()
  } catch (error) {
    next(error)
  } finally {
    await prisma.$disconnect()
  }
}
