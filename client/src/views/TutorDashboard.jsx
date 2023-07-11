import NavDashboard from '../components/NavDashboard'
import TutorDashboardLayout from '../layouts/Dashboards/TutorDashBoard/TutorDashboardLayout'
import useUser from '../hooks/useUser'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageContainer,
  MessageMinimized,
  Loader,
  TutorNavDashboardMobile
} from '../components'
import { SocketContext, socket } from '../socket/context'
import TutorMetric from '../components/TutorMetric'
import TabListTutor from '../components/TabListTutor'

import {
  SettingsTutor,
  CalendarTutor,
  SessionsTutor,
  Payments
} from '../layouts'

const TutorDashboard = () => {
  const user = useUser()

  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isTutor, setIsTutor] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const socket = useContext(SocketContext)
  const [selectedSection, setSelectedSection] = useState('dashboard')
  const sectionFromUrl = location.search.split('section=')[1]

  useEffect(() => {
    if (sectionFromUrl) {
      setSelectedSection(sectionFromUrl)
    }
  }, [sectionFromUrl])

  useEffect(() => {
    if (selectedSection !== 'dashboard') {
      if (
        selectedSection !== 'dashboard' &&
        selectedSection !== 'calendar' &&
        selectedSection !== 'sessions' &&
        selectedSection !== 'payments' &&
        selectedSection !== 'settings' &&
        selectedSection !== 'faqs'
      ) {
        return
      }
      // add query param to url
      navigate(`/tutordashboard?section=${selectedSection}`)
    } else {
      // remove query param from url
      navigate('/tutordashboard')
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
  }, [user])

  useEffect(() => {
    if (user && user.role !== 'Tutor') {
      navigate('/')
    } else {
      setIsTutor(true)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      if (isTutor && user?.tutor?.status === 'approved') {
        setLoading(false)
      } else {
        navigate('/')
      }
    }
  }, [user, isTutor])

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [selectedSection])

  return (
    <>
      {user && !loading && (
        <div className='dark:bg-gray-900'>
          <div className='flex'>
            <div className='fixed top-0 z-[100] max-lg:hidden'>
              <TutorDashboardLayout
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            </div>
            <div className='flex flex-col justify-center w-full h-full left-0 right-0'>
              <div className='sticky top-0 z-50 max-lg:hidden'>
                <NavDashboard
                  user={user}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                  handleShowMessage={handleShowMessage}
                />
              </div>
              <div className='sticky top-0 z-50 lg:hidden'>
                <TutorNavDashboardMobile
                  user={user}
                  selectedSection={selectedSection}
                  setSelectedSection={setSelectedSection}
                />
              </div>
              <div className='flex flex-col bg-[#FFFFFF] min-h-screen dark:bg-gray-900 lg:ml-60 max-lg:w-full'>
                {selectedSection === 'dashboard' && (
                  <>
                    <p className='text-sm text-gray-400 dark:text-gray-200 text-center -mb-8 mt-6 self-center max-lg:w-[300px]'>
                      Todos los datos que se muestran a continuación solamente
                      incluyen sesiones pagadas.
                    </p>
                    <TutorMetric tutor={user.tutor} user={user} />
                    <TabListTutor tutor={user.tutor} user={user} />
                  </>
                )}
                {selectedSection === 'calendar' && (
                  <div className='flex justify-center items-center lg:px-10 px-2'>
                    <CalendarTutor user={user} />
                  </div>
                )}
                {selectedSection === 'sessions' && (
                  <div className='flex justify-center items-center px-2 lg:px-10'>
                    <SessionsTutor user={user} />
                  </div>
                )}

                {selectedSection === 'payments' && (
                  <div className='flex justify-center items-center px-2 lg:px-10'>
                    <Payments user={user} />
                  </div>
                )}
                {selectedSection === 'history' && (
                  <div className='flex justify-center items-center mt-96'>
                    <h1 className='text-4xl font-bold'>Historial</h1>
                  </div>
                )}
                {selectedSection === 'settings' && (
                  <div className='flex justify-center items-center py-8 '>
                    <SettingsTutor user={user} />
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
      {!user && loading && (
        <div className='flex justify-center items-center h-screen dark:bg-gray-900'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default TutorDashboard
