import { Link } from 'react-router-dom'
import { Marvin } from '../../assets'
import IconCodeTutor from '../../assets/IconCodeTutor.svg'

const LandingSlide1 = () => {
  return (
    <div className='relative items-center justify-center w-full'>
      <section className='bg-[#F9FAFB] dark:bg-gray-900 max-lg:px-2'>
        <div className='w-full py-20 mx-auto text-center  '>
          <div className=' pt-2 justify-center flex'>
            <Link to='/'>
              <span className='flex h-10 '>
                <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply dark:mix-blend-normal'></div>
                <h1 className='font-bold text-xl ml-1 dark:text-gray-200'>
                  Code-Tutor.
                </h1>
              </span>
            </Link>
          </div>
          <h1 className='mt-3 lg:px-24 dark:text-gray-200 max-lg:text-2xl mb-10  lg:text-4xl font-semibold text-blackcodecolor '>
            En Code-Tutor encontré la ayuda que necesitaba para depurar mi
            código y poder deployar mi aplicación.
          </h1>
          <div className='flex justify-center'>
            <img
              src={Marvin}
              alt='Praveen Juge'
              className='flex justify-center'
            />
          </div>
          <p className='text-lg font-medium dark:text-gray-400 text-[#101828] pt-4'>
            Marvin McKinney
          </p>
          <p className='text-md font-medium text-[#667085] dark:text-gray-500 pt-2'>
            Full Stack Developer Freelance en Argentina
          </p>
        </div>
      </section>
    </div>
  )
}

export default LandingSlide1
