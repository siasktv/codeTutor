import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Default } from '../../assets'
import { signOut } from '../../firebase/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faMessage,
  faTrash,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLocalUserChats,
  getNotificationsStatus
} from '../../redux/features/localUser/localUserSlice'
import {
  Loader,
  MessageContainer,
  MessageMinimized,
  ChatsNav,
  NotificationsNav,
  LogoutModal
} from '..'
import { SocketContext, socket } from '../../socket/context'
import { notificationSound } from '../../assets'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavDashboardMobile = ({
  user,
  selectedSection,
  setSelectedSection,
  showTutorDashboard
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const localUserChats = useSelector(state => state.localUser.chats)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const audioPlayer = useRef(null)
  const [navbarMobile, setNavbarMobile] = useState(false)

  function playNotification () {
    audioPlayer.current.play()
  }

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

  const [notifications, setNotifications] = useState([])

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
    setNavbarMobile(false)

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
    setNavbarMobile(false)
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

  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)
  const [showModalLogout, setShowModalLogout] = useState(false)

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
    const handleDocumentClick = event => {
      if (!event.target.closest('.menu-button') && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isMenuOpen])

  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleMobileMenuButtonClick = () => {
    setNavbarMobile(!navbarMobile)
  }

  return (
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
      <header className='dark:bg-gray-900'>
        <audio ref={audioPlayer} src={notificationSound} />
        <div className='lg:mx-auto py-4'>
          <div className='flex items-center justify-between gap-4 lg:gap-10'>
            <div className='flex lg:w-0 lg:flex-1 items-center'>
              <Link to='/'>
                <span className='inline-block lg:h-10 lg:w-52 pl-5'>
                  <div className='flex max-lg:items-center max-lg:mt-2'>
                    <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                    <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply dark:mix-blend-normal'></div>
                    <h1 className='font-bold lg:text-2xl ml-1 dark:text-gray-200'>
                      Code-Tutor.
                    </h1>
                  </div>
                </span>
              </Link>
            </div>
            <Link to='/search'>
              <div className='lg:flex hidden'>
                <p className='font-semibold text-lg ml-4 mb-1 text-codecolor hover:text-codecolordark cursor-pointer'>
                  Explorar tutores{' '}
                  <FontAwesomeIcon icon={faSearch} className='ml-1 text-sm' />
                </p>
              </div>
            </Link>
            <div className='lg:hidden'>
              <div className='flex flex-row gap-1'>
                {user && (
                  <ChatsNav
                    user={user}
                    handleShowChat={handleShowChat}
                    showChat={showChat}
                    setShowChat={setShowChat}
                    localUserChats={localUserChats}
                    handleSendShowMessage={handleSendShowMessage}
                  />
                )}
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
                <button
                  className='rounded-lg p-2 text-gray-600 dark:text-gray-200 mr-2 w-10'
                  type='button'
                  onClick={handleMobileMenuButtonClick}
                >
                  <span className='sr-only'>Open menu</span>
                  <FontAwesomeIcon icon={navbarMobile ? faTimes : faBars} />
                </button>
              </div>
              {navbarMobile && (
                <div className='absolute z-[999] mt-16 top-0 inset-x-0 w-full transition transform origin-top-right lg:hidden bg-white'>
                  <div className='bg-white dark:bg-gray-800 w-full'>
                    <div className='w-full flex flex-col'>
                      {user && (
                        <>
                          <button
                            className={
                              selectedSection === 'dashboard'
                                ? 'text-white p-2 bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full'
                                : 'text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 dark:text-gray-200 bg-white'
                            }
                            tabIndex='-1'
                            onClick={() => {
                              setSelectedSection('dashboard')
                              setNavbarMobile(false)
                            }}
                          >
                            Dashboard
                          </button>
                          <button
                            className={
                              selectedSection === 'calendar'
                                ? 'text-white p-2 bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full'
                                : 'text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 dark:text-gray-200 bg-white'
                            }
                            tabIndex='-1'
                            onClick={() => {
                              setSelectedSection('calendar')
                              setNavbarMobile(false)
                            }}
                          >
                            Calendario
                          </button>
                          <button
                            className={
                              selectedSection === 'sessions'
                                ? 'text-white p-2 bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full'
                                : 'text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 dark:text-gray-200 bg-white'
                            }
                            tabIndex='-1'
                            onClick={() => {
                              setSelectedSection('sessions')
                              setNavbarMobile(false)
                            }}
                          >
                            Sesiones
                          </button>
                          <button
                            className={
                              selectedSection === 'settings'
                                ? 'text-white p-2 bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full'
                                : 'text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 dark:text-gray-200 bg-white'
                            }
                            tabIndex='-1'
                            onClick={() => {
                              setSelectedSection('settings')
                              setNavbarMobile(false)
                            }}
                          >
                            Ajustes
                          </button>
                          {showTutorDashboard && (
                            <Link
                              className='
                                    text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 dark:text-gray-200 bg-white'
                              tabIndex='-1'
                              to='/tutordashboard'
                              onClick={() => {
                                setNavbarMobile(false)
                              }}
                            >
                              Panel de tutor
                            </Link>
                          )}
                          {user.admin && (
                            <Link
                              className='
                                    text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 dark:text-gray-200 bg-white'
                              tabIndex='-1'
                              to='/admin'
                              onClick={() => {
                                setNavbarMobile(false)
                              }}
                            >
                              Panel de admin
                            </Link>
                          )}
                          <Link
                            className='
                                    text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 dark:text-gray-200 bg-white'
                            tabIndex='-1'
                            to='/'
                            onClick={() => {
                              setNavbarMobile(false)
                            }}
                          >
                            Volver al inicio
                          </Link>
                          <button
                            className='text-red-500 dark:hover:bg-red-500 p-2 hover:bg-red-500 transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 bg-white'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-1'
                            onClick={() => setShowModalLogout(true)}
                          >
                            Cerrar sesión
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
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
      {showModalLogout && (
        <LogoutModal setShowModalLogout={setShowModalLogout} />
      )}
    </>
  )
}

export default NavDashboardMobile
