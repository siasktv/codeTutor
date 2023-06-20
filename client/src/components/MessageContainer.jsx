import { faMinus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
import axios from 'axios'

export default function MessageContainer (props) {
  const { tutor, handleMinimizeMessage, user } = props

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const socket = useRef()
  const scrollRef = useRef()

  useEffect(() => {
    socket.current = io('http://localhost:3001')
    socket.current.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect(() => {
    arrivalMessage && setMessages([...messages, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    socket.current?.emit('addUser', user.id)
  }, [socket.current])

  useEffect(() => {
    if (user && tutor) {
      const getConversationId = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3001/api/conversations/${user.id}/${tutor.user._id}`
          )
          setConversationId(res.data._id)
        } catch (err) {
          console.log(err)
        }
      }
      getConversationId()
    }
  }, [user, tutor])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (conversationId) {
      const getMessages = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3001/api/message/${conversationId}`
          )
          setMessages(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      getMessages()
    }
  }, [conversationId])

  const handleSubmit = async event => {
    event.preventDefault()

    if (!message.trim()) return

    const receiverId = tutor.user._id

    socket.current.emit('sendMessage', {
      senderId: user.id,
      receiverId,
      message
    })

    try {
      const res = await axios.post('http://localhost:3001/api/message', {
        conversationId,
        sender: user.id,
        message
      })
      setMessages([
        ...messages,
        {
          sender: user.id,
          message,
          createdAt: Date.now()
        }
      ])
      setMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    // container must be in the bottom right corner
    <div className="fixed bottom-0 right-28 z-50 h-125 w-96 bg-white rounded-t-lg">
      <div className="flex flex-col justify-center items-center bg-codecolor p-2 m-0 rounded-t-md">
        <div className="flex justify-end w-full">
          <FontAwesomeIcon
            icon={faMinus}
            className="text-white cursor-pointer"
            onClick={(event) => handleMinimizeMessage(event)}
          />
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-white font-semibold text-xl">
            Chat con {tutor.user.fullName}
          </h1>
          {tutor.user.offline ? (
            <h2 className="font-semibold text-xl text-red-500 ml-2">◉</h2>
          ) : (
            <h2 className="font-semibold text-xl text-green-500 ml-2">◉</h2>
          )}
        </div>
        <p className="text-white text-sm">{tutor.bio.specialty}</p>
      </div>
      <div className="flex flex-col justify-start items-center bg-white p-2 m-0 rounded-b-md overflow-y-auto overflow-x-hidden h-[365px]">
        {messages.map((item, index) => (
          <>
            {item.sender !== user.id ? (
              <div
                ref={scrollRef}
                key={index}
                className="flex flex-start justify-start items-center w-full  bg-gray-100 rounded-md p-2"
              >
                <div className="flex flex-col justify-center items-start bg-gray-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]">
                  <strong className="text-blue-500">
                    {tutor.user.fullName}
                  </strong>
                  <div className="flex flex-col justify-center items-center text-left">
                    <p className="text-sm text-gray-500">{item.message}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                ref={scrollRef}
                key={index}
                className="flex flex-end justify-end items-center w-full rounded-md p-2 "
              >
                <div className="flex flex-col justify-center items-start bg-blue-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]">
                  <strong className="text-blue-500">{user.fullName}</strong>
                  <div className="flex flex-col justify-center items-center text-left">
                    <p className="text-sm text-gray-500">{item.message}</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center bg-white p-2 m-0 rounded-b-md">
          <input
            type="text"
            className="w-full h-10 rounded-md p-2 m-0 focus:outline-none outline-none resize-none -webkit-appearance-none"
            placeholder="Escribe un mensaje..."
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button
            type="submit"
            className="bg-codecolor hover:bg-codecolordark text-white font-bold py-2 px-4 rounded"
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
}
