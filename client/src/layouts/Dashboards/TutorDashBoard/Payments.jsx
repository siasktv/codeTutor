import {
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faClock,
  faClockRotateLeft,
  faEnvelope,
  faExclamationTriangle,
  faEye,
  faFileInvoice,
  faHand,
  faIcicles,
  faInfoCircle,
  faQuestion,
  faQuestionCircle,
  faSackDollar,
  faShare,
  faTimes,
  faWarning
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompleteSessionsByTutor } from '../../../redux/features/sessions/sessionsSlice'
import { fetchCashoutsFromUserId } from '../../../redux/features/cashouts/cashoutsSlice'
import moment from 'moment'
import Loader from '../../../components/Loader'

export default function Payments (props) {
  const { user } = props
  const [paymentsReceived, setPaymentsReceived] = useState([])

  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions.completeSessionsByTutor)
  const cashouts = useSelector(state => state.cashouts.cashouts)

  const [frozenPayments, setFrozenPayments] = useState([])
  const [availablePayments, setAvailablePayments] = useState([])
  const [inTransitPayments, setInTransitPayments] = useState([])
  const [sentPayments, setSentPayments] = useState([])
  const [disputedPayments, setDisputedPayments] = useState([])
  const [showModal, setShowModal] = useState(null)
  const [paymentsLoaded, setPaymentsLoaded] = useState(false)
  const [cashoutsLoaded, setCashoutsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchCompleteSessionsByTutor(user.id))
    dispatch(fetchCashoutsFromUserId(user.id))
  }, [])

  useEffect(() => {
    if (sessions) {
      const payments = sessions.filter(
        session =>
          session.isPaid === true &&
          session.isDisputed === false &&
          session.isRefunded === false &&
          session.sentPaymentToTutor === false
      )
      setPaymentsReceived(payments)
      const disputed = sessions.filter(
        session =>
          session.isPaid === true &&
          session.isDisputed === true &&
          session.isRefunded === false &&
          session.sentPaymentToTutor === false
      )
      setDisputedPayments(disputed)
    }
  }, [sessions])

  useEffect(() => {
    if (cashouts) {
      const sent = cashouts
      setSentPayments(sent)
      setCashoutsLoaded(true)
    }
  }, [cashouts])

  useEffect(() => {
    if (paymentsReceived) {
      const frozen = paymentsReceived.filter(
        payment =>
          // calculate 15 days after the session in unix format
          moment().unix() <
          moment.unix(payment.paymentDetails.date).add(15, 'days').unix()
      )

      setFrozenPayments(frozen)
      const available = paymentsReceived.filter(
        payment =>
          moment().unix() >
          moment.unix(payment.paymentDetails.date).add(15, 'days').unix()
      )
      const getReleaseDate = payment => {
        const becomeAvailableOn = moment
          .unix(payment.paymentDetails.date)
          .add(15, 'days')
          .unix()
        const monthOfRelease = moment.unix(becomeAvailableOn).format('MMMM')
        const dayOfRelease = moment.unix(becomeAvailableOn).format('DD')
        const yearOfRelease = moment.unix(becomeAvailableOn).format('YYYY')
        if (dayOfRelease >= 1) {
          const finalReleaseDate = moment()
            .month(monthOfRelease)
            .date(15)
            .year(yearOfRelease)
            .format('MMMM DD YYYY')
          return finalReleaseDate
        } else {
          const finalReleaseDate = moment()
            .month(monthOfRelease + 1)
            .date(1)
            .year(yearOfRelease)
            .format('MMMM DD YYYY')
          return finalReleaseDate
        }
      }
      const availableFinal = available.filter(payment => {
        const releaseDate = getReleaseDate(payment)
        const today = moment().format('MMMM DD YYYY')
        if (moment(today).isBefore(releaseDate)) {
          return payment
        }
      })
      setAvailablePayments(
        availableFinal.filter(payment => payment.sentPaymentToTutor === false)
      )
      const inTransit = available.filter(payment => {
        const releaseDate = getReleaseDate(payment)
        const today = moment().format('MMMM DD YYYY')
        if (moment(today).isSameOrAfter(releaseDate)) {
          return payment
        }
      })
      setInTransitPayments(
        inTransit.filter(payment => payment.sentPaymentToTutor === false)
      )
      setPaymentsLoaded(true)
    }
  }, [paymentsReceived])

  useEffect(() => {
    if (paymentsLoaded && cashoutsLoaded) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [paymentsLoaded, cashoutsLoaded])

  const handleShowModal = type => {
    setShowModal(type)
  }

  const [selectedPaymentDetails, setSelectedPaymentDetails] = useState(null)

  const handleShowModalPayment = payment => {
    setSelectedPaymentDetails(payment)
    setShowModal('details')
  }

  return (
    <>
      {!isLoading ? (
        <div className='flex flex-col pb-6 justify-center items-center w-full'>
          <div className='flex flex-row justify-center items-center w-full rounded-md'>
            <div className='flex flex-col items-center justify-center w-full h-full'>
              <h1 className='text-2xl mt-2 lg:text-4xl font-bold lg:mt-6 dark:text-gray-200'>
                Detalles de cobros
              </h1>
              <div className='flex flex-row max-lg:flex-col justify-between items-center w-full lg:px-3 lg:space-x-6 max-lg:space-y-3 h-full py-3 lg:mt-6'>
                <div className='flex flex-col justify-center items-center border w-full h-full rounded-md max-lg:px-3 bg-white dark:bg-gray-800 dark:border-none dark:shadow-none shadow-md border-orange-200 shadow-orange-100'>
                  <FontAwesomeIcon
                    icon={faClockRotateLeft}
                    className='text-xl p-3 lg:mb-3 mb-1 mt-5 text-blue-500 bg-blue-200  rounded-md'
                  />
                  <h1 className='text-2xl max-lg:text-lg font-bold text-[#05004E] dark:text-blue-500'>
                    Recibidos
                  </h1>
                  <div className='flex flex-row justify-between items-center w-5/6 space-x-3 px-3 h-full lg:py-3 py-2'>
                    <div className='flex flex-col justify-center items-center w-full rounded-md h-full'>
                      <FontAwesomeIcon
                        icon={faWarning}
                        className='text-lg text-orange-500 bg-[#ffe6cb]  p-3 rounded-md'
                      />
                      <h1 className='text-md lg:mt-3 mt-1 max-lg:text-sm font-bold dark:text-orange-500 text-[#05004E]'>
                        Pendientes{' '}
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          className='text-sm text-orange-500 hover:text-orange-600 transition-all duration-200 cursor-pointer'
                          onClick={() => handleShowModal('pending')}
                        />
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 text-gray-400 dark:text-gray-200'>
                        USD${' '}
                        {(
                          (frozenPayments.reduce(
                            (acc, payment) =>
                              acc + payment.paymentDetails.amount,
                            0
                          ) /
                            100) *
                          0.9
                        ).toFixed(2)}
                      </h1>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full rounded-md h-full'>
                      <FontAwesomeIcon
                        icon={faSackDollar}
                        className='text-lg text-green-600 bg-[#cdf6d6] p-3 rounded-md lg:mb-3 mb-1'
                      />
                      <h1 className='text-md max-lg:text-sm font-bold dark:text-green-500 text-[#05004E]'>
                        Disponibles{' '}
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          className='text-sm text-green-600 hover:text-green-700 transition-all duration-200 cursor-pointer'
                          onClick={() => handleShowModal('available')}
                        />
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 text-gray-400 dark:text-gray-200'>
                        USD${' '}
                        {(
                          (availablePayments.reduce(
                            (acc, payment) =>
                              acc + payment.paymentDetails.amount,
                            0
                          ) /
                            100) *
                          0.9
                        ).toFixed(2)}
                      </h1>
                    </div>
                  </div>
                  <p className='text-sm text-gray-400 my-3'>
                    Los pagos se liberan 15 días después de que se hayan
                    completado
                  </p>
                </div>

                <div className='flex flex-col justify-center items-center border w-full h-full rounded-md bg-white shadow-md dark:bg-gray-800 dark:border-none dark:shadow-none border-codecolorlighter shadow-codecolorlighter max-lg:px-3'>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className='text-xl bg-codecolorlighter p-3 lg:mb-3 mb-1 mt-5 text-codecolor rounded-md'
                  />
                  <h1 className='text-2xl max-lg:text-lg font-bold text-[#05004E] dark:text-codecolor'>
                    Cobrados
                  </h1>
                  <div className='flex flex-row justify-between items-center w-5/6 space-x-3 px-3 h-full lg:py-3 py-2'>
                    <div className='flex flex-col justify-center items-center w-full rounded-md h-full'>
                      <FontAwesomeIcon
                        icon={faHand}
                        className='text-lg  lg:mb-3 mb-1 text-gray-600 bg-gray-200  p-3 rounded-md'
                      />
                      <h1 className='text-md max-lg:text-sm font-bold text-[#05004E] dark:text-gray-400'>
                        En tránsito{' '}
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-700 transition-all duration-200 cursor-pointer'
                          onClick={() => handleShowModal('transit')}
                        />
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 text-gray-400 dark:text-gray-200'>
                        USD${' '}
                        {(
                          (inTransitPayments.reduce(
                            (acc, payment) =>
                              acc + payment.paymentDetails.amount,
                            0
                          ) /
                            100) *
                          0.9
                        ).toFixed(2)}
                      </h1>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full rounded-md h-full'>
                      <FontAwesomeIcon
                        icon={faShare}
                        className='text-lg text-yellow-600 bg-yellow-100 p-3 rounded-md lg:mb-3 mb-1'
                      />
                      <h1 className='text-md max-lg:text-sm font-bold text-[#05004E] dark:text-yellow-500'>
                        Enviados{' '}
                        <FontAwesomeIcon
                          icon={faQuestionCircle}
                          className='text-sm text-yellow-500 hover:text-yellow-600 transition-all duration-200 cursor-pointer'
                          onClick={() => handleShowModal('sent')}
                        />
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 text-gray-400 dark:text-gray-200'>
                        USD${' '}
                        {sentPayments
                          .reduce(
                            (acc, payment) =>
                              acc + Number(payment.paymentDetails.amount),
                            0
                          )
                          .toFixed(2)}
                      </h1>
                    </div>
                  </div>
                  <p className='text-sm text-gray-400 my-3'>
                    Los pagos pueden demorar hasta 10 días en llegar a tu cuenta
                  </p>
                </div>
              </div>
              {disputedPayments.length > 0 && (
                <div className='lg:px-3 w-full'>
                  <div
                    className='px-3 py-4 flex flex-col items-center justify-center
              bg-red-100 dark:bg-gray-800 min-h-40 rounded-md'
                  >
                    <p className='text-lg max-lg:text-sm dark:text-red-500 text-[#05004E] font-bold mt-3 mb-2 w-full'>
                      Los siguientes pagos se encuentran bajo disputa y no
                      pueden ser retirados:{' '}
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className='text-sm text-red-500 hover:text-red-600 transition-all duration-200 cursor-pointer'
                        onClick={() => handleShowModal('disputed')}
                      />
                    </p>
                    <div className='flex flex-col justify-center items-center w-full lg:mb-3 mb-2'>
                      <ul className='w-full flex flex-col items-center justify-center list-disc list-inside text-gray-600 dark:text-gray-200 font-bold'>
                        {disputedPayments.map(payment => (
                          <>
                            <li className='list-item text-md flex-row justify-center items-center w-full px-3 max-lg:text-sm'>
                              Sesión con {payment.clientUserId.fullName} -{' '}
                              {moment
                                .unix(payment.paymentDetails.date)
                                .format('DD/MM/YYYY HH:mm')}{' '}
                              hs - USD${' '}
                              {(
                                (payment.paymentDetails.amount / 100) *
                                0.9
                              ).toFixed(2)}
                            </li>
                          </>
                        ))}
                      </ul>
                    </div>
                    <p className='text-sm text-[#05004E] dark:text-gray-400'>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className='text-[#05004E] dark:text-gray-400 mr-1'
                      />{' '}
                      Si tienes alguna duda, contáctanos a{' '}
                      <a
                        href='mailto:support@code-tutor.dev'
                        className='text-codecolor dark:font-semibold hover:text-codecolordark transition-all duration-200'
                      >
                        support@code-tutor.dev
                      </a>
                      .
                    </p>
                  </div>
                </div>
              )}
              {sentPayments.length > 0 && (
                <div className='px-3 w-full'>
                  <p className='text-lg max-lg:text-md text-[#05004E] dark:text-gray-200 font-bold mt-3 mb-2 w-full'>
                    Historial de pagos:{' '}
                  </p>
                  <div className='lg:hidden'>
                    {sentPayments.map(payment => (
                      <div
                        key={payment._id}
                        className='flex flex-col border-b border-gray-200 dark:border-b-gray-800 py-4 px-4 space-y-1'
                      >
                        <div className='flex flex-row justify-between '>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Fecha de pago
                          </p>
                          <p className='text-gray-400 text-center font-semibold text-sm'>
                            {moment(payment.paymentDetails.date).format(
                              'DD/MM/YYYY HH:mm:ss'
                            )}{' '}
                            hs
                          </p>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Monto
                          </p>
                          <p className='text-gray-400 text-center font-semibold text-sm'>
                            USD$ {payment.amount}
                          </p>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Estado
                          </p>
                          <span
                            className={
                              `font-semibold text-sm ` +
                              (payment.status === 'pending'
                                ? ' text-yellow-600'
                                : payment.status === 'failed'
                                ? 'text-red-600'
                                : payment.status === 'success'
                                ? 'text-green-600'
                                : '')
                            }
                          >
                            <FontAwesomeIcon
                              icon={
                                payment.status === 'pending'
                                  ? faClock
                                  : payment.status === 'failed'
                                  ? faTimes
                                  : payment.status === 'success'
                                  ? faCheck
                                  : ''
                              }
                              className='mr-1.5 mb-[1.01px] text-xs'
                            />
                            Exitoso
                          </span>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Cuenta bancaria
                          </p>
                          <p className='text-gray-400 text-center font-semibold text-sm'>
                            {payment.paymentDetails.bankAccount.accountNumber}
                          </p>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Comprobante
                          </p>
                          <span className='text-yellow-600 font-semibold text-sm cursor-pointer'>
                            <FontAwesomeIcon
                              icon={faFileInvoice}
                              className='mr-1 text-xs'
                            />
                            <a
                              href={payment.paymentDetails.receiptUrl}
                              target='_blank'
                              rel='noreferrer'
                            >
                              Descargar
                            </a>
                          </span>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Detalles
                          </p>

                          <span
                            className=' text-codecolor font-semibold text-sm cursor-pointer'
                            onClick={() => handleShowModalPayment(payment)}
                          >
                            <FontAwesomeIcon
                              icon={faEye}
                              className='mr-1 text-xs'
                            />
                            Ver detalles
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className='flex flex-col mt-5 w-full px-3 lg:border dark:border-gray-800 rounded-md'>
                    <table className='w-full max-lg:hidden'>
                      <thead>
                        <tr className='text-black dark:text-gray-200'>
                          <th className='py-3 px-6 text-center'>
                            Fecha de pago
                          </th>
                          <th className='py-3 px-6 text-center'>Monto</th>
                          <th className='py-3 px-6 text-center'>Estado</th>
                          <th className='py-3 px-6 text-center'>
                            Cuenta bancaria
                          </th>
                          <th className='py-3 px-6 text-center'>Comprobante</th>
                          <th className='py-3 px-6 text-center'>Detalles</th>
                        </tr>
                      </thead>
                      <tbody className='text-gray-600 text-md font-md'>
                        {sentPayments.map(payment => (
                          <tr
                            key={payment._id}
                            className='text-black dark:text-gray-200'
                          >
                            <td className='py-2 pb-4 px-4'>
                              {moment(payment.paymentDetails.date).format(
                                'DD/MM/YYYY HH:mm:ss'
                              )}{' '}
                              hs
                            </td>
                            <td className='py-2 pb-4 px-4'>
                              USD$ {payment.amount}
                            </td>
                            <td className='py-2 pb-4 px-4'>
                              <span
                                className={
                                  `px-2 py-1 rounded-md font-semibold ` +
                                  (payment.status === 'pending'
                                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-600 dark:text-yellow-100'
                                    : payment.status === 'failed'
                                    ? 'bg-red-100 text-red-600 dark:bg-red-600 dark:text-red-100'
                                    : payment.status === 'success'
                                    ? 'bg-green-200 text-green-600 dark:bg-green-600 dark:text-green-200'
                                    : '')
                                }
                              >
                                <FontAwesomeIcon
                                  icon={
                                    payment.status === 'pending'
                                      ? faClock
                                      : payment.status === 'failed'
                                      ? faTimes
                                      : payment.status === 'success'
                                      ? faCheck
                                      : ''
                                  }
                                  className='mr-1.5 mb-[1.01px] text-xs'
                                />
                                Exitoso
                              </span>
                            </td>
                            <td className='py-2 pb-4 px-4'>
                              {payment.paymentDetails.bankAccount.bankName} -{' '}
                              {payment.paymentDetails.bankAccount.accountNumber}
                            </td>
                            <td className='py-2 pb-4 px-4'>
                              <span className='text-yellow-600 bg-yellow-100 py-0.5 px-2 ml-2 rounded-md font-semibold text-sm cursor-pointer dark:text-yellow-100 dark:bg-yellow-600'>
                                <FontAwesomeIcon
                                  icon={faFileInvoice}
                                  className='mr-1 text-xs'
                                />
                                <a
                                  href={payment.paymentDetails.receiptUrl}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  Descargar comprobante
                                </a>
                              </span>
                            </td>
                            <td className='py-2 pb-4 px-4'>
                              <span
                                className='bg-codecolorlighter text-codecolor py-0.5 px-2 ml-2 rounded-md font-semibold text-sm cursor-pointer dark:bg-codecolor dark:text-codecolorlighter'
                                onClick={() => handleShowModalPayment(payment)}
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className='mr-1 text-xs'
                                />
                                Ver detalles
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {!sentPayments.length > 0 && (
                <div className='px-3 w-full mt-5'>
                  <p className='text-md text-[#05004E] dark:text-gray-200'>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className='text-[#05004E] mr-1 dark:text-gray-200'
                    />{' '}
                    No tienes un historial de cobros aún.
                  </p>
                </div>
              )}
            </div>
          </div>
          {showModal !== null && (
            <div className='fixed z-[9999] inset-0 overflow-y-auto'>
              {/* overlay */}
              <div className='flex items-end justify-center lg:min-h-screen max-lg:h-[calc(100svh-250px)] pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                {/* background overlay */}
                <div
                  className='fixed inset-0 transition-opacity'
                  aria-hidden='true'
                >
                  <div className='absolute inset-0 bg-gray-500 opacity-75' />
                </div>
                {/* center modal */}
                <span
                  className='hidden sm:inline-block sm:align-middle sm:h-screen'
                  aria-hidden='true'
                >
                  &#8203;
                </span>
                {/* modal content */}
                <div
                  className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-h-[800px]'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                    <div className='sm:flex sm:items-start'>
                      <div
                        className={
                          `mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ` +
                          (showModal === 'pending'
                            ? ' bg-[#ffe6cb]'
                            : showModal === 'available'
                            ? ' bg-[#cdf6d6]'
                            : showModal === 'transit'
                            ? ' bg-gray-200'
                            : showModal === 'sent'
                            ? ' bg-yellow-100'
                            : showModal === 'disputed'
                            ? 'bg-red-100'
                            : ' bg-[#cdf6d6]')
                        }
                      >
                        <FontAwesomeIcon
                          icon={
                            showModal === 'pending'
                              ? faWarning
                              : showModal === 'available'
                              ? faSackDollar
                              : showModal === 'transit'
                              ? faHand
                              : showModal === 'sent'
                              ? faShare
                              : showModal === 'disputed'
                              ? faExclamationTriangle
                              : faCheck
                          }
                          className={
                            `text-lg` +
                            (showModal === 'pending'
                              ? ' text-orange-500'
                              : showModal === 'available'
                              ? ' text-green-600'
                              : showModal === 'transit'
                              ? ' text-gray-600'
                              : showModal === 'sent'
                              ? ' text-yellow-600'
                              : showModal === 'disputed'
                              ? ' text-red-600'
                              : ' text-green-600')
                          }
                        />
                      </div>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <h3
                          className='text-lg mt-2 leading-6 font-medium text-gray-900 dark:text-gray-200'
                          id='modal-headline'
                        >
                          {showModal === 'pending'
                            ? 'Pagos pendientes'
                            : showModal === 'available'
                            ? 'Pagos disponibles'
                            : showModal === 'transit'
                            ? 'Pagos en tránsito'
                            : showModal === 'sent'
                            ? 'Pagos enviados'
                            : showModal === 'disputed'
                            ? 'Pagos en disputa'
                            : `Detalles del pago ${selectedPaymentDetails._id}`}
                        </h3>
                        <div className='mt-5 space-y-3'>
                          {showModal === 'pending' && (
                            <p className='text-sm text-gray-800 dark:text-gray-200'>
                              Los pagos pendientes son aquellos que aún no han
                              sido liberados para su retiro. Recuerda que los
                              pagos se liberan 15 días después que se haya
                              realizado la sesión.
                            </p>
                          )}
                          {showModal === 'available' && (
                            <p className='text-sm text-gray-800 dark:text-gray-200'>
                              Los pagos disponibles son aquellos que ya han sido
                              liberados para su retiro pero aún no se encuentran
                              en tránsito. Recuerda que los pagos disponibles
                              entran en tránsito los días 1 y 15 de cada mes.
                            </p>
                          )}
                          {showModal === 'transit' && (
                            <p className='text-sm text-gray-800 dark:text-gray-200'>
                              Los pagos en tránsito son aquellos que ya han sido
                              liberados para su retiro y se encuentran en
                              proceso de ser enviados a tu cuenta bancaria.
                              Nuestro equipo se encargará de realizar el envío
                              de tu pago a tu cuenta bancaria seleccionada lo
                              más pronto posible. Ten en cuenta que este proceso
                              puede tardar hasta 10 días hábiles.
                            </p>
                          )}
                          {showModal === 'sent' && (
                            <p className='text-sm text-gray-800 dark:text-gray-200'>
                              Los pagos enviados son aquellos que ya han sido
                              pagados por parte de nuestro equipo y ya deberías
                              verlos reflejados en tu cuenta bancaria. Si no
                              recibiste tu pago o tienes algún problema con el
                              mismo, puedes contactarnos a{' '}
                              <a
                                href='mailto:support@code-tutor.dev'
                                className='text-codecolor hover:text-codecolordark transition-all duration-200'
                              >
                                support@code-tutor.dev
                              </a>{' '}
                              y analizaremos tu situación.
                            </p>
                          )}
                          {showModal === 'disputed' && (
                            <p className='text-sm text-gray-800 dark:text-gray-200'>
                              Los pagos en disputa son aquellos que se
                              encuentran en proceso de análisis por parte de
                              nuestro equipo. Esto puede deberse a que el
                              cliente no esté conforme con la sesión, que se
                              haya presentado algún problema con el pago, o que
                              se necesite una verificación adicional. Nuestro
                              equipo se pondrá en contacto contigo para resolver
                              la situación. Si tienes alguna duda, puedes
                              contactarnos a{' '}
                              <a
                                href='mailto:support@code-tutor.dev'
                                className='text-codecolor hover:text-codecolordark transition-all duration-200'
                              >
                                support@code-tutor.dev
                              </a>
                              .
                            </p>
                          )}
                          {showModal === 'details' && (
                            <div className='space-y-3'>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>ID:</span>{' '}
                                {selectedPaymentDetails._id}
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Fecha:</span>{' '}
                                {moment(
                                  selectedPaymentDetails.paymentDetails.date
                                ).format('DD/MM/YYYY HH:mm:ss')}{' '}
                                hs
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Monto:</span>{' '}
                                $USD {selectedPaymentDetails.amount}
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Estado:</span>{' '}
                                {selectedPaymentDetails.status === 'pending'
                                  ? 'Pendiente'
                                  : selectedPaymentDetails.status === 'success'
                                  ? 'Exitoso'
                                  : selectedPaymentDetails.status === 'failed'
                                  ? 'Fallido'
                                  : 'En disputa'}
                              </p>
                              <p className='text-md text-gray-800 dark:text-gray-200 text-center'>
                                <span className='font-semibold'>Sesiones:</span>
                              </p>
                              <table className='w-full list-disc list-inside text-sm text-gray-800'>
                                <thead>
                                  <tr className='dark:bg-gray-800 dark:text-gray-200'>
                                    <th className='text-left'>Fecha</th>
                                    <th className='text-left'>Cliente</th>
                                    <th className='text-left'>Duración</th>
                                    <th className='text-left'>Precio</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedPaymentDetails.sessionsPaid.map(
                                    (session, index) => (
                                      <tr
                                        key={index}
                                        className={
                                          index % 2 === 0
                                            ? 'bg-gray-50 dark:bg-gray-800 dark:text-gray-200'
                                            : 'bg-white dark:bg-gray-700 dark:text-gray-200'
                                        }
                                      >
                                        <td className='py-1'>
                                          {moment(
                                            session.appointmentDate
                                          ).format('DD/MM/YYYY HH:mm')}{' '}
                                          hs
                                        </td>
                                        <td className='py-1'>
                                          {session.clientUserId.fullName}
                                        </td>
                                        <td className='py-1'>
                                          {session.minutes} minutos
                                        </td>
                                        <td className='py-1'>
                                          $USD {session.price}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                  <tr className='bg-gray-50 dark:border-t-gray-800 dark:bg-gray-700 border-t border-t-gray-200 dark:text-gray-200'>
                                    <td className='py-1'></td>
                                    <td className='py-1'></td>
                                    <td className='py-1 text-right pr-4'>
                                      <span className='font-semibold text-right'>
                                        Total:
                                      </span>
                                    </td>
                                    <td className='py-1'>
                                      $USD{' '}
                                      {selectedPaymentDetails.sessionsPaid.reduce(
                                        (a, b) => a + b.price,
                                        0
                                      )}{' '}
                                    </td>
                                  </tr>
                                  <tr className='bg-gray-50 dark:border-t-gray-800  dark:bg-gray-700 dark:text-gray-200 border-t border-t-gray-200'>
                                    <td className='py-1'></td>
                                    <td className='py-1'></td>
                                    <td className='py-1 pr-4 text-right'>
                                      <span className='font-semibold'>
                                        Comisión:
                                      </span>
                                    </td>
                                    <td className='py-1'>
                                      $USD{' '}
                                      {(
                                        selectedPaymentDetails.sessionsPaid.reduce(
                                          (a, b) => a + b.price,
                                          0
                                        ) * 0.1
                                      ).toFixed(2)}{' '}
                                    </td>
                                  </tr>
                                  <tr className='bg-gray-50 dark:border-t-gray-800  dark:bg-gray-700 dark:text-gray-200 border-t border-t-gray-200'>
                                    <td className='py-1'></td>
                                    <td className='py-1'></td>
                                    <td className='py-1 text-right pr-4'>
                                      <span className='font-semibold text-right'>
                                        Pagado:
                                      </span>
                                    </td>
                                    <td className='py-1'>
                                      $USD{' '}
                                      {(
                                        selectedPaymentDetails.sessionsPaid.reduce(
                                          (a, b) => a + b.price,
                                          0
                                        ) * 0.9
                                      ).toFixed(2)}{' '}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
                    <button
                      type='button'
                      className={
                        `w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 sm:ml-3 sm:w-24 sm:text-sm` +
                        (showModal === 'pending'
                          ? ' bg-[#ffe6cb] text-orange-500 hover:bg-[#ffd8a8] hover:text-orange-600'
                          : showModal === 'available'
                          ? ' bg-[#cdf6d6] text-green-600 hover:bg-[#b3f0c3] hover:text-green-700'
                          : showModal === 'transit'
                          ? ' bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-700'
                          : showModal === 'sent'
                          ? ' bg-yellow-100 text-yellow-600 hover:bg-[#ece2b8] hover:text-yellow-700'
                          : showModal === 'disputed'
                          ? ' bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-700'
                          : ' bg-[#cdf6d6] text-green-600 hover:bg-[#b3f0c3] hover:text-green-700')
                      }
                      onClick={() => setShowModal(null)}
                    >
                      Aceptar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center pt-72'>
          <Loader />
        </div>
      )}
    </>
  )
}
