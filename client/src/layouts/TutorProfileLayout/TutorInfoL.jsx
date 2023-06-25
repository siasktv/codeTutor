/* eslint-disable react/prop-types */

import {
  PictureTutor,
  ConexionStateTutor,
  NameTutor,
  LinkGitHub,
  LinkLinkedIn,
  PriceHourPurple,
  SessionsTutor,
  ButtonContactar
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
  const socket = useContext(SocketContext)
  const [session, setSession] = useState(null)
  const [minutes, setMinutes] = useState(30)
  const [date, setDate] = useState(moment().format('YYYY-MM-DD HH:mm'))
  const [isDisabled, setIsDisabled] = useState(false)
  const [errorMinutes, setErrorMinutes] = useState(null)
  const [errorDate, setErrorDate] = useState(null)

  useEffect(() => {
    socket.on('createdSession', session => {
      setSession(session)
    })
  }, [])

  const handleCreateSession = () => {
    if (isDisabled || errorMinutes || errorDate) return
    const rateTutorMentorship = tutor.rates.find(
      rate => rate.name === 'Mentorship'
    ).value
    const appointmentDate = moment(date).valueOf()
    const promoEnabled = tutor?.rates?.find(rate => rate.name === 'Mentorship')
      ?.promo
      ? true
      : false
    // promo consists in first 15 minutes free
    const price = promoEnabled
      ? (rateTutorMentorship / 60) * (minutes - 15)
      : (rateTutorMentorship / 60) * minutes

    const session = {
      tutorUserId: tutor.user._id,
      clientUserId: user.id,
      appointmentDate,
      minutes: minutes,
      price,
      expiredDate: moment(appointmentDate).add(2, 'hours').valueOf()
    }
    socket.emit('createSession', { session })
  }

  useEffect(() => {
    console.log('session', session)
  }, [session])

  useEffect(() => {
    console.log('date', date)
    console.log('minutes', minutes)
    console.log('isDisabled', isDisabled)
  }, [date, minutes])

  const handleDateChange = e => {
    if (moment(e.target.value).isBefore(moment())) {
      setErrorDate('La fecha debe ser mayor a la actual')
    } else {
      setErrorDate(null)
    }
    setDate(e.target.value)
  }

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
        <div className='w-40 h-40 rounded-full overflow-hidden transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none'>
          {/* Foto Perfil */}
          <PictureTutor image={tutor.user.image} />
        </div>
        <div className='pt-10'>
          {/* Estado de conexion */}
          <ConexionStateTutor tutor={tutor} />
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
      {/* <div className="flex justify-center items-center space-x-6">
        <div className="flex items-center space-x-2">
          <img src={Star} />
          <h2 className="font-semibold text-lg text-codecolor">
            {Math.round(averageRating)}
          </h2>
        </div>
        {tutor.reviews && (
          <h2 className="font-semibold text-gray-600">
            {tutor.reviews.length} Reviews
          </h2>
        )}
      </div> */}

      {/* Apellido y nombre del tutor */}
      <div className='pt-6 pl-4 pr-4'>
        <NameTutor fullName={tutor.user.fullName} />
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
          <SessionsTutor />
          <h2 className='font-semibold text-sm text-gray-700'>sesiones</h2>
        </div>
      </div>

      {/* Boton para Contactar */}
      <div className='flex flex-col items-center pt-6'>
        <ButtonContactar />
      </div>
      {user?.id && tutor.user._id && (
        <>
          {user?.id !== tutor.user._id && (
            <div className='flex justify-center items-center p-6'>
              <div className='flex flex-col items-center'>
                <input
                  type='datetime-local'
                  className={
                    errorDate
                      ? 'bg-red-200 mb-2 w-full outline-none border border-red-500 text-center transition-all duration-200 ease-in-out  text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
                      : 'bg-gray-200 mb-2 w-full outline-none border border-gray-300 text-center transition-all duration-200 ease-in-out text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center'
                  }
                  name='date'
                  id='date'
                  onChange={e => handleDateChange(e)}
                  value={date}
                  min={moment().format('YYYY-MM-DDTHH:mm')}
                />
                {errorDate && (
                  <p className='text-red-500 text-sm mb-3'>{errorDate}</p>
                )}

                <select
                  className={
                    errorMinutes
                      ? 'bg-gray-red mb-2 w-full outline-none border border-red-500 text-center transition-all duration-200 ease-in-out hover:bg-gray-300 text-gray-800 cursor-pointer font-bold py-2 px-4 rounded inline-flex items-center'
                      : 'bg-gray-200 mb-2 w-full outline-none border border-gray-300 text-center transition-all duration-200 ease-in-out hover:bg-gray-300 text-gray-800 cursor-pointer font-bold py-2 px-4 rounded inline-flex items-center'
                  }
                  name='minutes'
                  id='minutes'
                  onChange={e => handleMinutesChange(e)}
                >
                  <option value='30' selected>
                    30 minutos
                  </option>
                  <option value='60'>60 minutos</option>
                  <option value='90'>90 minutos</option>
                  <option value='120'>120 minutos</option>
                </select>

                {errorMinutes && (
                  <p className='text-red-500 text-sm mb-3'>{errorMinutes}</p>
                )}

                <button
                  className={
                    isDisabled
                      ? 'bg-gray-200 w-full text-center outline-none cursor-default text-gray-800 transition-all duration-200 ease-in-out font-bold py-2 px-4 rounded items-center'
                      : 'bg-codecolor w-full text-center outline-none hover:bg-codecolordark text-white transition-all duration-200 ease-in-out font-bold py-2 px-4 rounded items-center'
                  }
                  onClick={handleCreateSession}
                  isDisabled={isDisabled}
                >
                  Crear sesion
                </button>
              </div>
              {session && session?.sessionId && (
                <Link to={`/meeting/${session.sessionId}`}>Ir a la sesion</Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
export default TutorInfoI
