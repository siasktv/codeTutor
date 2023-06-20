import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const ConexionStateTutor = props => {
  const [isOnline, setIsOnline] = useState(!props.offline)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const socket = io(BACKEND_URL)
    socket.on('online', data => {
      if (data.find(item => item.userId === props.tutor.user._id)) {
        setIsOnline(true)
      } else {
        setIsOnline(false)
      }
    })
  }, [])
  return (
    <>
      {!isOnline ? (
        <h2 className='font-semibold text-l text-red-500'>◉ Offline</h2>
      ) : (
        <h2 className='font-semibold text-l text-green-500'>◉ Online</h2>
      )}
    </>
  )
}
export default ConexionStateTutor
