import {
  TutorProfileConexionState,
  TutorProfilePicture
} from '../../components'

const TutorInfoI = () => {
  return (
    <div className='box-border border w-96 h-max pt-10 pb-10 bg-white border-gray-200 shadow-md rounded-lg'>
      <div className='flex flex-col items-center pt-5 pl-10 pr-10 pb-5'>
        <div className='w-40 h-40 rounded-full overflow-hidden transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none'>
          {/* Foto Perfil */}
          <TutorProfilePicture />
        </div>
        <div className='pt-10'>
          {/* Estado de conexion */}
          <TutorProfileConexionState />
        </div>
      </div>

      {/* Valoraciones */}
      <div className='flex justify-center items-center space-x-6'>
        <div className='flex items-center space-x-2'>
          <img src='./src/assets/Star.svg' />
          <h2 className='font-semibold text-sm text-codecolor'>5.0</h2>
        </div>
        <h2 className='font-semibold text-sm text-gray-600'>2000 reviews</h2>
      </div>

      {/* Apellido y nombre del tutor */}
      <div className='pt-6 pl-4 pr-4'>
        <h2 className='text-2xl font-medium'>Barrios Lautaro Gabriel</h2>
      </div>

      {/* Redes(GitHub y Linkedin) */}
      <div className='flex justify-center items-center pt-6 pb-6 space-x-6'>
        <a
          href='https://github.com/ '
          target='_blank'
          className='transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
        >
          <img src='./src/assets/GitHub.svg' />
        </a>
        <a
          href='https://www.linkedin.com'
          target='_blank'
          className='transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
        >
          <img src='./src/assets/LinkedIn.svg' />
        </a>
      </div>

      {/* Costos y sesiones */}
      <div className='border-t border-b flex justify-evenly items-center pt-6 pb-6 pl-4 pr-4 space-x-6'>
        <div>
          <h2 className='font-semibold text-codecolor'>US$80.00</h2>
          <h2 className='font-semibold text-sm text-gray-700'>la hora</h2>
        </div>
        <div>
          <h2 className='font-semibold text-codecolor'>500</h2>
          <h2 className='font-semibold text-sm text-gray-700'>sesiones</h2>
        </div>
      </div>

      {/* Boton para Contactar */}
      <div className='flex flex-col items-center pt-6'>
        <button
          type='button'
          className='flex flex-row items-center justify-center w-36 h-14 bg-codecolor text-white rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
        >
          Contactar
        </button>
      </div>
    </div>
  )
}
export default TutorInfoI
