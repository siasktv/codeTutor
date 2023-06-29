import { useState, useEffect, useContext } from 'react'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars'
import '../Calendar.css'
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'
import {
  fetchCompleteSessionsByClient,
  fetchCompleteSessionsByTutor
} from '../redux/features/sessions/sessionsSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faChevronDown,
  faMinus,
  faPercent,
  faQuestion
} from '@fortawesome/free-solid-svg-icons'
import { SocketContext } from '../socket/context'
import LoaderMini from './LoaderMini'

export default function BookMeeting (props) {
  const { tutor, user } = props
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const [selectedDate, setSelectedDate] = useState(
    moment().format('MM/DD/YYYY')
  )
  const [disabledDates, setDisabledDates] = useState([])
  const [scheduledDates, setScheduledDates] = useState([])
  const [preFormattedScheduledDates, setPreFormattedScheduledDates] = useState(
    []
  )
  const [selectedTimezone, setSelectedTimezone] = useState(
    tutor.user.timezone.split('UTC')[1]
  )
  const localTimezone = moment.utc().utcOffset()
  const [clientEvents, setClientEvents] = useState([])
  const [disabledTimes, setDisabledTimes] = useState([])
  const [selectedDuration, setSelectedDuration] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)

  const sessionsClient = useSelector(
    state => state.sessions.completeSessionsByClient
  )
  const sessionsTutor = useSelector(
    state => state.sessions.completeSessionsByTutor
  )

  useEffect(() => {
    dispatch(fetchCompleteSessionsByClient(user.id))
    dispatch(fetchCompleteSessionsByTutor(tutor.user._id))
  }, [])

  useEffect(() => {
    if (sessionsClient) {
      const sessions = sessionsClient.map(session => {
        return {
          name: `Sesión con ${session.tutorUserId.fullName}`,
          description: `http://localhost:5173/meeting/${session.sessionId}`,
          date: moment(session.appointmentDate).format('MM/DD/YYYY HH')
        }
      })
      setClientEvents(sessions)
    }
  }, [sessionsClient])

  useEffect(() => {
    if (sessionsTutor) {
      const sessions = sessionsTutor.map(session => {
        return {
          name: `Sesión con ${session.clientUserId.fullName}`,
          description: `http://localhost:5173/meeting/${session.sessionId}`,
          date: moment(session.appointmentDate).format('MM/DD/YYYY HH')
        }
      })
      setScheduledDates(sessions)
    }
  }, [sessionsTutor])

  useEffect(() => {
    if (selectedDate !== null) {
      if (moment(selectedDate).isBefore(moment(), 'day')) {
        setSelectedDate(null)
      }
    }
  }, [selectedDate])

  const isDisabledTime = time => {
    if (
      scheduledDates
        .map(date => date.date)
        .includes(
          // transform time to timezone selectedTimezone
          moment(`${selectedDate} ${time}`, 'MM/DD/YYYY HH').format(
            'MM/DD/YYYY HH'
          )
        ) ||
      scheduledDates
        .map(date => date.date)
        .includes(
          // transform time to timezone selectedTimezone
          moment(`${selectedDate} ${time}`, 'MM/DD/YYYY HH')
            .add(selectedDuration > 60 ? 60 : 0, 'minutes')
            .format('MM/DD/YYYY HH')
        ) ||
      scheduledDates
        .map(date =>
          moment(date.date, 'MM/DD/YYYY HH')
            .add(Number(date.duration) > 60 ? 60 : 0, 'minutes')
            .format('MM/DD/YYYY HH')
        )
        .includes(
          // transform time to timezone selectedTimezone
          moment(`${selectedDate} ${time}`, 'MM/DD/YYYY HH').format(
            'MM/DD/YYYY HH'
          )
        ) ||
      !disabledTimes
        .map(day => day)
        .filter(
          day => Number(day.day) === moment(selectedDate, 'MM/DD/YYYY').day()
        )
        .flatMap(day => day.hours)
        .map(hour =>
          moment(`${hour} ${selectedTimezone}`, 'HH ZZ').format('HH')
        )
        .includes(moment(time, 'HH').format('HH')) ||
      (selectedDuration > 60 &&
        !disabledTimes
          .map(day => day)
          .filter(
            day => Number(day.day) === moment(selectedDate, 'MM/DD/YYYY').day()
          )
          .flatMap(day => day.hours)
          .map(hour =>
            moment(`${hour} ${selectedTimezone}`, 'HH ZZ').format('HH')
          )
          .includes(moment(time, 'HH').add(1, 'hour').format('HH'))) ||
      clientEvents
        .map(date => date.date)
        .includes(
          // transform time to timezone selectedTimezone
          moment(`${selectedDate} ${time}`, 'MM/DD/YYYY HH').format(
            'MM/DD/YYYY HH'
          )
        ) ||
      clientEvents
        .map(date => date.date)
        .includes(
          // transform time to timezone selectedTimezone
          moment(`${selectedDate} ${time}`, 'MM/DD/YYYY HH')
            .add(selectedDuration > 60 ? 60 : 0, 'minutes')
            .format('MM/DD/YYYY HH')
        ) ||
      clientEvents
        .map(date =>
          moment(date.date, 'MM/DD/YYYY HH')
            .add(Number(date.duration) > 60 ? 60 : 0, 'minutes')
            .format('MM/DD/YYYY HH')
        )
        .includes(
          // transform time to timezone selectedTimezone
          moment(`${selectedDate} ${time}`, 'MM/DD/YYYY HH').format(
            'MM/DD/YYYY HH'
          )
        ) ||
      (selectedDate === moment().format('MM/DD/YYYY') &&
        moment(time, 'HH').format('HH') < moment().add(1, 'hour').format('HH'))
    )
      return true
  }
  useEffect(() => {
    if (tutor && tutor?.timezone !== null) {
      setSelectedTimezone(tutor.user.timezone)
      const disabledDays = tutor?.disponibility
        .map(day => day)
        .filter(day => day.hours.length === 0)
        .map(day => day.day)
      setDisabledDates(disabledDays)
      const disabledTimes = tutor?.disponibility.map(day => day)
      setDisabledTimes(disabledTimes)
    }
  }, [tutor])

  const onRenderDayCell = args => {
    if (disabledDates.includes(args.date.getDay())) {
      args.isDisabled = true
    }
  }

  const handleSelectDate = e => {
    if (e.value === null) {
      setSelectedDate(null)
      setSelectedDuration(null)
      setSelectedTime(null)
      return
    }
    if (disabledDates.includes(e.value.getDay())) {
      setSelectedDate(null)
      setSelectedDuration(null)
      setSelectedTime(null)
      return
    }
    setSelectedDate(moment(e.value).format('MM/DD/YYYY'))
    setSelectedDuration(null)
    setSelectedTime(null)
  }

  const handleSelectDuration = e => {
    if (e.target.value === null) {
      setSelectedDuration(null)
      setSelectedTime(null)
      return
    }
    setSelectedDuration(e.target.value)
    setSelectedTime(null)
  }

  const handleSelectTime = e => {
    if (e.target.value === null) {
      setSelectedTime(null)
      return
    }
    if (isDisabledTime(e.target.value)) {
      setSelectedTime(null)
      return
    }
    setSelectedTime(e.target.value)
  }

  const [promo, setPromo] = useState(null)

  useEffect(() => {
    if (
      clientEvents.length === 0 &&
      tutor.rates.find(rate => rate.name === 'Mentorship').promo
    ) {
      setPromo(true)
    } else {
      setPromo(false)
    }
  }, [clientEvents])

  const getPrice = duration => {
    const rate = tutor.rates.find(rate => rate.name === 'Mentorship').value
    if (promo) {
      return ((rate / 60) * (duration - 15)).toFixed(2)
    } else {
      return ((rate / 60) * duration).toFixed(2)
    }
  }

  const [questionModal, setQuestionModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleCreateSession = () => {
    if (
      !selectedDate ||
      !selectedDuration ||
      !selectedTime ||
      submitting ||
      success
    )
      return
    setSubmitting(true)
    const appointmentDate = moment(
      `${selectedDate} ${selectedTime}`,
      'MM/DD/YYYY HH'
    ).valueOf()
    const price = getPrice(selectedDuration)
    const minutes = Number(selectedDuration)
    const session = {
      tutorUserId: tutor.user._id,
      clientUserId: user.id,
      appointmentDate: appointmentDate,
      minutes: minutes,
      price,
      nameForClient: `Sesión con ${tutor.user.fullName}`,
      nameForTutor: `Sesión con ${user.fullName}`,
      expiredDate: moment(appointmentDate).add(2, 'hours').valueOf()
    }
    socket.emit('createSession', { session })
  }

  const [session, setSession] = useState(null)

  useEffect(() => {
    socket.on('createdSession', session => {
      setSession(session)
    })
  }, [])

  useEffect(() => {
    dispatch(fetchCompleteSessionsByClient(user.id))
    dispatch(fetchCompleteSessionsByTutor(tutor.user._id))
  }, [session])

  useEffect(() => {
    if (session && session.sessionId) {
      socket.emit('sendNotification', {
        userId: user.id,
        receiverId: tutor.user._id,
        notification: {
          type: 'link',
          message: `${user.fullName} ha agendado una sesión contigo`,
          sender: user,
          receiver: tutor.user,
          createdAt: Date.now(),
          isRead: false,
          link: `/meeting/${session.sessionId}`
        }
      })
      socket.emit('sendNotification', {
        userId: user.id,
        receiverId: user.id,
        notification: {
          type: 'link',
          message: `Has agendado una sesión con ${tutor.user.fullName}`,
          sender: user,
          receiver: user,
          createdAt: Date.now(),
          isRead: false,
          link: `/meeting/${session.sessionId}`
        }
      })
    }
  }, [session])

  useEffect(() => {
    if (submitting) {
      setTimeout(() => {
        setSubmitting(false)
        setSuccess(true)
      }, 1000)
    }
  }, [submitting])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
        setShowBookingModal(false)
        setShowSteps(false)
        setQuestionModal(false)
        setSelectedDate(null)
        setSelectedDuration(null)
        setSelectedTime(null)
      }, 1000)
    }
  }, [success])

  return (
    <div className='flex flex-col items-center justify-center mt-2 mb-5'>
      <DatePickerComponent
        id='datepicker'
        renderDayCell={onRenderDayCell}
        onChange={handleSelectDate}
        min={moment().subtract(30, 'minutes').toDate()}
        value={selectedDate}
        allowEdit={false}
        placeholder='Selecciona una fecha'
        cssClass='customclass'
        locale='es'
        width={250}
      />
      {selectedDate && (
        <>
          {promo && (
            <>
              <p className='text-center text-xs bg-orange-200 text-orange-600 py-2 w-[250px] justify-center font-semibold flex items-center mt-2 rounded-md'>
                <FontAwesomeIcon icon={faPercent} className='mr-1 w-3 h-3' />
                15 minutos gratis activados
                <FontAwesomeIcon
                  icon={faQuestion}
                  className='ml-2 w-[9px] h-[9px] rounded-full bg-orange-600 text-orange-200 p-0.5 font-bold cursor-pointer hover:bg-orange-700'
                  onClick={() => setQuestionModal(true)}
                />
              </p>
              {questionModal && (
                <div className='fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
                  <div className='bg-white rounded-md p-5 w-[450px]'>
                    <p className='text-center text-gray-800 text-lg font-semibold'>
                      ¿Cómo funciona?
                    </p>
                    <p className='text-center text-gray-800 text-sm mt-2'>
                      Al ser tu primera sesión en CodeTutor y el tutor tener la
                      promoción de 15 minutos gratis habilitada, se te
                      descontará automáticamente el valor de 15 minutos de la
                      sesión. El descuento se aplica automáticamente y no es
                      necesario que realices ningún paso adicional.
                    </p>
                    <button
                      className='bg-codecolor text-white hover:bg-codecolordark transition-all ease-in-out duration-200 text-sm font-semibold rounded-md px-3 py-1 mt-3'
                      onClick={() => setQuestionModal(false)}
                    >
                      Entendido
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
          <select
            id='duration'
            name='duration'
            value={selectedDuration}
            onChange={handleSelectDuration}
            className=' mt-2 border border-gray-800 w-[250px] bg-white rounded-md p-1 cursor-pointer text-center'
          >
            <option disabled hidden selected={selectedDuration === null}>
              Duración
            </option>
            <option value={30}>30 minutos - $USD {getPrice(30)}</option>
            <option value={60}>1 hora - $USD {getPrice(60)}</option>
            <option value={90}>1 hora 30 minutos - $USD {getPrice(90)}</option>
            <option value={120}>2 horas - $USD {getPrice(120)}</option>
          </select>
        </>
      )}
      {selectedDate && selectedDuration && (
        <select
          id='timepicker'
          name='timepicker'
          value={selectedTime}
          onChange={handleSelectTime}
          className='mt-2 border border-gray-800 bg-white rounded-md p-1 cursor-pointer w-[250px] text-center'
        >
          <option disabled hidden selected={selectedTime === null}>
            Horario de inicio
          </option>
          {Array.from(Array(24).keys()).map(hour => (
            <option
              key={hour}
              value={hour}
              className=' disabled:hidden text-center'
              disabled={isDisabledTime(hour)}
            >{`${hour}:00 hs`}</option>
          ))}
        </select>
      )}
      {selectedDate && selectedDuration && selectedTime && (
        <>
          <button
            className='bg-codecolor rounded-md text-white w-[250px] py-2 mt-2 hover:bg-codecolordark transition duration-300 ease-in-out font-semibold'
            onClick={() => {
              setShowBookingModal(true)
            }}
          >
            Agendar sesión
          </button>
          {showBookingModal && (
            <div className='fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
              <div className='bg-white rounded-md p-5 w-[600px] max-h-[900px] overflow-y-auto'>
                <p className='text-center text-gray-800 text-xl font-semibold'>
                  Estas a punto de agendar una sesión con {tutor.user.fullName}
                </p>
                <p className='text-center text-gray-800 font-semibold text-lg mt-3'>
                  Datos de la sesión:
                </p>
                <div className='flex flex-col items-center justify-center mt-1 mb-3'>
                  <p className='text-center text-gray-800 text-md'>
                    <span className='font-semibold'>Fecha:</span>{' '}
                    {moment(selectedDate).format('DD/MM/YYYY')}
                  </p>
                  <p className='text-center text-gray-800 text-md'>
                    <span className='font-semibold'>Hora de inicio:</span>{' '}
                    {selectedTime}:00 hs
                  </p>
                  <p className='text-center text-gray-800 text-md'>
                    <span className='font-semibold'>Duración:</span>{' '}
                    {selectedDuration} minutos
                  </p>
                  <p className='text-center text-gray-800 text-md'>
                    <span className='font-semibold'>Precio:</span> $USD{' '}
                    {getPrice(selectedDuration)}
                  </p>
                </div>
                <p className='text-center font-semibold underline text-gray-800 text-md'>
                  Información importante antes de agendar:
                </p>
                <div className='flex flex-col items-center justify-center mt-1 mb-3'>
                  <ul className='list-disc list-inside text-justify w-[450px] text-gray-800 text-sm mt-2 space-y-1'>
                    <li>
                      Al agendar una sesión, estás reservando el día y horario
                      seleccionado del tutor.{' '}
                      <strong>
                        Ambas partes se comprometen a cumplir con la sesión.
                      </strong>
                    </li>
                    <li>
                      Si alguno de los dos no puede cumplir con la sesión, debe
                      contactar por el chat de CodeTutor al otro usuario para
                      notificarlo y dar aviso de la cancelación.{' '}
                      <strong>
                        El tiempo maximo para cancelar una sesión es de 24 horas
                        antes de la misma, de lo contrario, si el otro usuario
                        desea elevar un reclamo, se penalizará a la persona que
                        no cumplió con la sesión.
                      </strong>
                    </li>
                    <li>
                      <strong>
                        El pago de la sesión se realiza previo al inicio de la
                        misma.{' '}
                      </strong>
                      Una vez que el tutor confirme su presencia en la sesión al
                      momento del horario de inicio, se te habilitará el botón
                      de pago.
                    </li>
                    <li>
                      <strong>El pago se realiza a través de Stripe</strong>,
                      una plataforma de pagos segura y confiable. CodeTutor no
                      almacena ningún dato de tu tarjeta de crédito.
                    </li>
                    <li>
                      <strong>
                        Si abonas la sesión y el tutor abandona la sesión, se te
                        devolverá la totalidad de tu dinero
                      </strong>{' '}
                      y se penalizará al tutor.
                    </li>
                    <li>
                      <strong>
                        En caso de que no abones la sesión se te tomará como
                        ausente y aplicarán los items 1 y 2 de esta lista.
                      </strong>
                    </li>
                  </ul>
                </div>
                <div className='flex items-center justify-center mt-3 flex-col'>
                  <div
                    className='flex items-center justify-between mt-3 cursor-pointer bg-codecolorlighter rounded-md p-2 w-[460px] text-codecolor font-semibold transition duration-300 ease-in-out'
                    onClick={() => {
                      setShowSteps(!showSteps)
                      // scroll to #steps
                      setTimeout(() => {
                        const element = document.getElementById('steps')
                        element.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                          inline: 'nearest'
                        })
                      }, 100)
                    }}
                  >
                    <p className='text-center'>
                      ¿Cómo es el procedimiento de una sesión?
                    </p>
                    {showSteps ? (
                      <FontAwesomeIcon
                        icon={faMinus}
                        className='ml-2 text-sm'
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className='ml-2 text-sm'
                      />
                    )}
                  </div>
                  {showSteps && (
                    <div
                      className='flex flex-col items-center justify-center mt-1 mb-3'
                      id='steps'
                    >
                      <ul className='list-inside text-justify w-[450px] text-gray-800 text-sm mt-2 space-y-1'>
                        <li>
                          1. Al agendar la sesión, se generará un enlace único
                          para la misma que estará disponible para ambos.
                        </li>
                        <li>
                          2. Al ingresar a dicho enlace, encontrarás una cuenta
                          regresiva que te indicará el tiempo restante para el
                          inicio de la sesión.{' '}
                          <strong>
                            Recuerda estar atento al contador para saber si
                            estás dentro del tiempo límite en caso de que
                            quieras cancelar la sesión.
                          </strong>
                        </li>
                        <li>
                          3. Cuando la cuenta regresiva llegue a 0, el tutor
                          deberá confirmar su presencia en la sesión para así
                          habilitar el botón de pago al cliente.{' '}
                          <strong>
                            {' '}
                            Si pasados los 15 minutos el tutor no confirma su
                            presencia, puedes elevar un reclamo para que se
                            analice la situación
                          </strong>
                        </li>
                        <li>
                          4. Una vez que el tutor confirme su presencia, se
                          habilitará el botón de pago para que puedas abonar la
                          sesión.{' '}
                          <strong>
                            {' '}
                            Si pasados los 15 minutos no abonas la sesión, se te
                            tomará como ausente y el tutor podrá elevar un
                            reclamo para que se analice la situación.
                          </strong>
                        </li>
                        <li>
                          5. Una vez que abones la sesión, deberás confirmar que
                          te encuentras listo para comenzar la sesión.{' '}
                          <strong>
                            {' '}
                            Si pasados los 15 minutos no confirmas que estás
                            listo, se te tomará como ausente y el tutor podrá
                            elevar un reclamo para que se analice la situación.
                            Ten en cuenta que perderás el derecho a reclamar el
                            dinero abonado.
                          </strong>
                        </li>
                        <li>
                          6. Una vez que confirmes que estás listo, el tutor
                          podrá dar comienzo a la sesión y ambos acordarán el
                          medio de comunicación a utilizar.{' '}
                          <strong>
                            {' '}
                            Si pasados los 15 minutos el tutor no da comienzo a
                            la sesión, puedes elevar un reclamo para que se
                            analice la situación.
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
                  )}
                </div>
                {promo && (
                  <div className='flex items-center justify-center mt-3 flex-col'>
                    <p className=' text-xs text-orange-700 bg-orange-200 rounded-md px-3 text-justify py-2 mt-3 w-[460px]'>
                      <FontAwesomeIcon
                        icon={faPercent}
                        className='mr-2 text-xs'
                      />
                      <strong>
                        Estas utilizando la promoción de los primeros 15 minutos
                        gratis para tu primera sesión. Ten en cuenta que solo la
                        podrás utilizar una vez y si cancelas la sesión o no te
                        presentas no podrás recuperarla. En caso de que el tutor
                        no se presente, podrás utilizarla nuevamente.
                      </strong>
                    </p>
                  </div>
                )}
                <div className='flex items-center justify-center flex-col'>
                  <p className='text-xs text-gray-600 text-center mt-3 mb-2 w-[460px]'>
                    Al agendar la sesión, confirmas automáticamente haber leído
                    y aceptado los datos mencionados anteriormente.
                  </p>
                </div>

                <div className='flex items-center justify-center mt-3'>
                  <button
                    className='bg-codecolor text-white hover:bg-codecolordark transition-all ease-in-out duration-200 text-sm font-semibold rounded-md px-3 py-1 mr-2'
                    onClick={() => setShowBookingModal(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className='bg-codecolor text-white hover:bg-codecolordark transition-all ease-in-out duration-200 text-sm font-semibold rounded-md px-3 py-1 w-20 h-7'
                    onClick={() => handleCreateSession()}
                    disabled={submitting || success}
                  >
                    {submitting ? (
                      <LoaderMini />
                    ) : success ? (
                      <FontAwesomeIcon icon={faCheckCircle} />
                    ) : (
                      'Agendar'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
