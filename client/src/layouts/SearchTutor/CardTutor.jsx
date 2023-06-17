/* eslint-disable react/prop-types */
import {
  PictureTutor,
  CountryTutor,
  ConexionStateTutor,
  RatingTutor,
  ReviewsTutorTotal,
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
  Star
} from '../../assets/index'

const CardTutor = props => {
  const { tutor, handleShowMessage, user } = props

  return (
    <div>
      <div className='pb-5'>
        <div className='flex p-9 justify-between bg-white border border-gray-200 shadow-md rounded-lg'>
          {/* Imagen de perfil */}
          <div className='w-20 h-20 rounded-full overflow-hidden'>
            <PictureTutor image={tutor.user.image} />
          </div>
          {/* Información del tutor */}
          <div className='p-2 w-3/4 h-1/2'>
            <div className='flex justify-between items-center'>
              <h2 className='font-semibold'>{tutor.user.fullName}</h2>
              <ConexionStateTutor offline={tutor.offline} />
            </div>

            <div className='pt-2 pb-2 flex justify-between items-center'>
              <h2 className='text-2xl font-medium'>{tutor.bio.specialty}</h2>
              <div className='flex items-center space-x-2'>
                <img src={Star} />
                <RatingTutor />
              </div>
              <ReviewsTutorTotal />
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

          {/* Button Mensage */}
          {user && user.uid !== tutor.user.uid ? (
            <button
              className='flex justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
              type='button'
              title='Contactar'
              onClick={e => handleShowMessage(e, tutor)}
            >
              <img src={MensajeTexto} />
            </button>
          ) : (
            <button
              className='flex justify-center items-center w-16 h-16 bg-gray-400 cursor-not-allowed shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:outline-none focus:outline-none'
              type='button'
              title='Contactar'
              onClick={e => {
                e.preventDefault()
              }}
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
