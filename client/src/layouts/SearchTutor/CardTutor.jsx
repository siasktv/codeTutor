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
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { userFetchById } from '../../redux/features/users/usersSlice'
import { SocketContext, socket } from '../../socket/context'
import {
  faDollar,
  faGlobe,
  faMapMarkerAlt,
  faMessage,
  faPercentage
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const CardTutor = props => {
  const dispatch = useDispatch()
  const { tutor, handleShowMessage, user, tutorFavorites } = props
  const userMongo = useSelector(state => state.users.user)
  const socket = useContext(SocketContext)

  const isFavoriteTutor = tutorFavorites?.find(t => t._id === tutor._id)

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
    'lg:bg-codecolorlighter lg:shadow-sm lg:border flex justify-center lg:-mt-6 lg:ml-12 items-center w-8 h-8 text-white lg:rounded-full dark:lg:bg-gray-900 dark:lg:border-none'
  )

  return (
    <div>
      <div className='pb-5'>
        <div className='flex lg:p-9 p-5 justify-between dark:bg-gray-800 dark:border-gray-800 bg-white border border-gray-200 shadow-md rounded-lg'>
          {/* Imagen de perfil */}

          <div className='flex flex-col'>
            <div className='lg:w-20 lg:h-20 w-10 h-10 rounded-full overflow-hidden'>
              <PictureTutor image={tutor.user.image} />
            </div>
            {user?.id && (
              <div className='max-lg:hidden'>
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
            )}
          </div>

          {/* Información del tutor */}
          <Link
            to={`/tutor/${tutor._id}`}
            className='p-2 lg:w-3/4 w-full h-1/2'
          >
            <div className='flex lg:justify-between items-center'>
              <div className='flex flex-row items-center'>
                <h2 className='font-semibold dark:text-gray-200'>
                  {tutor.user.fullName}
                </h2>
                {tutor.rates.find(rate => rate.name === 'Mentorship').promo && (
                  <FontAwesomeIcon
                    icon={faPercentage}
                    width='8'
                    height='8'
                    className='text-orange-700 ml-2 cursor-default dark:bg-orange-700 dark:text-orange-200 bg-orange-200 rounded-full px-1'
                    title='Este tutor ofrece los primeros 15 minutos gratis para la primera sesión de nuevos usuarios.'
                  />
                )}
              </div>
              <div className='max-lg:ml-2'>
                <ConexionStateTutor
                  offline={tutor.user.offline}
                  tutor={tutor}
                />
              </div>
              <div className='lg:hidden self-end'>
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
            </div>

            <div className='pt-2 pb-2 flex max-lg:hidden lg:justify-between items-center'>
              <div className='flex space-x-3'>
                <h2 className='text-2xl font-medium dark:text-gray-200 dark:font-semibold'>
                  {tutor.bio.specialty}
                </h2>
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
                <h2 className='font-semibold text-gray-600 dark:text-gray-400'>
                  {tutor.reviews.length} Reviews
                </h2>
              )}
            </div>
            <div className='pt-2 pb-2 flex lg:hidden flex-col items-start space-y-1'>
              <h1 className='text-xl font-semibold dark:text-gray-200'>
                {tutor.bio.specialty}
              </h1>
              <div className='flex items-center space-x-2'>
                <div className='flex justify-center items-center space-x-2'>
                  {Array.from({ length: Math.round(averageRating) }).map(
                    (_, index) => (
                      <img key={index} src={Star2} />
                    )
                  )}
                </div>
                {tutor.reviews && (
                  <h2 className='font-normal text-gray-600 dark:text-gray-400'>
                    {tutor.reviews.length} Reviews
                  </h2>
                )}
              </div>
            </div>

            <div className='flex justify-start items-center dark:text-gray-200'>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className='text-xs self-center text-[#141414B2] dark:text-gray-400 mr-1'
              />
              <CountryTutor location={tutor.user.location} />
              <span className='pl-4 pr-4 font-semibold text-sm text-gray-600 dark:text-gray-400'>
                ◦
              </span>
              <FontAwesomeIcon
                icon={faDollar}
                className='text-sm self-center text-[#141414B2] dark:text-gray-400 mr-1'
              />
              <PriceHourGray rates={tutor.mentorship} />
              <div className='max-lg:hidden flex'>
                <span className='pl-4 pr-4 font-semibold text-sm text-gray-600 dark:text-gray-400'>
                  ◦
                </span>

                <FontAwesomeIcon
                  icon={faGlobe}
                  className='text-sm self-center text-[#141414B2] dark:text-gray-400'
                />
                <LanguageTutor languages={tutor.languages} />
              </div>
            </div>
            <div className='pt-2 pb-2'>
              <DescriptionTutor description={tutor.bio.description} />
            </div>
            <div className='pt-2 pb-2'>
              <div className='lg:grid lg:grid-cols-4 lg:gap-3 flex flex-wrap'>
                <TechnicalSkillsTutor skills={tutor.skills} />
              </div>
            </div>
            <div className='pt-2 pb-2 lg:hidden'>
              {user && user.uid !== tutor.user.uid ? (
                <button
                  className='flex justify-center items-center w-full py-3 bg-codecolor rounded-md transition duration-1 text-white font-semibold ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
                  type='button'
                  title='Contactar'
                  onClick={event => handleShowMessage(event, tutor)}
                >
                  Contactar{' '}
                  <FontAwesomeIcon
                    icon={faMessage}
                    className='self-center text-xs ml-2 mt-1'
                  />
                </button>
              ) : (
                <button
                  className='flex justify-center items-center w-full py-3 bg-gray-400 dark:bg-gray-700 rounded-md transition duration-1 text-white font-semibold ease-in-out transform active:outline-none focus:outline-none cursor-default'
                  type='button'
                  title='Contactar'
                  onClick={event => event.preventDefault()}
                >
                  Contactar{' '}
                  <FontAwesomeIcon
                    icon={faMessage}
                    className='self-center text-xs ml-2 mt-0.5'
                  />
                </button>
              )}
            </div>
          </Link>

          {user && user.uid !== tutor.user.uid ? (
            <button
              className='flex max-lg:hidden justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
              type='button'
              title='Contactar'
              onClick={event => handleShowMessage(event, tutor)}
            >
              <img src={MensajeTexto} />
            </button>
          ) : (
            <button
              className='flex max-lg:hidden justify-center items-center w-16 h-16 bg-gray-400 shadow-xl dark:bg-gray-700 rounded-2xl transition duration-1 ease-in-out transform active:outline-none focus:outline-none cursor-default'
              type='button'
              title='Contactar'
              onClick={event => event.preventDefault()}
            >
              <img src={MensajeTexto} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardTutor
