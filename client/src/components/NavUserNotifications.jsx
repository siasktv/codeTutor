import notification from '../assets/notification.svg'
import { useState, useContext } from 'react'
import { signOut } from '../firebase/client'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTrash,
  faXmark,
  faMessage,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import IconCodeTutor from '../assets/IconCodeTutor.svg'
import React from 'react'
import { Default } from '../assets'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchLocalUserChats,
  getNotificationsStatus
} from '../redux/features/localUser/localUserSlice'
import {
  Loader,
  MessageContainer,
  MessageMinimized,
  ChatsNav,
  NotificationsNav
} from '../components'
import { SocketContext, socket } from '../socket/context'
import { useEffect, useRef } from 'react'
import { notificationSound } from '../assets'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LogoutModal } from '../components'

const NavUserNotifications = ({ user, id, redirect }) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const localUserChats = useSelector(state => state.localUser.chats)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const [showModalLogout, setShowModalLogout] = useState(false)

  const [notifications, setNotifications] = useState([])

  const audioPlayer = useRef(null)

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

  const [navbarMobile, setNavbarMobile] = useState(false)

  const handleMobileMenuButtonClick = () => {
    setNavbarMobile(!navbarMobile)
  }

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

  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)

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
      <header className='flex items-center h-20 w-full dark:bg-gray-900'>
        <audio ref={audioPlayer} src={notificationSound} />
        <div className='flex justify-between w-full items-center'>
          <div className='pl-8 pt-2'>
            <Link to='/'>
              <span className='flex h-10 lg:w-52'>
                <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply dark:mix-blend-normal'></div>
                <h1 className='font-bold text-xl ml-1 dark:text-gray-200'>
                  Code-Tutor.
                </h1>
              </span>
            </Link>
          </div>

          <div>
            {/* Foto Usuario */}
            <div className='flex items-center max-lg:hidden'>
              <div className='flex flex-col items-center'>
                <div className='bg-black rounded-full border-none'>
                  <img
                    src={user?.image ? user.image : Default}
                    alt='avatar'
                    className='w-10 h-10  rounded-full border-none cursor-pointer object-cover'
                    onClick={handleShowProfile}
                    referrerPolicy='no-referrer'
                  ></img>
                </div>
                {showProfile && (
                  <div className='absolute top-16 mr-16 rounded-xl shadow-xl z-50 border border-[#1414140D] dark:border-none dark:bg-gray-800'>
                    <div className='flex flex-col gap-2 p-2 '>
                      <div className='flex flex-col gap-2'>
                        {user && (
                          <>
                            <Link to='/user'>
                              <button className='text-white dark:outline-none dark:hover:outline-none transition duration-150 dark:hover:bg-codecolordark bg-codecolor rounded-xl p-2 outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 w-32 hover:outline text-center'>
                                Ir a mi perfil
                              </button>
                            </Link>
                            <button
                              className='text-white dark:outline-none dark:hover:outline-none transition duration-150 dark:hover:bg-red-600 bg-red-500 rounded-xl p-2 mt-1 outline-red-100 outline-4 outline hover:outline-4 hover:outline-red-300 w-32 hover:outline text-center'
                              onClick={() => setShowModalLogout(true)}
                            >
                              Cerrar sesión
                            </button>
                          </>
                        )}
                        {!user && (
                          <>
                            <Link to={`/login?redirect=${redirect}`}>
                              <button className='text-white bg-codecolor rounded-xl p-2 outline-violet-100 outline-4 dark:outline-none dark:hover:outline-none dark:hover:bg-codecolordark transition duration-150 outline hover:outline-4 hover:outline-violet-300 w-32 hover:outline text-center'>
                                Iniciar sesión
                              </button>
                            </Link>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Chats */}
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
            </div>

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
                  className='rounded-lg p-2 text-gray-600 mr-2 w-10 dark:text-gray-200'
                  type='button'
                  onClick={handleMobileMenuButtonClick}
                >
                  <span className='sr-only'>Open menu</span>
                  <FontAwesomeIcon icon={navbarMobile ? faTimes : faBars} />
                </button>
              </div>
              {navbarMobile && (
                <div className='absolute z-[999] mt-16 top-0 inset-x-0 w-full transition transform origin-top-right lg:hidden bg-white dark:bg-gray-800 dark:text-gray-200'>
                  <div className='bg-white w-full'>
                    <div className='w-full flex flex-col'>
                      {!user && (
                        <>
                          <Link
                            to={`/login?redirect=${redirect}`}
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white dark:bg-gray-800 dark:text-gray-200 font-semibold bg-white w-full'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            Iniciar sesión
                          </Link>
                          <Link
                            to={`/register?redirect=${redirect}`}
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white dark:bg-gray-800 dark:text-gray-200 font-semibold bg-white w-full'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            Registrarme como estudiante
                          </Link>
                          <Link
                            to='/register?redirect=/tutor'
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white dark:bg-gray-800 dark:text-gray-200 font-semibold bg-white w-full'
                            tabIndex='-1'
                            id='menu-item-1'
                          >
                            Registrarme como tutor
                          </Link>
                        </>
                      )}
                    </div>
                    <div className='w-full flex flex-col'>
                      {user && (
                        <>
                          <Link
                            to='/user'
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white dark:bg-gray-800 dark:text-gray-200 font-semibold w-full bg-white'
                            tabIndex='-1'
                          >
                            Ir a mi perfil
                          </Link>
                          <button
                            className='text-red-500 p-2 hover:bg-red-500 transition ease-in-out duration-150 hover:text-white dark:bg-gray-800 font-semibold w-full bg-white'
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

export default NavUserNotifications
