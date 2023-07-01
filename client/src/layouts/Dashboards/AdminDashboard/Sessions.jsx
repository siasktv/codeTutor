import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompleteSessions } from '../../../redux/features/sessions/sessionsSlice'
import { tutorsFetch } from '../../../redux/features/tutors/tutorsSlice'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faCheckCircle,
  faClock,
  faDollar,
  faDollarSign,
  faLink,
  faMoneyBill,
  faPlus,
  faPlusCircle,
  faTriangleExclamation,
  faVideo
} from '@fortawesome/free-solid-svg-icons'
import { Loader, PaymentModal } from '../../../components'

export default function Sessions (props) {
  const { user } = props
  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions.allCompleteSessions)
  const tutors = useSelector(state => state.tutors.allTutors)

  useEffect(() => {
    dispatch(fetchCompleteSessions())
    dispatch(tutorsFetch())
  }, [])

  const [selectedSection, setSelectedSection] = useState('upcoming')
  const [previousSessions, setPreviousSessions] = useState(['loading'])
  const [upcomingSessions, setUpcomingSessions] = useState(['loading'])
  const [paymentModal, setPaymentModal] = useState(false)
  const [finishedLoading, setFinishedLoading] = useState(false)

  useEffect(() => {
    if (
      upcomingSessions[0] !== 'loading' &&
      previousSessions[0] !== 'loading' &&
      tutors
    ) {
      setTimeout(() => {
        setFinishedLoading(true)
      }, 1000)
    }
  }, [upcomingSessions, previousSessions, tutors])

  useEffect(() => {
    if (sessions) {
      const previousSessions = sessions.filter(session => {
        return session.appointmentDate < moment().valueOf()
      })
      const upcomingSessions = sessions.filter(session => {
        return session.appointmentDate >= moment().valueOf()
      })
      setPreviousSessions(
        previousSessions.sort((a, b) => {
          return a.appointmentDate - b.appointmentDate
        })
      )

      setUpcomingSessions(
        upcomingSessions.sort((a, b) => {
          return a.appointmentDate - b.appointmentDate
        })
      )
    }
  }, [sessions])

  const [paymentData, setPaymentData] = useState(null)

  const showPaymentModal = session => {
    setPaymentData(session)
    setPaymentModal(true)
  }

  return (
    <div className='flex flex-col w-full items center justify-center'>
      {finishedLoading === true ? (
        <>
          <h1 className='text-4xl font-bold'>Sesiones</h1>
          <div className='flex flex-row w-full justify-between space-x-3 items-center'>
            <div className='flex flex-col shadow-md shadow-codecolorlighter mt-5 w-full rounded-md h-72 items-center justify-center border'>
              <FontAwesomeIcon
                icon={faVideo}
                className='text-codecolor bg-codecolorlighter p-3 rounded-md'
              />
              <p className='text-[#05004E] text-center font-semibold mt-2 text-lg'>
                Sesiones totales
              </p>
              <p className='text-gray-400 text-center font-semibold text-4xl'>
                {
                  sessions.filter(
                    session =>
                      moment(session.endedCounterDate).format(
                        'DD-MM-YYYY HH:mm:ss'
                      ) < moment().format('DD-MM-YYYY HH:mm:ss')
                  ).length
                }
              </p>
              <p className='text-[#05004E] text-center font-semibold text-sm'>
                completadas
              </p>
              <div className='flex flex-col items-center justify-between w-[80%] px-5 mt-5'>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    En proceso:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    {
                      sessions.filter(
                        session =>
                          (moment(session.appointmentDate).isSameOrBefore(
                            moment()
                          ) &&
                            !session.endedCounterDate &&
                            session.expiredDate >= moment().valueOf()) ||
                          (session.startedCounterDate &&
                            session.endedCounterDate >= moment().valueOf())
                      ).length
                    }
                  </p>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    Futuras:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    {
                      sessions.filter(
                        session => session.appointmentDate >= moment().valueOf()
                      ).length
                    }
                  </p>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    Expiradas:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    {
                      sessions.filter(
                        session =>
                          !session.startedCounterDate &&
                          session.expiredDate < moment().valueOf()
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col mt-5 shadow-md shadow-orange-100 w-full border rounded-md h-72 items-center justify-center'>
              <FontAwesomeIcon
                icon={faClock}
                className='text-orange-700 bg-orange-200 p-3 rounded-md'
              />

              <p className='text-[#05004E] text-center font-semibold text-lg mt-2'>
                Minutos en sesiones
              </p>
              <p className='text-gray-400 text-center font-semibold text-4xl'>
                {sessions
                  .filter(
                    session =>
                      session.startedCounterDate &&
                      session.endedCounterDate < moment().valueOf()
                  )
                  .reduce((acc, session) => {
                    return acc + session.minutes
                  }, 0)}
              </p>
              <p className='text-[#05004E] text-center font-semibold text-sm'>
                completados
              </p>
              <div className='flex flex-col items-center justify-between w-[80%] px-5 mt-5'>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    En proceso:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    {sessions
                      .filter(
                        session =>
                          (moment(session.appointmentDate).isSameOrBefore(
                            moment()
                          ) &&
                            !session.endedCounterDate &&
                            session.expiredDate >= moment().valueOf()) ||
                          (session.startedCounterDate &&
                            session.endedCounterDate >= moment().valueOf())
                      )
                      .reduce((acc, session) => {
                        return acc + session.minutes
                      }, 0)}
                  </p>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    Futuros:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    {sessions
                      .filter(
                        session => session.appointmentDate >= moment().valueOf()
                      )
                      .reduce((acc, session) => {
                        return acc + session.minutes
                      }, 0)}
                  </p>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    Expirados:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    {sessions
                      .filter(
                        session =>
                          !session.startedCounterDate &&
                          session.expiredDate < moment().valueOf()
                      )
                      .reduce((acc, session) => {
                        return acc + session.minutes
                      }, 0)}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex flex-col mt-5 shadow-md shadow-green-100 w-full border rounded-md h-72 items-center justify-center'>
              <FontAwesomeIcon
                icon={faMoneyBill}
                className='text-green-700 p-3 rounded-md bg-green-200'
              />
              <p className='text-[#05004E] text-center font-semibold mt-2 text-lg'>
                Pagos
              </p>
              <p className='text-gray-400 text-center font-semibold text-4xl'>
                USD $
                {sessions
                  .filter(session => session.isPaid)
                  .map(session => session.price)
                  .reduce((acc, price) => acc + price, 0)}
              </p>
              <p className='text-[#05004E] text-center font-semibold text-sm'>
                completados
              </p>
              <div className='flex flex-col items-center justify-between w-[80%] px-5 mt-5'>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    Esperando:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    USD $
                    {sessions
                      .filter(
                        session =>
                          session.expiredDate >= moment().valueOf() &&
                          session.appointmentDate <= moment().valueOf() &&
                          !session.isPaid
                      )
                      .map(session => session.price)
                      .reduce((acc, price) => acc + price, 0)}
                  </p>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    Futuros:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    USD $
                    {sessions
                      .filter(
                        session =>
                          session.appointmentDate > moment().valueOf() &&
                          !session.isPaid
                      )
                      .map(session => session.price)
                      .reduce((acc, price) => acc + price, 0)}
                  </p>
                </div>
                <div className='flex flex-row justify-between w-full'>
                  <p className='text-[#05004E] text-center font-semibold text-sm'>
                    Expirados:
                  </p>
                  <p className='text-gray-400 text-center font-semibold text-sm'>
                    USD $
                    {sessions
                      .filter(
                        session =>
                          session.expiredDate < moment().valueOf() &&
                          !session.isPaid
                      )
                      .map(session => session.price)
                      .reduce((acc, price) => acc + price, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-row items-center mt-5 justify-center space-x-5'>
            <p
              className={`${
                selectedSection === 'previous'
                  ? 'border-b-codecolor'
                  : 'border-b-transparent'
              } border-b-4 cursor-pointer bg-white text-codecolor font-semibold text-xl`}
              onClick={() => setSelectedSection('previous')}
            >
              Pasadas
            </p>
            <p
              className={`${
                selectedSection === 'upcoming'
                  ? 'border-b-codecolor'
                  : 'border-b-transparent'
              } ml-4 border-b-4 cursor-pointer bg-white text-codecolor font-semibold text-xl`}
              onClick={() => setSelectedSection('upcoming')}
            >
              Futuras
            </p>
          </div>
          {selectedSection === 'upcoming' && (
            <>
              {upcomingSessions.length > 0 ? (
                <div className='flex flex-col mt-5 w-full border rounded-md'>
                  <table className='w-full border rounded-md'>
                    <thead>
                      <tr className='text-black'>
                        <th className='py-2 pt-4 px-4'>Fecha</th>
                        <th className='py-2 pt-4 px-4'>Tutor</th>
                        <th className='py-2 pt-4 px-4'>Cliente</th>
                        <th className='py-2 pt-4 px-4'>Duración</th>
                        <th className='py-2 pt-4 px-4'>Precio</th>
                        <th className='py-2 pt-4 px-4'>Estado de pago</th>
                        <th className='py-2 pt-4 px-4'>Estado de la sesión</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingSessions.map(session => (
                        <tr key={session.id} className='text-black'>
                          <td className='py-2 pb-4 px-4'>
                            {moment(session.appointmentDate).format(
                              'DD/MM/YYYY HH'
                            )}
                            :00 hs
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            <a
                              href={`/tutor/${
                                tutors.find(
                                  t => t.user._id === session.tutorUserId._id
                                )?._id
                              }`}
                              target='_blank'
                              className='text-codecolor hover:text-codecolordark transition-all duration-200'
                            >
                              {session.tutorUserId.fullName}
                            </a>
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {session.clientUserId.fullName}
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {session.minutes} minutos
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            USD$ {session.price}
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {session.isPaid ? (
                              <span className='bg-green-200 px-2 py-1 rounded-md text-green-600 font-semibold'>
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                Pagada
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  className='ml-1.5 mb-[1.01px] text-xs hover:test-green-800 transition-all duration-200 cursor-pointer'
                                  onClick={() => {
                                    showPaymentModal(session)
                                  }}
                                />
                              </span>
                            ) : (
                              <span className='bg-red-200 px-2 py-1 rounded-md text-red-600 font-semibold'>
                                <FontAwesomeIcon
                                  icon={faTriangleExclamation}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                No pagada
                              </span>
                            )}
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {!session.startedCounterDate &&
                            moment(session.expiredDate).isBefore(moment()) ? (
                              <span className='bg-red-200 px-2 py-1 rounded-md text-red-600 font-semibold'>
                                <FontAwesomeIcon
                                  icon={faTriangleExclamation}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                Expirada
                              </span>
                            ) : session.startedCounterDate ? (
                              <>
                                {moment(session.endedCounterDate).isBefore(
                                  moment()
                                ) ? (
                                  <span className='bg-green-200 px-2 py-1 rounded-md text-green-600 font-semibold'>
                                    <FontAwesomeIcon
                                      icon={faCheckCircle}
                                      className='mr-1.5 mb-[1.01px] text-xs'
                                    />
                                    Finalizada
                                  </span>
                                ) : (
                                  <span className='bg-[#ffe5ae] px-2 py-1 rounded-md text-yellow-600 font-semibold'>
                                    <FontAwesomeIcon
                                      icon={faClock}
                                      className='mr-1.5 mb-[1.01px] text-xs'
                                    />
                                    En curso
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className='bg-codecolorlight px-2 py-1 rounded-md text-codecolor font-semibold'>
                                <FontAwesomeIcon
                                  icon={faCalendar}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                Agendada
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='flex flex-col mt-5 w-full'>
                  <p className='text-black text-center text-lg py-4'>
                    No tienes sesiones agendadas a futuro.
                  </p>
                </div>
              )}
            </>
          )}
          {selectedSection === 'previous' && (
            <>
              {previousSessions.length > 0 ? (
                <div className='flex flex-col mt-5 w-full border rounded-md'>
                  <table className='w-full border rounded-md'>
                    <thead>
                      <tr className='text-black'>
                        <th className='py-2 pt-4 px-4'>Fecha</th>
                        <th className='py-2 pt-4 px-4'>Tutor</th>
                        <th className='py-2 pt-4 px-4'>Cliente</th>
                        <th className='py-2 pt-4 px-4'>Duración</th>
                        <th className='py-2 pt-4 px-4'>Precio</th>
                        <th className='py-2 pt-4 px-4'>Estado de pago</th>
                        <th className='py-2 pt-4 px-4'>Estado de la sesión</th>
                      </tr>
                    </thead>
                    <tbody>
                      {previousSessions.map(session => (
                        <tr key={session.id} className='text-black'>
                          <td className='py-2 pb-4 px-4'>
                            {moment(session.appointmentDate).format(
                              'DD/MM/YYYY HH'
                            )}
                            :00 hs
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            <a
                              href={`/tutor/${
                                tutors.find(
                                  t => t.user._id === session.tutorUserId._id
                                )?._id
                              }`}
                              target='_blank'
                              className='text-codecolor hover:text-codecolordark transition-all duration-200'
                            >
                              {session.tutorUserId.fullName}
                            </a>
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {session.clientUserId.fullName}
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {session.minutes} minutos
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            USD$ {session.price}
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {session.isPaid ? (
                              <span className='bg-green-200 px-2 py-1 rounded-md text-green-600 font-semibold'>
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                Pagada
                                <FontAwesomeIcon
                                  icon={faPlus}
                                  className='ml-1.5 mb-[1.01px] text-xs hover:test-green-800 transition-all duration-200 cursor-pointer'
                                  onClick={() => {
                                    showPaymentModal(session)
                                  }}
                                />
                              </span>
                            ) : (
                              <span className='bg-red-200 px-2 py-1 rounded-md text-red-600 font-semibold'>
                                <FontAwesomeIcon
                                  icon={faTriangleExclamation}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                No pagada
                              </span>
                            )}
                          </td>
                          <td className='py-2 pb-4 px-4'>
                            {!session.startedCounterDate &&
                            moment(session.expiredDate).isBefore(moment()) ? (
                              <span className='bg-red-200 px-2 py-1 rounded-md text-red-600 font-semibold'>
                                <FontAwesomeIcon
                                  icon={faTriangleExclamation}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                Expirada
                              </span>
                            ) : session.startedCounterDate ? (
                              <>
                                {moment(session.endedCounterDate).isBefore(
                                  moment()
                                ) ? (
                                  <span className='bg-green-200 px-2 py-1 rounded-md text-green-600 font-semibold'>
                                    <FontAwesomeIcon
                                      icon={faCheckCircle}
                                      className='mr-1.5 mb-[1.01px] text-xs'
                                    />
                                    Finalizada
                                  </span>
                                ) : (
                                  <span className='bg-[#ffe5ae] px-2 py-1 rounded-md text-yellow-600 font-semibold'>
                                    <FontAwesomeIcon
                                      icon={faClock}
                                      className='mr-1.5 mb-[1.01px] text-xs'
                                    />
                                    En curso
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className='bg-codecolorlight px-2 py-1 rounded-md text-codecolor font-semibold'>
                                <FontAwesomeIcon
                                  icon={faCalendar}
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                Agendada
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='flex flex-col mt-5 w-full'>
                  <p className='text-black text-center text-lg py-4'>
                    No tienes sesiones agendadas a futuro.
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className='flex flex-col mt-72 w-full items-center justify-center'>
          <Loader />
        </div>
      )}
      {paymentModal && (
        <PaymentModal session={paymentData} setPaymentModal={setPaymentModal} />
      )}
    </div>
  )
}
