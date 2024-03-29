import { contrate, help, revision } from '../../assets/index'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faBolt } from '@fortawesome/free-solid-svg-icons'

const Services = () => {
  return (
    <div
      className='relative items-center lg:mt-36 w-full lg:px-8 max-lg:px-3 py-8'
      id='content'
    >
      <h1 className='text-codecolor dark:text-codecolor font-bold text-lg max-lg:mt-10 flex items-center justify-center'>
        Nuestros servicios{' '}
        <FontAwesomeIcon
          icon={faBolt}
          className='text-codecolor ml-2 text-md self-center'
        />
      </h1>
      <h1 className='lg:pb-10 pb-5 text-3xl dark:text-gray-200 font-semibold max-lg:text-xl'>
        Encuentra la ayuda que necesitas y desarrolla tus ideas.
      </h1>
      <div className='grid w-full grid-cols-1 max-lg:gap-3 lg:gap-12 mx-auto lg:grid-cols-3 lg:px-20'>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-lg group cursor-pointer hover:bg-codecolor lg:hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 dark:hover:shadow-gray-800 max-lg:hover:shadow-md'
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

          <div className=' hover:text-white cursor-pointer text-codecolor  text-lg underline-white dark:font-semibold'>
            <p className='text-center font-semibold pt-8 pl-8 group-hover:text-white '>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-lg group cursor-pointer hover:bg-codecolor lg:hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 dark:hover:shadow-gray-800 max-lg:hover:shadow-md'
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
          <div className=' hover:text-white cursor-pointer text-codecolor  text-lg underline-white dark:font-semibold'>
            <p className='text-center font-semibold pt-8 pl-8 group-hover:text-white '>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>

        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white dark:bg-gray-800 dark:border-gray-800 shadow-lg group cursor-pointer hover:bg-codecolor lg:hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 dark:hover:shadow-gray-800 max-lg:hover:shadow-md'
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
          <div className=' hover:text-white cursor-pointer text-codecolor  text-lg underline-white dark:font-semibold'>
            <p className='text-center font-semibold pt-8 pl-8 group-hover:text-white '>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Services
