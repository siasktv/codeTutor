import NavDashboard from '../components/NavDashboard'
import UserDashboardLayout from '../layouts/Dashboards/UserDashboardLayout'
import useUser from '../hooks/useUser'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MessageContainer,
  MessageMinimized,
  Loader,
  AdminNavDashboardMobile
} from '../components'
import { SocketContext, socket } from '../socket/context'
import AdminDashboardGraphbyMonth from '../components/AdminDashboardGraphbyMonth'
import AdminDashboardGraphbyYear from '../components/AdminDashboardGraphbyYear'
import AdminMetric from '../components/AdminMetric'
import AdminMetricStatic from '../components/AdminMetricStatic'
import TabListAdmin from '../components/TabListAdmin'
import { AdminPayments, AdminSessions, Settings, Tutors } from '../layouts'
import AdminDashboardLayout from '../layouts/Dashboards/AdminDashboard/AdminDashboardLayout'

const AdminDashboard = () => {
  const user = useUser()
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const socket = useContext(SocketContext)
  const [selectedSection, setSelectedSection] = useState('dashboard')
  const sectionFromUrl = location.search.split('section=')[1]
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sectionFromUrl) {
      setSelectedSection(sectionFromUrl)
    }
  }, [sectionFromUrl])

  useEffect(() => {
    if (selectedSection !== 'dashboard') {
      // add query param to url
      if (
        selectedSection === 'sessions' ||
        selectedSection === 'tutors' ||
        selectedSection === 'payments'
      ) {
        navigate(`/admin?section=${selectedSection}`)
      } else {
        return
      }
    } else {
      // remove query param from url
      navigate('/admin')
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
    if (user && user.admin === false) {
      navigate('/user')
    } else if (user && user.admin === true) {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [selectedSection])

  return (
    <>
      {user && !isLoading && (
        <div className=''>
          <div className='flex'>
            <div className='fixed top-0 z-[100] max-lg:hidden'>
              <AdminDashboardLayout
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            </div>
            <div className='flex flex-col justify-center w-full h-full left-0 right-0 '>
              <div className='sticky top-0 z-50 max-lg:hidden'>
                <NavDashboard
                  user={user}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                  handleShowMessage={handleShowMessage}
                />
              </div>
              <div className='sticky top-0 z-50 lg:hidden'>
                <AdminNavDashboardMobile
                  user={user}
                  selectedSection={selectedSection}
                  setSelectedSection={setSelectedSection}
                />
              </div>
              <div className='flex flex-col bg-[#FFFFFF] min-h-screen dark:bg-gray-900 lg:ml-60 max-lg:w-full'>
                {selectedSection === 'dashboard' && (
                  <div className='max-lg:px-2'>
                    <AdminMetricStatic />
                    <AdminMetric />
                    <TabListAdmin />
                  </div>
                )}
                {selectedSection === 'tutors' && (
                  <div className='flex justify-center items-center lg:mt-8 lg:px-8 px-2'>
                    <Tutors user={user} />
                  </div>
                )}
                {selectedSection === 'sessions' && (
                  <div className='flex justify-center items-center lg:mt-8 px-2 lg:px-8'>
                    <AdminSessions user={user} />
                  </div>
                )}
                {selectedSection === 'payments' && (
                  <div className='flex justify-center items-center max-lg:px-2 lg:mt-8'>
                    <AdminPayments user={user} />
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
      {!user && isLoading && (
        <div className='flex justify-center items-center h-screen dark:bg-gray-900'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default AdminDashboard
