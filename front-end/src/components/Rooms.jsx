import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

function Rooms() {
  const [roomName, setRoomName] = useState('')
  const [availableRooms, setAvailableRooms] = useState([])

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value)
  }

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && roomName.trim() !== '') {
      window.location = `create-room/${roomName}`
    }
  }

  const goToRoom = () => {
    if (roomName.trim() != "") {
      window.location = `create-room/${roomName}`
    }
  }
  
  useEffect(() => {
    socket.on('availableRooms', (rooms) => {
      setAvailableRooms(rooms)
    })

    return () => {
      socket.off('availableRooms')
    }
  }, [])

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col">
      <div id="navbar" className="bg-green-950 text-white py-4">
        <h1 className="text-2xl font-bold ml-4">Faker&apos;s Riddle</h1>
        <input type="text" placeholder='Write a name for the room' value={roomName} onChange={handleRoomNameChange} onKeyPress={handleEnterPress} className='border-2 border-zinc-500 p-2 text-black' />
        <button onClick={goToRoom}>Join room</button>
      </div>
      <div className="px-8 py-8 font-serif text-base/10 border rounded-5xl shadow-md content-between">
        <h3 className="text-3xl font-semibold text-center mb-4">Salas Disponibles</h3>
        <ul className="list-disc list-inside">
          {availableRooms.map((room) => (
            <li key={room}>
              <a href={`create-room/${room}`}>{room}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
export default Rooms