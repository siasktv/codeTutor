import { contrate, help, revision } from '../../assets/index'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

const LandingContent = () => {
  return (
    <div className='relative items-center w-full px-8 py-8'>
      <h1 className='text-codecolordark font-semibold text-lg'>
        Nuestros servicios
      </h1>
      <h1 className='pb-10 text-3xl font-semibold'>
        Encuentra la ayuda que necesitas y desarrolla tus ideas.
      </h1>
      <div className='grid w-full grid-cols-1 gap-12 mx-auto lg:grid-cols-3 px-20'>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white shadow-md group cursor-pointer hover:bg-codecolor transition-all duration-300'
        >
          <div className='inline-flex flex-1 mx-auto mb-5'>
            <img src={help} className='-ml-4' />
            <h1 className='mx-auto my-2 px-4 text-xl font-semibold leading-none tracking-tighter text-blackcodecolor lg:text-xl group-hover:text-white'>
              Obtén ayuda en vivo.
            </h1>
          </div>
          <p className='mx-auto text-base leading-relaxed text-gray-500 px-6 group-hover:text-white'>
            Supera tus desafíos de programación con nuestra ayuda experta y
            nuestras mentorías 1:1
          </p>

          <div className='hover:underline hover:text-white cursor-pointer text-codecolor text-lg underline-white'>
            <p className='text-center pt-8 pl-8 group-hover:text-white '>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white shadow-md group hover:bg-codecolor transition-all duration-300'
        >
          <div className='inline-flex flex-1 mx-auto mb-5'>
            <img src={contrate} className='-ml-4' />
            <h1 className='mx-auto my-2 px-4 text-xl font-semibold leading-none tracking-tighter text-blackcodecolor lg:text-xl group-hover:text-white'>
              Contrata un freelance.
            </h1>
          </div>
          <p className='mx-auto text-base leading-relaxed text-gray-500 px-6 group-hover:text-white'>
            Encuentra desarrolladores profesionales y capacitados para llevar a
            cabo tu proyecto.
          </p>
          <div className='hover:underline hover:text-white cursor-pointer text-codecolor text-lg underline-white'>
            <p className='text-center pt-8 pl-8 group-hover:text-white'>
              Conecta
              <FontAwesomeIcon icon={faAngleRight} className='h-4 pl-2' />
            </p>
          </div>
        </Link>
        <Link
          to='/search'
          className='p-6 border rounded-xl bg-white shadow-md group hover:bg-codecolor transition-all duration-300'
        >
          <div className='inline-flex flex-1 mx-auto mb-5'>
            <img src={revision} className='-ml-4' />
            <h1 className='mx-auto my-2 px-4 text-xl font-semibold leading-none tracking-tighter text-blackcodecolor lg:text-xl group-hover:text-white'>
              Revisión de tu código.
            </h1>
          </div>
          <p className='mx-auto text-base leading-relaxed text-gray-500 px-6 group-hover:text-white'>
            Mejora tu desarrollo con nuestra revisión especializada en
            diferentes lenguajes de programación.
          </p>
          <div className='hover:underline hover:text-white cursor-pointer text-codecolor text-lg underline-white'>
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
