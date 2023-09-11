import prisma from '../database/prisma.js'

const addSoftDelete = prisma.$extends({
  name: 'softDelete',
  query: {
    $allModels: {
      async delete ({ model, args }) {
        const data = {
          deletedAt: new Date()
        }

        return prisma[model].update({
          ...args,
          data
        })
      }
    }
  }
})

export default addSoftDelete
