import notification from '../assets/notification.svg'
import useUser from '../hooks/useUser'
import { useEffect, useState } from 'react'
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
import { fetchLocalUserChats } from '../redux/features/localUser/localUserSlice'
import { Star, MensajeTexto, Default } from '../assets'
import { CardTutor, SearchBarTutor, FilterTutor } from '../layouts'
import { ButtonDropdownLocation, ChatsNav } from '../components'
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

  const tutors = useSelector(state => state.tutors.tutors)
  const users = useSelector(state => state.users.users)
  const teches = useSelector(state => state.teches.teches)
  const categories = useSelector(state => state.teches.categories)
  const selectedTech = useSelector(state => state.tutors.selectedTech)
  const [isLoading, setIsLoading] = useState(true)

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

  // console.log('tutors', tutors)
  // console.log('users', users)
  // console.log('locations', locations)
  // console.log('teches', teches)
  // console.log('categories', categories)
  // console.log('selectedTech', selectedTech)
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

  return (
    <>
      <>
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
                    ></img>
                  </div>
                  {showProfile && (
                    <div className='absolute top-16 mr-20 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
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

                <ChatsNav
                  user={user}
                  handleShowChat={handleShowChat}
                  showChat={showChat}
                  setShowChat={setShowChat}
                  localUserChats={localUserChats}
                  handleSendShowMessage={handleSendShowMessage}
                />
                {/* Notificaciones */}
                <div className='pr-8 pl-3 flex items-center'>
                  {user && (
                    <>
                      <div
                        className='p-3 h-10 w-10  bg-violet-100 rounded-xl  cursor-pointer active:scale-90 transition duration-150 select-none'
                        onClick={handleShowNotifications}
                      >
                        <img src={notification} className=''></img>
                      </div>
                      {showNotifications && (
                        <div className='absolute top-14 mt-2 right-3  bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
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
                                notification => notification.isRead === false
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
                    </>
                  )}
                </div>
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
