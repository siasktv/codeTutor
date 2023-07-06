import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { tutorsFetchAdmin } from '../../../redux/features/tutors/tutorsSlice'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faCheck,
  faCheckCircle,
  faClock,
  faEye,
  faGlobe,
  faLanguage,
  faLink,
  faLocationDot,
  faMoneyBill,
  faTriangleExclamation,
  faUser,
  faVideo,
  faXmark,
  faXmarkCircle
} from '@fortawesome/free-solid-svg-icons'
import { Loader, LoaderMini } from '../../../components'
import axios from 'axios'

export default function Tutors (props) {
  const { user } = props
  const dispatch = useDispatch()
  const tutors = useSelector(state => state.tutors.tutorsAdmin)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    dispatch(tutorsFetchAdmin())
  }, [])

  const [pendingTutors, setPendingTutors] = useState(['loading'])
  const [notPendingTutors, setNotPendingTutors] = useState(['loading'])
  const [finishedLoading, setFinishedLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState('')
  const [modalData, setModalData] = useState({})

  useEffect(() => {
    if (tutors) {
      setPendingTutors(tutors.filter(tutor => tutor.status === 'pending'))
      setNotPendingTutors(tutors.filter(tutor => tutor.status !== 'pending'))
    }
    setTimeout(() => {
      setFinishedLoading(true)
    }, 1200)
  }, [tutors])

  const handleCloseModal = () => {
    setShowModal(false)
    setModalType('')
    setModalData({})
  }

  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleApproveUser = async () => {
    if (isLoading || success) return
    setIsLoading(true)
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/tutors/accept/${modalData._id}`
      )
      setIsLoading(false)
      setSuccess(true)
      dispatch(tutorsFetchAdmin())
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const handleRejectUser = async () => {
    if (isLoading || success) return
    setIsLoading(true)
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/tutors/reject/${modalData._id}`
      )
      setIsLoading(false)
      setSuccess(true)
      dispatch(tutorsFetchAdmin())
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const handleEnableUser = async () => {
    if (isLoading || success) return
    setIsLoading(true)
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/tutors/enable/${modalData._id}`
      )
      setIsLoading(false)
      setSuccess(true)
      dispatch(tutorsFetchAdmin())
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  const handleDisableUser = async () => {
    if (isLoading || success) return
    setIsLoading(true)
    try {
      const res = await axios.put(
        `${BACKEND_URL}/api/tutors/disable/${modalData._id}`
      )
      setIsLoading(false)
      setSuccess(true)
      dispatch(tutorsFetchAdmin())
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (success === true) {
      setTimeout(() => {
        setSuccess(false)
        handleCloseModal()
      }, 1000)
    }
  }, [success])

  return (
    <div className='flex flex-col w-full items center justify-center'>
      {finishedLoading === true ? (
        <>
          {pendingTutors.length > 0 && (
            <>
              <h1 className='lg:text-4xl text-2xl font-bold dark:text-gray-200'>
                Tutores Pendientes
              </h1>
              <div className='flex flex-col w-full items-center justify-center mb-3'>
                {pendingTutors.length > 0 ? (
                  <>
                    <div className='flex flex-col mt-5 w-full lg:border dark:border-gray-800 rounded-md'>
                      <div className='lg:hidden'>
                        {pendingTutors.map(tutor => (
                          <div
                            key={tutor._id}
                            className='flex flex-col border-b border-gray-200 dark:border-gray-800 py-4 px-4 space-y-1'
                          >
                            <div className='flex flex-row justify-between '>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Fecha de inscripción
                              </p>
                              <p className='text-gray-400 text-center font-semibold text-sm'>
                                {moment(tutor.createdAt).format(
                                  'DD/MM/YYYY HH:mm:ss'
                                )}{' '}
                                hs
                              </p>
                            </div>
                            <div className='flex flex-row justify-between'>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Nombre
                              </p>
                              <p className='text-gray-400 text-center font-semibold text-sm'>
                                {tutor.user.fullName}
                              </p>
                            </div>
                            <div className='flex flex-row justify-between'>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Email
                              </p>
                              <p className='text-gray-400 text-center font-semibold text-sm'>
                                {tutor.user.email}
                              </p>
                            </div>
                            <div className='flex flex-row justify-between'>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Perfil
                              </p>
                              <span
                                className=' text-codecolor font-semibold text-sm cursor-pointer'
                                onClick={() => {
                                  setShowModal(true)
                                  setModalType('profile')
                                  setModalData(tutor)
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faEye}
                                  className='mr-2'
                                />
                                Ver perfil
                              </span>
                            </div>
                            <div className='flex flex-row justify-between'>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Tarifa / hora
                              </p>
                              <p className='text-gray-400 text-center font-semibold text-sm'>
                                USD${' '}
                                {
                                  tutor.rates.find(r => r.name === 'Mentorship')
                                    .value
                                }
                              </p>
                            </div>
                            <div className='flex flex-row justify-between'>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Promo
                              </p>
                              {tutor.rates.find(
                                rate => rate.name === 'Mentorship'
                              ).promo ? (
                                <span className='text-green-500 text-sm'>
                                  Si
                                </span>
                              ) : (
                                <span className='text-red-500 text-sm'>No</span>
                              )}
                            </div>
                            <div className='flex flex-row justify-between'>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Estado
                              </p>
                              <span className='text-yellow-500 text-sm'>
                                Pendiente
                              </span>
                            </div>
                            <div className='flex flex-row justify-between'>
                              <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                                Acciones
                              </p>
                              <div className='flex flex-row justify-center'>
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  className='mr-2 cursor-pointer text-green-500'
                                  onClick={() => {
                                    setShowModal(true)
                                    setModalType('approve')
                                    setModalData(tutor)
                                  }}
                                />
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className='cursor-pointer text-red-500'
                                  onClick={() => {
                                    setShowModal(true)
                                    setModalType('reject')
                                    setModalData(tutor)
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <table className='w-full border rounded-md dark:border-gray-800 max-lg:hidden'>
                        <thead className='text-center'>
                          <tr className='text-black dark:text-gray-200'>
                            <th className='py-2 pt-4 px-4'>
                              Fecha de inscripción
                            </th>
                            <th className='py-2 pt-4 px-4'>Nombre</th>
                            <th className='py-2 pt-4 px-4'>Email</th>
                            <th className='py-2 pt-4 px-4'>Perfil de tutor</th>
                            <th className='py-2 pt-4 px-4'>Tarifa / hora</th>
                            <th className='py-2 pt-4 px-4'>Promo</th>
                            <th className='py-2 pt-4 px-4'>Estado</th>
                            <th className='py-2 pt-4 px-4'>Acciones</th>
                          </tr>
                        </thead>
                        <tbody className='text-center'>
                          {pendingTutors.map(tutor => (
                            <tr
                              key={tutor._id}
                              className='border-t dark:border-t-gray-800 border-gray-200 text-gray-700 dark:text-gray-200'
                            >
                              <td className='py-2 pt-4 px-4'>
                                {moment(tutor.createdAt).format(
                                  'DD/MM/YYYY HH:mm:ss'
                                )}{' '}
                                hs
                              </td>
                              <td className='py-2 pt-4 px-4'>
                                {tutor.user.fullName}
                              </td>
                              <td className='py-2 pt-4 px-4'>
                                {tutor.user.email}
                              </td>
                              <td className='py-2 pt-4 px-4'>
                                <span
                                  className='bg-codecolorlighter text-codecolor font-semibold rounded-md px-2 py-1 text-sm cursor-pointer dark:text-codecolorlighter dark:bg-codecolor'
                                  onClick={() => {
                                    setShowModal(true)
                                    setModalType('profile')
                                    setModalData(tutor)
                                  }}
                                >
                                  <FontAwesomeIcon
                                    icon={faEye}
                                    className='mr-1 font-semibold'
                                  />
                                  Ver perfil
                                </span>
                              </td>
                              <td className='py-2 pt-4 px-4'>
                                USD${' '}
                                {
                                  tutor.rates.find(
                                    rate => rate.name === 'Mentorship'
                                  ).value
                                }
                              </td>
                              <td className='py-2 pt-4 px-4'>
                                {tutor.rates.find(
                                  rate => rate.name === 'Mentorship'
                                ).promo ? (
                                  <span className='text-green-500 font-semibold'>
                                    Si
                                  </span>
                                ) : (
                                  <span className='text-red-500 font-semibold'>
                                    No
                                  </span>
                                )}
                              </td>
                              <td className='py-2 pt-4 px-4'>
                                <span className='text-yellow-500 font-semibold'>
                                  Pendiente
                                </span>
                              </td>
                              <td className='py-2 pt-4 px-4 space-x-4'>
                                <FontAwesomeIcon
                                  icon={faCheckCircle}
                                  className='mr-2 cursor-pointer text-green-500'
                                  onClick={() => {
                                    setShowModal(true)
                                    setModalType('approve')
                                    setModalData(tutor)
                                  }}
                                />
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className='mr-2 cursor-pointer text-red-500'
                                  onClick={() => {
                                    setShowModal(true)
                                    setModalType('reject')
                                    setModalData(tutor)
                                  }}
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : (
                  <div className='flex flex-col w-full items-center justify-center'>
                    <h1 className='text-2xl font-bold dark:text-gray-200'>
                      No hay tutores pendientes
                    </h1>
                  </div>
                )}
              </div>
            </>
          )}
          <h1 className='text-2xl lg:text-4xl font-bold mt-0 lg:mt-10 dark:text-gray-200'>
            Gestionar tutores
          </h1>
          <div className='flex flex-col w-full items-center justify-center'>
            {notPendingTutors.length > 0 ? (
              <>
                <div className='flex flex-col mt-5 w-full lg:border dark:border-gray-800 rounded-md'>
                  <div className='lg:hidden'>
                    {notPendingTutors.map(tutor => (
                      <div
                        key={tutor._id}
                        className='flex flex-col border-b border-gray-200 dark:border-gray-800 py-4 px-4 space-y-1'
                      >
                        <div className='flex flex-row justify-between '>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Fecha de evaluación
                          </p>
                          <p className='text-gray-400 text-center font-semibold text-sm'>
                            {moment(tutor.updatedAt).format(
                              'DD/MM/YYYY HH:mm:ss'
                            )}{' '}
                            hs
                          </p>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Nombre
                          </p>
                          <p className='text-gray-400 text-center font-semibold text-sm'>
                            {tutor.user.fullName}
                          </p>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Email
                          </p>
                          <p className='text-gray-400 text-center font-semibold text-sm'>
                            {tutor.user.email}
                          </p>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Perfil
                          </p>
                          <span
                            className=' text-codecolor font-semibold text-sm cursor-pointer'
                            onClick={() => {
                              setShowModal(true)
                              setModalType('profile')
                              setModalData(tutor)
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} className='mr-1' />
                            Ver perfil
                          </span>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Tarifa / hora
                          </p>
                          <p className='text-gray-400 text-center font-semibold text-sm'>
                            USD${' '}
                            {
                              tutor.rates.find(r => r.name === 'Mentorship')
                                .value
                            }
                          </p>
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Promo
                          </p>
                          {tutor.rates.find(rate => rate.name === 'Mentorship')
                            .promo ? (
                            <span className='text-green-500 text-sm font-semibold'>
                              Si
                            </span>
                          ) : (
                            <span className='text-red-500 text-sm font-semibold'>
                              No
                            </span>
                          )}
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Estado
                          </p>
                          {tutor.status === 'approved' ? (
                            <span className='text-green-500 font-semibold text-sm'>
                              Aprobado
                            </span>
                          ) : tutor.status === 'rejected' ? (
                            <span className='text-red-500 font-semibold text-sm'>
                              Rechazado
                            </span>
                          ) : (
                            <span className='text-orange-500 font-semibold text-sm'>
                              Deshabilitado
                            </span>
                          )}
                        </div>
                        <div className='flex flex-row justify-between'>
                          <p className='text-[#05004E] dark:text-gray-200 text-center font-semibold text-sm'>
                            Acciones
                          </p>
                          <div className='flex flex-row justify-center'>
                            {tutor.status === 'approved' ? (
                              <span
                                className='text-red-500 font-semibold text-sm cursor-pointer'
                                onClick={() => {
                                  setShowModal(true)
                                  setModalType('disable')
                                  setModalData(tutor)
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className='mr-1'
                                />
                                Deshabilitar
                              </span>
                            ) : (
                              <span
                                className='text-green-500 font-semibold rounded-md text-sm cursor-pointer'
                                onClick={() => {
                                  setShowModal(true)
                                  setModalType('enable')
                                  setModalData(tutor)
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className='mr-2'
                                />
                                Habilitar
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <table className='w-full border rounded-md max-lg:hidden'>
                    <thead className='text-center'>
                      <tr className='text-black dark:text-gray-200'>
                        <th className='py-2 pt-4 px-4'>Fecha de evaluación</th>
                        <th className='py-2 pt-4 px-4'>Nombre</th>
                        <th className='py-2 pt-4 px-4'>Email</th>
                        <th className='py-2 pt-4 px-4'>Perfil de tutor</th>
                        <th className='py-2 pt-4 px-4'>Tarifa / hora</th>
                        <th className='py-2 pt-4 px-4'>Promo</th>
                        <th className='py-2 pt-4 px-4'>Estado</th>
                        <th className='py-2 pt-4 px-4'>Acciones</th>
                      </tr>
                    </thead>
                    <tbody className='text-center'>
                      {notPendingTutors.map(tutor => (
                        <tr
                          key={tutor._id}
                          className='border-t dark:text-gray-200 border-gray-200 dark:border-gray-800 text-gray-700'
                        >
                          <td className='py-2 pt-4 px-4'>
                            {moment(tutor.updatedAt).format(
                              'DD/MM/YYYY HH:mm:ss'
                            )}{' '}
                            hs
                          </td>
                          <td className='py-2 pt-4 px-4'>
                            {tutor.user.fullName}
                          </td>
                          <td className='py-2 pt-4 px-4'>{tutor.user.email}</td>
                          <td className='py-2 pt-4 px-4'>
                            <span
                              className='bg-codecolorlighter text-codecolor font-semibold rounded-md px-2 py-1 text-sm cursor-pointer dark:text-codecolorlighter dark:bg-codecolor'
                              onClick={() => {
                                setShowModal(true)
                                setModalType('profile')
                                setModalData(tutor)
                              }}
                            >
                              <FontAwesomeIcon icon={faEye} className='mr-2' />
                              Ver perfil
                            </span>
                          </td>
                          <td className='py-2 pt-4 px-4'>
                            USD${' '}
                            {
                              tutor.rates.find(
                                rate => rate.name === 'Mentorship'
                              ).value
                            }
                          </td>
                          <td className='py-2 pt-4 px-4'>
                            {tutor.rates.find(
                              rate => rate.name === 'Mentorship'
                            ).promo ? (
                              <span className='text-green-500'>Si</span>
                            ) : (
                              <span className='text-red-500'>No</span>
                            )}
                          </td>
                          <td className='py-2 pt-4 px-4'>
                            {tutor.status === 'approved' ? (
                              <span className='text-green-500'>Aprobado</span>
                            ) : tutor.status === 'rejected' ? (
                              <span className='text-red-500'>Rechazado</span>
                            ) : (
                              <span className='text-orange-500'>
                                Deshabilitado
                              </span>
                            )}
                          </td>
                          <td className='py-2 pt-4 px-4 space-x-4'>
                            {tutor.status === 'approved' ? (
                              <span
                                className='bg-red-500 text-white font-semibold rounded-md px-2 py-1 text-sm cursor-pointer'
                                onClick={() => {
                                  setShowModal(true)
                                  setModalType('disable')
                                  setModalData(tutor)
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faXmarkCircle}
                                  className='mr-2'
                                />
                                Deshabilitar
                              </span>
                            ) : (
                              <span
                                className='bg-green-500 text-white font-semibold rounded-md px-5 py-1 text-sm cursor-pointer'
                                onClick={() => {
                                  setShowModal(true)
                                  setModalType('enable')
                                  setModalData(tutor)
                                }}
                              >
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className='mr-2'
                                />
                                Habilitar
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className='flex flex-col w-full items-center justify-center'>
                <h1 className='text-2xl font-bold dark:text-gray-200'>
                  No hay tutores para gestionar
                </h1>
              </div>
            )}
          </div>

          {showModal === true && (
            <div className='fixed z-[9999] inset-0 overflow-y-auto'>
              {/* overlay */}
              <div className='flex items-end justify-center lg:min-h-screen pt-4 lg:px-4 pb-20 text-center sm:block sm:p-0 max-lg:px-2'>
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
                  className={
                    `inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] bg-white dark:bg-gray-800 rounded-lg text-left overflow-auto shadow-xl transform transition-all sm:my-8 sm:align-middle max-lg:max-h-[calc(100svh-50px)] lg:max-h-[calc(100svh-5rem)]` +
                    (modalType === 'profile'
                      ? ` lg:w-2/3 w-full`
                      : ` lg:w-1/3 w-full`)
                  }
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                >
                  <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex items-center'>
                    <div className='sm:flex sm:items-start w-full'>
                      <div
                        className={
                          `mx-auto flex-shrink-0 flex items-center justify-center h-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 w-12` +
                          (modalType === 'profile'
                            ? ` bg-codecolorlighter`
                            : modalType === 'approve' || modalType === 'enable'
                            ? ` bg-green-500`
                            : ` bg-red-500`)
                        }
                      >
                        {modalType === 'profile' && (
                          <FontAwesomeIcon
                            icon={faUser}
                            className={`text-lg text-codecolor`}
                          />
                        )}
                        {(modalType === 'approve' ||
                          modalType === 'enable') && (
                          <FontAwesomeIcon
                            icon={faCheck}
                            className={`text-lg text-white`}
                          />
                        )}
                        {(modalType === 'reject' ||
                          modalType === 'disable') && (
                          <FontAwesomeIcon
                            icon={faXmark}
                            className={`text-lg text-white`}
                          />
                        )}
                      </div>
                      <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                        <h3
                          className='text-lg mt-2 leading-6 font-medium text-gray-900 dark:text-gray-200'
                          id='modal-headline'
                        >
                          {modalType === 'profile' && (
                            <>Perfil de {modalData.user.fullName}:</>
                          )}
                          {modalType === 'approve' && (
                            <>Aprobar a {modalData.user.fullName}</>
                          )}
                          {modalType === 'reject' && (
                            <>Rechazar a {modalData.user.fullName}</>
                          )}
                          {modalType === 'enable' && (
                            <>Habilitar a {modalData.user.fullName}</>
                          )}
                          {modalType === 'disable' && (
                            <>Deshabilitar a {modalData.user.fullName}</>
                          )}
                        </h3>
                        <div className='mt-5 space-y-3 w-full'>
                          {modalType === 'profile' && (
                            <>
                              <div className='flex flex-col space-y-3 w-full'>
                                <div className='flex flex-row items-center'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200'>
                                    Nombre:
                                  </span>
                                  <span className='ml-2 text-md text-gray-900 dark:text-gray-200'>
                                    {modalData.user.fullName}
                                  </span>
                                </div>
                                <div className='flex flex-row items-center'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200'>
                                    Email:
                                  </span>
                                  <span className='ml-2 text-md text-gray-900 dark:text-gray-200'>
                                    {modalData.user.email}
                                  </span>
                                </div>
                                <div className='flex flex-row items-center'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200'>
                                    Idiomas:
                                  </span>
                                  <span className='ml-2 text-md text-gray-900 dark:text-gray-200'>
                                    {modalData.languages.map(
                                      (language, index) => (
                                        <span key={index}>
                                          {language.language}
                                          {index !==
                                          modalData.languages.length - 1
                                            ? ', '
                                            : ''}
                                        </span>
                                      )
                                    )}
                                  </span>
                                </div>
                                <div className='flex flex-row items-center'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200'>
                                    Especialidad:
                                  </span>
                                  <span className='ml-2 text-md text-gray-900 dark:text-gray-200'>
                                    {modalData.bio.specialty}
                                  </span>
                                </div>
                                <div className='flex flex-row items-center'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200'>
                                    Portafolio:
                                  </span>
                                  <a
                                    href={modalData.bio.linkBriefcase}
                                    target='_blank'
                                    className='ml-2 text-md text-codecolor hover:text-codecolordark transition duration-200'
                                  >
                                    {modalData.bio.linkBriefcase}
                                  </a>
                                </div>
                                <div className='flex flex-col items-start'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200 mb-3'>
                                    Biografía:
                                  </span>
                                  <span className='text-md text-left break-all text-gray-900 dark:text-gray-200'>
                                    {modalData.bio.description}
                                  </span>
                                </div>
                                <div className='flex flex-col items-start w-full'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200 mb-3'>
                                    Proyectos:
                                  </span>
                                  <div className='flex flex-col items-center space-y-4 w-full'>
                                    {modalData.projects.map(
                                      (project, index) => (
                                        <div
                                          key={index}
                                          className='flex flex-col justify-between border rounded-md p-4 space-y-2 border-gray-200 dark:border-gray-700 w-full'
                                        >
                                          <span className='text-md text-gray-900 dark:text-gray-200 font-semibold text-left'>
                                            {project.name}
                                          </span>
                                          <a
                                            href={project.link}
                                            target='_blank'
                                            className='text-md text-left text-codecolor hover:text-codecolordark transition duration-200'
                                          >
                                            {project.link}
                                          </a>
                                          <div className='flex flex-row w-full flex-wrap'>
                                            {project.techName.map(
                                              (tech, index) => (
                                                <>
                                                  <span
                                                    key={index}
                                                    className='text-sm text-codecolor bg-codecolorlighter font-semibold px-2 py-1 rounded-md mr-1 mb-1 dark:text-codecolorlighter dark:bg-codecolor'
                                                  >
                                                    {tech.name}
                                                  </span>
                                                </>
                                              )
                                            )}
                                          </div>
                                          <span className='text-md text-left text-gray-900 dark:text-gray-200 break-all'>
                                            {project.description}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className='flex flex-col items-start w-full'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200 mb-3'>
                                    Experiencia:
                                  </span>
                                  <div className='flex flex-col items-center space-y-4 w-full'>
                                    {modalData.experience.map(
                                      (experience, index) => (
                                        <div
                                          key={index}
                                          className='flex flex-col justify-between border rounded-md p-4 space-y-2 dark:border-gray-700 border-gray-200 w-full text-left'
                                        >
                                          <span className='text-md text-gray-900 dark:text-gray-200 font-semibold'>
                                            {experience.company} -{' '}
                                            <span className='text-md text-gray-500 dark:text-gray-300 font-normal'>
                                              {experience.position} (
                                              <FontAwesomeIcon
                                                icon={faLocationDot}
                                                className='text-gray-500 dark:text-gray-300 ml-1 text-sm'
                                              />{' '}
                                              {experience.location})
                                            </span>
                                          </span>
                                          <span className='text-md text-gray-900 dark:text-gray-200'>
                                            {moment(
                                              experience.start_date
                                            ).format('DD/MM/YYYY')}{' '}
                                            -{' '}
                                            {experience.end_date
                                              ? moment(
                                                  experience.end_date
                                                ).format('DD/MM/YYYY')
                                              : 'Actualidad'}
                                          </span>
                                          <div className='flex flex-row w-full flex-wrap'>
                                            {experience.techName.map(
                                              (tech, index) => (
                                                <span
                                                  key={index}
                                                  className='text-sm text-codecolor bg-codecolorlighter font-semibold px-2 py-1 rounded-md mr-1 mb-1 dark:text-codecolorlighter dark:bg-codecolor'
                                                >
                                                  {tech.name}
                                                </span>
                                              )
                                            )}
                                          </div>
                                          <span className='text-md break-all text-gray-900 dark:text-gray-200'>
                                            {experience.description}
                                          </span>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                                <div className='flex flex-col items-start'>
                                  <span className='text-md font-semibold text-gray-900 dark:text-gray-200 mb-3'>
                                    Skills:
                                  </span>
                                  <div className='flex flex-row w-full flex-wrap'>
                                    {modalData.skills.map((skill, index) => (
                                      <span
                                        key={index}
                                        className='text-sm text-codecolor bg-codecolorlighter font-semibold px-2 py-1 rounded-md mr-1 mb-1 dark:text-codecolorlighter dark:bg-codecolor'
                                      >
                                        {skill.techName.name}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                          {(modalType === 'approve' ||
                            modalType === 'enable') && (
                            <>
                              <p className='text-md text-gray-900 dark:text-gray-200 text-justify'>
                                <span className='font-semibold'>
                                  {' '}
                                  {modalType === 'approve'
                                    ? `¿Estás seguro que deseas aprobar a 
                                  ${modalData.user.fullName}?`
                                    : `¿Estás seguro que deseas habilitar a 
                                    ${modalData.user.fullName}?`}
                                </span>{' '}
                                {modalType === 'approve'
                                  ? 'Una vez aprobado, el usuario podrá acceder a la plataforma como tutor y dar sesiones a sus clientes.'
                                  : 'Una vez habilitado, el usuario podrá acceder a la plataforma como tutor y dar sesiones a sus clientes.'}
                              </p>
                            </>
                          )}
                          {(modalType === 'reject' ||
                            modalType === 'disable') && (
                            <>
                              <p className='text-md text-gray-900 dark:text-gray-200 text-justify'>
                                <span className='font-semibold'>
                                  {' '}
                                  {modalType === 'reject'
                                    ? `¿Estás seguro que deseas rechazar a 
                                    ${modalData.user.fullName}?`
                                    : `¿Estás seguro que deseas deshabilitar a 
                                    ${modalData.user.fullName}?`}
                                </span>{' '}
                                {modalType === 'reject'
                                  ? 'Una vez rechazado, el usuario no podrá acceder a la plataforma como tutor ni dar sesiones a sus clientes.'
                                  : 'Una vez deshabilitado, el usuario no podrá acceder a la plataforma como tutor ni dar sesiones a sus clientes.'}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 flex flex-row-reverse justify-start'>
                    {modalType === 'profile' && (
                      <button
                        type='button'
                        className={` inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 sm:ml-3 lg:w-24 sm:text-sm text-white bg-codecolor hover:bg-codecolordark`}
                        onClick={() => handleCloseModal()}
                      >
                        Cerrar
                      </button>
                    )}
                    {(modalType === 'approve' || modalType === 'enable') && (
                      <>
                        <button
                          type='button'
                          className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 lg:ml-3 lg:w-24 sm:text-sm text-white bg-green-500 hover:bg-green-600`}
                          disabled={isLoading || success}
                          onClick={
                            modalType === 'approve'
                              ? () => handleApproveUser()
                              : () => handleEnableUser()
                          }
                        >
                          {isLoading ? (
                            <LoaderMini />
                          ) : success ? (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className='text-white text-sm self-center'
                            />
                          ) : modalType === 'approve' ? (
                            'Aprobar'
                          ) : (
                            'Habilitar'
                          )}
                        </button>
                        <button
                          type='button'
                          className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 sm:ml-3 lg:w-24 sm:text-sm text-white bg-codecolor hover:bg-codecolordark max-lg:mr-2`}
                          onClick={() => handleCloseModal()}
                          disabled={isLoading || success}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                    {(modalType === 'reject' || modalType === 'disable') && (
                      <>
                        <button
                          type='button'
                          className={` inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 lg:ml-3 lg:w-24 sm:text-sm text-white bg-red-500 hover:bg-red-600`}
                          onClick={
                            modalType === 'reject'
                              ? () => handleRejectUser()
                              : () => handleDisableUser()
                          }
                          disabled={isLoading || success}
                        >
                          {isLoading ? (
                            <LoaderMini />
                          ) : success ? (
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className='text-white text-sm self-center'
                            />
                          ) : modalType === 'reject' ? (
                            'Rechazar'
                          ) : (
                            'Deshabilitar'
                          )}
                        </button>
                        <button
                          type='button'
                          className={`inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium transition-all duration-200 sm:ml-3 lg:w-24 sm:text-sm text-white bg-codecolor hover:bg-codecolordark max-lg:mr-2`}
                          onClick={() => handleCloseModal()}
                          disabled={isLoading || success}
                        >
                          Cancelar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className='flex flex-col pt-72 w-full items-center justify-center'>
          <Loader />
        </div>
      )}
    </div>
  )
}
