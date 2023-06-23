import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Default } from '../assets'
import { signOut } from '../firebase/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faMessage, faTrash } from '@fortawesome/free-solid-svg-icons'
import notification from '../assets/notification.svg'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLocalUserChats } from '../redux/features/localUser/localUserSlice'
import {
  Loader,
  MessageContainer,
  MessageMinimized,
  ChatsNav
} from '../components'
import { SocketContext, socket } from '../socket/context'

const NavLogin = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const localUserChats = useSelector(state => state.localUser.chats)
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/Dise%C3%B1o%20sin%20t%C3%ADtulo%20(1).png?alt=media&token=7be14359-1a3d-4431-aec8-bb345f413edc.png',
      message:
        'Un administrador revisó tu perfil de tutor y lo aprobó. ¡Bienvenido!',
      isRead: false,
      link: '/search'
    },
    {
      id: 2,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/lautaro.jpg?alt=media&token=6dfa6d51-76cf-40d2-a911-431cbdfa3c77.png',
      message: 'Lauti calificó tu sesión.',
      isRead: false,
      link: '/tutor/648b39f63079d297b2892a88'
    },
    {
      id: 3,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/bianca.png?alt=media&token=8a6c15de-c0ec-404d-9e2f-11117ea070b9.png',
      message: 'Bianca te envió un mensaje por privado.',
      isRead: false,
      link: '/tutor/648b39ba3079d297b2892a51'
    },
    {
      id: 4,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/nahu.png?alt=media&token=9b9064a5-1949-4f0a-821e-95d2af21cb37.png',
      message: '¡Nahu te contrató! Revisa tu calendario.',
      isRead: false,
      link: '/tutor/648b39d63079d297b2892a71'
    },
    {
      id: 5,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/341487366_1842984366076817_4297675981046889835_n.jpg?alt=media&token=d871ff93-7a37-4857-a1ea-9117d50214dc.png',
      message: 'Dante te está esperando en la sala de espera.',
      isRead: false,
      link: '/tutor/648b39ae3079d297b2892a41'
    },
    {
      id: 6,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/juan.png?alt=media&token=191046a9-57eb-4570-9062-8093a99441b6.png',
      message:
        'Juan abrió una disputa por la sesión del 05/05/2023 y el pago fue retenido.',
      isRead: false,
      link: '/tutor/648b39cc3079d297b2892a61'
    },
    {
      id: 7,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/nahu.png?alt=media&token=9b9064a5-1949-4f0a-821e-95d2af21cb37.png',
      message: '¡Nahu te contrató! Revisa tu calendario.',
      isRead: false,
      link: '/tutor/648b39d63079d297b2892a71'
    },
    {
      id: 8,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/341487366_1842984366076817_4297675981046889835_n.jpg?alt=media&token=d871ff93-7a37-4857-a1ea-9117d50214dc.png',
      message: 'Dante te está esperando en la sala de espera.',
      isRead: false,
      link: '/tutor/648b39ae3079d297b2892a41'
    },
    {
      id: 9,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/juan.png?alt=media&token=191046a9-57eb-4570-9062-8093a99441b6.png',
      message:
        'Juan abrió una disputa por la sesión del 05/05/2023 y el pago fue retenido.',
      isRead: false,
      link: '/tutor/648b39cc3079d297b2892a61'
    },
    {
      id: 10,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/nahu.png?alt=media&token=9b9064a5-1949-4f0a-821e-95d2af21cb37.png',
      message: '¡Nahu te contrató! Revisa tu calendario.',
      isRead: false,
      link: '/tutor/648b39d63079d297b2892a71'
    },
    {
      id: 11,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/341487366_1842984366076817_4297675981046889835_n.jpg?alt=media&token=d871ff93-7a37-4857-a1ea-9117d50214dc.png',
      message: 'Dante te está esperando en la sala de espera.',
      isRead: false,
      link: '/tutor/648b39ae3079d297b2892a41'
    },
    {
      id: 12,
      avatar:
        'https://firebasestorage.googleapis.com/v0/b/codetutor-9cbe1.appspot.com/o/juan.png?alt=media&token=191046a9-57eb-4570-9062-8093a99441b6.png',
      message:
        'Juan abrió una disputa por la sesión del 05/05/2023 y el pago fue retenido.',
      isRead: false,
      link: '/tutor/648b39cc3079d297b2892a61'
    }
  ])

  const markAsRead = id => {
    const newNotifications = notifications.map(notification => {
      if (notification.id === id) {
        notification.isRead = true
      }
      return notification
    })
    setNotifications(newNotifications)
  }

  const handleShowNotifications = () => {
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

  return (
    <>
      <header className=''>
        <div className='mx-auto py-4'>
          <div className='flex items-center justify-between gap-4 lg:gap-10'>
            <div className='flex lg:w-0 lg:flex-1'>
              <Link to='/'>
                <span className='inline-block h-10 w-52 pl-5'>
                  <div className='flex'>
                    <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                    <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply'></div>
                    <h1 className='font-bold text-2xl ml-1'>Code-Tutor.</h1>
                  </div>
                </span>
              </Link>
            </div>

            <div className='hidden flex-1 items-center justify-end gap-4 sm:flex'>
              {!user && (
                <div className='pr-5'>
                  <Link
                    className='rounded-lg px-5 py-2 text-sm font-medium hover:rounded-lg hover:bg-codecolor hover:text-white hover:outline-4 hover:outline-violet-300 hover:outline'
                    to='/login?redirect=/'
                  >
                    Iniciar sesión
                  </Link>

                  <div className='relative inline-block text-left'>
                    <button
                      type='button'
                      className='px-5 py-2 menu-button text-sm font-medium hover:bg-codecolor hover:text-white hover:rounded-lg hover:outline-4 hover:outline-violet-300 hover:outline'
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
                            className='text-white bg-codecolor rounded-lg flex items-center py-2 my-2 text-sm font-medium justify-center text-center outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 hover:outline'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            <span className=''>Soy estudiante</span>
                          </Link>
                          <Link
                            to='/register?redirect=/tutor'
                            className='text-white bg-codecolor rounded-lg flex items-center py-2 my-3 text-sm font-medium justify-center text-center outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 hover:outline'
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
                        ></img>
                      </div>
                      {showProfile && (
                        <div className='absolute top-10 -right-5 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
                          <div className='flex flex-col gap-2 p-2'>
                            <div className='flex flex-col gap-2'>
                              <Link to='/user'>
                                <button className='text-white bg-codecolor rounded-xl p-2 outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 w-32 hover:outline text-center'>
                                  {user ? 'Ir a mi perfil' : 'Iniciar sesión'}
                                </button>
                              </Link>
                              {user && (
                                <button
                                  className='text-white bg-red-500 rounded-xl p-2 mt-1 outline-red-100 outline-4 outline hover:outline-4 hover:outline-red-300 w-32 hover:outline text-center'
                                  onClick={signOut}
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
                    <div className='pr-8 pl-3 flex items-center relative'>
                      {user && (
                        <div className='flex flex-col'>
                          <div
                            className='p-3 h-10 w-10  bg-violet-100 rounded-xl  cursor-pointer active:scale-90 transition duration-150 select-none'
                            onClick={handleShowNotifications}
                          >
                            <img src={notification} className=''></img>
                          </div>
                          {showNotifications && (
                            <div className='absolute top-10 right-3 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
                              <div className='flex flex-col gap-2 p-4 max-h-80'>
                                <div className='flex justify-between items-start flex-1'>
                                  <h1 className='font-bold text-xl text-codecolor'>
                                    Notificaciones
                                  </h1>
                                  <button
                                    onClick={() => setShowNotifications(false)}
                                  >
                                    <FontAwesomeIcon
                                      icon={faXmark}
                                      className='text-codecolor active:scale-90 transition duration-150 hover:text-codecolordark'
                                    />
                                  </button>
                                </div>
                                <div className='flex flex-col overflow-y-auto max-h-480px'>
                                  {notifications.filter(
                                    notification =>
                                      notification.isRead === false
                                  ).length === 0 && (
                                    <div className='flex flex-col gap-2 m-3'>
                                      <div className='flex justify-center align-middle items-center'>
                                        <h1 className='text-black font-semibold w-72 m-3'>
                                          No tienes notificaciones.
                                        </h1>
                                      </div>
                                    </div>
                                  )}
                                  {notifications.map(notification => (
                                    <React.Fragment key={notification.id}>
                                      {notification.isRead === false && (
                                        <Link
                                          to={notification.link}
                                          className='flex flex-col gap-2 p-3 hover:bg-codecolorlighter cursor-pointer hover:rounded-md'
                                        >
                                          <div className='flex justify-center align-middle items-center'>
                                            <img
                                              className='w-10 h-10 rounded-full border-none mr-2 object-cover'
                                              src={notification.avatar}
                                              alt='avatar'
                                            />
                                            <div className='flex flex-col w-60 text-left'>
                                              <h2 className='text-md'>
                                                {notification.message}{' '}
                                              </h2>
                                            </div>
                                            <div className='flex justify-end ml-3'>
                                              <FontAwesomeIcon
                                                icon={faTrash}
                                                className='text-codecolor font-bold active:scale-90 transition duration-150 cursor-pointer hover:text-codecolordark'
                                                onClick={e => {
                                                  e.preventDefault()
                                                  markAsRead(notification.id)
                                                }}
                                              >
                                                Marcar como leído
                                              </FontAwesomeIcon>
                                            </div>
                                          </div>
                                        </Link>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className='lg:hidden'>
              <button
                className='rounded-lg bg-gray-100 p-2 text-gray-600'
                type='button'
              >
                <span className='sr-only'>Open menu</span>
                <svg
                  aria-hidden='true'
                  className='h-5 w-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M4 6h16M4 12h16M4 18h16'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                  />
                </svg>
              </button>
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
    </>
  )
}

export default NavLogin
