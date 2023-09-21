import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('localhost:3000')

function Rooms () {
    const [roomName, setRoomName] = useState('')
    const [availableRooms, setAvailableRooms] = useState([])
    const [isPublic, setIsPublic] = useState(true)
    const [roomLimit, setRoomLimit] = useState(4)
    const [fullMessage, setFullMessage] = useState('')

    const handleRoomNameChange = (e) => {
      setRoomName(e.target.value)
    }
    
    const handleEnterPress = (e) => {
      if (e.key === 'Enter' && roomName.trim() !== '') {
          window.location = `room/${roomName}`
        }
    }

    const handlePublicRoomChange = () => {
        setIsPublic(() => !isPublic)
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
    
      return () => {
      socket.off('availableRooms')
      }
      }, [])

      const createRoom = () => {
        if (roomName.trim() !== '') {
        socket.emit('createRoom', roomName, roomLimit)
        window.location = `room/${roomName}`
    }

      socket.on('usersCount', (usersCount) => {
        if (usersCount > roomLimit) {
            setFullMessage('Sala llena')
        }
      })

    
    }

    return(
        <>
        <div>
            <input type="text" placeholder='Write a name for the room' value={roomName} onChange={handleRoomNameChange} onKeyPress={handleEnterPress} className='border-2 border-zinc-500 p-2 w-full text-black'/>
            <label>
              Do you want the room to be public?
               <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={handlePublicRoomChange}
               />
           </label>
           <br />
           <label>
            Limit of players.
            <input type="number" onChange={handleLimitOfPlayers}/>
           </label>
           <br />
            <button onClick={createRoom}>Join room</button>
            <p>{fullMessage}</p>
        </div>
            <br />
            <div>
                <p>Salas Disponibles:</p>
                <ul>
                {availableRooms.map((room) => (
                    <li key={room}>
                    <a href={`room/${room}`}>{room}</a>
                    </li>
                ))}
                </ul>
            </div>
        </>
    )
}
export default Rooms