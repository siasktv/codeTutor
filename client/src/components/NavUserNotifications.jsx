import notification from '../assets/notification.svg'
import useUser from '../hooks/useUser'
import { useEffect, useState } from 'react'
import { signOut } from '../firebase/client'
import { Loader } from '../components'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import IconCodeTutor from "../assets/IconCodeTutor.svg";
import React from 'react'

const NavUserNotifications = () => {
  const user = useUser()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  useEffect(() => {
    if (user === null) {
      navigate('/login')
    }
  }, [user])

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
  }

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
    setShowNotifications(false)
  }

  return (
    <>
      {user && (
        <>
          <header className="flex items-center h-20 w-full z-50">
            <div className="flex justify-between w-full items-center">
              <div className="pl-8 pt-2">
                <Link to="/">
                  <span className="flex h-10 w-52">
                    <img className="h-8" src={IconCodeTutor} />
                    <h1 className="font-bold text-xl ml-1">Code-Tutor.</h1>
                  </span>
                </Link>
              </div>

              

              <div>
                {/* Foto Usuario */}
                <div className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className="bg-black rounded-full border-none">
                      <img
                        src={user.image}
                        alt="avatar"
                        className="w-10 h-10  rounded-full border-none cursor-pointer"
                        onClick={handleShowProfile}
                      ></img>
                    </div>
                    {showProfile && (
                      <div className="absolute top-20 mt-2 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]">
                        <div className="flex flex-col gap-2 p-2">
                          <div className="flex flex-col gap-2">
                            <Link to="/profile">
                              <button className="text-white bg-codecolor rounded-xl p-2 outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 w-40 hover:outline text-center">
                                Ir a mi perfil
                              </button>
                            </Link>
                            <button
                              className="text-white bg-red-500 rounded-xl p-2 mt-1 outline-red-100 outline-4 outline hover:outline-4 hover:outline-red-300 w-40 hover:outline text-center"
                              onClick={signOut}
                            >
                              Cerrar sesión
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Notificaciones */}
                  <div className="px-8 flex items-center">
                    <div
                      className="p-3 h-10 w-10  bg-violet-100 rounded-xl  cursor-pointer active:scale-90 transition duration-150 select-none"
                      onClick={handleShowNotifications}
                    >
                      <img src={notification} className=""></img>
                    </div>
                    {showNotifications && (
                      <div className="absolute top-20 mt-2 right-0  bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]">
                        <div className="flex flex-col gap-2 p-4 h-80">
                          <div className="flex justify-between items-center flex-1">
                            <h1 className="font-bold text-xl text-codecolor">
                              Notificaciones
                            </h1>
                            <button onClick={() => setShowNotifications(false)}>
                              <FontAwesomeIcon
                                icon={faXmark}
                                className="text-codecolor active:scale-90 transition duration-150 hover:text-codecolordark"
                              />
                            </button>
                          </div>
                          <div className="flex flex-col overflow-y-auto max-h-480px">
                            {notifications.filter(
                              (notification) => notification.isRead === false
                            ).length === 0 && (
                              <div className="flex flex-col gap-2 m-3">
                                <div className="flex justify-center align-middle items-center">
                                  <h1 className="text-black font-semibold w-72 m-3">
                                    No tienes notificaciones.
                                  </h1>
                                </div>
                              </div>
                            )}
                            {notifications.map((notification) => (
                              <React.Fragment key={notification.id}>
                                {notification.isRead === false && (
                                  <Link
                                    to={notification.link}
                                    className="flex flex-col gap-2 p-3 hover:bg-codecolorlighter cursor-pointer hover:rounded-md"
                                  >
                                    <div className="flex justify-center align-middle items-center">
                                      <img
                                        className="w-10 h-10 rounded-full border-none mr-2"
                                        src={notification.avatar}
                                        alt="avatar"
                                      />
                                      <div className="flex flex-col w-60 text-left">
                                        <h2 className="text-md">
                                          {notification.message}{" "}
                                        </h2>
                                      </div>
                                      <div className="flex justify-end ml-3">
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          className="text-codecolor font-bold active:scale-90 transition duration-150 cursor-pointer hover:text-codecolordark"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            markAsRead(notification.id);
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
                </div>
              </div>
              
            </div>
          </header>
        </>
      )}
      {!user && (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </>
  );
}

export default NavUserNotifications
