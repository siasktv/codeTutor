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
} from '../../components'

import { Star } from '../../assets'

const TutorInfoI = (props) => {
  const { tutor } = props
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

  return (
    <div className="box-border border w-96 h-max pt-8 pb-8 bg-white border-gray-200 shadow-md rounded-lg">
      <div className="flex flex-col items-center pt-5 pl-10 pr-10 pb-5">
        <div className="w-40 h-40 rounded-full overflow-hidden transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none">
          {/* Foto Perfil */}
          <PictureTutor image={tutor.user.image} />
        </div>
        <div className="pt-10">
          {/* Estado de conexion */}
          <ConexionStateTutor tutor={tutor} />
        </div>
      </div>

      {/* Valoraciones */}
      <div className="flex justify-center items-center space-x-6">
        <div className="flex items-center space-x-2">
          <img src={Star} />
          <h2 className="font-semibold text-lg text-codecolor">
            {Math.round(averageRating)}
          </h2>
        </div>
        {tutor.reviews && (
          <h2 className="font-semibold text-gray-600">
            {tutor.reviews.length}
          </h2>
        )}
      </div>

      {/* Apellido y nombre del tutor */}
      <div className="pt-6 pl-4 pr-4">
        <NameTutor fullName={tutor.user.fullName} />
      </div>

      {/* Redes(GitHub y Linkedin) */}
      <div className="flex justify-center items-center pt-6 pb-6 space-x-6">
        <LinkGitHub link={tutor.socialMedia[0].link} />

        <LinkLinkedIn link={tutor.socialMedia[1].link} />
      </div>

      {/* Costos y sesiones */}
      <div className="border-t border-b flex justify-evenly items-center pt-6 pb-6 pl-4 pr-4 space-x-6">
        <div>
          <PriceHourPurple rates={tutor.rates[0].value} />
          <h2 className="font-semibold text-sm text-gray-700">la hora</h2>
        </div>
        <div>
          <SessionsTutor />
          <h2 className="font-semibold text-sm text-gray-700">sesiones</h2>
        </div>
      </div>

      {/* Boton para Contactar */}
      <div className="flex flex-col items-center pt-6">
        <ButtonContactar />
      </div>
    </div>
  )
}
export default TutorInfoI
