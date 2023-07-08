import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pais, Calendario } from '../../assets'
import { useState } from 'react'
import {
  faBriefcase,
  faBusinessTime,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons'
const formatDate = dateString => {
  const date = new Date(dateString)
  const options = { month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('es-ES', options)
  return formattedDate.replace('de', '').trim()
}

const CardExperience = props => {
  const { experience } = props

  const [displayedExperience, setDisplayedExperience] = useState(1)

  const handleShowMoreExperience = () => {
    setDisplayedExperience(experience.length)
  }

  return (
    <div>
      {experience.slice(0, displayedExperience).map(ex => (
        <div key={ex._id}>
          {/* Experiencias */}
          <div className='pt-6 pb-6 flex justify-between items-center space-x-6'>
            <div className='flex items-cent'>
              <h2 className='font-semibold break-all dark:text-gray-200'>
                {ex.position}
              </h2>
            </div>
          </div>

          <div className=' flex justify-start items-center'>
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              className='text-[#141414B2] mr-1 dark:text-gray-400 self-center text-xs'
            />

            <h2 className='font-semibold text-sm break-all text-gray-600 dark:text-gray-400'>
              {ex.location}
            </h2>
            <span className='pl-4 pr-4 font-semibold text-sm text-gray-600 dark:text-gray-400'>
              ◦
            </span>
            <FontAwesomeIcon
              icon={faBriefcase}
              className='text-[#141414B2] mr-1 dark:text-gray-400 self-center text-xs'
            />

            <h2 className='font-semibold break-all text-sm text-gray-600 dark:text-gray-400'>
              {ex.company}
            </h2>
          </div>
          <div className='pt-6 flex gap-4 '>
            <p className='text-[#141414B2] font-semibold text-sm text-left dark:text-gray-400'>
              Fecha de inicio: {formatDate(ex.start_date)}{' '}
            </p>
            <p className='text-[#141414B2] font-semibold text-sm text-left dark:text-gray-400'>
              Fecha de finalización: {formatDate(ex.end_date)}{' '}
            </p>
          </div>
          <div className='pt-6 lg:grid lg:grid-cols-5 lg:gap-3 max-lg:flex max-lg:flex-wrap'>
            {ex?.techName?.map(tech => (
              <span
                key={tech._id}
                className='flex max-lg:mx-1 max-lg:py-1 max-lg:px-2 pt-1 pb-1 lg:h-10 max-lg:my-1 justify-center items-center font-bold text-sm text-codecolor bg-[#7D5AE21A] rounded transition duration-1 ease-in-out transform active:outline-none focus:outline-none dark:bg-codecolor dark:text-white'
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className='pt-6 pb-6'>
            <p className='font-semibold break-all text-[#141414B2] dark:text-gray-200 text-sm text-left'>
              {ex.description}
            </p>
          </div>
        </div>
      ))}

      {displayedExperience < experience.length && (
        <div className='flex flex-col items-center pt-6'>
          <button
            onClick={handleShowMoreExperience}
            className='flex flex-row items-center justify-center w-40 h-11 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none dark:bg-codecolor dark:text-white dark:font-semibold'
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  )
}

export default CardExperience
