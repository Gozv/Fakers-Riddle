import { io } from "socket.io-client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";

const userName = sessionStorage.getItem("userName");

const socket = io("http://localhost:3000", {
  query: { userName: userName }
});

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomName } = useParams();
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      body: message,
      from: "Me",
    };
    setMessages([...messages, newMessage]);
    socket.emit("message", message);
    setMessage("");
    scrollToBottom()
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleDisconnect = () => {
    socket.disconnect();
    window.location = "/room";
  };

  useEffect(() => {
    console.log(`Unido a la sala: ${roomName}`);
    socket.emit("joinRoom", roomName);
  }, [roomName]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);
  
  return (
    <div className="h-screen bg-blue-100 flex flex-col">
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Chat {roomName}</h1>
        <button
          className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={handleDisconnect}
        >
          Disconnect
        </button>
      </div>
      <div className="flex-1 p-4 overflow-y-auto mx-4">
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`my-10 p-5 table text-lg py-2 px-2 rounded-md ${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-slate-700"
              }`}
            >
              <span className="text-xs block font-bold">{message.from}</span>
              {message.body}
            </li>
          ))}
        </ul>
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="bg-white p-4">
        <div className="flex">
          <input
            type="text"
            name="message"
            value={message}
            placeholder="Type a message here..."
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded-md w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat;
