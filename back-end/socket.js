const socketServer = (io) => {
  const availableRooms = new Set()

  io.on('connection', (socket) => {
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName)
      console.log(`Usuario ${socket.id} se unió a la sala: ${roomName}`)

      availableRooms.add(roomName)

      io.emit('availableRooms', Array.from(availableRooms))

      socket.on('message', (body) => {
        console.log(`Mensaje recibido: ${body} de ${socket.id}`)
        socket.broadcast.to(roomName).emit('message', {
          body,
          from: socket.id.slice(6)
        })
      })
      socket.on('disconnect', () => {
        console.log(`Desconectado de la sala ${roomName}`)
      })

      const roomEmpty = !io.sockets.adapter.rooms.get(roomName)
      if (roomEmpty) {
        availableRooms.delete(roomName)

        io.emit('availableRooms', Array.from(availableRooms))
      }
    })
  })
}

export default socketServer
