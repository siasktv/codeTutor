/* eslint-disable react/prop-types */
import {
  PictureTutor,
  CountryTutor,
  ConexionStateTutor,
  // ReviewsTutorTotal,
  PriceHourGray,
  LanguageTutor,
  DescriptionTutor,
  TechnicalSkillsTutor
} from '../../components'

import {
  Calendario,
  MensajeTexto,
  Moneda,
  Pais,
  Star2
} from '../../assets/index'
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { userFetchById } from '../../redux/features/users/usersSlice'
import { SocketContext, socket } from '../../socket/context'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const CardTutor = props => {
  const dispatch = useDispatch()
  const { tutor, handleShowMessage, user, tutorFavorites } = props
  const userMongo = useSelector(state => state.users.user)
  const socket = useContext(SocketContext)

  const isFavoriteTutor = tutorFavorites?.find(t => t._id === tutor._id)

  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const reviewCount = tutor.reviews ? tutor.reviews.length : 0
  const totalRatings = tutor.reviews
    ? tutor.reviews.reduce((total, review) => {
        if (!isNaN(review.rating)) {
          return total + review.rating
        }
        return total
      }, 0)
    : 0
  const averageRating = reviewCount > 0 ? totalRatings / reviewCount : 0

  const handleShowModal = e => {
    e.preventDefault()
    setShowModal(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = e => {
    e.preventDefault()
    setShowModal(false)
    document.body.style.overflow = 'auto'
  }

  const handleAddFavorites = e => {
    e.preventDefault()
    socket.emit('addTutorFavorite', {
      userId: user.id,
      tutor: tutor
    })
  }

  const handleRemoveFavorites = e => {
    e.preventDefault()
    socket.emit('removeTutorFavorite', {
      userId: user.id,
      tutor: tutor
    })
  }

  const buttonClasses = classNames(
    'bg-codecolorlighter shadow-sm border flex justify-center -mt-6 ml-12 items-center w-8 h-8 text-white rounded-full'
  )

  return (
    <div>
      <div className='pb-5'>
        <div className='flex p-9 justify-between bg-white border border-gray-200 shadow-md rounded-lg'>
          {/* Imagen de perfil */}

          <div className='flex flex-col'>
            <div className='w-20 h-20 rounded-full overflow-hidden'>
              <PictureTutor image={tutor.user.image} />
            </div>

            {!isFavoriteTutor ? (
              <button
                onClick={e => handleAddFavorites(e)}
                className={buttonClasses}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 512 512'
                  fill='#573b94'
                >
                  <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
                </svg>
              </button>
            ) : (
              <button
                onClick={e => handleRemoveFavorites(e)}
                className={buttonClasses}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='1em'
                  viewBox='0 0 512 512'
                  fill='#573b94'
                >
                  <path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z' />
                </svg>
              </button>
            )}
          </div>

          {/* Información del tutor */}
          <div className='p-2 w-3/4 h-1/2'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold'>{tutor.user.fullName}</h2>
              <ConexionStateTutor offline={tutor.user.offline} tutor={tutor} />
            </div>

            <div className='pt-2 pb-2 flex justify-between items-center'>
              <div className='flex space-x-3'>
                <h2 className='text-2xl font-medium'>{tutor.bio.specialty}</h2>
                <div className='flex items-center space-x-2'>
                  <div className='flex justify-center items-center space-x-2'>
                    {Array.from({ length: Math.round(averageRating) }).map(
                      (_, index) => (
                        <img key={index} src={Star2} />
                      )
                    )}
                  </div>
                </div>
              </div>
              {tutor.reviews && (
                <h2 className='font-semibold text-gray-600'>
                  {tutor.reviews.length} Reviews
                </h2>
              )}
            </div>

            <div className='flex justify-start items-center'>
              <img src={Pais} />
              <CountryTutor location={tutor.user.location} />

              <span className='pl-4 pr-4 font-semibold text-sm text-gray-600'>
                ◦
              </span>

              <img src={Moneda} />

              <PriceHourGray rates={tutor.mentorship} />

              <span className='pl-4 pr-4 font-semibold text-sm text-gray-600'>
                ◦
              </span>

              <img src={Calendario} />
              <LanguageTutor languages={tutor.languages} />
            </div>
            <div className='pt-2 pb-2'>
              <DescriptionTutor description={tutor.bio.description} />
            </div>
            <div className='pt-2 pb-2'>
              <div className='grid grid-cols-4 gap-3'>
                <TechnicalSkillsTutor skills={tutor.skills} />
              </div>
            </div>
          </div>

          {user && user.uid !== tutor.user.uid ? (
            <button
              className='flex justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
              type='button'
              title='Contactar'
              onClick={event => handleShowMessage(event, tutor)}
            >
              <img src={MensajeTexto} />
            </button>
          ) : (
            <button
              className='flex justify-center items-center w-16 h-16 bg-gray-400 shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:outline-none focus:outline-none'
              type='button'
              title='Contactar'
              onClick={
                user
                  ? event => event.preventDefault()
                  : event => handleShowModal(event)
              }
            >
              <img src={MensajeTexto} />
            </button>
          )}

          {showModal ? (
            <div
              id='defaultModal'
              tabIndex='-1'
              aria-hidden='true'
              className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm'
              onClick={event => {
                event.preventDefault()
              }}
            >
              <div className='relative w-full max-w-2xl max-h-full p-4 mx-auto my-10 overflow-hidden transition-all transform cursor-default md:my-0 '>
                <div className='relative bg-white rounded-lg shadow border-codecolor border-2'>
                  <div className='flex items-start justify-between p-4 rounded-t'>
                    <button
                      type='button'
                      className='text-codecolor bg-transparent hover:text-codecolordark rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                      data-modal-hide='defaultModal'
                      aria-label='Close'
                      onClick={event => {
                        handleCloseModal(event)
                      }}
                    >
                      <svg
                        aria-hidden='true'
                        className='w-5 h-5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                      <span className='sr-only'>Cerrar</span>
                    </button>
                  </div>
                  <div className='space-y-6'>
                    <p className='text-xl leading-relaxed text-gray-900 font-semibold'>
                      Debes iniciar sesión para poder contactar con el tutor.
                    </p>
                  </div>
                  <div className='flex items-center p-6 space-x-2 justify-center rounded-b'>
                    <button
                      data-modal-hide='defaultModal'
                      type='button'
                      className='text-white bg-codecolor hover:bg-codecolordark hover:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-100 ease-in-out'
                      onClick={event => {
                        event.preventDefault()
                        document.body.style.overflow = 'auto'
                        navigate('/login?redirect=/search')
                      }}
                    >
                      Iniciar sesión
                    </button>
                    <button
                      data-modal-hide='defaultModal'
                      type='button'
                      className='text-white bg-red-500 hover:bg-red-700 hover:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-100 ease-in-out'
                      onClick={event => {
                        handleCloseModal(event)
                      }}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default CardTutor
