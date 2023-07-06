import { contrate, help, revision } from '../assets/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faMinus
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
const UserDashboardContent = () => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className='relative items-center w-full lg:px-8 p-2 lg:pt-8'>
      <div className='flex flex-row justify-start max-lg:justify-center items-center w-full px-4'>
        <h1
          className=' text-left lg:text-2xl text-xl font-semibold mr-3 cursor-pointer select-none underline dark:text-gray-200'
          onClick={() => setDropdown(!dropdown)}
        >
          ¿Cómo funciona la plataforma?
        </h1>
        <FontAwesomeIcon
          icon={!dropdown ? faChevronDown : faMinus}
          onClick={() => setDropdown(!dropdown)}
          className='text-sm mt-0.5 cursor-pointer text-codecolor hover:text-codecolor-dark transition-all duration-200 ease-in-out'
        />
      </div>
      {dropdown && (
        <div className='grid w-full lg:pt-8 pt-4 grid-cols-1 lg:gap-12 gap-2 mx-auto lg:grid-cols-3'>
          <div className='lg:p-6 p-4 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-sm'>
            <div className='inline-flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12 h-10 w-10 mx-auto mb-2 lg:mb-5'>
              <img src={help} />
            </div>
            <h1 className='mx-auto mb-2 lg:mb-8 text-lg font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl dark:text-gray-200'>
              Obtén ayuda en vivo.
            </h1>
            <p className='mx-auto text-sm lg:text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              Supera tus desafíos de programación con nuestra ayuda experta y
              nuestras mentorías 1:1
            </p>
          </div>
          <div className='lg:p-6 p-4 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-sm'>
            <div className='inline-flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12 h-10 w-10 mx-auto mb-2 lg:mb-5'>
              <img src={contrate} />
            </div>
            <h1 className='mx-auto mb-2 lg:mb-8 text-lg font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl dark:text-gray-200'>
              Contrata un freelance.
            </h1>
            <p className='mx-auto text-sm lg:text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              Profesionales capacitados para llevar a cabo tu proyecto.
            </p>
          </div>
          <div className='lg:p-6 p-4 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-sm'>
            <div className='inline-flex items-center justify-center flex-shrink-0 lg:w-12 lg:h-12 h-10 w-10 mx-auto mb-2 lg:mb-5'>
              <img src={revision} />
            </div>
            <h1 className='mx-auto mb-2 lg:mb-8 text-lg font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl dark:text-gray-200'>
              Revision de tú codigo.
            </h1>
            <p className='mx-auto text-sm lg:text-base leading-relaxed text-gray-500 dark:text-gray-400'>
              Mejora tu desarrollo con nuestra revisión especializada.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default UserDashboardContent
