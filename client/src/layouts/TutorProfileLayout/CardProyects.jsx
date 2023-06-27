import moment from 'moment/moment'
moment.locale('es')

import React, { useState } from 'react'

const CardProyects = props => {
  const { projects } = props

  const [displayedProject, setDisplayedProject] = useState(1)

  const handleShowMoreProject = () => {
    setDisplayedProject(projects.length)
  }

  return (
    <div>
      {projects.slice(0, displayedProject).map(project => (
        <div key={project._id}>
          {/* Proyectos */}
          <div className='pt-6 pb-4'>
            <h2 className='font-semibold text-left'>{project.name}</h2>
          </div>
          <div className=' pb-6 flex justify-between items-center space-x-6'>
            <div className='flex items-center'>
              <a
                href='#'
                className='font-semibold text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700'
              >
                {project.link}
              </a>
            </div>
            <div className='pt-6 flex gap-4 '>
              <p className='text-[#141414B2] font-semibold text-sm text-left'>
                Agregado en {moment(project.createdAt).format('MMMM')} del{' '}
                {moment(project.createdAt).format('YYYY')}
              </p>
            </div>
          </div>

          <div className='grid grid-cols-5 gap-3'>
            {project?.techName?.map(tech => (
              <span
                key={tech._id}
                className='flex pt-1 pb-1 h-10 justify-center items-center font-bold text-sm text-codecolor bg-[#7D5AE21A] rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
              >
                {tech.name}
              </span>
            ))}
          </div>

          <div className='pt-6 pb-6'>
            <p className='font-semibold text-[#141414B2] text-sm text-left'>
              {project.description}
            </p>
          </div>
        </div>
      ))}

      {displayedProject < projects.length && (
        <div className='flex flex-col items-center pt-6'>
          <button
            onClick={handleShowMoreProject}
            className='flex flex-row items-center justify-center w-40 h-11 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  )
}

export default CardProyects
