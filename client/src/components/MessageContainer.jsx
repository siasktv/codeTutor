import { faMinus, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState, useRef, useContext } from 'react'
import io from 'socket.io-client'
import axios from 'axios'
import React from 'react'
import { SocketContext, socket } from '../socket/context'
import moment from 'moment/moment'
import 'moment/locale/es'
moment.locale('es')

export default function MessageContainer (props) {
  const { tutor, handleMinimizeMessage, user } = props

  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isOnline, setIsOnline] = useState(!tutor.user.offline)
  const [isInChat, setIsInChat] = useState(false)
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const [conversationId, setConversationId] = useState(null)
  const socket = useContext(SocketContext)
  const scrollRef = useRef()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    socket.on('getMessage', data => {
      setArrivalMessage({
        sender: data.senderId,
        message: data.message,
        createdAt: Date.now()
      })
    })
    socket.on('online', data => {
      if (data.find(item => item.userId === tutor.user._id)) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    })

    socket.on('checkOnline', data => {
      if (data.online) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    })
    socket.on('isInChat', data => {
      if (data.isInChat === true) {
        setIsInChat(true)
      } else {
        setIsInChat(false)
      }
    })
    socket.on('checkIsInChat', data => {
      if (data.isInChat === true) {
        setIsInChat(true)
      } else {
        setIsInChat(false)
      }
    })

    socket.emit('checkOnline', tutor.user._id)
  }, [])

  useEffect(() => {
    if (isInChat) {
      //update all messages to read
      const newMessages = messages.map(message => {
        return {
          ...message,
          read: true
        }
      })
      setMessages(newMessages)
    }
  }, [isInChat])

  useEffect(() => {
    arrivalMessage && setMessages([...messages, arrivalMessage])
  }, [arrivalMessage])

  useEffect(() => {
    if (user && tutor) {
      const getConversationId = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/conversations/${user.id}/${tutor.user._id}`
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
      socket.emit('openChat', {
        conversationId,
        userId: user.id,
        receiverId: tutor.user._id
      })
      socket.emit('checkIsInChat', { conversationId, userId: tutor.user._id })
      const getMessages = async () => {
        try {
          const res = await axios.get(
            `${BACKEND_URL}/api/message/${conversationId}`
          )
          setMessages(res.data)
        } catch (err) {
          console.log(err)
        }
      }
      const setRead = async () => {
        try {
          const res = await axios.put(
            `${BACKEND_URL}/api/conversations/${conversationId}`,
            {
              userId: tutor.user._id
            }
          )
        } catch (err) {
          console.log(err)
        }
      }
      setRead()
      getMessages()
    }
  }, [conversationId])

  const handleSubmit = async event => {
    event.preventDefault()

    if (!message.trim()) return

    const receiverId = tutor.user._id

    socket.emit('sendMessage', {
      senderId: user.id,
      receiverId,
      message
    })

    isInChat === false &&
      socket.emit('sendNotification', {
        userId: user.id,
        receiverId,
        notification: {
          type: 'message',
          message: `${user.fullName} te ha contactado por privado`,
          sender: user,
          receiver: tutor.user,
          createdAt: Date.now(),
          isRead: false,
          link: null
        }
      })

    try {
      const isRead = isInChat ? true : false
      const res = await axios.post(`${BACKEND_URL}/api/message`, {
        conversationId,
        sender: user.id,
        message,
        read: isRead
      })
      setMessages([
        ...messages,
        {
          sender: user.id,
          message,
          createdAt: Date.now(),
          read: isRead
        }
      ])
      setMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    // container must be in the bottom right corner
    <div className='fixed bottom-0 right-28 z-50 h-125 w-96 bg-white rounded-t-lg'>
      <div className='flex flex-col justify-center items-center bg-codecolor p-2 m-0 rounded-t-md'>
        <div className='flex justify-end w-full'>
          <FontAwesomeIcon
            icon={faMinus}
            className='text-white cursor-pointer'
            onClick={event => handleMinimizeMessage(event)}
          />
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='text-white font-semibold text-xl'>
            Chat con {tutor.user.fullName}
          </h1>
          {!isOnline ? (
            <h2 className='font-semibold text-xl text-red-500 ml-2'>◉</h2>
          ) : (
            <h2 className='font-semibold text-xl text-green-500 ml-2'>◉</h2>
          )}
        </div>
        <p className='text-white text-sm'>
          {tutor.bio?.specialty || 'Cliente'}
        </p>
      </div>
      <div className='flex flex-col justify-start items-center bg-white p-2 m-0 rounded-b-md overflow-y-auto overflow-x-hidden h-[365px]'>
        {messages.map((item, index) => (
          <React.Fragment key={index}>
            {item.sender !== user.id ? (
              <div
                ref={scrollRef}
                className='flex flex-start justify-start items-center w-full  bg-gray-100 rounded-md p-2'
              >
                <div className='flex flex-col justify-center items-start bg-gray-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
                  <strong className='text-blue-500'>
                    {tutor.user.fullName}
                  </strong>
                  <div className='flex flex-col justify-center items-start text-left'>
                    <p className='text-sm text-gray-500 break-words max-w-[230px]'>
                      {item.message}
                    </p>
                    <p className='text-xs text-gray-500 self-start pr-2 mt-1 -mb-1'>
                      {moment(item.createdAt).format('l')} a las{' '}
                      {moment(item.createdAt).format('LT')} hs
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                ref={scrollRef}
                className='flex flex-end justify-end items-center w-full rounded-md p-2 '
              >
                <div className='flex flex-col justify-center items-start bg-blue-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
                  <strong className='text-blue-500'>{user.fullName}</strong>
                  <div className='flex flex-col justify-center items-start text-left'>
                    <p className='text-sm text-gray-500 break-words max-w-[230px]'>
                      {item.message}
                    </p>
                    <p className='text-xs text-gray-500 self-end pr-2 mt-1 -mr-2 -mb-1'>
                      {moment(item.createdAt).format('l')} a las{' '}
                      {moment(item.createdAt).format('LT')} hs
                    </p>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}

        {messages[messages.length - 1]?.sender === user.id && (
          <>
            {messages[messages.length - 1]?.read ? (
              <p className='text-xs text-gray-500 self-end pr-2 -mt-1 -mb-1'>
                Visto
              </p>
            ) : (
              <p className='text-xs text-gray-500 self-end pr-2 -mt-1 -mb-1'>
                Enviado
              </p>
            )}
          </>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex justify-center items-center bg-white p-2 m-0 rounded-b-md'>
          <input
            type='text'
            className='w-full h-10 rounded-md p-2 m-0 focus:outline-none outline-none resize-none -webkit-appearance-none'
            placeholder='Escribe un mensaje...'
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
          <button
            type='submit'
            className='bg-codecolor hover:bg-codecolordark text-white font-bold py-2 px-4 rounded'
          >
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  )
}
