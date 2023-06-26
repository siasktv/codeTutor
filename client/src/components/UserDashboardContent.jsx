import { contrate, help, revision } from '../assets/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
const UserDashboardContent = () => {
  const [dropdown, setDropdown] = useState(false)
  return (
    <div className='relative items-center w-full px-8 pt-8'>
      <div className='flex flex-row justify-start items-center w-full px-4'>
        <h1
          className=' text-left text-2xl font-semibold mr-3 cursor-pointer select-none underline'
          onClick={() => setDropdown(!dropdown)}
        >
          ¿Cómo funciona la plataforma?
        </h1>
        <FontAwesomeIcon
          icon={!dropdown ? faChevronDown : faChevronUp}
          onClick={() => setDropdown(!dropdown)}
          className='text-sm mt-0.5 cursor-pointer text-codecolor hover:text-codecolor-dark transition-all duration-200 ease-in-out'
        />
      </div>
      {dropdown && (
        <div className='grid w-full pt-8 grid-cols-1 gap-12 mx-auto lg:grid-cols-3'>
          <div className='p-6 border rounded-xl bg-white shadow-sm'>
            <div className='inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5'>
              <img src={help} />
            </div>
            <h1 className='mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl'>
              Obtén ayuda en vivo.
            </h1>
            <p className='mx-auto text-base leading-relaxed text-gray-500'>
              Supera tus desafíos de programación con nuestra ayuda experta y
              nuestras mentorías 1:1
            </p>
          </div>
          <div className='p-6 border rounded-xl bg-white shadow-sm'>
            <div className='inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5'>
              <img src={contrate} />
            </div>
            <h1 className='mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl'>
              Contrata un freelance.
            </h1>
            <p className='mx-auto text-base leading-relaxed text-gray-500'>
              Profesionales capacitados para llevar a cabo tu proyecto.
            </p>
          </div>
          <div className='p-6 border rounded-xl bg-white shadow-sm'>
            <div className='inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5'>
              <img src={revision} />
            </div>
            <h1 className='mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl'>
              Revision de tú codigo.
            </h1>
            <p className='mx-auto text-base leading-relaxed text-gray-500'>
              Mejora tu desarrollo con nuestra revisión especializada.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
export default UserDashboardContent
