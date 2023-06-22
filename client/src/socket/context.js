import io from 'socket.io-client'
import React from 'react'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const socket = io(BACKEND_URL)
export const SocketContext = React.createContext()
