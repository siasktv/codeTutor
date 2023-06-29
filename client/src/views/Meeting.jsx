import { useEffect, useState, useContext } from 'react'
import NavUserNotifications from '../components/NavUserNotifications'
import useUser from '../hooks/useUser'
import moment from 'moment'
import MeetingReviews from '../layouts/MeetingReviews/MeetingReviews'
import { useParams } from 'react-router-dom'
import { SocketContext } from '../socket/context'
import { Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLock,
  faCheckCircle,
  faPlay,
  faStopwatch,
  faCheck,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { usersFetch } from '../redux/features/users/usersSlice'
import axios from 'axios'
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Meeting = () => {
  const { id } = useParams()
  const user = useUser()
  const timeAlertInMinutes = 3
  const [running, setRunning] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [alertClosed, setAlertClosed] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(false)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewRating, setReviewRating] = useState(0)
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users.allUsers)

  useEffect(() => {
    dispatch(usersFetch())
  }, [dispatch])

  useEffect(() => {
    if (user && session?.id) {
      if (moment(session?.endedCounterDate).add(1, 'days').isBefore(moment())) {
        navigate('/')
      } else {
        setLoading(false)
      }
    } else {
      if (user === null) {
        navigate(`/login?redirect=/meeting/${id}`)
      } else if (!session?.sessionId && session !== false) {
        navigate('/')
      }
    }
  }, [user, session])

  useEffect(() => {
    if (user) {
      socket.emit('getSessionData', { sessionId: Number(id), userId: user.id })
      socket.on('setSessionData', ({ session }) => {
        setSession(session)
      })
    }
  }, [user, socket, id])

  const calculateTimeLeftSession = (startDate, endDate) => {
    const difference = +new Date(endDate) - +new Date(startDate)
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        // if time contains hours, add them to minutes
        minutes:
          Math.floor((difference / 1000 / 60) % 60) +
          Math.floor((difference / (1000 * 60 * 60)) % 24) * 60,
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const calculateTimeLeftToStart = (startDate) => {
    const difference = +new Date(startDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeftToStart, setTimeLeftToStart] = useState(
    calculateTimeLeftToStart(session?.appointmentDate)
  )

  const [timeLeftSession, setTimeLeftSession] = useState(
    calculateTimeLeftSession(
      session?.startedCounterDate,
      session?.endedCounterDate
    )
  )

  useEffect(() => {
    setTimeout(() => {
      setTimeLeftToStart(calculateTimeLeftToStart(session?.appointmentDate))
    }, 1000)
  })

  useEffect(() => {
    setTimeout(() => {
      setTimeLeftSession(
        calculateTimeLeftSession(moment().valueOf(), session?.endedCounterDate)
      )
    }, 1000)
  })

  const handleJoin = (e) => {
    e.preventDefault()
    socket.emit('joinSession', { sessionId: Number(id), userId: user.id })
    const isTutor = session?.tutorUserId === user.id
    socket.emit('sendNotification', {
      userId: user.id,
      receiverId: isTutor ? session.clientUserId : session.tutorUserId,
      notification: {
        type: 'link',
        message: isTutor
          ? `El tutor ${user.fullName} se ha unido a la sesión`
          : `El cliente ${user.fullName} se ha unido a la sesión`,
        sender: user,
        receiver: isTutor
          ? users.find((u) => u._id === session.clientUserId)
          : users.find((u) => u._id === session.tutorUserId),
        createdAt: Date.now(),
        isRead: false,
        link: `/meeting/${id}`,
      },
    })
  }

  const handlePaySession = async (e) => {
    //pase
    e.preventDefault()
    console.log(session)
    const paymentDetails = {
      amount: session.price,
      sessionId: session.id,
      userId: user.id,
      description: `Sesión de ${session.minutes} minutos con ${
        users.find((u) => u._id === session.tutorUserId).fullName
      }`,
    }
    //Pagos Stripe
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/stripe/create-checkout-session`,
        paymentDetails
      )
      console.log(response.data)

      window.location.href = response.data.url
    } catch (error) {
      console.log(error.response.data)
      console.log(error.message)
    }
  }

  // useEffect(() => {

  //   socket.emit('paySession', { sessionId: Number(id), paymentDetails })
  //   socket.emit('sendNotification', {
  //     userId: user.id,
  //     receiverId: session.tutorUserId,
  //     notification: {
  //       type: 'link',
  //       message: `El cliente ${user.fullName} ha abonado la sesión`,
  //       sender: user,
  //       receiver: users.find((u) => u._id === session.tutorUserId),
  //       createdAt: Date.now(),
  //       isRead: false,
  //       link: `/meeting/${id}`,
  //     },
  //   })
  // }, [session])

  const handleStartSession = (e) => {
    e.preventDefault()
    setRunning(true)
    const startedCounterDate = moment().valueOf()
    const endedCounterDate = moment()
      .add(Number(session.minutes), 'minutes')
      .valueOf()
    const expiredDate = moment()
      .add(Number(session.minutes) + 2, 'years')
      .valueOf()
    socket.emit('startCounter', {
      sessionId: Number(id),
      startedCounterDate,
      endedCounterDate,
      expiredDate,
    })
    socket.emit('sendNotification', {
      userId: user.id,
      receiverId: session.clientUserId,
      notification: {
        type: 'link',
        message: `El tutor ${user.fullName} ha iniciado la sesión`,
        sender: user,
        receiver: users.find((u) => u._id === session.clientUserId),
        createdAt: Date.now(),
        isRead: false,
        link: `/meeting/${id}`,
      },
    })
  }

  useEffect(() => {
    if (session?.startedCounterDate) {
      setRunning(true)
    }
  }, [session])

  const handleReviewSession = () => {
    const review = {
      comment: reviewComment,
      rating: reviewRating,
    }
    socket.emit('reviewSession', { sessionId: Number(id), review })
    socket.emit('sendNotification', {
      userId: user.id,
      receiverId: session.tutorUserId,
      notification: {
        type: 'link',
        message: `El cliente ${
          user.fullName
        } te ha valorado con ${reviewRating} ${
          reviewRating === 1 ? 'estrella' : 'estrellas'
        }`,
        sender: user,
        receiver: users.find((u) => u._id === session.tutorUserId),
        createdAt: Date.now(),
        isRead: false,
        link: `/tutor/${session.tutorUserId}`,
      },
    })
    setShowModal(false)
  }

  useEffect(() => {
    // show alert if 3 minutes left
    if (
      moment().valueOf() >
        session?.endedCounterDate - moment.duration(timeAlertInMinutes, 'm') &&
      !alertClosed
    ) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        setAlertClosed(true)
      }, 3000)
    }
    if (
      session?.clientUserId === user?.id &&
      session?.isReviewed !== true &&
      moment().valueOf() > session?.endedCounterDate &&
      !moment(session?.expiredDate).isBefore(moment())
    ) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [timeLeftSession, alertClosed, showAlert, showModal])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <>
          <NavUserNotifications user={user} />
          <div className="bg-gray-100 py-10 w-full h-full">
            {/* --------------------------Fila 1--------------------------- */}

            <div className="flex w-full h-full space-x-8 px-10">
              {/* Contenedor de 3 los pasos */}
              <div className="flex flex-col justify-center bg-codecolor w-full h-full rounded px-10 py-8">
                <h1 className="text-white font-semibold text-lg text-start">
                  Como empezar
                </h1>
                <div className="flex justify-between space-x-4 pt-2 pb-4">
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-white text-5xl font-semibold">1</h2>
                    <h2 className="text-white text-sm font-semibold">
                      Prepara audio y video. Recomendamos usar Zoom.
                    </h2>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-white text-5xl font-semibold">2</h2>
                    <h2 className="text-white text-sm font-semibold">
                      Prepara lo que necesites comunicarle a tu tutor.
                    </h2>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <h2 className="text-white text-5xl font-semibold">3</h2>
                    <h2 className="text-white text-sm font-semibold">
                      Inicia la sesión y monitorea el tiempo de sesión.
                    </h2>
                  </div>
                </div>
              </div>

              <div>
                {/* Contenedor con el cronómetro */}
                <div className="flex flex-col items-center justify-center bg-white w-auto h-full rounded space-y-2">
                  {!moment(session?.appointmentDate).isBefore(moment()) ? (
                    <>
                      {timeLeftToStart.days ||
                      timeLeftToStart.hours ||
                      timeLeftToStart.minutes ||
                      timeLeftToStart.seconds ? (
                        <>
                          <h2 className="text-codecolor font-semibold text-lg text-center">
                            La sesión se habilitará en:
                          </h2>
                          <div className="flex items-center justify-between space-x-7 px-3">
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <h3 className="text-gray-800 font-semibold text-2xl text-center">
                                {timeLeftToStart.days
                                  ? timeLeftToStart.days
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className="text-gray-800 font-semibold text-sm text-center">
                                días
                              </p>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <h3 className="text-gray-800 font-semibold text-2xl text-center">
                                {timeLeftToStart.hours
                                  ? timeLeftToStart.hours
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className="text-gray-800 font-semibold text-sm text-center">
                                horas
                              </p>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <h3 className="text-gray-800 font-semibold text-2xl text-center">
                                {timeLeftToStart.minutes
                                  ? timeLeftToStart.minutes
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className="text-gray-800 font-semibold text-sm text-center">
                                minutos
                              </p>
                            </div>
                            <div className="flex flex-col items-center justify-center space-y-1">
                              <h3 className="text-gray-800 font-semibold text-2xl text-center">
                                {timeLeftToStart.seconds
                                  ? timeLeftToStart.seconds
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className="text-gray-800 font-semibold text-sm text-center">
                                segundos
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <Loader />
                      )}
                    </>
                  ) : (
                    <>
                      {!moment(session?.expiredDate).isBefore(moment()) ? (
                        <>
                          {session?.startedCounterDate &&
                          !moment(session?.endedCounterDate).isBefore(
                            moment()
                          ) &&
                          !timeLeftSession.days &&
                          !timeLeftSession.hours &&
                          !timeLeftSession.minutes &&
                          !timeLeftSession.seconds ? (
                            <Loader />
                          ) : (
                            <>
                              <h2 className="text-codecolor font-semibold text-lg text-center">
                                Tiempo de Sesión
                              </h2>
                              {/* Tiempo */}
                              <div className="relative">
                                {showAlert && (
                                  <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
                                    <div className="border-purple-200 bg-codecolor rounded p-20 ">
                                      <p className=" flex-col text-white text-2xl">
                                        La sesión acabará en{' '}
                                        {timeAlertInMinutes} minutos !!!
                                        <FontAwesomeIcon
                                          icon={faStopwatch}
                                          size="2xl"
                                          beat
                                          style={{ color: '#f9fafa' }}
                                          className="pl-2 mr-2"
                                        />
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div
                                className="flex items-center space-x-8"
                                id="tiempo"
                              >
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <h3 className="text-gray-800 font-semibold text-2xl text-center">
                                    {running ? (
                                      <>
                                        {timeLeftSession.minutes
                                          ? timeLeftSession.minutes
                                              .toString()
                                              .padStart(2, '0')
                                          : '00'}{' '}
                                      </>
                                    ) : (
                                      <>
                                        {session.minutes
                                          ? session.minutes
                                              .toString()
                                              .padStart(2, '0')
                                          : '00'}{' '}
                                      </>
                                    )}
                                    {/* Minutos */}
                                  </h3>
                                  <p className="text-gray-800 font-semibold text-sm text-center">
                                    minutos
                                  </p>
                                </div>
                                <div className="h-full border"></div>
                                <div className="flex flex-col items-center justify-center space-y-1">
                                  <h3 className="text-gray-800 font-semibold text-2xl text-center">
                                    {timeLeftSession.seconds
                                      ? timeLeftSession.seconds
                                          .toString()
                                          .padStart(2, '0')
                                      : '00'}{' '}
                                    {/* Segundos */}
                                  </h3>
                                  <p className="text-gray-800 font-semibold text-sm text-center">
                                    segundos
                                  </p>
                                </div>
                              </div>
                              {/* Botones */}
                              {
                                // check if meeting endedCounterDate is bigger than current time  if it is bigger then meeting has ended
                                moment(session?.endedCounterDate).isBefore(
                                  moment()
                                ) ? (
                                  <>
                                    <div className="flex items-center justify-center space-x-11 px-4 w-64">
                                      <p className="text-red-500 text-sm font-semibold text-center">
                                        La sesión ha finalizado. Si necesitan
                                        más tiempo pueden agendar una nueva.
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {session.tutorUserId === user.id && (
                                      <>
                                        <div className="flex items-center justify-center space-x-11 px-4 w-64">
                                          {session.isPaid ? (
                                            <>
                                              {session?.clientHasJoined ? (
                                                <>
                                                  {!session?.startedCounterDate && (
                                                    <div
                                                      onClick={(e) =>
                                                        handleStartSession(e)
                                                      }
                                                    >
                                                      <button className="text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150">
                                                        <FontAwesomeIcon
                                                          icon={faPlay}
                                                          className="mr-2"
                                                        />
                                                        Empezar Sesión
                                                      </button>
                                                    </div>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  <p className="text-codecolor font-semibold text-sm text-center">
                                                    Esperando a que el cliente
                                                    esté listo
                                                  </p>
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {!session?.tutorHasJoined ? (
                                                <div
                                                  onClick={(e) => handleJoin(e)}
                                                >
                                                  <button className="text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150">
                                                    Confirmar asistencia
                                                    <FontAwesomeIcon
                                                      icon={faCheckCircle}
                                                      className="ml-2"
                                                    />
                                                  </button>
                                                </div>
                                              ) : (
                                                <>
                                                  <p className="text-codecolor font-semibold text-sm text-center">
                                                    Esperando a que el cliente
                                                    abone la sesión
                                                  </p>
                                                </>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </>
                                    )}
                                    {session.clientUserId === user.id && (
                                      <>
                                        <div className="flex items-center justify-center space-x-11 px-4 w-64">
                                          {session.isPaid ? (
                                            <>
                                              {!session?.clientHasJoined ? (
                                                <div
                                                  onClick={(e) => handleJoin(e)}
                                                >
                                                  <button className="text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150">
                                                    Confirmar asistencia
                                                    <FontAwesomeIcon
                                                      icon={faCheckCircle}
                                                      className="ml-2"
                                                    />
                                                  </button>
                                                </div>
                                              ) : (
                                                <>
                                                  {!session?.startedCounterDate && (
                                                    <p className="text-codecolor font-semibold text-sm text-center">
                                                      Esperando a que el tutor
                                                      inicié la sesión
                                                    </p>
                                                  )}
                                                </>
                                              )}
                                            </>
                                          ) : (
                                            <>
                                              {!session?.tutorHasJoined ? (
                                                <>
                                                  <p className="text-codecolor font-semibold text-sm text-center">
                                                    Esperando a que el tutor
                                                    confirme la sesión
                                                  </p>
                                                </>
                                              ) : (
                                                <div
                                                  onClick={(e) =>
                                                    handlePaySession(e)
                                                  }
                                                >
                                                  <button className="text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150">
                                                    Pagar sesión y desbloquear
                                                    <FontAwesomeIcon
                                                      icon={faLock}
                                                      className="ml-2"
                                                    />
                                                  </button>
                                                </div>
                                              )}
                                            </>
                                          )}
                                        </div>
                                      </>
                                    )}
                                  </>
                                )
                              }
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="flex items-center justify-center space-x-11 px-4 w-64">
                            <p className="text-red-500 font-semibold text-center">
                              La sesión ha expirado. Si desean continuar, pueden
                              agendar una nueva.
                            </p>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
                {/* Renderiza el componente StarRating y pasa la función handleCloseModal como prop */}
                {showModal && (
                  <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-8 mx-4 sm:mx-auto max-w-md">
                      <MeetingReviews
                        onCloseModal={handleCloseModal}
                        setReviewComment={setReviewComment}
                        setReviewRating={setReviewRating}
                        handleReviewSession={handleReviewSession}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* --------------------------Fila 2--------------------------- */}

            <div className="flex w-full space-x-8 px-10 py-8">
              {/* Plataformas videollamada+Otras  */}
              <div className="flex flex-col justify-center border-gray-300 bg-white w-full h-full rounded">
                {/* Barra de Opciones */}
                <div className="flex w-full justify-between px-10 py-5 border-b">
                  <a href="https://vscode.dev/" target="_blank">
                    <button className="text-black font-semibold text-center active:scale-90 transition duration-150">
                      Editor de código
                    </button>
                  </a>
                  {/* <h2 className="text-black font-semibold text-center">
                Audio/Vídeo
              </h2> */}
                  <button className="text-black font-semibold text-center active:scale-90 transition duration-150">
                    FAQs
                  </button>
                </div>

                {/* Plataformas */}
                <div className="flex justify-center bg-white w-full h-full py-6 px-5 rounded-b border-b">
                  {/* Zoom */}
                  <div className="flex flex-col w-full px-4 border-r">
                    <div className="flex justify-between items-center space-x-4">
                      <h2 className="text-black font-semibold text-start">
                        Zoom
                      </h2>
                      <h2 className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
                        RECOMENDADO
                      </h2>
                    </div>
                    <h2 className="text-start mt-2">
                      Admite videollamadas, uso compartido de pantalla y control
                      remoto.
                    </h2>
                    <h2 className="text-start text-sm mt-4">
                      Si no tienes Zoom instalado, sigue los siguientes pasos:
                    </h2>
                    <h2 className="text-gray-600 text-start text-sm">
                      1 - Haz clic en el botón que se encuentra debajo para ir
                      al sitio web de Zoom y descargarlo.
                      <br />
                      2 - Sigue las instrucciones para instalar Zoom.
                      <br />3 -Te unirás automáticamente a la sala de reuniones
                      después de que se complete la instalación.
                    </h2>
                    <h2 className="text-start text-sm mt-4">
                      Si Zoom ya está instalado:
                    </h2>
                    <h2 className="text-gray-600 text-start text-sm">
                      1 - Haz clic en el botón que se encuentra debajo para ir
                      al sitio web de Zoom.
                      <br />
                      2- Haz clic en "Abrir zoom.us" para iniciar la aplicación
                      de Zoom y unirte a la sala de reuniones.
                    </h2>
                    <div>
                      {/* Botón Zoom */}
                      <a href="https://zoom.us/es/download" target="_blank">
                        <button className="hover:bg-blue-600 hover:text-white font-semibold border border-blue-600 rounded px-10 py-1 text-blue-600 mt-6 active:scale-90 transition duration-150">
                          Zoom
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col w-full px-4">
                    {/* Google Meet */}
                    <div className="flex  bg-white w-full h-full">
                      {/* Info Google Meet */}
                      <div>
                        <h2 className="text-black font-semibold text-start">
                          Google Meet
                        </h2>
                        <h2 className="text-start mt-2">
                          Admite videollamadas y uso compartido de pantalla.
                        </h2>
                        <h2 className="text-start text-sm mt-4">
                          No requiere de instalación:
                        </h2>
                        <h2 className="text-gray-600 text-start text-sm">
                          1 - Haz clic en el botón que se encuentra debajo para
                          ir al sitio web de Meet.
                          <br />
                          2- Haz clic en "Reunión nueva" para iniciar una nueva
                          reunión.
                          <br />
                          3- Invita al otro usuario a la reunión.
                        </h2>
                      </div>
                    </div>
                    <div>
                      {/* Botón Meet */}
                      <a href="https://meet.google.com/" target="_blank">
                        <button className="border border-green-600 rounded px-10 py-1 text-green-600 mt-6 active:scale-90 transition duration-150 hover:bg-green-600 hover:text-white font-semibold">
                          Meet
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className="flex flex-col w-full border-l px-4">
                    {/* Google Hangouts */}
                    <div className="flex  bg-white w-full h-full">
                      {/* Info Google Hangouts */}
                      <div>
                        <h2 className="text-black font-semibold text-start">
                          Google Hangouts
                        </h2>
                        <h2 className="text-start mt-2">
                          Admite videollamadas y uso compartido de pantalla.
                        </h2>
                        <h2 className="text-start text-sm mt-4">
                          No requiere de instalación:
                        </h2>
                        <h2 className="text-gray-600 text-start text-sm">
                          1- Haz clic en el botón INICIAR GOOGLE HANGOUTS a
                          continuación para ir a Google.
                          <br />
                          2- Copia el enlace permanente y envíalo a tu
                          tutor/cliente. <br />
                          3- ¡Haz clic en "Cancelar" y espera a que la otra
                          parte se una a la llamada!
                        </h2>
                      </div>
                    </div>
                    <div>
                      {/* Botón Hangouts */}
                      <a href="https://hangouts.google.com/" target="_blank">
                        <button className="border hover:bg-green-700 hover:text-white font-semibold border-green-700 rounded px-8 py-1 text-green-700 mt-6 active:scale-90 transition duration-150">
                          Hangouts
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Meeting
