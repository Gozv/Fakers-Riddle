import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

function Rooms () {
    const [roomName, setRoomName] = useState('')
    const [availableRooms, setAvailableRooms] = useState([])
    const [isPublic, setIsPublic] = useState(true)

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

    const goToRoom = () => {
      if (roomName.trim() != "") {
        window.location = `room/${roomName}`
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
            <button onClick={goToRoom}>Join room</button>
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