const socketServer = (io) => {
  const rooms = new Map()

  io.on('connection', (socket) => {
    const { userName } = socket.handshake.query

    io.emit('availableRooms', Array.from(rooms.keys()))
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName)

      console.log(`Usuario ${socket.id} se unió a la sala: ${roomName}`)

      if (!rooms.has(roomName)) {
        rooms.set(roomName, new Set())
      }
      rooms.get(roomName).add(socket.id)

      io.emit('availableRooms', Array.from(rooms.keys()))

      const usersCount = (roomName) => {
        const usersInRoom = rooms.has(roomName) ? rooms.get(roomName).size : 0
        return usersInRoom
      }

      socket.emit('usersCount', usersCount(roomName))

      usersCount(roomName)

      socket.on('message', (body) => {
        console.log(`Mensaje recibido: ${body} de ${socket.id} de ${userName}`)
        socket.broadcast.to(roomName).emit('message', {
          body,
          from: userName,
          id: socket.id.slice(6),
          role: null
        })
      })

      socket.on('disconnect', () => {
        console.log(`Usuario ${socket.id} se desconectó de la sala ${roomName}`)
        if (rooms.has(roomName)) {
          rooms.get(roomName).delete(socket.id)
          if (usersCount() === 0) {
            rooms.delete(roomName)
            io.emit('availableRooms', Array.from(rooms.keys()))
          }
        }
      })
    })
  })
}

export default socketServer
