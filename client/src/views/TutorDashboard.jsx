import NavDashboard from '../components/NavDashboard'
import UserDashboardLayout from '../layouts/Dashboards/UserDashboardLayout'
import useUser from '../hooks/useUser'
import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageContainer, MessageMinimized, Loader } from '../components'
import { SocketContext, socket } from '../socket/context'
import TutorMetric from '../components/TutorMetric'
import TutorDashboardGraphbyMonth from '../components/TutorDashboardGraphbyMonth'
import TutorDashboardGraphbyYear from '../components/TutorDashboardGraphbyYear'
import TabListTutor from '../components/TabListTutor'
import { SettingsTutor } from '../layouts'

const TutorDashboard = () => {
  const user = useUser()

  console.log(user)
  const navigate = useNavigate()
  const [showMessage, setShowMessage] = useState(false)
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

  const handleMinimizeMessage = (e) => {
    e.preventDefault()
    setShowMessage(false)
    socket.emit('closeChat', {
      userId: user.id,
      receiverId: selectedTutor.user._id,
    })
  }

  const handleMaximizeMessage = (e) => {
    e.preventDefault()
    setShowMessage(true)
  }

  const handleCloseMessage = (e) => {
    e.preventDefault()
    setShowMessage(false)
    setSelectedTutor(null)
    socket.emit('closeChat', {
      userId: user.id,
      receiverId: selectedTutor.user._id,
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
        <div className="">
          <div className="flex">
            <div className="fixed top-0 z-[100]">
              <UserDashboardLayout
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            </div>
            <div className="flex flex-col justify-center w-full h-full left-0 right-0">
              <div className="sticky top-0 z-50 bg-white">
                <NavDashboard
                  user={user}
                  showMessage={showMessage}
                  setShowMessage={setShowMessage}
                  handleShowMessage={handleShowMessage}
                />
              </div>
              <div className="flex flex-col bg-[#FAFBFC] ml-60">
                {selectedSection === 'dashboard' && (
                  <>
                    <TutorMetric />
                    <TabListTutor />
                  </>
                )}
                {selectedSection === 'calendar' && (
                  <div className="flex justify-center items-center mt-96">
                    <h1 className="text-4xl font-bold">Calendario</h1>
                  </div>
                )}
                {selectedSection === 'payment' && (
                  <div className="flex justify-center items-center mt-96">
                    <h1 className="text-4xl font-bold">Metodos de pago</h1>
                  </div>
                )}
                {selectedSection === 'history' && (
                  <div className="flex justify-center items-center mt-96">
                    <h1 className="text-4xl font-bold">Historial</h1>
                  </div>
                )}
                {selectedSection === 'settings' && (
                  <div className="flex justify-center items-center py-8 ">
                    <SettingsTutor user={user} />
                  </div>
                )}
                {selectedSection === 'faqs' && (
                  <div className="flex justify-center items-center mt-96">
                    <h1 className="text-4xl font-bold">FAQ's</h1>
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
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </>
  )
}

export default TutorDashboard
