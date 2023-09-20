import { io } from 'socket.io-client'
import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

const socket = io('localhost:3000')

function Chat () {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const { roomName } = useParams();
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage])
    socket.emit('message', message)
    setMessage('');
  }
  
  const handleDisconnect = () => {
    socket.disconnect()
    window.location = '/room'
  }

  useEffect(() => {
    console.log(`Unido a la sala: ${roomName}`);
    socket.emit('joinRoom', roomName);
  }, [roomName]);
  
  useEffect(() => {
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    })

    return () => {
      socket.off('message')
    }
  }, [])
  
    return (
      <div className='h-screen bg-zinc-800 text-white flex items-center justify-center relative'>
      <form onSubmit={handleSubmit} className='bg-zinc-900 p-10 absolute max-h-500'>
          <ul>
            {
              messages.map((message, index) => (
                <li key={index} className={`my-2 p-2 table text-sm rounded-md ${message.from === 'Me' ? 'bg-sky-700 ml-auto' : 'bg-black'}`}>
                  <span className='text-xs block'>
                    {message.from}
                  </span>
                  {message.body}
                </li>
              ))
            }
          </ul>
            <input
              type='text'
              name='message'
              value={message}
              placeholder='Type a message here...'
              onChange={(e) => setMessage(e.target.value)}
              className='border-2 border-zinc-500 p-2 w-full text-black'
              required
            />
      </form>
      <button className='absolute bottom-0 right-0	bg-blue-300 w-25 h-10' onClick={handleDisconnect}>Disconnect</button>

    </div>
    )
}

export default Chat