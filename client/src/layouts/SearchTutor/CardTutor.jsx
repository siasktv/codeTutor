/* eslint-disable react/prop-types */
import {
  PictureTutor,
  CountryTutor,
  ConexionStateTutor,
  // ReviewsTutorTotal,
  PriceHourGray,
  LanguageTutor,
  DescriptionTutor,
  TechnicalSkillsTutor,
} from '../../components'

import {
  Calendario,
  MensajeTexto,
  Moneda,
  Pais,
  Star,
} from '../../assets/index'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CardTutor = (props) => {
  const { tutor, handleShowMessage, user } = props
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

  const handleShowModal = (e) => {
    e.preventDefault()
    setShowModal(true)
    document.body.style.overflow = 'hidden'
  }

  const handleCloseModal = (e) => {
    e.preventDefault()
    setShowModal(false)
    document.body.style.overflow = 'auto'
  }

  return (
    <div>
      <div className="pb-5">
        <div className="flex p-9 justify-between bg-white border border-gray-200 shadow-md rounded-lg">
          {/* Imagen de perfil */}
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <PictureTutor image={tutor.user.image} />
          </div>
          {/* Información del tutor */}
          <div className="p-2 w-3/4 h-1/2">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold">{tutor.user.fullName}</h2>
              <ConexionStateTutor offline={tutor.user.offline} tutor={tutor} />
            </div>

            <div className="pt-2 pb-2 flex justify-between items-center">
              <div className="flex space-x-3">
                <h2 className="text-2xl font-medium">{tutor.bio.specialty}</h2>
                <div className="flex items-center space-x-2">
                  <img src={Star} />
                  <h2 className="font-semibold  text-codecolor">
                    {Math.round(averageRating)}
                  </h2>
                </div>
              </div>
              {tutor.reviews && (
                <h2 className="font-semibold text-gray-600">
                  {tutor.reviews.length}
                </h2>
              )}
            </div>

            <div className="flex justify-start items-center">
              <img src={Pais} />
              <CountryTutor location={tutor.user.location} />

              <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">
                ◦
              </span>

              <img src={Moneda} />

              <PriceHourGray rates={tutor.mentorship} />

              <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">
                ◦
              </span>

              <img src={Calendario} />
              <LanguageTutor languages={tutor.languages} />
            </div>
            <div className="pt-2 pb-2">
              <DescriptionTutor description={tutor.bio.description} />
            </div>
            <div className="pt-2 pb-2">
              <div className="grid grid-cols-4 gap-3">
                <TechnicalSkillsTutor skills={tutor.skills} />
              </div>
            </div>
          </div>

          {/* Button Mensage */}
          {user && user.uid !== tutor.user.uid ? (
            <button
              className="flex justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none"
              type="button"
              title="Contactar"
              onClick={(event) => handleShowMessage(event, tutor)}
            >
              <img src={MensajeTexto} />
            </button>
          ) : (
            <button
              className="flex justify-center items-center w-16 h-16 bg-gray-400 shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:outline-none focus:outline-none"
              type="button"
              title="Contactar"
              onClick={
                user
                  ? (event) => event.preventDefault()
                  : (event) => handleShowModal(event)
              }
            >
              <img src={MensajeTexto} />
            </button>
          )}
          {showModal ? (
            <div
              id="defaultModal"
              tabIndex="-1"
              aria-hidden="true"
              className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto transition-all duration-300 bg-white bg-opacity-10 backdrop-blur-sm"
              onClick={(event) => {
                event.preventDefault()
              }}
            >
              <div className="relative w-full max-w-2xl max-h-full p-4 mx-auto my-10 overflow-hidden transition-all transform cursor-default md:my-0 ">
                <div className="relative bg-white rounded-lg shadow border-codecolor border-2">
                  <div className="flex items-start justify-between p-4 rounded-t">
                    <button
                      type="button"
                      className="text-codecolor bg-transparent hover:text-codecolordark rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                      data-modal-hide="defaultModal"
                      aria-label="Close"
                      onClick={(event) => {
                        handleCloseModal(event)
                      }}
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Cerrar</span>
                    </button>
                  </div>
                  <div className="space-y-6">
                    <p className="text-xl leading-relaxed text-gray-900 font-semibold">
                      Debes iniciar sesión para poder contactar con el tutor.
                    </p>
                  </div>
                  <div className="flex items-center p-6 space-x-2 justify-center rounded-b">
                    <button
                      data-modal-hide="defaultModal"
                      type="button"
                      className="text-white bg-codecolor hover:bg-codecolordark hover:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-100 ease-in-out"
                      onClick={(event) => {
                        event.preventDefault()
                        document.body.style.overflow = 'auto'
                        navigate('/login?redirect=/search')
                      }}
                    >
                      Iniciar sesión
                    </button>
                    <button
                      data-modal-hide="defaultModal"
                      type="button"
                      className="text-white bg-red-500 hover:bg-red-700 hover:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-100 ease-in-out"
                      onClick={(event) => {
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
