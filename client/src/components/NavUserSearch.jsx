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
  NotificationsNav
} from '../components'
import Dropdown from '../components/Buttons/Dropdown'
import { Loader, MessageContainer, MessageMinimized } from '../components'
import ReactDOM from 'react-dom'
import {
  faArrowLeft,
  faArrowRight,
  faMessage
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
          theme: 'light',
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
          theme='light'
        />

        <audio ref={audioPlayer} src={notificationSound} />
        <header className='flex items-center h-20 w-full z-50'>
          <div className='flex justify-between w-full items-center'>
            <div className='pl-8 pt-2'>
              <Link to='/'>
                <span className='flex h-10 '>
                  <img className='h-8' src={IconCodeTutor} />
                  <h1 className='font-bold text-xl ml-1'>Code-Tutor.</h1>
                </span>
              </Link>
            </div>

            <div className='relative pr-8'>
              <button
                className='flex items-center rounded-full btn btn-sm btn-white text-codecolor'
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
              <div className='flex items-center'>
                <div className='flex flex-col items-center'>
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
                    <div className='absolute top-16 mr-20 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
                      <div className='flex flex-col gap-2 p-2'>
                        <div className='flex flex-col gap-2'>
                          <Link to={user ? `/user` : '/login?redirect=/search'}>
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
            {showTech && (
              <div className='absolute w-full z-50 top-20  '>
                <div className='flex justify-center'>
                  <div className='pb-4 bg-white relative border border-[#1414140D] rounded-xl shadow-xl z-50'>
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
                                className='text-codecolor font-normal hover:underline cursor-pointer'
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
                        className='relative border p-2 px-4 bg-codecolor text-white rounded-md shadow-md hover:bg-codecolordark'
                        onClick={() => handleSortByTech('Todos')}
                      >
                        Restaurar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>
      </>
    </>
  )
}

export default NavUserSearch
