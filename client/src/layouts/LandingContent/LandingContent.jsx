import { contrate, help, revision } from '../../assets/index'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const LandingContent = () => {
  return (
    <div className='relative items-center w-full lg:px-8 max-lg:px-3 py-8'>
      <h1 className='text-codecolordark dark:text-codecolor font-semibold text-lg max-lg:mt-10'>
        Nuestros servicios
      </h1>
      <h1 className='lg:pb-10 pb-5 text-3xl dark:text-gray-200 font-semibold max-lg:text-xl'>
        Encuentra la ayuda que necesitas y desarrolla tus ideas.
      </h1>
      <div className='grid w-full grid-cols-1 max-lg:gap-3 lg:gap-12 mx-auto lg:grid-cols-3 lg:px-20'>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-md group cursor-pointer hover:bg-codecolor transition-all duration-300'
        >
          <div className='inline-flex flex-1 mx-auto mb-5'>
            <img src={help} className='-ml-4' />
            <h1 className='mx-auto my-2 px-4 text-xl font-semibold leading-none tracking-tighter text-blackcodecolor lg:text-xl group-hover:text-white dark:text-gray-200'>
              Obtén ayuda en vivo.
            </h1>
          </div>
          <p className='mx-auto text-base leading-relaxed text-gray-500 px-6 group-hover:text-white dark:text-gray-400'>
            Supera tus desafíos de programación con nuestra ayuda experta y
            nuestras mentorías 1:1
          </p>

          <div className='hover:underline hover:text-white cursor-pointer text-codecolor text-lg underline-white dark:font-semibold'>
            <p className='text-center pt-8 pl-8 group-hover:text-white '>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-md group hover:bg-codecolor transition-all duration-300'
        >
          <div className='inline-flex flex-1 mx-auto mb-5'>
            <img src={contrate} className='-ml-4' />
            <h1 className='mx-auto my-2 px-4 text-xl font-semibold leading-none tracking-tighter text-blackcodecolor lg:text-xl group-hover:text-white dark:text-gray-200'>
              Contrata un freelance.
            </h1>
          </div>
          <p className='mx-auto text-base leading-relaxed text-gray-500 px-6 group-hover:text-white dark:text-gray-400'>
            Encuentra desarrolladores profesionales y capacitados para llevar a
            cabo tu proyecto.
          </p>{' '}
          <div className='hover:underline hover:text-white cursor-pointer text-codecolor text-lg underline-white dark:font-semibold'>
            <p className='text-center pt-8 pl-8 group-hover:text-white'>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-md group hover:bg-codecolor transition-all duration-300'
        >
          <div className='inline-flex flex-1 mx-auto mb-5'>
            <img src={revision} className='-ml-4' />
            <h1 className='mx-auto my-2 px-4 text-xl font-semibold leading-none tracking-tighter text-blackcodecolor lg:text-xl group-hover:text-white dark:text-gray-200'>
              Revisión de tu código.
            </h1>
          </div>
          <p className='mx-auto text-base leading-relaxed text-gray-500 px-6 group-hover:text-white dark:text-gray-400'>
            Mejora tu desarrollo con nuestra revisión especializada en
            diferentes lenguajes de programación.
          </p>
          <div className='hover:underline hover:text-white cursor-pointer text-codecolor text-lg underline-white dark:font-semibold'>
            <p className='text-center pt-8 pl-8 group-hover:text-white'>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default LandingContent
