const socketServer = (io) => {
  const rooms = new Map()
  const socketToEmail = new Map()
  io.on('connection', (socket) => {
    io.emit('availableRooms', Array.from(rooms.keys()))

    socket.on('setUserEmail', (email) => {
      socketToEmail.set(socket.id, email)
      console.log(email, 'inicio')
      // userEmail = email
    })

    socket.on('joinRoom', (roomName) => {
      socket.join(roomName)

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

      socket.on('message', (body) => {
        const userEmail = socketToEmail.get(socket.id)
        console.log(`Mensaje recibido: ${body} de ${userEmail}`)
        socket.broadcast.to(roomName).emit('message', {
          body,
          id: socket.id,
          from: userEmail
        })
      })

      socket.on('disconnect', () => {
        // console.log(`Usuario ${userEmail} se desconectó de la sala ${roomName}`)
        if (rooms.has(roomName)) {
          rooms.get(roomName).delete(socket.id)
          if (usersCount() === 0) {
            rooms.delete(roomName)
            io.emit('availableRooms', Array.from(rooms.keys()))
          }
        }
        socketToEmail.delete(socket.id)
      })
    })
  })
}

export default socketServer
