import {
  faCheck,
  faCheckCircle,
  faCheckDouble,
  faClock,
  faClockRotateLeft,
  faEnvelope,
  faExclamationTriangle,
  faExternalLinkAlt,
  faEye,
  faFile,
  faFileArchive,
  faFileCircleCheck,
  faFileInvoice,
  faHand,
  faHandHoldingUsd,
  faIcicles,
  faInfoCircle,
  faQuestion,
  faQuestionCircle,
  faSackDollar,
  faShare,
  faTimes,
  faUpload,
  faWarning
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCompleteSessions } from '../../../redux/features/sessions/sessionsSlice'
import { fetchAllCashouts } from '../../../redux/features/cashouts/cashoutsSlice'
import { tutorsFetch } from '../../../redux/features/tutors/tutorsSlice'
import moment from 'moment/moment'
moment.locale('es')
import Loader from '../../../components/Loader'
import { uploadImage } from '../../../firebase/client'
import axios from 'axios'
import { LoaderMini } from '../../../components'

export default function Payments (props) {
  const { user } = props
  const [paymentsReceived, setPaymentsReceived] = useState([])

  const dispatch = useDispatch()
  const sessions = useSelector(state => state.sessions.allCompleteSessions)
  const cashouts = useSelector(state => state.cashouts.allCashouts)
  const tutors = useSelector(state => state.tutors.allTutors)

  const [frozenPayments, setFrozenPayments] = useState([])
  const [availablePayments, setAvailablePayments] = useState([])
  const [inTransitPayments, setInTransitPayments] = useState([])
  const [sentPayments, setSentPayments] = useState([])
  const [disputedPayments, setDisputedPayments] = useState([])
  const [showModal, setShowModal] = useState(null)
  const [paymentsLoaded, setPaymentsLoaded] = useState(false)
  const [cashoutsLoaded, setCashoutsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState('awaiting')

  useEffect(() => {
    dispatch(fetchCompleteSessions())
    dispatch(fetchAllCashouts())
    dispatch(tutorsFetch())
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
      const finalInTransit = inTransit.filter(
        payment => payment.sentPaymentToTutor === false
      )

      // separate payments by tutorUserId
      const paymentsByTutor = []
      finalInTransit.forEach(payment => {
        const tutorId = payment.tutorUserId._id
        const tutorPayments = finalInTransit.filter(
            payment => payment.tutorUserId._id === tutorId
          ),
          tutorPaymentsObject = {
            tutorId: tutorId,
            payments: tutorPayments
          }
        paymentsByTutor.push(tutorPaymentsObject)
      })

      // remove duplicates tutors
      const uniqueTutors = []
      paymentsByTutor.forEach(payment => {
        const tutorId = payment.tutorId
        const tutorPayments = payment.payments
        const tutorPaymentsObject = {
          tutorId: tutorId,
          payments: tutorPayments
        }
        if (!uniqueTutors.includes(tutorId)) {
          uniqueTutors.push(tutorId)
        }
      })

      // create final array of payments
      const finalPayments = []
      uniqueTutors.forEach(tutor => {
        const tutorPayments = paymentsByTutor.filter(
          payment => payment.tutorId === tutor
        )
        const tutorPaymentsObject = {
          tutorId: tutor,
          ...tutorPayments[0]
        }
        finalPayments.push(tutorPaymentsObject)
      })
      setInTransitPayments(finalPayments)
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

  const [errorFile, setErrorFile] = useState(null)
  const [file, setFile] = useState(null)

  const handleUploadImage = async e => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    if (
      !file.type.includes('image/png') &&
      !file.type.includes('image/jpeg') &&
      !file.type.includes('image/jpg') &&
      !file.type.includes('application/pdf')
    ) {
      setErrorFile('Comprobante no válido')

      return
    }
    // check if file is larger than 5mb
    if (file.size > 5000000) {
      setErrorFile('El archivo es demasiado grande')

      return
    }
    try {
      const task = uploadImage(file)
      task.on(
        'state_changed',
        snapshot => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          // if there is an error, console.log it
          console.log(error)
        },
        () => {
          // when the image is uploaded, get the url and set it to imageURL and input.image
          task.snapshot.ref.getDownloadURL().then(url => {
            setFile(url)
            setErrorFile(null)
          })
        }
      )
    } catch (error) {
      setIsUploading(false)
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    setShowModal(null)
    setErrorFile(null)
    setFile(null)
    setSelectedPaymentDetails(null)
    setSelectedSentPayment(null)
  }

  const [isLoadingPayment, setIsLoadingPayment] = useState(false)
  const [successPayment, setSuccessPayment] = useState(false)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const handleSendPayment = async () => {
    if (!file || successPayment || isLoadingPayment) {
      setErrorFile('Debes subir un comprobante de pago')
      return
    } else {
      setErrorFile(null)
    }
    setIsLoadingPayment(true)
    const sessions = selectedPaymentDetails.payments
    const userId = selectedPaymentDetails.tutorId
    const tutorId = tutors.filter(tutor => tutor.user._id === userId)[0]._id
    const tutor = tutors.filter(tutor => tutor.user._id === userId)[0]
    const sessionsToDb = sessions.map(session => session.id)
    const payment = {
      amount: (
        sessions.reduce((acc, session) => acc + session.price, 0) * 0.9
      ).toFixed(2),
      date: moment().valueOf(),
      status: 'success',
      bankAccount: {
        bankName: tutor.bankAccount.bankName,
        accountNumber: tutor.bankAccount.accountNumber,
        accountType: tutor.bankAccount.accountType,
        accountHolder: tutor.bankAccount.accountHolder
      },
      receiptUrl: file
    }
    const response = await axios
      .post(`${BACKEND_URL}/api/pay`, {
        payment: payment,
        sessions: sessionsToDb,
        tutorId: tutorId,
        userId: userId
      })
      .catch(error => {
        console.log(error)
      })
    if (response) {
      setInTransitPayments(prevState => {
        const newInTransitPayments = prevState.filter(
          payment => payment.tutorId !== userId
        )
        return newInTransitPayments
      })
      dispatch(fetchAllCashouts())
      setIsLoadingPayment(false)
      setSuccessPayment(true)
      setTimeout(() => {
        setShowModal(null)
        setSuccessPayment(false)
        setFile(null)
        setErrorFile(null)
      }, 2000)
    }
  }
  const [selectedSentPayment, setSelectedSentPayment] = useState(null)

  const handleShowModalSentPayment = payment => {
    setSelectedSentPayment(payment)
    setShowModal('send')
  }

  const handleShowModalDisputed = payment => {
    setSelectedSentPayment(payment)
    setShowModal('disputed')
  }

  return (
    <>
      {!isLoading ? (
        <div className='flex flex-col pb-6 justify-center items-center lg:w-5/6 w-full'>
          <div className='flex flex-row justify-center items-center w-full rounded-md'>
            <div className='flex flex-col items-center justify-center w-full h-full'>
              <h1 className='text-2xl mt-2 lg:text-4xl font-bold lg:mt-6 dark:text-gray-200'>
                Detalles de pagos
              </h1>
              <div className='flex flex-row max-lg:flex-col justify-between items-center w-full lg:px-3 lg:space-x-6 max-lg:space-y-3 h-full py-3 lg:mt-6'>
                <div className='flex flex-col justify-center items-center border w-full h-full rounded-md max-lg:px-3 dark:bg-gray-800 dark:border-none dark:shadow-none bg-white shadow-md border-orange-200 shadow-orange-100'>
                  <FontAwesomeIcon
                    icon={faIcicles}
                    className='text-xl p-3 lg:mb-3 mb-1 mt-5 text-blue-500 bg-blue-200  rounded-md'
                  />
                  <h1 className='text-2xl max-lg:text-lg font-bold text-[#05004E] dark:text-blue-500'>
                    Congelados
                  </h1>
                  <div className='flex flex-row justify-between items-center w-5/6 space-x-3 px-3 h-full lg:py-3 py-2'>
                    <div className='flex flex-col justify-center items-center w-full rounded-md h-full'>
                      <FontAwesomeIcon
                        icon={faWarning}
                        className='text-lg text-orange-500 bg-[#ffe6cb]  p-3 rounded-md'
                      />
                      <h1 className='text-md lg:mt-3 mt-1 max-lg:text-sm font-bold text-[#05004E] dark:text-orange-500'>
                        Pendientes{' '}
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 dark:text-gray-200 text-gray-400'>
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
                      <h1 className='text-md max-lg:text-sm dark:text-green-500 font-bold text-[#05004E]'>
                        Disponibles{' '}
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 dark:text-gray-200 text-gray-400'>
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

                <div className='flex flex-col justify-center items-center border w-full h-full rounded-md bg-white shadow-md border-codecolorlighter shadow-codecolorlighter max-lg:px-3 dark:bg-gray-800 dark:border-none dark:shadow-none'>
                  <FontAwesomeIcon
                    icon={faCheck}
                    className='text-xl bg-codecolorlighter p-3 lg:mb-3 mb-1 mt-5 text-codecolor rounded-md'
                  />
                  <h1 className='text-2xl max-lg:text-lg font-bold dark:text-codecolor text-[#05004E]'>
                    Liberados
                  </h1>
                  <div className='flex flex-row justify-between items-center w-5/6 space-x-3 px-3 h-full lg:py-3 py-2'>
                    <div className='flex flex-col justify-center items-center w-full rounded-md h-full'>
                      <FontAwesomeIcon
                        icon={faHand}
                        className='text-lg  lg:mb-3 mb-1 text-gray-600 bg-gray-200  p-3 rounded-md'
                      />
                      <h1 className='text-md max-lg:text-sm font-bold dark:text-gray-400 text-[#05004E]'>
                        Aguardando{' '}
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 dark:text-gray-200 text-gray-400'>
                        USD${' '}
                        {(
                          inTransitPayments.reduce(
                            (acc, payment) =>
                              acc +
                              payment.payments.reduce(
                                (acc, payment) => acc + payment.price,
                                0
                              ),
                            0
                          ) * 0.9
                        ).toFixed(2)}
                      </h1>
                    </div>
                    <div className='flex flex-col justify-center items-center w-full rounded-md h-full'>
                      <FontAwesomeIcon
                        icon={faShare}
                        className='text-lg text-yellow-600 bg-yellow-100 p-3 rounded-md lg:mb-3 mb-1'
                      />
                      <h1 className='text-md max-lg:text-sm font-bold dark:text-yellow-500 text-[#05004E]'>
                        Pagados{' '}
                      </h1>
                      <h1 className='text-2xl max-lg:text-sm font-bold lg:mt-3 dark:text-gray-200 text-gray-400'>
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
                    Los pagos deben ser enviados dentro de los siguientes 10
                    días desde que se liberan
                  </p>
                </div>
              </div>
              {/* section selector */}
              <div className='lg:hidden w-full'>
                <select
                  className='w-full font-semibold cursor-pointer rounded-md bg-white shadow-md border px-3 py-2 dark:bg-gray-800 dark:border-none dark:text-gray-200 dark:outline-none'
                  onChange={e => setSelectedSection(e.target.value)}
                >
                  <option
                    value='awaiting'
                    selected={selectedSection === 'awaiting'}
                    className='cursor-pointer'
                  >
                    Pendientes
                  </option>
                  <option
                    value='sent'
                    selected={selectedSection === 'sent'}
                    className='cursor-pointer'
                  >
                    Pagados
                  </option>
                  <option
                    value='disputed'
                    selected={selectedSection === 'disputed'}
                    className='cursor-pointer'
                  >
                    Disputados
                  </option>
                </select>
              </div>
              <div className='flex flex-row justify-center items-center w-full px-3 mt-6 max-lg:hidden'>
                <div className='flex flex-row justify-center items-center w-full space-x-3'>
                  <button
                    className={`flex flex-row justify-center items-center w-full py-3 rounded-md ${
                      selectedSection === 'sent'
                        ? 'bg-[#05004E] text-white dark:bg-codecolor'
                        : 'bg-white text-[#05004E] dark:bg-gray-800 dark:text-codecolor'
                    }`}
                    onClick={() => setSelectedSection('sent')}
                  >
                    <FontAwesomeIcon
                      icon={faShare}
                      className={`text-lg mr-2 ${
                        selectedSection === 'sent'
                          ? 'text-white'
                          : 'text-[#05004E] dark:text-codecolor'
                      }`}
                    />
                    <h1
                      className={`text-md font-bold ${
                        selectedSection === 'sent'
                          ? 'text-white'
                          : 'text-[#05004E] dark:text-codecolor'
                      }`}
                    >
                      Enviados
                    </h1>
                  </button>
                  <button
                    className={`flex flex-row justify-center items-center w-full py-3 rounded-md ${
                      selectedSection === 'awaiting'
                        ? 'bg-[#05004E] text-white dark:bg-codecolor'
                        : 'bg-white text-[#05004E] dark:bg-gray-800 dark:text-codecolor'
                    }`}
                    onClick={() => setSelectedSection('awaiting')}
                  >
                    <FontAwesomeIcon
                      icon={faHand}
                      className={`text-lg mr-2 ${
                        selectedSection === 'awaiting'
                          ? 'text-white'
                          : 'text-[#05004E] dark:text-codecolor'
                      }`}
                    />
                    <h1
                      className={`text-md font-bold ${
                        selectedSection === 'awaiting'
                          ? 'text-white'
                          : 'text-[#05004E] dark:text-codecolor'
                      }`}
                    >
                      Aguardando
                    </h1>
                  </button>
                  <button
                    className={`flex flex-row justify-center items-center w-full py-3 rounded-md ${
                      selectedSection === 'disputed'
                        ? 'bg-[#05004E] text-white dark:bg-codecolor'
                        : 'bg-white text-[#05004E] dark:bg-gray-800 dark:text-codecolor'
                    }`}
                    onClick={() => setSelectedSection('disputed')}
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className={`text-lg mr-2 ${
                        selectedSection === 'disputed'
                          ? 'text-white'
                          : 'text-[#05004E] dark:text-codecolor'
                      }`}
                    />
                    <h1
                      className={`text-md font-bold ${
                        selectedSection === 'disputed'
                          ? 'text-white'
                          : 'text-[#05004E] dark:text-codecolor'
                      }`}
                    >
                      Disputados
                    </h1>
                  </button>
                </div>
              </div>
              {selectedSection === 'sent' && (
                <>
                  {sentPayments.length > 0 && (
                    <div className='px-3 w-full'>
                      <div className='flex flex-col lg:mt-5 w-full lg:px-3 lg:border dark:border-gray-800 rounded-md'>
                        <div className='lg:hidden'>
                          {sentPayments.map(payment => (
                            <div
                              key={payment._id}
                              className='flex flex-col border-b dark:border-gray-800 border-gray-200 py-4 lg:px-4 space-y-1'
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
                                  {
                                    payment.paymentDetails.bankAccount
                                      .accountNumber
                                  }
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
                                  onClick={() => {
                                    handleShowModalSentPayment(payment)
                                  }}
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
                              <th className='py-3 px-6 text-center'>
                                Comprobante
                              </th>
                              <th className='py-3 px-6 text-center'>
                                Detalles
                              </th>
                            </tr>
                          </thead>
                          <tbody className='text-gray-600 dark:text-gray-200 text-md font-md'>
                            {sentPayments.map(payment => (
                              <tr
                                key={payment._id}
                                className='text-black dark:text-gray-200 '
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
                                        ? 'bg-green-200 text-green-600 dark:bg-green-600 dark:text-green-100'
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
                                  {payment.paymentDetails.bankAccount.bankName}{' '}
                                  -{' '}
                                  {
                                    payment.paymentDetails.bankAccount
                                      .accountNumber
                                  }
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  <span className='text-yellow-600 bg-yellow-100 py-0.5 px-2 ml-2 rounded-md font-semibold text-sm cursor-pointer dark:bg-yellow-600 dark:text-yellow-100'>
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
                                    className='bg-codecolorlighter text-codecolor py-0.5 px-2 ml-2 rounded-md font-semibold text-sm cursor-pointer dark:text-codecolorlighter dark:bg-codecolor'
                                    onClick={() => {
                                      handleShowModalSentPayment(payment)
                                    }}
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
                        No hay pagos realizados aún.
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedSection === 'awaiting' && (
                <>
                  {inTransitPayments.length > 0 && (
                    <div className='px-3 w-full'>
                      <div className='flex flex-col mt-5 w-full lg:px-3 dark:border-gray-800 lg:border rounded-md'>
                        <div className='lg:hidden'>
                          {inTransitPayments.map(payment => (
                            <div
                              key={payment.tutorId}
                              className='flex flex-col border-b dark:border-gray-800 border-gray-200 py-4 lg:px-4 space-y-1'
                            >
                              <div className='flex flex-row justify-between '>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Liberación
                                </p>
                                <p className='text-gray-400 text-center font-semibold text-sm'>
                                  {moment(
                                    getReleaseDate(payment.payments[0])
                                  ).format('DD/MM/YYYY')}{' '}
                                  (
                                  {moment(
                                    getReleaseDate(payment.payments[0])
                                  ).fromNow()}
                                  )
                                </p>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Monto
                                </p>
                                <p className='text-gray-400 text-center font-semibold text-sm'>
                                  USD${' '}
                                  {(
                                    payment.payments.reduce(
                                      (acc, payment) => acc + payment.price,
                                      0
                                    ) * 0.9
                                  ).toFixed(2)}
                                </p>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Estado
                                </p>
                                <span className='text-yellow-600 text-sm font-semibold'>
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    className='mr-1.5 mb-[1.01px] text-xs'
                                  />
                                  Pendiente
                                </span>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Cuenta bancaria
                                </p>
                                <p className='text-gray-400 text-center font-semibold text-sm'>
                                  {
                                    tutors.find(
                                      tutor =>
                                        tutor.user._id === payment.tutorId
                                    ).bankAccount.accountNumber
                                  }
                                </p>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Pagar
                                </p>
                                <span
                                  className=' text-codecolor font-semibold text-sm cursor-pointer'
                                  onClick={() =>
                                    handleShowModalPayment(payment)
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className='mr-1 text-xs'
                                  />
                                  Ver detalles y pagar
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                        <table className='w-full max-lg:hidden'>
                          <thead>
                            <tr className='text-black dark:text-gray-200'>
                              <th className='py-3 px-6 text-center'>
                                Fecha de liberación
                              </th>
                              <th className='py-3 px-6 text-center'>Monto</th>
                              <th className='py-3 px-6 text-center'>Estado</th>
                              <th className='py-3 px-6 text-center'>
                                Cuenta bancaria
                              </th>
                              <th className='py-3 px-6 text-center'>Pagar</th>
                            </tr>
                          </thead>
                          <tbody className='text-gray-600 dark:text-gray-200 text-md font-md'>
                            {inTransitPayments.map(payment => (
                              <tr
                                className='text-black dark:text-gray-200'
                                key={payment.tutorId}
                              >
                                <td className='py-2 pb-4 px-4'>
                                  {moment(
                                    getReleaseDate(payment.payments[0])
                                  ).format('DD/MM/YYYY')}{' '}
                                  (
                                  {moment(
                                    getReleaseDate(payment.payments[0])
                                  ).fromNow()}
                                  )
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  USD${' '}
                                  {(
                                    payment.payments.reduce(
                                      (acc, payment) => acc + payment.price,
                                      0
                                    ) * 0.9
                                  ).toFixed(2)}
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  <span className='px-2 py-1 rounded-md font-semibold bg-yellow-100 text-yellow-600 dark:text-yellow-100 dark:bg-yellow-600'>
                                    <FontAwesomeIcon
                                      icon={faClock}
                                      className='mr-1.5 mb-[1.01px] text-xs'
                                    />
                                    Pendiente
                                  </span>
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  {
                                    tutors.find(
                                      tutor =>
                                        tutor.user._id === payment.tutorId
                                    ).bankAccount.accountNumber
                                  }
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  <span
                                    className='bg-codecolorlighter text-codecolor py-0.5 px-2 ml-2 rounded-md font-semibold text-sm cursor-pointer dark:bg-codecolor dark:text-codecolorlighter'
                                    onClick={() =>
                                      handleShowModalPayment(payment)
                                    }
                                  >
                                    <FontAwesomeIcon
                                      icon={faEye}
                                      className='mr-1 text-xs'
                                    />
                                    Ver detalles y pagar
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {!inTransitPayments.length > 0 && (
                    <div className='px-3 w-full mt-5'>
                      <p className='text-md text-[#05004E] dark:text-gray-200'>
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className='text-[#05004E] mr-1 dark:text-gray-200'
                        />{' '}
                        No hay pagos pendientes.
                      </p>
                    </div>
                  )}
                </>
              )}
              {selectedSection === 'disputed' && (
                <>
                  {disputedPayments.length > 0 && (
                    <div className='px-3 w-full'>
                      <div className='flex flex-col lg:mt-5 w-full lg:px-3 dark:border-gray-800 lg:border rounded-md'>
                        <div className='lg:hidden'>
                          {disputedPayments.map(payment => (
                            <div
                              key={payment._id}
                              className='flex flex-col border-b dark:border-gray-800 border-gray-200 py-4 lg:px-4 space-y-1'
                            >
                              <div className='flex flex-row justify-between '>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Fecha
                                </p>
                                <p className='text-gray-400 text-center font-semibold text-sm'>
                                  {moment(getReleaseDate(payment)).format(
                                    'DD/MM/YYYY'
                                  )}{' '}
                                  ({moment(getReleaseDate(payment)).fromNow()})
                                </p>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Monto
                                </p>
                                <p className='text-gray-400 text-center font-semibold text-sm'>
                                  USD$ {payment.price}
                                </p>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Estado
                                </p>
                                <span className='text-red-600 text-sm font-semibold'>
                                  <FontAwesomeIcon
                                    icon={faWarning}
                                    className='mr-1 text-xs'
                                  />
                                  Disputado
                                </span>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Cliente
                                </p>
                                <p className='text-gray-400 text-center font-semibold text-sm'>
                                  {payment.clientUserId.fullName}
                                </p>
                              </div>
                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Tutor
                                </p>
                                <p className='text-gray-400 text-center font-semibold text-sm'>
                                  {payment.tutorUserId.fullName}
                                </p>
                              </div>

                              <div className='flex flex-row justify-between'>
                                <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                  Detalles
                                </p>

                                <span
                                  className=' text-codecolor font-semibold text-sm cursor-pointer'
                                  onClick={() =>
                                    handleShowModalDisputed(payment)
                                  }
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
                        <table className='w-full max-lg:hidden'>
                          <thead>
                            <tr className='text-black dark:text-gray-200'>
                              <th className='py-3 px-6 text-center'>
                                Fecha de sesión
                              </th>
                              <th className='py-3 px-6 text-center'>Monto</th>
                              <th className='py-3 px-6 text-center'>Estado</th>
                              <th className='py-3 px-6 text-center'>Cliente</th>
                              <th className='py-3 px-6 text-center'>Tutor</th>
                              <th className='py-3 px-6 text-center'>
                                Ver detalles
                              </th>
                            </tr>
                          </thead>
                          <tbody className='text-gray-600 dark:text-gray-200 text-md font-md'>
                            {disputedPayments.map(payment => (
                              <tr
                                className='text-black dark:text-gray-200'
                                key={payment.tutorId}
                              >
                                <td className='py-2 pb-4 px-4'>
                                  {moment(getReleaseDate(payment)).format(
                                    'DD/MM/YYYY'
                                  )}{' '}
                                  ({moment(getReleaseDate(payment)).fromNow()})
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  USD$ {payment.price}
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  <span className='px-2 py-1 rounded-md font-semibold bg-red-200 text-red-600 dark:bg-red-600 dark:text-red-100'>
                                    <FontAwesomeIcon
                                      icon={faExclamationTriangle}
                                      className='mr-1.5 mb-[1.01px] text-xs'
                                    />
                                    Disputado
                                  </span>
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  {payment.clientUserId.fullName}
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  {payment.tutorUserId.fullName}
                                </td>
                                <td className='py-2 pb-4 px-4'>
                                  <span
                                    className='bg-codecolorlighter text-codecolor py-0.5 px-2 ml-2 rounded-md dark:bg-codecolor dark:text-codecolorlighter font-semibold text-sm cursor-pointer'
                                    onClick={() =>
                                      handleShowModalDisputed(payment)
                                    }
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
                  {!disputedPayments.length > 0 && (
                    <div className='px-3 w-full mt-5'>
                      <p className='text-md text-[#05004E] dark:text-gray-200'>
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className='text-[#05004E] mr-1 dark:text-gray-200'
                        />{' '}
                        No hay pagos disputados.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          {showModal !== null && (
            <div className='fixed z-[9999] inset-0 overflow-y-auto'>
              {/* overlay */}
              <div className='flex items-end justify-center lg:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
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
                  className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] bg-white dark:bg-gray-800 rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full lg:max-h-[800px] max-lg:max-h-[calc(100svh-70px)]'
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex items-center justify-center'>
                    <div className='sm:flex sm:items-start'>
                      <div
                        className={
                          `mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10` +
                          (showModal === 'details'
                            ? ` bg-codecolorlighter`
                            : showModal === 'send'
                            ? ` bg-green-200`
                            : showModal === 'disputed'
                            ? ` bg-red-200`
                            : ` bg-codecolorlighter`)
                        }
                      >
                        {showModal === 'send' && (
                          <FontAwesomeIcon
                            icon={faShare}
                            className={`text-lg text-green-600`}
                          />
                        )}
                        {showModal === 'details' && (
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            className={`text-lg text-codecolor`}
                          />
                        )}
                        {showModal === 'disputed' && (
                          <FontAwesomeIcon
                            icon={faExclamationTriangle}
                            className={`text-lg text-red-600`}
                          />
                        )}
                      </div>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                        <h3
                          className='text-lg mt-2 leading-6 font-medium dark:text-gray-200 text-gray-900'
                          id='modal-headline'
                        >
                          {showModal !== 'disputed' && (
                            <>
                              Detalles del pago:
                              {showModal === 'send' &&
                                ` ${selectedSentPayment._id}`}
                            </>
                          )}
                          {showModal === 'disputed' && (
                            <>
                              Detalles del pago de la sesión{' '}
                              {selectedSentPayment.sessionId}:
                            </>
                          )}
                        </h3>
                        <div className='mt-5 space-y-3'>
                          {showModal === 'details' && (
                            <div className='space-y-3'>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>
                                  Fecha de liberación:
                                </span>{' '}
                                {moment(
                                  getReleaseDate(
                                    selectedPaymentDetails.payments[0]
                                  )
                                ).format('DD/MM/YYYY')}{' '}
                                (
                                {moment(
                                  getReleaseDate(
                                    selectedPaymentDetails.payments[0]
                                  )
                                ).fromNow()}
                                )
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>
                                  Monto a pagar:
                                </span>{' '}
                                $USD{' '}
                                {(
                                  selectedPaymentDetails.payments.reduce(
                                    (acc, payment) => acc + payment.price,
                                    0
                                  ) * 0.9
                                ).toFixed(2)}
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Estado:</span>{' '}
                                <span className='px-2 py-1 rounded-md font-semibold bg-yellow-100 text-yellow-600 dark:text-yellow-100 dark:bg-yellow-600'>
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    className='mr-1.5 mb-[1.01px] text-xs'
                                  />
                                  Pendiente
                                </span>
                              </p>
                              <p className='text-md text-gray-800 dark:text-gray-200 text-center'>
                                <span className='font-semibold'>Sesiones:</span>
                              </p>
                              <table className='w-full list-disc list-inside text-sm text-gray-800 dark:text-gray-200'>
                                <thead>
                                  <tr>
                                    <th className='text-left px-4'>Fecha</th>
                                    <th className='text-left px-4'>Cliente</th>
                                    <th className='text-left px-4'>Duración</th>
                                    <th className='text-left px-4'>Precio</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedPaymentDetails.payments.map(
                                    payment => (
                                      <tr key={payment.id} className=''>
                                        <td className='py-2 px-4'>
                                          {moment(
                                            payment.appointmentDate
                                          ).format('DD/MM/YYYY HH:mm')}
                                        </td>
                                        <td className='py-2 px-4'>
                                          {payment.clientUserId.fullName}
                                        </td>
                                        <td className='py-2 px-4'>
                                          {payment.minutes} minutos
                                        </td>
                                        <td className='py-2 px-4'>
                                          $USD {payment.price}
                                        </td>
                                      </tr>
                                    )
                                  )}
                                  <tr className='border-t border-gray-200'>
                                    <td className='py-2 px-4 font-semibold'>
                                      Total sin comisión:
                                    </td>
                                    <td className='py-2 px-4'></td>
                                    <td className='py-2 px-4'></td>
                                    <td className='py-2 px-4 font-semibold'>
                                      $USD{' '}
                                      {selectedPaymentDetails.payments.reduce(
                                        (acc, payment) => acc + payment.price,
                                        0
                                      )}
                                    </td>
                                  </tr>
                                  <tr className='border-t border-gray-200'>
                                    <td className='py-2 px-4 font-semibold'>
                                      Comisión:
                                    </td>
                                    <td className='py-2 px-4'></td>
                                    <td className='py-2 px-4'></td>
                                    <td className='py-2 px-4 font-semibold'>
                                      $USD{' '}
                                      {(
                                        selectedPaymentDetails.payments.reduce(
                                          (acc, payment) => acc + payment.price,
                                          0
                                        ) * 0.1
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr className='border-t border-gray-200'>
                                    <td className='py-2 px-4 font-semibold'>
                                      Total a pagar:
                                    </td>
                                    <td className='py-2 px-4'></td>
                                    <td className='py-2 px-4'></td>
                                    <td className='py-2 px-4 font-semibold bg-codecolorlighter text-codecolor rounded-md dark:bg-codecolor dark:text-codecolorlight'>
                                      $USD{' '}
                                      {(
                                        selectedPaymentDetails.payments.reduce(
                                          (acc, payment) => acc + payment.price,
                                          0
                                        ) * 0.9
                                      ).toFixed(2)}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className='flex flex-col items-center justify-center space-y-2'>
                                <p className='text-md text-gray-900 dark:text-gray-200 mb-1'>
                                  <span className='font-semibold'>
                                    Datos de pago:
                                  </span>
                                </p>
                                <p className='text-sm text-gray-800 dark:text-gray-200'>
                                  <span className='font-semibold'>
                                    Nombre del tutor:
                                  </span>{' '}
                                  {
                                    tutors.find(
                                      tutor =>
                                        tutor.user._id ===
                                        selectedPaymentDetails.tutorId
                                    ).user.fullName
                                  }
                                </p>
                                <p className='text-sm text-gray-800 dark:text-gray-200'>
                                  <span className='font-semibold'>Banco:</span>{' '}
                                  {
                                    tutors.find(
                                      tutor =>
                                        tutor.user._id ===
                                        selectedPaymentDetails.tutorId
                                    ).bankAccount.bankName
                                  }
                                </p>
                                <p className='text-sm text-gray-800 dark:text-gray-200'>
                                  <span className='font-semibold'>
                                    CBU/CVU:
                                  </span>{' '}
                                  {
                                    tutors.find(
                                      tutor =>
                                        tutor.user._id ===
                                        selectedPaymentDetails.tutorId
                                    ).bankAccount.accountNumber
                                  }
                                </p>
                                <p className='text-sm text-gray-800 dark:text-gray-200'>
                                  <span className='font-semibold'>
                                    Tipo de cuenta:
                                  </span>{' '}
                                  {
                                    tutors.find(
                                      tutor =>
                                        tutor.user._id ===
                                        selectedPaymentDetails.tutorId
                                    ).bankAccount.accountType
                                  }
                                </p>
                                <p className='text-sm text-gray-800 dark:text-gray-200'>
                                  <span className='font-semibold'>
                                    Correo electrónico:
                                  </span>{' '}
                                  {
                                    tutors.find(
                                      tutor =>
                                        tutor.user._id ===
                                        selectedPaymentDetails.tutorId
                                    ).user.email
                                  }
                                </p>
                              </div>
                              <div className='flex flex-col items-center justify-center space-y-2'>
                                {!file && (
                                  <>
                                    <input
                                      type='file'
                                      name='file'
                                      id='file'
                                      className='hidden'
                                      onChange={e => handleUploadImage(e)}
                                    />
                                    <label
                                      htmlFor='file'
                                      className={`inline-flex justify-center rounded-md -sm px-4 py-2 text-base font-medium text-orange-700 transition-all duration-200 sm:text-sm text-center cursor-pointer bg-orange-100 hover:bg-orange-200 items-center`}
                                    >
                                      <FontAwesomeIcon
                                        icon={faUpload}
                                        className='mr-2'
                                      />
                                      Subir comprobante de pago
                                    </label>
                                  </>
                                )}
                                {errorFile && (
                                  <p className='text-sm text-red-500'>
                                    {errorFile}
                                  </p>
                                )}
                                {file && (
                                  <div>
                                    <a
                                      href={file}
                                      target='_blank'
                                      rel='noreferrer'
                                      className='flex flex-row items-center justify-center space-x-2'
                                    >
                                      <FontAwesomeIcon
                                        icon={faFileCircleCheck}
                                        className='text-md text-orange-600'
                                      />
                                      <p className='text-sm text-orange-600'>
                                        Comprobante subido
                                      </p>
                                      <FontAwesomeIcon
                                        icon={faExternalLinkAlt}
                                        className='text-sm text-orange-600'
                                      />
                                    </a>
                                  </div>
                                )}

                                <button
                                  type='button'
                                  className={
                                    file
                                      ? ` inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 sm:ml-3 lg:w-24 sm:text-sm text-white bg-codecolor hover:bg-codecolordark h-10 items-center`
                                      : `inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 sm:ml-3 lg:w-24 sm:text-sm text-gray-400 dark:bg-gray-700 bg-gray-200 cursor-not-allowed h-10 items-center`
                                  }
                                  onClick={() => handleSendPayment()}
                                  disabled={!file}
                                >
                                  {isLoadingPayment ? (
                                    <LoaderMini />
                                  ) : successPayment ? (
                                    <FontAwesomeIcon
                                      icon={faCheckCircle}
                                      className='text-md text-white'
                                    />
                                  ) : (
                                    'Pagar'
                                  )}
                                </button>
                              </div>
                            </div>
                          )}
                          {showModal === 'disputed' && (
                            <div className='space-y-3'>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>
                                  ID de sesión:
                                </span>{' '}
                                {selectedSentPayment.sessionId}
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Fecha:</span>{' '}
                                {moment
                                  .unix(selectedSentPayment.paymentDetails.date)
                                  .format('DD/MM/YYYY HH:mm:ss')}{' '}
                                hs
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Monto:</span>{' '}
                                $USD {selectedSentPayment.price} (-10% = $USD{' '}
                                {(selectedSentPayment.price * 0.9).toFixed(2)})
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Estado:</span>{' '}
                                <span className='text-red-500 dark:font-semibold'>
                                  Disputado
                                </span>
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>
                                  Email del tutor:
                                </span>{' '}
                                {selectedSentPayment.tutorUserId.email}
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>
                                  Email del cliente:
                                </span>{' '}
                                {selectedSentPayment.clientUserId.email}
                              </p>
                            </div>
                          )}

                          {showModal === 'send' && (
                            <div className='space-y-3'>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>ID:</span>{' '}
                                {selectedSentPayment._id}
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Fecha:</span>{' '}
                                {moment(
                                  selectedSentPayment.paymentDetails.date
                                ).format('DD/MM/YYYY HH:mm:ss')}{' '}
                                hs
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Monto:</span>{' '}
                                $USD {selectedSentPayment.amount}
                              </p>
                              <p className='text-sm text-gray-800 dark:text-gray-200'>
                                <span className='font-semibold'>Estado:</span>{' '}
                                {selectedSentPayment.status === 'pending'
                                  ? 'Pendiente'
                                  : selectedSentPayment.status === 'success'
                                  ? 'Exitoso'
                                  : selectedSentPayment.status === 'failed'
                                  ? 'Fallido'
                                  : 'En disputa'}
                              </p>
                              <p className='text-md text-gray-800 dark:text-gray-200 text-center'>
                                <span className='font-semibold'>Sesiones:</span>
                              </p>
                              <table className='w-full list-disc list-inside text-sm text-gray-800 dark:text-gray-200'>
                                <thead>
                                  <tr>
                                    <th className='text-left'>Fecha</th>
                                    <th className='text-left'>Cliente</th>
                                    <th className='text-left'>Duración</th>
                                    <th className='text-left'>Precio</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {selectedSentPayment.sessionsPaid.map(
                                    (session, index) => (
                                      <tr
                                        key={index}
                                        className={
                                          index % 2 === 0
                                            ? 'bg-gray-50 dark:bg-gray-800'
                                            : 'bg-white dark:bg-gray-700'
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
                                  <tr className='bg-gray-50 dark:bg-gray-700 dark:border-gray-800 border-t border-t-gray-200'>
                                    <td className='py-1'></td>
                                    <td className='py-1'></td>
                                    <td className='py-1 text-right pr-4'>
                                      <span className='font-semibold text-right'>
                                        Total:
                                      </span>
                                    </td>
                                    <td className='py-1'>
                                      $USD{' '}
                                      {selectedSentPayment.sessionsPaid.reduce(
                                        (a, b) => a + b.price,
                                        0
                                      )}{' '}
                                    </td>
                                  </tr>
                                  <tr className='bg-gray-50 dark:bg-gray-700 dark:border-gray-800  border-t border-t-gray-200'>
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
                                        selectedSentPayment.sessionsPaid.reduce(
                                          (a, b) => a + b.price,
                                          0
                                        ) * 0.1
                                      ).toFixed(2)}{' '}
                                    </td>
                                  </tr>
                                  <tr className='bg-gray-50 dark:bg-gray-700 dark:border-gray-800  border-t border-t-gray-200'>
                                    <td className='py-1'></td>
                                    <td className='py-1'></td>
                                    <td className='py-1 text-right pr-4'>
                                      <span className='font-semibold text-right'>
                                        Pagado:
                                      </span>
                                    </td>
                                    <td className='py-1'>
                                      $USD{' '}
                                      {selectedSentPayment.sessionsPaid.reduce(
                                        (a, b) => a + b.price,
                                        0
                                      ) * 0.9}{' '}
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
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 sm:ml-3 sm:w-24 sm:text-sm text-white bg-codecolor hover:bg-codecolordark`}
                      onClick={() => handleCloseModal()}
                    >
                      {showModal === 'send' || showModal === 'disputed'
                        ? 'Cerrar'
                        : 'Cancelar'}
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
