import { useState } from 'react'
import { Link } from 'react-router-dom'

function Rooms () {
    const [roomName, setRoomName] = useState('')

    const handleRoomNameChange = (e) => {
      setRoomName(e.target.value)
    }

    const handleEnterPress = (e) => {
        if (e.key === 'Enter' && roomName.trim() !== '') {
            window.location = `room/${roomName}`
          }
    }

    return(
        <div className='rooms-container'>
            <input type="text" placeholder='Write a name for the room' value={roomName} onChange={handleRoomNameChange} onKeyPress={handleEnterPress} className='border-2 border-zinc-500 p-2 w-full text-black'/>
            <Link to={`room/${roomName}`}>Join room</Link>
        </div>
    )
}

export default Rooms