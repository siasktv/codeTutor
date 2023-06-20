import { useState, useEffect, useRef } from 'react'
import { onAuthStateChanged } from '../firebase/client'
import io from 'socket.io-client'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser () {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const socket = useRef()
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    onAuthStateChanged(setUser)
  }, [])

  useEffect(() => {
    socket.current = io(BACKEND_URL)
  }, [])

  useEffect(() => {
    if (user) {
      socket.current?.emit('addUser', user.id)
    }
  }, [socket.current, user])

  return user
}
