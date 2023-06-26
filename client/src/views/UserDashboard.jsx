import NavDashboard from '../components/NavDashboard'
import UserDashboardCards from '../components/UserDashBoardCards'
import UserDashboardContent from '../components/UserDashboardContent'
import UserDashboardLayout from '../layouts/Dashboards/UserDashboardLayout'
import useUser from '../hooks/useUser'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { userFetchById } from '../redux/features/users/usersSlice'
import { MessageContainer, MessageMinimized, Loader } from '../components'
import { SocketContext, socket } from '../socket/context'

const UserDashboard = () => {
  const user = useUser()
  const navigate = useNavigate()
  const userMongo = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const socket = useContext(SocketContext)
  const [selectedSection, setSelectedSection] = useState('dashboard')

  const handleShowMessage = (e, tutor) => {
    e.preventDefault()
    if (selectedTutor === null) {
      setSelectedTutor(tutor?.user ? tutor : { _id: tutor._id, user: tutor })
      setShowMessage(true)
    } else {
      if (selectedTutor._id === tutor._id) {
        setShowMessage(true)
      } else {
        setSelectedTutor(tutor?.user ? tutor : { _id: tutor._id, user: tutor })
        setShowMessage(true)
      }
    }
  }

  const handleMinimizeMessage = e => {
    e.preventDefault()
    setShowMessage(false)
    socket.emit('closeChat', {
      userId: user.id,
      receiverId: selectedTutor.user._id
    })
  }

  const handleMaximizeMessage = e => {
    e.preventDefault()
    setShowMessage(true)
  }

  const handleCloseMessage = e => {
    e.preventDefault()
    setShowMessage(false)
    setSelectedTutor(null)
    socket.emit('closeChat', {
      userId: user.id,
      receiverId: selectedTutor.user._id
    })
  }

  useEffect(() => {
    if (user === null) {
      navigate('/login?redirect=/user')
    }
    if (user) dispatch(userFetchById(user.uid))
  }, [user])

  return (
    <>
      {user && (
        <div className=''>
          <div className='flex'>
            <div className='fixed top-0 z-[100]'>
              <UserDashboardLayout
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            </div>
            <div className='flex flex-col justify-center w-full h-full left-0 right-0'>
              <div className='sticky top-0 z-50 bg-white'>
                <NavDashboard
                  user={user}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                  handleShowMessage={handleShowMessage}
                />
              </div>
              <div className='flex flex-col bg-[#FAFBFC] ml-60'>
                {selectedSection === 'dashboard' && (
                  <>
                    <UserDashboardContent />
                    <UserDashboardCards
                      handleShowMessage={handleShowMessage}
                      userMongo={userMongo}
                    />
                  </>
                )}
                {selectedSection === 'calendar' && (
                  <div className='flex justify-center items-center mt-96'>
                    <h1 className='text-4xl font-bold'>Calendario</h1>
                  </div>
                )}
                {selectedSection === 'payment' && (
                  <div className='flex justify-center items-center mt-96'>
                    <h1 className='text-4xl font-bold'>Metodos de pago</h1>
                  </div>
                )}
                {selectedSection === 'history' && (
                  <div className='flex justify-center items-center mt-96'>
                    <h1 className='text-4xl font-bold'>Historial</h1>
                  </div>
                )}
                {selectedSection === 'settings' && (
                  <div className='flex justify-center items-center mt-96'>
                    <h1 className='text-4xl font-bold'>Ajustes</h1>
                  </div>
                )}
                {selectedSection === 'faqs' && (
                  <div className='flex justify-center items-center mt-96'>
                    <h1 className='text-4xl font-bold'>FAQ's</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
          {showMessage && selectedTutor !== null && (
            <MessageContainer
              tutor={selectedTutor}
              handleMinimizeMessage={handleMinimizeMessage}
              user={user}
            />
          )}
          {user && selectedTutor !== null && !showMessage && (
            <MessageMinimized
              tutor={selectedTutor}
              handleCloseMessage={handleCloseMessage}
              handleMinimizeMessage={handleMinimizeMessage}
              handleMaximizeMessage={handleMaximizeMessage}
              user={user}
            />
          )}
        </div>
      )}
      {!user && (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default UserDashboard
