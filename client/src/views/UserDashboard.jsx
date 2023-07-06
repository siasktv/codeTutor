import NavDashboard from '../components/NavDashboard'
import UserDashboardCards from '../components/UserDashBoardCards'
import UserDashboardContent from '../components/UserDashboardContent'
import UserDashboardLayout from '../layouts/Dashboards/UserDashboardLayout'
import useUser from '../hooks/useUser'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { userFetchById } from '../redux/features/users/usersSlice'
import {
  MessageContainer,
  MessageMinimized,
  Loader,
  NavLogin,
  NavDashboardMobile
} from '../components'
import { SocketContext, socket } from '../socket/context'
import { FAQs, Settings, Calendar, Sessions } from '../layouts'
import Navlogo from '../components/Navlogo'

const UserDashboard = () => {
  const user = useUser()
  const navigate = useNavigate()
  const userMongo = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const socket = useContext(SocketContext)
  const [selectedSection, setSelectedSection] = useState('dashboard')
  const sectionFromUrl = location.search.split('section=')[1]
  const [showTutorDashboard, setShowTutorDashboard] = useState(
    user?.role === 'Tutor' && user?.tutor?.status === 'approved' ? true : false
  )

  useEffect(() => {
    if (sectionFromUrl) {
      if (
        sectionFromUrl !== 'dashboard' &&
        sectionFromUrl !== 'calendar' &&
        sectionFromUrl !== 'sessions' &&
        sectionFromUrl !== 'settings' &&
        sectionFromUrl !== 'faqs'
      ) {
        return
      } else {
        setSelectedSection(sectionFromUrl)
      }
    }
  }, [sectionFromUrl])

  useEffect(() => {
    if (selectedSection !== 'dashboard') {
      // add query param to url
      navigate(`/user?section=${selectedSection}`)
    } else {
      // remove query param from url
      navigate('/user')
    }
  }, [selectedSection])

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
    if (user)
      dispatch(userFetchById(user.uid)) &&
        setShowTutorDashboard(
          user?.role === 'Tutor' && user?.tutor?.status === 'approved'
            ? true
            : false
        )
  }, [user])

  return (
    <>
      {user && (
        <div className=''>
          <div className='flex'>
            <div className='fixed top-0 z-[100] max-lg:hidden dark:bg-gray-900'>
              <UserDashboardLayout
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
                showTutorDashboard={showTutorDashboard}
                user={user}
              />
            </div>
            <div className='flex flex-col justify-center w-full dark:bg-gray-900 h-full left-0 right-0'>
              <div className='sticky top-0 z-50 bg-white dark:bg-gray-900 max-lg:hidden'>
                <NavDashboard
                  user={user}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                  handleShowMessage={handleShowMessage}
                  selectedSection={selectedSection}
                />
              </div>
              <div className='sticky top-0 z-50 bg-white lg:hidden'>
                <NavDashboardMobile
                  user={user}
                  selectedSection={selectedSection}
                  setSelectedSection={setSelectedSection}
                  showTutorDashboard={showTutorDashboard}
                />
              </div>
              <div className='flex flex-col bg-[#FFFFFF] dark:bg-gray-900 min-h-screen lg:ml-60'>
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
                  <div className='flex justify-center items-center lg:px-10 px-2'>
                    <Calendar user={user} />
                  </div>
                )}
                {selectedSection === 'sessions' && (
                  <div className='flex justify-center items-center lg:px-8 px-2'>
                    <Sessions user={user} />
                  </div>
                )}
                {selectedSection === 'settings' && (
                  <div className='flex justify-center items-center lg:px-8 px-2'>
                    <Settings
                      user={user}
                      setShowTutorDashboard={setShowTutorDashboard}
                    />
                  </div>
                )}
                {selectedSection === 'faqs' && (
                  <div className='flex justify-center items-center'>
                    <FAQs user={user} />
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
        <div className='flex justify-center items-center h-screen dark:bg-gray-900'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default UserDashboard
