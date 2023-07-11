import { useEffect, useState, useContext, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  tutorsFetch,
  sortedByRate,
  sortedByLanguages
} from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'
import { tutorFetchById } from '../redux/features/tutors/tutorsSlice'
import { sortedByTech } from '../redux/features/tutors/tutorsSlice'
import {
  fetchLocalUserChats,
  getNotificationsStatus
} from '../redux/features/localUser/localUserSlice'
import { Star, MensajeTexto, Default } from '../assets'
import { CardTutor, SearchBarTutor, FilterTutor } from '../layouts'
import {
  ButtonDropdownLocation,
  ChatsNav,
  LogoutModal,
  NotificationsNav
} from '../components'
import Dropdown from '../components/Buttons/Dropdown'
import { Loader, MessageContainer, MessageMinimized } from '../components'
import ReactDOM from 'react-dom'
import {
  faArrowLeft,
  faArrowRight,
  faBars,
  faMessage,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { signOut } from '../firebase/client'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import IconCodeTutor from '../assets/IconCodeTutor.svg'

import React from 'react'
import { SocketContext, socket } from '../socket/context'
import { notificationSound } from '../assets'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const NavUserSearch = ({
  user,
  handleShowMessage,
  setShowMessage,
  showMessage
}) => {
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showTech, setShowTech] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const localUserChats = useSelector(state => state.localUser.chats)
  const [notifications, setNotifications] = useState([])
  const [showModalLogout, setShowModalLogout] = useState(false)

  const tutors = useSelector(state => state.tutors.tutors)
  const users = useSelector(state => state.users.users)
  const teches = useSelector(state => state.teches.teches)
  const categories = useSelector(state => state.teches.categories)
  const selectedTech = useSelector(state => state.tutors.selectedTech)
  const [isLoading, setIsLoading] = useState(true)
  const socket = useContext(SocketContext)

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

  const [navbarMobile, setNavbarMobile] = useState(false)
  const handleMobileMenuButtonClick = () => {
    setNavbarMobile(!navbarMobile)
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
              referrerPolicy='no-referrer'
            />
          )
        })
        socket?.emit('setAlerted', {
          userId: user.id
        })
      }
    }
  }, [notifications])

  const tutorsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastTutor = tutorsPerPage * currentPage
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor)
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(tutors.length / tutorsPerPage); i++) {
    pageNumbers.push(i)
  }
  const handlePreviusPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePage = number => {
    setCurrentPage(number)
  }

  useEffect(() => {
    if (showMessage) {
      setShowChat(false)
      setShowNotifications(false)
      setShowProfile(false)
      setShowTech(false)
    }
  }, [showMessage])

  const pagesCutCount = 21

  const getPagesCut = (pageNumbers, pagesCutCount, currentPage) => {
    const ceiling = Math.ceil(pagesCutCount / 2)
    const floor = Math.floor(pagesCutCount / 2)
    if (pageNumbers.length < pagesCutCount) {
      return { start: 1, end: pageNumbers.length + 1 }
    } else if (currentPage >= 1 && currentPage <= ceiling) {
      return { start: 1, end: pagesCutCount + 1 }
    } else if (currentPage + floor >= pageNumbers.length) {
      return {
        start: pageNumbers.length - pagesCutCount + 1,
        end: pageNumbers.length + 1
      }
    } else {
      return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 }
    }
  }
  const pagesCutted = getPagesCut(pageNumbers, pagesCutCount, currentPage)
  const pages = pageNumbers.slice(pagesCutted.start - 1, pagesCutted.end - 1)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!tutors[0]?.bio?.specialty) {
      dispatch(tutorsFetch())
    }
    dispatch(usersFetch())
    dispatch(techesFetch())
  }, [dispatch])

  useEffect(() => {
    if (tutors[0]?.bio?.specialty) {
      setIsLoading(false)
      if (currentPage > pageNumbers.length) {
        setCurrentPage(pageNumbers.length)
      }
    }
  }, [tutors])

  // const handleLocationChange = () => {
  //   dispatch(sortedByLocation('Argentina'))
  // }

  // useEffect(() => {
  //   const button = document.getElementById('dropdown-menu-button')
  //   const menu = document.querySelector('.origin-top-right')

  //   const handleClick = () => {
  //     menu.classList.toggle('hidden')
  //   }

  //   button.addEventListener('click', handleClick)

  //   return () => {
  //     button.removeEventListener('click', handleClick)
  //   }
  // }, [])

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

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <>
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
        <header
          className={
            `flex items-center h-20 w-full z-50` +
            (scrolled
              ? ' bg-white/40 backdrop-blur-sm dark:bg-gray-900 dark:bg-opacity-90'
              : '')
          }
        >
          <div className='flex justify-between w-full items-center'>
            <div className='pl-8 pt-2'>
              <Link to='/'>
                <span className='flex h-10 '>
                  <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                  <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply dark:mix-blend-normal'></div>
                  <h1 className='font-bold text-xl ml-1 dark:text-gray-200'>
                    Code-Tutor
                  </h1>
                </span>
              </Link>
            </div>

            <div className='relative pr-8'>
              <button
                className='flex items-center rounded-full btn btn-sm font-semibold btn-white max-lg:hidden text-codecolor'
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

            <div>
              {/* Foto Usuario */}
              <div className='flex items-center max-lg:hidden'>
                <div className='flex flex-col items-center '>
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
                    <div className='absolute top-16 mr-20 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-50 border border-[#1414140D]'>
                      <div className='flex flex-col gap-2 p-2'>
                        <div className='flex flex-col gap-2'>
                          <Link to={user ? `/user` : '/login?redirect=/search'}>
                            <button className='text-white dark:border-none dark:outline-none dark:hover:outline-none dark:hover:bg-codecolordark transition duration-150 bg-codecolor rounded-xl p-2 outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 w-32 hover:outline text-center'>
                              {user ? 'Ir a mi perfil' : 'Iniciar sesión'}
                            </button>
                          </Link>
                          {user && (
                            <button
                              className='text-white dark:border-none dark:outline-none dark:hover:outline-none bg-red-500 dark:hover:bg-red-600 transition duration-150 rounded-xl p-2 mt-1 outline-red-100 outline-4 outline hover:outline-4 hover:outline-red-300 w-32 hover:outline text-center'
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
                  <div className='bg-white w-full'>
                    <div className='w-full flex flex-col'>
                      {!user && (
                        <>
                          <Link
                            to='/login?redirect=/search'
                            className='text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold dark:text-gray-200 bg-white dark:bg-gray-800 w-full'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            Iniciar sesión
                          </Link>
                          <Link
                            to='/register?redirect=/search'
                            className='text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold dark:text-gray-200 bg-white dark:bg-gray-800 w-full'
                            role='menuitem'
                            tabIndex='-1'
                            id='menu-item-0'
                          >
                            Registrarme como estudiante
                          </Link>
                          <Link
                            to='/register?redirect=/tutor'
                            className='text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold dark:text-gray-200 bg-white dark:bg-gray-800 w-full'
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
                            className='text-black p-2 dark:hover:bg-codecolor hover:bg-codecolor transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:text-gray-200 dark:bg-gray-800 bg-white'
                            tabIndex='-1'
                          >
                            Ir a mi perfil
                          </Link>
                          <button
                            className='text-red-500 p-2 dark:hover:bg-red-500 hover:bg-red-500 transition ease-in-out duration-150 hover:text-white font-semibold w-full dark:bg-gray-800 bg-white'
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

            {showTech && (
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
            {showModalLogout && (
              <LogoutModal setShowModalLogout={setShowModalLogout} />
            )}
          </div>
        </header>
      </>
    </>
  )
}

export default NavUserSearch
