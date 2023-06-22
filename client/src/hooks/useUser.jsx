import { useState, useEffect, useContext } from 'react'
import { onAuthStateChanged } from '../firebase/client'
import { SocketContext } from '../socket/context'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocalUser } from '../redux/features/localUser/localUserSlice'

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined
}

export default function useUser () {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN)
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  const localUser = useSelector(state => state.localUser.localUser)

  useEffect(() => {
    if (localUser?.id) {
      setUser(localUser)
    }
    onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        dispatch(fetchLocalUser(user))
      } else {
        setUser(USER_STATES.NOT_LOGGED)
        dispatch(fetchLocalUser({}))
      }
    })
  }, [])

  useEffect(() => {
    if (user) {
      socket?.emit('addUser', user.id)
    }
  }, [socket, user])

  return user
}
