const socketServer = (io) => {
  const rooms = new Map()
  const users = new Map()

  io.on('connection', async (socket) => {
    const { userName, role } = socket.handshake.query
    socket.userName = userName
    socket.role = role

    io.emit('availableRooms', Array.from(rooms.keys()))
    socket.on('joinRoom', async (roomName) => {
      socket.join(roomName)

      console.log(`Usuario ${socket.userName} se unió a la sala: ${roomName}`)

      const sockets = await io.in(roomName).fetchSockets()
      const userNamesInRoom = sockets.map(socket => ({
        userName: socket.userName,
        role: socket.role
      }))
      io.emit('arrayUsers', Array.from(userNamesInRoom))
      io.emit('availableRooms', Array.from(rooms.keys()))

      socket.on('message', (body) => {
        console.log(`Mensaje recibido: ${body} de ${socket.id} de ${userName}`)
        socket.broadcast.to(roomName).emit('message', {
          body,
          from: userName,
          id: socket.id.slice(6),
          role
        })
      })

      socket.on('disconnect', () => {
        console.log(`Usuario ${socket.id} se desconectó de la sala ${roomName}`)
        if (rooms.has(roomName)) {
          rooms.get(roomName).delete(userName)
          io.emit('arrayUsers', Array.from(userNamesInRoom))
          if (users.has(roomName)) {
            users.set(
              roomName,
              users.get(roomName).filter((user) => user !== userName)
            )
            if (users.get(roomName).length === 0) {
              users.delete(roomName)
              rooms.delete(roomName)
              io.emit('availableRooms', Array.from(rooms.keys()))
            }
          }
        }
      })
    })
  })
}

export default socketServer
