import {
  ExpJobTutor,
  CountryJobTutor,
  CompanyJobTutor,
  TechnicalSkillsJobTutor,
  DescriptionJobTutor,
} from '../../components'

import { Pais, Calendario } from '../../assets'
import { useState } from 'react'
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('es-ES', options)
  return formattedDate.replace('de', '').trim()
}

const CardExperience = (props) => {
  const { experience } = props

  const [displayedExperience, setDisplayedExperience] = useState(1)

  const handleShowMoreExperience = () => {
    setDisplayedExperience(experience.length)
  }

  return (
    <div>
      {experience.slice(0, displayedExperience).map((ex) => (
        <div>
          {/* Experiencias */}
          <div className="pt-6 pb-6 flex justify-between items-center space-x-6">
            <div className="flex items-cent">
              <h2 className="font-semibold">{ex.position}</h2>
            </div>
          </div>

          <div className=" flex justify-start items-center">
            <img src={Pais} />

            <h2 className="font-semibold text-sm text-gray-600">
              {ex.location}
            </h2>
            <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">
              ◦
            </span>
            <img src={Calendario} />

            <h2 className="font-semibold text-sm text-gray-600">
              {ex.company}
            </h2>
          </div>
          <div className="pt-6 flex gap-4 ">
            <p className="text-[#141414B2] font-semibold text-sm text-left">
              Fecha de inicio: {formatDate(ex.start_date)}{' '}
            </p>
            <p className="text-[#141414B2] font-semibold text-sm text-left">
              Fecha de finalización: {formatDate(ex.end_date)}{' '}
            </p>
          </div>
          <div className="grid pt-6 grid-cols-5 gap-3">
            {ex?.techName?.map((tech) => (
              <span
                key={tech._id}
                className="flex pt-1 pb-1 h-10 justify-center items-center font-bold text-sm text-codecolor bg-[#7D5AE21A] rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none"
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className="pt-6 pb-6">
            <p className="font-semibold text-[#141414B2] text-sm text-left">
              {ex.description}
            </p>
          </div>
        </div>
      ))}

      {displayedExperience < experience.length && (
        <div className="flex flex-col items-center pt-6">
          <button
            onClick={handleShowMoreExperience}
            className="flex flex-row items-center justify-center w-40 h-11 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  )
}

export default CardExperience
