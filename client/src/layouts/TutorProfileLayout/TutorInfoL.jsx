/* eslint-disable react/prop-types */

import {
  PictureTutor,
  ConexionStateTutor,
  NameTutor,
  LinkGitHub,
  LinkLinkedIn,
  PriceHourPurple,
  SessionsTutor,
  ButtonContactar,
  BookMeeting
} from '../../components'

import { Star } from '../../assets'
import { SocketContext } from '../../socket/context'
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'

const TutorInfoI = props => {
  const { tutor, user } = props
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
  const [minutes, setMinutes] = useState(30)
  const [date, setDate] = useState(moment().format('YYYY-MM-DD HH:mm'))
  const [isDisabled, setIsDisabled] = useState(false)
  const [errorMinutes, setErrorMinutes] = useState(null)
  const [errorDate, setErrorDate] = useState(null)

  const handleMinutesChange = e => {
    if (
      Number(e.target.value) !== 30 &&
      Number(e.target.value) !== 60 &&
      Number(e.target.value) !== 90 &&
      Number(e.target.value) !== 120
    ) {
      setErrorMinutes('No se puede agendar una sesión con esa duración')
    } else {
      setErrorMinutes(null)
    }
    setMinutes(Number(e.target.value))
  }

  useEffect(() => {
    if (errorMinutes || errorDate) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [errorMinutes, errorDate])

  return (
    <div className='box-border border w-96 h-max pt-8 pb-8 bg-white border-gray-200 shadow-md rounded-lg'>
      <div className='flex flex-col items-center pt-5 pl-10 pr-10 pb-5'>
        <div className='w-40 h-40 rounded-full overflow-hidden transition duration-1 ease-in-out transform active:outline-none focus:outline-none'>
          {/* Foto Perfil */}
          <PictureTutor image={tutor.user.image} />
        </div>
        <div className='pt-10'>
          {/* Estado de conexion */}
          <ConexionStateTutor offline={tutor.user.offline} tutor={tutor} />
        </div>
      </div>

      {/* Valoraciones */}
      <div className='flex flex-col justify-center items-center space-y-2'>
        <div className='flex space-x-1'>
          {Array.from({ length: Math.round(averageRating) }).map((_, index) => (
            <img key={index} src={Star} />
          ))}
        </div>
        {tutor.reviews && (
          <h2 className='font-semibold text-gray-600'>
            {tutor.reviews.length} Reviews
          </h2>
        )}
      </div>

      {/* Apellido y nombre del tutor */}
      <div className='pt-6 pl-4 pr-4'>
        <NameTutor
          fullName={tutor.user.fullName}
          promo={tutor.rates.find(rate => rate.name === 'Mentorship').promo}
        />
      </div>

      {/* Redes(GitHub y Linkedin) */}
      <div className='flex justify-center items-center pt-6 pb-6 space-x-6'>
        <LinkGitHub link={tutor.socialMedia[0].link} />

        <LinkLinkedIn link={tutor.socialMedia[1].link} />
      </div>

      {/* Costos y sesiones */}
      <div className='border-t border-b flex justify-evenly items-center pt-6 pb-6 pl-4 pr-4 space-x-6'>
        <div>
          <PriceHourPurple rates={tutor.rates[0].value} />
          <h2 className='font-semibold text-sm text-gray-700'>la hora</h2>
        </div>
        <div>
          <h2 className='font-semibold text-codecolor'>
            {
              tutor.sessions?.filter(
                session => session.endedCounterDate !== null
              ).length
            }
          </h2>
          <h2 className='font-semibold text-sm text-gray-700'>sesiones</h2>
        </div>
      </div>
      {user?.id && tutor.user._id && (
        <>
          {user?.id !== tutor.user._id && (
            <div className='mx-2'>
              <p className='text-center text-gray-700 font-semibold text-md mt-2'>
                Contratar una sesión con {tutor.user.fullName}
              </p>
              <BookMeeting user={user} tutor={tutor} />
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default TutorInfoI
