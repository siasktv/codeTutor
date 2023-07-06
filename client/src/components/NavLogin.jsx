import React, { useEffect, useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Default } from '../assets'
import { signOut } from '../firebase/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faXmark,
  faMessage,
  faTrash,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import notification from '../assets/notification.svg'
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
  NotificationsNav,
  LogoutModal
} from '../components'
import { SocketContext, socket } from '../socket/context'
import { notificationSound } from '../assets'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const NavLogin = ({ user }) => {
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

  const [notifications, setNotifications] = useState([])

  const { soundEnabled, alertsEnabled } = useSelector(state => state.localUser)

  useEffect(() => {
    dispatch(getNotificationsStatus())
  }, [])

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
      <header className=''>
        <audio ref={audioPlayer} src={notificationSound} />
        <div className='lg:mx-auto py-4'>
          <div className='flex items-center justify-between gap-4 lg:gap-10'>
            <div className='flex lg:w-0 lg:flex-1 items-center'>
              <Link to='/'>
                <span className='inline-block lg:h-10 lg:w-52 pl-5'>
                  <div className='flex max-lg:items-center max-lg:mt-2'>
                    <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                    <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply dark:mix-blend-normal'></div>
                    <h1 className='font-bold lg:text-2xl text-md ml-1 dark:text-gray-200'>
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
            <div className='hidden flex-1 items-center justify-end gap-4 lg:flex'>
              {!user && (
                <div className='pr-5'>
                  <Link to='/login?redirect=/'>
                    <button className='rounded-lg px-5 py-2 text-sm font-medium hover:rounded-lg hover:bg-codecolor dark:bg-codecolor dark:text-gray-200 dark:font-semibold dark:hover:outline-gray-800 hover:text-white hover:outline-4 hover:outline-violet-300 hover:outline'>
                      Iniciar sesión
                    </button>
                  </Link>
                  <div className='relative inline-block text-left'>
                    <button
                      type='button'
                      className='px-5 py-2 menu-button text-sm font-medium hover:bg-codecolor hover:text-white hover:rounded-lg dark:bg-codecolor dark:text-gray-200 dark:font-semibold dark:hover:outline-gray-800 rounded-lg ml-2 hover:outline-4 hover:outline-violet-300 hover:outline'
                      onClick={handleMenuButtonClick}
                      aria-expanded={isMenuOpen}
                      aria-haspopup='true'
                    >
                      Crea tu cuenta gratis
                    </button>
                    {isMenuOpen && (
                      <div
                        className='absolute z-50 mt-2 w-44 origin-top-right rounded-md bg-transparent'
                        role='menu'
                        aria-orientation='vertical'
                        aria-labelledby='menu-button'
                        tabIndex='-1'
                      >
                        <div className='' role='none'>
                          <Link
                            to='/register?redirect=/'
                            className='text-white dark:outline-gray-800 dark:hover:outline-gray-700 bg-codecolor rounded-lg flex items-center py-2 my-2 text-sm font-medium justify-center text-center outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 hover:outline'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            <span className=''>Soy estudiante</span>
                          </Link>
                          <Link
                            to='/register?redirect=/tutor'
                            className='text-white dark:outline-gray-800 dark:hover:outline-gray-700 bg-codecolor rounded-lg flex items-center py-2 my-3 text-sm font-medium justify-center text-center outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 hover:outline'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-1'
                          >
                            <span className='ml-2'>Soy tutor</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {user && (
                <>
                  <div className='flex flex-row gap-2'>
                    <div className='flex flex-col relative'>
                      <div className='bg-black rounded-full border-none'>
                        <img
                          src={user ? user.image : Default}
                          alt='avatar'
                          className='w-10 h-10  rounded-full border-none cursor-pointer object-cover'
                          onClick={handleShowProfile}
                          referrerPolicy='no-referrer'
                        ></img>
                      </div>
                      {showProfile && (
                        <div className='absolute top-10 -right-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-[#1414140D]'>
                          <div className='flex flex-col gap-2 p-2'>
                            <div className='flex flex-col gap-2'>
                              <Link to='/user'>
                                <button className='text-white dark:outline-none dark:hover:outline-none dark:hover:bg-codecolordark transition duration-150 bg-codecolor rounded-xl p-2 outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 w-32 hover:outline text-center'>
                                  {user ? 'Ir a mi perfil' : 'Iniciar sesión'}
                                </button>
                              </Link>
                              {user && (
                                <button
                                  className='text-white dark:outline-none dark:hover:ring-gray-700 dark:hover:outline-none dark:hover:bg-red-600 transition duration-150 bg-red-500 rounded-xl p-2 mt-1 outline-red-100 outline-4 outline hover:outline-4 hover:outline-red-300 w-32 hover:outline text-center'
                                  onClick={() => setShowModalLogout(true)}
                                >
                                  Cerrar sesión
                                </button>
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
                </>
              )}
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
                  className='rounded-lg p-2 text-gray-600 dark:text-gray-200 mr-2 w-10'
                  type='button'
                  onClick={handleMobileMenuButtonClick}
                >
                  <span className='sr-only'>Open menu</span>
                  <FontAwesomeIcon icon={navbarMobile ? faTimes : faBars} />
                </button>
              </div>
              {navbarMobile && (
                <div className='absolute z-[999] mt-16 top-0 inset-x-0 w-full transition transform origin-top-right lg:hidden bg-white dark:bg-gray-800'>
                  <div className='bg-white w-full dark:bg-gray-800'>
                    <div className='w-full flex flex-col'>
                      {!user && (
                        <>
                          <Link
                            to='/login?redirect=/'
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold dark:text-white dark:bg-gray-800 bg-white w-full'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            Iniciar sesión
                          </Link>
                          <Link
                            to='/register?redirect=/'
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold dark:text-white dark:bg-gray-800 bg-white w-full'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            Registrarme como estudiante
                          </Link>
                          <Link
                            to='/register?redirect=/tutor'
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold dark:text-white dark:bg-gray-800 bg-white w-full'
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
                            className='text-black p-2 hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:text-white dark:bg-gray-800 bg-white'
                            tabIndex='-1'
                          >
                            Ir a mi perfil
                          </Link>
                          <button
                            className='text-red-500 p-2 hover:bg-red-500 transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 bg-white'
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

export default NavLogin
