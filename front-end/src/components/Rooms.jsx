import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('localhost:3000')

function Rooms() {
  const [roomName, setRoomName] = useState('')
  const [availableRooms, setAvailableRooms] = useState([])
  const [isPublic, setIsPublic] = useState(true)
  const [roomLimit, setRoomLimit] = useState(4)
  const [fullMessage, setFullMessage] = useState('')

  const handleRoomNameChange = (e) => {
    setRoomName(e.target.value)
  }

  const redirectToRoom = (roomName) => {
    window.location = `room/${roomName}`;
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter' && roomName.trim() !== '') {
      redirectToRoom(roomName)
    }
  }

  const handlePublicRoomChange = () => {
    setIsPublic(!isPublic)
  }

  const handleLimitOfPlayers = (e) => {
    const newLimit = parseInt(e.target.value, 10)

    if (!isNaN(newLimit)) {
      setRoomLimit(newLimit)
    }
  }

  useEffect(() => {
    socket.on('availableRooms', (rooms) => {
      setAvailableRooms(rooms)
    })

    socket.on('usersCount', ({ room, count }) => {
      if (room === roomName && count > roomLimit) {
        setFullMessage('Sala llena')
      } else {
        setFullMessage('')
      }
    })

    return () => {
      socket.off('availableRooms')
      socket.off('usersCount')
    }
  }, [roomName, roomLimit])

  const joinRoom = () => {
    if (roomName.trim() !== '') {
      socket.emit('joinRoom', { roomName, roomLimit })
      redirectToRoom(roomName)
    }
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-4xl font-bold text-blue-500 mb-4">Chat Rooms</h2>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Enter a room name"
            value={roomName}
            onChange={handleRoomNameChange}
            onKeyPress={handleEnterPress}
            className="border-2 border-gray-300 p-2 w-full rounded-md focus:ring focus:ring-blue-200"
          />
          <label className="mt-2 block">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={handlePublicRoomChange}
              className="mr-2"
            />
            Public Room
          </label>
          <label className="mt-2 block">
            Limit of Players:
            <input
              type="number"
              value={roomLimit}
              onChange={handleLimitOfPlayers}
              className="border-2 border-gray-300 p-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </label>
          <button
            onClick={joinRoom}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Join Room
          </button>
          <p className="text-red-500 mt-2">{fullMessage}</p>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-center text-gray-700">
          Available Rooms:
        </h3>
        <ul className="mt-4 space-y-2">
          {availableRooms.map((room) => (
            <li
              key={room}
              onClick={() => redirectToRoom(room)}
              className="bg-blue-200 text-lg no-underline p-4 rounded-lg flex justify-between items-center transition-transform hover:scale-105 hover:bg-blue-300 cursor-pointer"
            >
              <a
                href={`room/${room}`}
                className="text-blue-500 hover:no-underline cursor-pointer"
              >
                {room}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </>
  )
}

export default Rooms
