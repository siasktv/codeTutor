/* eslint-disable react/prop-types */
import {
  AreaTutor3xl,
  CountryTutor,
  LanguageTutor,
  DescriptionTutor,
  TechnicalSkillsTutor,
  PriceHourGray
} from '../../components'
import { CardReviewUser, CardExperience, CardProyects } from '../'

import { Pais, Moneda, Mensaje } from '../../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faDollar,
  faGlobe,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'

const TutorInfoR = props => {
  const { tutor } = props

  return (
    <div className='w-full lg:pl-9 flex flex-col relative z-0'>
      <div className='lg:p-20 p-5 bg-white dark:bg-gray-800 dark:border-gray-800 border border-gray-200 shadow-md rounded-lg'>
        {/* Area del Developer */}
        <div>
          <AreaTutor3xl />
        </div>

        {/* Contenedor de País,Tarifa e Idiomas */}
        <div className='pt-6 pb-6 flex justify-start items-center'>
          {/* Los svg y span contienen iconos */}
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className='text-[#141414B2] mr-1 dark:text-gray-400 self-center text-xs'
          />

          {/* País */}
          <CountryTutor location={tutor.user.location} />

          <span className='pl-4 pr-4 font-semibold text-sm text-[#141414B2] dark:text-gray-400'>
            ◦
          </span>

          <FontAwesomeIcon
            icon={faDollar}
            className='text-[#141414B2] mr-1 dark:text-gray-400 self-center text-sm'
          />
          {/* Tarifa */}
          <PriceHourGray rates={tutor.rates[0].value} />

          <span className='pl-4 pr-4 font-semibold text-sm text-[#141414B2] dark:text-gray-400'>
            ◦
          </span>

          <FontAwesomeIcon
            icon={faGlobe}
            className='text-[#141414B2] dark:text-gray-400 self-center text-sm'
          />

          {/* Idiomas */}
          <LanguageTutor languages={tutor.languages} />
        </div>

        {/* Descripción del tutor */}
        <div className='pt-2 pb-6 border-b dark:border-gray-700'>
          <DescriptionTutor description={tutor.bio.description} />
        </div>

        {/* Cuadro de Habilidades Técnicas */}
        <div className='pt-6 pb-6'>
          <h2 className='text-left text-xl font-bold  dark:text-codecolor'>
            Habilidades Técnicas
          </h2>
        </div>
        <div className='pb-6 border-b dark:border-gray-700'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-3 max-lg:flex max-lg:flex-wrap'>
            <TechnicalSkillsTutor skills={tutor.skills} />
          </div>
        </div>

        {/* Valoraciones */}
        <div className='pb-6 border-b dark:border-gray-700'>
          <div className='pt-6'>
            <h2 className='text-left text-xl font-bold dark:text-codecolor'>
              Reviews
            </h2>
          </div>
          <div className='pt-6 pb-6 flex justify-between items-center space-x-6'>
            <div className='flex items-center space-x-2'>
              {/* <img src={Star} /> */}
              {/* Puntuación */}
              {/* <h2 className="font-semibold text-lg text-codecolor">
                {Math.round(averageRating)}  
              </h2> */}
            </div>
            {/* Reviews */}
            {tutor.reviews && (
              <h2 className='font-semibold text-gray-600 dark:text-gray-400'>
                {tutor.reviews.length} Reviews
              </h2>
            )}
          </div>

          {/* Contenedor de opiniones */}
          <div>
            <CardReviewUser reviews={tutor.reviews} />
          </div>
        </div>

        {/* Experiencia Laboral */}
        <div className='pb-6 border-b dark:border-gray-700'>
          {/* Título */}
          <div className='pt-6'>
            <h2 className='text-left text-xl font-bold dark:text-codecolor'>
              Experiencia Laboral
            </h2>
          </div>

          {/* Card Experiencias */}
          <CardExperience experience={tutor.experience} />
        </div>

        {/* Experiencia en Proyectos */}
        <div className='pb-6'>
          {/* Título */}
          <div className='pt-6'>
            <h2 className='text-left text-xl font-bold dark:text-codecolor'>
              Proyectos
            </h2>
          </div>

          {/* Card Proyectos */}
          <CardProyects projects={tutor.projects} />
        </div>
      </div>
    </div>
  )
}
export default TutorInfoR
