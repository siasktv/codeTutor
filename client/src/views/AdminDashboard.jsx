import NavDashboard from '../components/NavDashboard'
import UserDashboardCards from '../components/UserDashBoardCards'
import UserDashboardContent from '../components/UserDashboardContent'
import UserDashboardLayout from '../layouts/Dashboards/UserDashboardLayout'
import useUser from '../hooks/useUser'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageContainer, MessageMinimized, Loader } from '../components'
import { SocketContext, socket } from '../socket/context'
import { Card, Text, Metric, Flex, ProgressBar } from "@tremor/react";
import TutorDashboardGraph from '../components/TutorDashboardGraph'
import TutorMetric from '../components/TutorMetric'

const AdminDashboard = () => {
  const user = useUser()
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const socket = useContext(SocketContext)

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
  }, [user])

  return (
    <>
      {user && (
        <div className=''>
          <div className='flex'>
            <div className='fixed top-0 z-[100]'>
              <UserDashboardLayout />
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
                <TutorMetric/>
                <TutorDashboardGraph/>
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

export default AdminDashboard
