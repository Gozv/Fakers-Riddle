const socketServer = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName)
      console.log(`Usuario ${socket.id} se unió a la sala: ${roomName}`)

      socket.on('message', (body) => {
        console.log(`Mensaje recibido: ${body} de ${socket.id}`)
        socket.broadcast.to(roomName).emit('message', {
          body,
          from: socket.id.slice(6)
        })
      })

      socket.on('connect', () => {
        console.log(`Conectado a la sala ${roomName}`)
      })

      socket.on('disconnect', () => {
        console.log(`Desconectado de la sala ${roomName}`)
      })
    })
  })
}

export default socketServer
