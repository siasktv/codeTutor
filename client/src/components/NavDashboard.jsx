import notification from '../assets/notification.svg'
import { useEffect, useState, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tutorsFetch } from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'
import { sortedByTech } from '../redux/features/tutors/tutorsSlice'
import {
  fetchLocalUserChats,
  getNotificationsStatus
} from '../redux/features/localUser/localUserSlice'
import { Loader, ChatsNav, NotificationsNav, LogoutModal } from '../components'
import { signOut } from '../firebase/client'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import 'moment/locale/es'
import { SocketContext, socket } from '../socket/context'
import { notificationSound } from '../assets'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NavDashboard = ({
  user,
  handleShowMessage,
  setShowMessage,
  showMessage,
  selectedSection
}) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showTech, setShowTech] = useState(false)
  const localUserChats = useSelector(state => state.localUser.chats)

  const tutors = useSelector(state => state.tutors.tutors)
  const teches = useSelector(state => state.teches.teches)
  const categories = useSelector(state => state.teches.categories)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!tutors[0]?.bio?.specialty) {
      dispatch(tutorsFetch())
    }
    dispatch(usersFetch())
    dispatch(techesFetch())
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches &&
        localStorage.getItem('theme') !== 'light')
      ? true
      : false
  )

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setDarkMode(true)
    } else if (localStorage.getItem('theme') === 'light') {
      setDarkMode(false)
    } else if (
      window.matchMedia('(prefers-color-scheme: dark)').matches === true
    ) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (showMessage) {
      setShowChat(false)
      setShowNotifications(false)
      setShowProfile(false)
      setShowTech(false)
    }
  }, [showMessage])

  const socket = useContext(SocketContext)

  const [notifications, setNotifications] = useState([])

  const audioPlayer = useRef(null)

  function playNotification () {
    audioPlayer.current.play()
  }

  const { soundEnabled, alertsEnabled } = useSelector(state => state.localUser)

  useEffect(() => {
    dispatch(getNotificationsStatus())
  }, [])

  useEffect(() => {
    if (user?.id) {
      socket?.emit('getNotifications', { userId: user.id })
      socket?.on('setNotifications', newnotifications => {
        dispatch(getNotificationsStatus())
        setNotifications(
          newnotifications.notifications.sort(
            (a, b) => b.createdAt - a.createdAt
          )
        )
      })
      socket?.emit('setAlerted', { userId: user.id })
    }
  }, [socket, user])

  useEffect(() => {
    if (
      notifications.filter(
        notification =>
          notification.isRead === false && notification.alerted === false
      ).length > 0
    ) {
      if (soundEnabled === true || soundEnabled === 'true') {
        playNotification()
      }
      if (alertsEnabled === true || alertsEnabled === 'true') {
        toast(notifications[0]?.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          theme: darkMode ? 'dark' : 'light',
          // icon is the notification.sender.image
          icon: (
            <img
              src={notifications[0].sender.image}
              alt='notification'
              className='rounded-full'
            />
          )
        })
        socket?.emit('setAlerted', {
          userId: user.id
        })
      }
    }
  }, [notifications])

  useEffect(() => {
    if (
      showNotifications === true &&
      notifications.filter(notification => notification.isRead === false)
        .length > 0
    ) {
      socket?.emit('readAllNotifications', { userId: user.id })
    }
  }, [notifications])

  const markAsRead = id => {
    socket?.emit('deleteNotification', { userId: user.id, notificationId: id })
    const newNotifications = notifications.filter(
      notification => notification._id !== id
    )
    setNotifications(newNotifications)
  }

  const handleShowNotifications = () => {
    socket?.emit('readAllNotifications', { userId: user.id })
    setShowNotifications(!showNotifications)
    setShowProfile(false)
    setShowChat(false)
    dispatch(fetchLocalUserChats(null))
  }

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
    setShowNotifications(false)
    setShowChat(false)
    dispatch(fetchLocalUserChats(null))
  }

  const handleShowChat = e => {
    if (!showChat) {
      dispatch(fetchLocalUserChats(user.id))
    } else {
      dispatch(fetchLocalUserChats(null))
    }
    setShowChat(!showChat)
    setShowNotifications(false)
    setShowProfile(false)
    if (showMessage) {
      setShowMessage(false)
    }
    dispatch(fetchLocalUserChats(null))
  }

  const handleShowTech = () => {
    setShowTech(!showTech)
    setShowNotifications(false)
    setShowProfile(false)
    setShowChat(false)
    dispatch(fetchLocalUserChats(null))
  }

  const handleSortByTech = tech => {
    dispatch(sortedByTech(tech))
  }

  const handleSendShowMessage = (e, user) => {
    setShowChat(false)
    handleShowMessage(e, user)
  }

  return (
    <>
      {user && (
        <>
          <ToastContainer
            position='top-right'
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            draggable
            pauseOnHover={false}
            pauseOnFocusLoss={false}
            closeOnClick
            rtl={false}
          />

          <audio ref={audioPlayer} src={notificationSound} />
          <header className='flex items-center h-20 w-full z-50 dark:bg-gray-900'>
            <div className='flex justify-between w-full items-center'>
              <div className='pl-[45%] pt-1'>
                {selectedSection === 'dashboard' && (
                  <div className='relative'>
                    <button
                      className='flex items-center rounded-full btn btn-sm btn-white text-codecolor dark:font-semibold'
                      onClick={handleShowTech}
                    >
                      Encuentra desarrolladores
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                        className='flex-none w-4 h-4 ml-1 -mr-1 transition duration-200 ease-out transform'
                      >
                        <polyline points='6 9 12 15 18 9'></polyline>
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              <div>
                {/* Foto Usuario */}
                <div className='flex items-center'>
                  <div className='flex flex-col items-center'>
                    <div className='rounded-full border-none'>
                      <img
                        src={user.image}
                        alt='avatar'
                        className='w-10 h-10  rounded-full border-none object-cover'
                        referrerPolicy='no-referrer'
                      ></img>
                    </div>
                  </div>

                  {/* Chats */}
                  <ChatsNav
                    user={user}
                    handleShowChat={handleShowChat}
                    showChat={showChat}
                    setShowChat={setShowChat}
                    localUserChats={localUserChats}
                    handleSendShowMessage={handleSendShowMessage}
                  />

                  {/* Notificaciones */}
                  <NotificationsNav
                    user={user}
                    handleShowNotifications={handleShowNotifications}
                    showNotifications={showNotifications}
                    setShowNotifications={setShowNotifications}
                    notifications={notifications}
                    handleSendShowMessage={handleSendShowMessage}
                    markAsRead={markAsRead}
                  />
                </div>
              </div>
            </div>
            {showTech && selectedSection === 'dashboard' && (
              <div className='absolute w-full z-50 top-20  '>
                <div className='flex justify-center'>
                  <div className='pb-4 bg-white dark:bg-gray-800 relative border border-[#1414140D] rounded-xl shadow-xl z-50'>
                    {categories.map(category => (
                      <button
                        key={category}
                        type='button'
                        role='menuitem'
                        className='py-4 text-codecolor font-bold cursor-default'
                      >
                        <div className='h-80 w-40 px-6 border-x border-[#1414140D]'>
                          {category}
                          {teches
                            .filter(tech => tech.category === category)
                            .map(tech => (
                              <div
                                key={tech._id}
                                className='text-codecolor font-normal hover:underline cursor-pointer dark:text-gray-200'
                                onClick={() => handleSortByTech(tech.name)}
                              >
                                <h1>{tech.name}</h1>
                              </div>
                            ))}
                        </div>
                      </button>
                    ))}
                    <div className='h-full w-full'>
                      <button
                        className='relative border p-2 px-4 bg-codecolor text-white rounded-md shadow-md hover:bg-codecolordark dark:border-none'
                        onClick={() => handleSortByTech('Todos')}
                      >
                        Restaurar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </header>
        </>
      )}
      {!user && (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      )}
    </>
  )
}

export default NavDashboard
