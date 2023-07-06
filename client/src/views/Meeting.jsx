import { useEffect, useState, useContext } from 'react'
import NavUserNotifications from '../components/NavUserNotifications'
import useUser from '../hooks/useUser'
import moment from 'moment'
import MeetingReviews from '../layouts/MeetingReviews/MeetingReviews'
import { Link, useParams } from 'react-router-dom'
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
  faRobot,
  faExclamationTriangle,
  faVideo,
  faQuestionCircle,
  faQuestion,
  faInfo,
  faInfoCircle,
  faCalendar,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { usersFetch } from '../redux/features/users/usersSlice'
import { tutorsFetch } from '../redux/features/tutors/tutorsSlice'
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
  const users = useSelector(state => state.users.allUsers)
  const tutors = useSelector(state => state.tutors.allTutors)
  const [showFaqsModal, setShowFaqsModal] = useState(false)
  const [showInfoModal, setShowInfoModal] = useState(false)

  useEffect(() => {
    dispatch(usersFetch())
    dispatch(tutorsFetch())
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
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  const calculateTimeLeftToStart = startDate => {
    const difference = +new Date(startDate) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
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

  const handleJoin = e => {
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
          ? users.find(u => u._id === session.clientUserId)
          : users.find(u => u._id === session.tutorUserId),
        createdAt: Date.now(),
        isRead: false,
        link: `/meeting/${id}`
      }
    })
  }

  const handlePaySession = async e => {
    //pase
    e.preventDefault()
    const paymentDetails = {
      amount: session.price,
      sessionId: session.id,
      userId: user.id,
      name: 'Sesión de tutoría en CodeTutor',
      description: `Sesión de ${session.minutes} minutos con ${
        users.find(u => u._id === session.tutorUserId).fullName
      }`
    }
    //Pagos Stripe
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/stripe/create-checkout-session`,
        paymentDetails
      )

      window.location.href = response.data.url
    } catch (error) {
      console.log(error.response.data)
      console.log(error.message)
    }
  }

  const successFromURL = window.location.search.includes('success')
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false)

  useEffect(() => {
    if (
      successFromURL &&
      session?.isPaid === true &&
      session?.clientUserId === user.id &&
      session?.paymentAlert !== true
    ) {
      setShowPaymentSuccess(true)
      socket.emit('dismissPayment', { sessionId: Number(id) })
    }
  }, [successFromURL, session])

  const handleStartSession = e => {
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
      expiredDate
    })
    socket.emit('sendNotification', {
      userId: user.id,
      receiverId: session.clientUserId,
      notification: {
        type: 'link',
        message: `El tutor ${user.fullName} ha iniciado la sesión`,
        sender: user,
        receiver: users.find(u => u._id === session.clientUserId),
        createdAt: Date.now(),
        isRead: false,
        link: `/meeting/${id}`
      }
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
      rating: reviewRating
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
        receiver: users.find(u => u._id === session.tutorUserId),
        createdAt: Date.now(),
        isRead: false,
        link: `/tutor/${session.tutorUserId}`
      }
    })
    setShowModal(false)
  }

  useEffect(() => {
    // show alert if 3 minutes left
    if (
      session?.endedCounterDate &&
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
      session?.endedCounterDate &&
      moment().valueOf() > session?.endedCounterDate &&
      !moment(session?.expiredDate).isBefore(moment())
    ) {
      setShowModal(true)
    } else {
      setShowModal(false)
    }
  }, [timeLeftSession, alertClosed, showAlert, showModal])

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className='min-h-screen dark:bg-gray-900'>
      {loading ? (
        <div className='flex justify-center items-center dark:bg-gray-900 h-screen'>
          <Loader />
        </div>
      ) : (
        <>
          <NavUserNotifications user={user} />
          <div className='lg:bg-gray-100 lg:dark:bg-gray-900 dark:bg-gray-900 max-lg:p-2 lg:py-10 py-4 w-full max-lg:h-full'>
            {/* --------------------------Fila 1--------------------------- */}

            <div className='flex w-full dark:bg-gray-900 h-full lg:space-x-8 lg:px-10 max-lg:flex-col'>
              {/* Contenedor de 3 los pasos */}
              <div className='max-lg:hidden flex flex-col justify-center dark:bg-gray-800 bg-codecolor w-full h-full rounded px-10 py-8'>
                <h1 className='text-white font-semibold text-lg dark:text-codecolor dark:font-bold text-start'>
                  Como empezar
                </h1>
                <div className='flex justify-between space-x-4 pt-2 pb-4'>
                  <div className='flex space-x-2 items-center'>
                    <h2 className='text-white dark:text-gray-200 text-5xl font-semibold'>
                      1
                    </h2>
                    <h2 className='text-white dark:text-gray-200 text-sm font-semibold'>
                      Prepara audio y video. Recomendamos usar Zoom.
                    </h2>
                  </div>
                  <div className='flex space-x-2 items-center'>
                    <h2 className='text-white dark:text-gray-200 text-5xl font-semibold'>
                      2
                    </h2>
                    <h2 className='text-white dark:text-gray-200 text-sm font-semibold'>
                      Prepara lo que necesites comunicarle a tu tutor.
                    </h2>
                  </div>
                  <div className='flex space-x-2 items-center'>
                    <h2 className='text-white dark:text-gray-200 text-5xl font-semibold'>
                      3
                    </h2>
                    <h2 className='text-white dark:text-gray-200 text-sm font-semibold'>
                      Inicia la sesión y monitorea el tiempo de sesión.
                    </h2>
                  </div>
                </div>
              </div>

              <div>
                {/* Contenedor con el cronómetro */}
                <div className='flex flex-col items-center justify-center bg-white dark:bg-gray-800 w-auto h-full rounded space-y-2 max-lg:p-5'>
                  {!moment(session?.appointmentDate).isBefore(moment()) ? (
                    <>
                      {timeLeftToStart.days ||
                      timeLeftToStart.hours ||
                      timeLeftToStart.minutes ||
                      timeLeftToStart.seconds ? (
                        <>
                          <h2 className='text-codecolor font-semibold text-lg text-center'>
                            La sesión se habilitará en:
                          </h2>
                          <div className='flex items-center justify-between space-x-7 px-3'>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                              <h3 className='text-gray-800 dark:text-gray-200 font-semibold text-2xl text-center'>
                                {timeLeftToStart.days
                                  ? timeLeftToStart.days
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className='text-gray-800 dark:text-gray-200 font-semibold text-sm text-center'>
                                días
                              </p>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                              <h3 className='text-gray-800 dark:text-gray-200 font-semibold text-2xl text-center'>
                                {timeLeftToStart.hours
                                  ? timeLeftToStart.hours
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className='text-gray-800 dark:text-gray-200 font-semibold text-sm text-center'>
                                horas
                              </p>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                              <h3 className='text-gray-800 dark:text-gray-200 font-semibold text-2xl text-center'>
                                {timeLeftToStart.minutes
                                  ? timeLeftToStart.minutes
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className='text-gray-800 dark:text-gray-200 font-semibold text-sm text-center'>
                                minutos
                              </p>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                              <h3 className='text-gray-800 dark:text-gray-200 font-semibold text-2xl text-center'>
                                {timeLeftToStart.seconds
                                  ? timeLeftToStart.seconds
                                      .toString()
                                      .padStart(2, '0')
                                  : '00'}
                              </h3>
                              <p className='text-gray-800 dark:text-gray-200 font-semibold text-sm text-center'>
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
                              <h2 className='text-codecolor font-semibold text-lg text-center'>
                                Tiempo de Sesión
                              </h2>
                              {/* Tiempo */}
                              <div className='relative'>
                                {showAlert && (
                                  <div className='fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center'>
                                    <div className='border-purple-200 bg-codecolor rounded p-20 '>
                                      <p className=' flex-col text-white text-2xl'>
                                        La sesión acabará en{' '}
                                        {timeAlertInMinutes} minutos !!!
                                        <FontAwesomeIcon
                                          icon={faStopwatch}
                                          size='2xl'
                                          beat
                                          style={{ color: '#f9fafa' }}
                                          className='pl-2 mr-2'
                                        />
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div
                                className='flex items-center space-x-8'
                                id='tiempo'
                              >
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                  <h3 className='text-gray-800 dark:text-gray-200 font-semibold text-2xl text-center'>
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
                                  <p className='text-gray-800 dark:text-gray-200 font-semibold text-sm text-center'>
                                    minutos
                                  </p>
                                </div>
                                <div className='h-full border'></div>
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                  <h3 className='text-gray-800 dark:text-gray-200 font-semibold text-2xl text-center'>
                                    {timeLeftSession.seconds
                                      ? timeLeftSession.seconds
                                          .toString()
                                          .padStart(2, '0')
                                      : '00'}{' '}
                                    {/* Segundos */}
                                  </h3>
                                  <p className='text-gray-800 dark:text-gray-200 font-semibold text-sm text-center'>
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
                                    <div className='flex items-center justify-center space-x-11 px-4 w-64'>
                                      <p className='text-red-500 text-sm font-semibold text-center'>
                                        La sesión ha finalizado. Si necesitan
                                        más tiempo pueden agendar una nueva.
                                      </p>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    {session.tutorUserId === user.id && (
                                      <>
                                        <div className='flex items-center justify-center space-x-11 px-4 w-64'>
                                          {session.isPaid ? (
                                            <>
                                              {session?.clientHasJoined ? (
                                                <>
                                                  {!session?.startedCounterDate && (
                                                    <div
                                                      onClick={e =>
                                                        handleStartSession(e)
                                                      }
                                                    >
                                                      <button className='text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150'>
                                                        <FontAwesomeIcon
                                                          icon={faPlay}
                                                          className='mr-2'
                                                        />
                                                        Empezar Sesión
                                                      </button>
                                                    </div>
                                                  )}
                                                </>
                                              ) : (
                                                <>
                                                  <p className='text-codecolor font-semibold text-sm text-center'>
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
                                                  onClick={e => handleJoin(e)}
                                                >
                                                  <button className='text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150'>
                                                    Confirmar asistencia
                                                    <FontAwesomeIcon
                                                      icon={faCheckCircle}
                                                      className='ml-2'
                                                    />
                                                  </button>
                                                </div>
                                              ) : (
                                                <>
                                                  <p className='text-codecolor font-semibold text-sm text-center'>
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
                                        <div className='flex items-center justify-center space-x-11 px-4 w-64'>
                                          {session.isPaid ? (
                                            <>
                                              {!session?.clientHasJoined ? (
                                                <div
                                                  onClick={e => handleJoin(e)}
                                                >
                                                  <button className='text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150'>
                                                    Confirmar asistencia
                                                    <FontAwesomeIcon
                                                      icon={faCheckCircle}
                                                      className='ml-2'
                                                    />
                                                  </button>
                                                </div>
                                              ) : (
                                                <>
                                                  {!session?.startedCounterDate && (
                                                    <p className='text-codecolor font-semibold text-sm text-center'>
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
                                                  <p className='text-codecolor font-semibold text-sm text-center'>
                                                    Esperando a que el tutor
                                                    confirme la sesión
                                                  </p>
                                                </>
                                              ) : (
                                                <div
                                                  onClick={e =>
                                                    handlePaySession(e)
                                                  }
                                                >
                                                  <button className='text-white bg-green-600 font-semibold text-center rounded px-3 py-3 active:scale-90 text-sm transition duration-150'>
                                                    Pagar sesión y desbloquear
                                                    <FontAwesomeIcon
                                                      icon={faLock}
                                                      className='ml-2'
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
                          <div className='flex items-center justify-center space-x-11 px-4 w-64'>
                            <p className='text-red-500 font-semibold text-center'>
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
                  <div className='fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50 max-lg:px-3 max-md:px-0'>
                    <div className='bg-white dark:bg-gray-800 rounded-lg p-8 mx-4 sm:mx-auto max-lg:w-full lg:max-w-md'>
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

            <div className='flex w-full lg:space-x-8 lg:px-10 lg:py-8 py-2'>
              {/* Plataformas videollamada+Otras  */}
              <div className='flex flex-col justify-center border-gray-300 bg-white dark:bg-gray-800 w-full h-full rounded max-lg:py-4'>
                {/* Barra de Opciones */}
                <div className='flex lg:w-full w-60 max-lg:self-center max-lg:space-y-2 max-lg:justify-center max-lg:flex-col justify-end lg:space-x-2 lg:px-10 lg:py-5 lg:border-b dark:border-b-gray-700'>
                  <button
                    className='text-codecolor font-semibold text-center active:scale-90 transition duration-150 bg-codecolorlighter rounded-md px-2 py-1 dark:bg-codecolor dark:text-codecolorlighter'
                    onClick={() => setShowInfoModal(true)}
                  >
                    <FontAwesomeIcon
                      icon={faCalendar}
                      className='text-sm mr-1'
                    />
                    Ver información de la sesión
                  </button>
                  {/* <h2 className="text-black font-semibold text-center">
                Audio/Vídeo
              </h2> */}
                  <button
                    className='text-black bg-gray-200 rounded-md px-2 py-1 font-semibold text-center active:scale-90 transition duration-150 dark:bg-black dark:text-gray-200'
                    onClick={() => setShowFaqsModal(true)}
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className='text-sm mr-1'
                    />
                    ¿Cómo funciona?
                  </button>
                </div>

                {/* Plataformas */}
                <div className='flex justify-center bg-white dark:bg-gray-800 w-full h-full py-6 lg:px-5 px-2 rounded-b lg:border-b dark:border-none max-lg:flex-col max-lg:space-y-8'>
                  {/* Zoom */}
                  <div className='flex flex-col justify-between w-full px-4 max-lg:py-4 lg:border-r max-lg:border-b dark:border-gray-700'>
                    <div className='flex justify-between items-center space-x-4'>
                      <h2 className='text-black dark:text-gray-200 font-semibold text-start'>
                        Zoom
                      </h2>
                      <h2 className='bg-blue-100 font-semibold text-blue-600 px-2 py-1 text-xs rounded dark:bg-blue-600 dark:text-blue-100'>
                        MAYOR CONTROL
                      </h2>
                    </div>
                    <h2 className='text-start mt-2 dark:text-gray-200'>
                      Admite videollamadas, uso compartido de pantalla y control
                      remoto.
                    </h2>
                    <h2 className='text-start text-sm mt-4 dark:text-gray-200'>
                      Si no tienes Zoom instalado, sigue los siguientes pasos:
                    </h2>
                    <h2 className='text-gray-600 dark:text-gray-400 text-start text-sm'>
                      1 - Haz clic en el botón que se encuentra debajo para ir
                      al sitio web de Zoom y descargarlo.
                      <br />
                      2 - Sigue las instrucciones para instalar Zoom.
                      <br />3 - Acuerda con el otro usuario para crear una sala
                      de reuniones y unirte a ella.
                    </h2>
                    <h2 className='text-start dark:text-gray-200 text-sm mt-4'>
                      Si Zoom ya está instalado:
                    </h2>
                    <h2 className='text-gray-600 dark:text-gray-400 text-start text-sm'>
                      1 - Abre la aplicación de Zoom y haz clic en "Unirse a una
                      reunión".
                      <br />
                      2- La persona que creó la sala de reuniones deberá
                      proporcionarle a la otra el ID de la reunión o el enlace
                      para unirse.
                    </h2>
                    <div>
                      {/* Botón Zoom */}
                      <a href='https://zoom.us/es/download' target='_blank'>
                        <button className='hover:bg-blue-600 hover:text-white font-semibold border border-blue-600 rounded px-3 py-1 text-blue-600 max-lg:mb-2 mt-6 active:scale-90 transition duration-150'>
                          Descargar Zoom
                        </button>
                      </a>
                    </div>
                  </div>

                  <div className='flex flex-col max-lg:border-b dark:border-gray-700 w-full lg:px-4 px-2'>
                    {/* Google Meet */}
                    <div className='flex justify-between bg-white dark:bg-gray-800 w-full h-full'>
                      {/* Info Google Meet */}
                      <div>
                        <div className='flex justify-between items-center space-x-4'>
                          <h2 className='text-black dark:text-gray-200 font-semibold text-start'>
                            Google Meet
                          </h2>
                          <h2 className='bg-green-200 font-semibold text-green-600 px-2 py-1 text-xs rounded dark:bg-green-600 dark:text-green-200'>
                            AUTOMATIZADO
                          </h2>
                        </div>

                        <h2 className='text-start mt-2 dark:text-gray-200'>
                          Admite videollamadas y uso compartido de pantalla.
                        </h2>
                        <h2 className='text-green-600 rounded-md px-3 py-2 bg-green-200 text-justify text-sm my-2 font-semibold'>
                          <FontAwesomeIcon icon={faRobot} className='mr-2' />
                          CodeTutor proporciona acceso a Google Meet de forma
                          automatizada, por lo que no deberás instalar nada ni
                          seguir ningún paso. Para reuniones que no requieran de
                          control remoto, recomendamos utilizar Google Meet.
                        </h2>
                        <h2 className='text-gray-600 dark:text-gray-400 text-start text-sm'>
                          1 - Aguarda a que ambos usuarios confirmen asistencia.
                          <br />
                          2- Una vez confirmada la asistencia, se desbloqueará
                          el botón "Unirse al Meet" para que ambos puedan
                          acceder a la reunión.
                          <br />
                          3- ¡Listo! Ya pueden ingresar y comenzar la sesión.
                        </h2>
                      </div>
                    </div>
                    <div>
                      {/* Botón Meet */}

                      {session.tutorHasJoined && session.clientHasJoined ? (
                        <a href={session.meetLink} target='_blank'>
                          <button className='border border-green-600 rounded px-3 py-1 text-green-600 mt-6 active:scale-90 transition duration-150 hover:bg-green-600 hover:text-white font-semibold max-lg:mb-6'>
                            Unirse al Meet
                          </button>
                        </a>
                      ) : (
                        <button className='border border-gray-400 rounded px-3 py-1 text-gray-400 mt-6 font-semibold cursor-default max-lg:mb-6'>
                          Esperando confirmación
                        </button>
                      )}
                    </div>
                  </div>

                  <div className='flex flex-col w-full lg:border-l dark:border-gray-700 lg:px-4 px-2'>
                    {/* Google Hangouts */}
                    <div className='flex justify-between bg-white dark:bg-gray-800 w-full h-full'>
                      {/* Info Google Hangouts */}
                      <div>
                        <div className='flex justify-between items-center space-x-4'>
                          <h2 className='text-black dark:text-gray-200 font-semibold text-start'>
                            Google Hangouts / Chat
                          </h2>
                          <h2 className='bg-orange-200 font-semibold text-orange-700 px-2 py-1 text-xs rounded dark:text-orange-200 dark:bg-orange-600'>
                            ALTERNATIVA
                          </h2>
                        </div>
                        <h2 className='text-start mt-2 dark:text-gray-200'>
                          Admite videollamadas y uso compartido de pantalla.
                        </h2>
                        <h2 className='text-orange-700 rounded-md px-3 py-2 bg-orange-200 text-justify text-sm my-2 font-semibold'>
                          <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className='mr-2'
                          />
                          Google Hangouts ha sido descontinuado por Google y
                          paso a ser Google Chat. Debido a eso, no es una opción
                          recomendada para realizar reuniones ya que requiere de
                          varios pasos adicionales para poder utilizarlo.
                        </h2>
                        <p className='text-start text-sm dark:text-gray-200 text-gray-600 mt-2'>
                          Si todavía quieren utilizarlo con el otro usuario,
                          sigan los siguientes pasos:
                        </p>
                        <h2 className='text-gray-600 dark:text-gray-400 text-start text-sm'>
                          1- Haz clic en el botón que se encuentra debajo para
                          ingresar a Google Chat.
                          <br />
                          2- Selecciona la opción "Iniciar un chat" y busca al
                          usuario con el que deseas comunicarte. Deberán
                          intercambiar sus correos electrónicos para poder
                          encontrarse.
                          <br />
                          3- Decidan quién creará la llamada y dicha persona
                          deberá hacer clic en el botón superior derecho con el
                          ícono
                          <FontAwesomeIcon
                            icon={faVideo}
                            className='mx-1 text-gray-600 text-xs'
                          />
                          .
                          <br />
                          4- La otra persona deberá aceptar la invitación y ya
                          podrán comenzar la sesión.
                        </h2>
                      </div>
                    </div>
                    <div>
                      {/* Botón Hangouts */}
                      <a href='https://hangouts.google.com/' target='_blank'>
                        <button className='border hover:bg-green-700 hover:text-white font-semibold border-green-700 rounded px-3 py-1 text-green-700 mt-6 active:scale-90 transition duration-150'>
                          Ir a Google Chat
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showPaymentSuccess && (
            <div className='fixed z-[9999] inset-0 overflow-y-auto'>
              <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity'>
                  <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
                </div>

                <span
                  className='hidden sm:inline-block sm:align-middle sm:h-screen'
                  aria-hidden='true'
                >
                  &#8203;
                </span>

                <div
                  className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <h3
                          className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200'
                          id='modal-headline'
                        >
                          ¡Pago realizado con éxito!
                        </h3>
                        <div className='mt-2'>
                          <p className='text-sm leading-5 text-gray-500 dark:text-gray-200'>
                            El pago se ha realizado con éxito. Puedes ver el
                            recibo en el apartado de "Mis sesiones" dentro de tu
                            panel de usuario.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <span className='flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto'>
                      <button
                        onClick={() => setShowPaymentSuccess(false)}
                        type='button'
                        className='inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5'
                      >
                        Aceptar
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showFaqsModal && (
            <div className='fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center max-lg:px-3'>
              <div className='bg-white dark:bg-gray-800 rounded-md p-5 lg:w-[600px] lg:max-h-[900px] max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:max-h-[90%] max-lg:py-2'>
                <div
                  className='flex flex-col items-center justify-center mt-1 mb-3 overflow-y-auto max-lg:max-h-[500px] max-lg:justify-start'
                  id='steps'
                >
                  <ul className='list-inside text-justify lg:w-[450px] dark:text-gray-200 text-gray-800 text-sm mt-2 space-y-1'>
                    <li>
                      1. Si estas aquí antes de la fecha y hora agendada de la
                      sesion, en la parte superior derecha, encontrarás una
                      cuenta regresiva que te indicará el tiempo restante para
                      el inicio de la sesión.{' '}
                      <strong>
                        Recuerda estar atento al contador para saber si estás
                        dentro del tiempo límite en caso de que quieras cancelar
                        la sesión.
                      </strong>
                    </li>
                    <li>
                      3. Cuando la cuenta regresiva llegue a 0, el tutor deberá
                      confirmar su presencia en la sesión para así habilitar el
                      botón de pago al cliente.{' '}
                      <strong>
                        {' '}
                        Si pasados los 15 minutos el tutor no confirma su
                        presencia, puedes elevar un reclamo para que se analice
                        la situación.
                      </strong>
                    </li>
                    <li>
                      4. Una vez que el tutor confirme su presencia, se
                      habilitará el botón de pago para que puedas abonar la
                      sesión.{' '}
                      <strong>
                        {' '}
                        Si pasados los 15 minutos no abonas la sesión, se te
                        tomará como ausente y el tutor podrá elevar un reclamo
                        para que se analice la situación.
                      </strong>
                    </li>
                    <li>
                      5. Una vez que abones la sesión, deberás confirmar que te
                      encuentras listo para comenzar la sesión.{' '}
                      <strong>
                        {' '}
                        Si pasados los 15 minutos no confirmas que estás listo,
                        se te tomará como ausente y el tutor podrá elevar un
                        reclamo para que se analice la situación. Ten en cuenta
                        que perderás el derecho a reclamar el dinero abonado.
                      </strong>
                    </li>
                    <li>
                      6. Una vez que confirmes que estás listo, el tutor podrá
                      dar comienzo a la sesión y ambos acordarán el medio de
                      comunicación a utilizar.{' '}
                      <strong>
                        {' '}
                        Si pasados los 15 minutos el tutor no da comienzo a la
                        sesión, puedes elevar un reclamo para que se analice la
                        situación.
                      </strong>
                    </li>
                    <li>
                      7. Una vez que finalice la sesión, podrás calificar al
                      tutor y dejar un comentario sobre el mismo.{' '}
                      <strong>
                        {' '}
                        Ten en cuenta que tienes 24 horas para calificar al
                        tutor, de lo contrario, perderás la posibilidad de
                        hacerlo.
                      </strong>
                    </li>
                  </ul>
                </div>

                <div className='flex items-center justify-center mt-3'>
                  <button
                    className='bg-codecolor text-white hover:bg-codecolordark transition-all ease-in-out duration-200 text-sm font-semibold rounded-md px-3 py-1 mr-2'
                    onClick={() => setShowFaqsModal(false)}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {showInfoModal && (
        <div className='fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center max-lg:px-3'>
          <div className='bg-white dark:bg-gray-800 rounded-md p-5 lg:w-[500px] max-lg:w-full  lg:max-h-[900px] overflow-y-auto'>
            <div
              className='flex flex-col items-center justify-center mt-1 mb-3'
              id='steps'
            >
              <p className='text-xl leading-5 text-gray-800 dark:text-gray-200 mb-3'>
                <strong>Datos de la sesión:</strong>
              </p>
              <ul className='list-inside text-justify lg:w-[450px] text-gray-800 dark:text-gray-200 text-md mt-2 space-y-3 flex items-center flex-col justify-center'>
                <li>
                  <strong>Tutor:</strong>{' '}
                  {session.tutorUserId === user.id ? (
                    'Tú'
                  ) : (
                    <a
                      href={`/tutor/${
                        tutors.find(t => t.user._id === session.tutorUserId)._id
                      }`}
                      rel='noreferrer'
                      target='_blank'
                      className='text-codecolor hover:text-codecolordark transition-all ease-in-out duration-200'
                    >
                      {
                        tutors.find(t => t.user._id === session.tutorUserId)
                          .user.fullName
                      }
                    </a>
                  )}
                </li>
                <li>
                  <strong>Cliente:</strong>{' '}
                  {session.clientUserId === user.id
                    ? 'Tú'
                    : users.find(u => u._id === session.clientUserId).fullName}
                </li>
                <li>
                  <strong>Fecha de inicio:</strong>{' '}
                  {moment(session.appointmentDate).format('DD/MM/YYYY HH:mm')}{' '}
                  hs
                </li>
                <li>
                  <strong>Duracion:</strong> {session.minutes} minutos
                </li>
                <li>
                  <strong>Precio:</strong> USD$ {session.price}
                </li>
                <li>
                  {session.isPaid ? (
                    <span className='text-green-500 bg-green-200 font-semibold text-sm px-2 py-2 rounded-md dark:bg-green-600 dark:text-green-100'>
                      <FontAwesomeIcon icon={faCheckCircle} className='mr-2' />
                      Pagada
                    </span>
                  ) : (
                    <span className='text-red-500 font-semibold bg-red-200 px-2 py-1 text-sm rounded-md dark:bg-red-500 dark:text-red-100'>
                      <FontAwesomeIcon icon={faTimesCircle} className='mr-1' />
                      No pagada
                    </span>
                  )}
                </li>
              </ul>
            </div>

            <div className='flex items-center justify-center mt-6'>
              <button
                className='bg-codecolor text-white hover:bg-codecolordark transition-all ease-in-out duration-200 text-sm font-semibold rounded-md px-3 py-1'
                onClick={() => setShowInfoModal(false)}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Meeting
