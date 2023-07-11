import {
  heroimgSvg,
  MagnifyingGlassSearch,
  talking,
  bag,
  lamp
} from '../../assets'
import { Link } from 'react-router-dom'
import teamWork from '../../assets/teamwork.png'
import mentor from '../../assets/mentor.png'
import { sortedBySearch } from '../../redux/features/tutors/tutorsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Hero = () => {
  const dispatch = useDispatch()
  const handleSearch = e => {
    dispatch(sortedBySearch(e.target.value))
  }
  const currentSearch = useSelector(state => state.tutors.currentSearch)
  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    navigate('/search')
  }

  return (
    <section className=' w-full bg-gray-50 overflow-hidden dark:bg-gray-900'>
      {/* Desktop */}
      <div className='flex flex-col items-center max-lg:hidden flex-wrap'>
        <div className='flex mt-20 items-center'>
          <div className='flex gap-6 -mt-40 w-3/5 pr-60 text-left flex-col '>
            <h1 className='text-7xl font-bold whitespace-nowrap dark:text-gray-200'>
              Encuentra <br />{' '}
              <span className='text-codecolor'>Desarrolladores</span> <br />Y{' '}
              <span className='text-codecolor'>Resuelve</span> Tus <br />
              <span className='text-codecolor'>Problemas</span>
            </h1>
            <p className='mb-4 w-9/12 text-base max-lg:text-center leading-relaxed text-left lg:w-125 max-md:text-sm dark:text-gray-400 text-[#646464]'>
              Code-Tutor es una plataforma donde te ayuda a conectar con{' '}
              desarrolladores para solucionar tus problemas en codigo.
            </p>
            <div className='h-10  lg:w-125 p-0 mt-0 bg-gray-50 dark:bg-gray-900 dark:ring-gray-600 dark:shadow-gray-800 dark:border-gray-400 rounded-md ring-1 ring-offset-2 dark:ring-offset-0 ring-gray-400 flex shadow-md shadow-gray-400'>
              <img
                src={MagnifyingGlassSearch}
                className='pl-2 max-sm:w-6'
              ></img>
              <form
                className='flex-1 dark:border-gray-800  min-w-0 revue-form-group mt-0.5 max-lg:mt-1'
                onSubmit={handleSubmit}
              >
                <input
                  type='text'
                  onChange={handleSearch}
                  value={currentSearch}
                  className='flex flex-row items-center justify-center lg:w-full py-1 pl-2 pr-2 lg:text-lg placeholder-gray-300  bg-transparent  dark:text-gray-200 text-codecolor outline-none  md:w-96'
                  placeholder='Encuentra un desarrollador  '
                />
              </form>
              <div className='sm:mt-0 sm:ml-3 revue-form-actions'>
                <div className='relative inline-block text-left'>
                  <div>
                    <Link
                      to='/search'
                      type='button'
                      className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-violet-100 px-6 py-2 text-md font-semibold dark:text-gray-200 dark:bg-codecolor dark:hover:bg-codecolordark dark:rounded-l-none text-codecolor shadow-sm hover:bg-violet-200 '
                      id='menu-button'
                      aria-expanded='false'
                      aria-haspopup='true'
                    >
                      Buscar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='w-2/5'>
            <div className='relative'>
              <div className='absolute top-0 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter dark:opacity-40 filter blur-xl opacity-70 animate-blob'></div>
              <div className='absolute top-0 -right-2 w-96 h-96 bg-yellow-300 dark:bg-yellow-300 dark:mix-blend-plus-lighter dark:opacity-40 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
              <div className='absolute -bottom-20 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply dark:mix-blend-plus-lighter dark:opacity-40 filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
              <div className=' relative  border border-gray-200 rounded-full bg-codecolor  w-125 h-125 mt-8 ml-5 overflow-hidden dark:border-none'>
                <img
                  className='relative w-91.5 h-108 object-center justify-center top-20  object-fit  mx-auto z-0 '
                  src={heroimgSvg}
                  alt='heroimgSvg'
                />
              </div>
            </div>
            <div className=' w-44 relative items-center left-[26rem] border border-codecolorlighter bottom-[32rem] flex flex-col py-5 px-2 rounded-2xl shadow-xl bg-white/40 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 dark:bg-gray-800 dark:bg-opacity-40 dark:border-codecolor'>
              <div className='flex '>
                <img className='w-16 h-16' src={teamWork} alt='teamwork' />
              </div>

              <div className='pt-3 font-bold text-xl dark:text-gray-200'>
                3K+
              </div>
              <div className='flex items-center text-gray-800 dark:text-gray-400 leading-relaxed'>
                <span className='pl-1'>usuarios registrados</span>
              </div>
            </div>
            <div className='w-64 px-2 py-3 relative bottom-[13rem] left-0 items-center border border-codecolorlighters flex bg-white/40 dark:bg-gray-800 dark:bg-opacity-40 dark:border-codecolor rounded-2xl shadow-xl backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-300'>
              <img src={mentor} className='w-16 h-16 self-end' alt='mentor' />
              <div class='ml-4'>
                <div class='font-bold text-xl dark:text-gray-200'>2K+</div>
                <div class='text-gray-600 dark:text-gray-400 leading-relaxed'>
                  sesiones completadas
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex flex-row pb-8 justify-center space-x-20 px-6 w-full h-10 top-20 -mt-20 max-lg:hidden'>
          <div className='flex items-center '>
            <img src={talking} />
            <p className='pl-2 p-1 dark:text-gray-200'>
              Ayuda en depuración de código
            </p>
          </div>
          <div className='flex items-center'>
            <img src={bag} />
            <p className='pl-2 p-1 dark:text-gray-200'>
              Asesoramiento en todas las áreas de desarrollo
            </p>
          </div>
          <div className='flex items-center '>
            <img src={lamp} />
            <p className='pl-2 p-1 dark:text-gray-200'>
              Genera y desarrolla tus ideas con la ayuda de un experto
            </p>
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='flex flex-col items-center justify-center w-full px-10 lg:hidden h-[calc(100svh-100px)]'>
        <div className='w-full'>
          <div className='relative flex items-center justify-center'>
            <div className='relative  border border-gray-200 rounded-full bg-codecolor self-center  overflow-hidden dark:border-none w-56 h-56'>
              <img
                className='relative w-full h-72 object-center justify-center  object-fit  mx-auto z-0 '
                src={heroimgSvg}
                alt='heroimgSvg'
              />
            </div>
          </div>
          <h1 className='lg:mb-8 text-2xl w-full flex items-center justify-center font-bold md:pt-8 lg:tracking-tighter lg:text-7xl text-center mt-5'>
            <div className='lg:hidden flex flex-col items-center dark:text-gray-200 text-black justify-center w-full text-center'>
              <span className='lg:hidden text-black dark:text-gray-200 text-4xl w-full text-center max-md:text-2xl'>
                Encuentra{' '}
                <span className='text-codecolor'>Desarrolladores</span>
              </span>
              <span className='lg:hidden text-4xl max-[452px]:w-[295px] dark:text-gray-200  text-black text-center max-md:text-2xl'>
                Y <span className='text-codecolor'>Resuelve</span>
                <span className='text-codecolor'>
                  <span className='text-black dark:text-gray-200'> Tus</span>{' '}
                  Problemas
                </span>
              </span>
            </div>
          </h1>
          <p className='mb-5 mt-5 text-base text-center leading-relaxed text-gray-700 max-md:text-sm dark:text-gray-400'>
            Code-Tutor es una plataforma donde te ayuda a conectar con{' '}
            desarrolladores para solucionar tus problemas.
          </p>
          <div className='flex-col lg:mx-0 mx-3 sm:flex'>
            <div className='h-10 p-0 mt-0 bg-gray-50 dark:bg-gray-900 dark:border-gray-700 rounded-md flex border outline-none'>
              <img
                src={MagnifyingGlassSearch}
                className='pl-2 max-sm:w-6'
              ></img>
              <form
                className='flex-1 0 revue-form-group mt-0.5 max-lg:mt-1'
                onSubmit={handleSubmit}
              >
                <input
                  type='text'
                  onChange={handleSearch}
                  value={currentSearch}
                  className='flex flex-row items-center justify-center py-1 pl-2 pr-2 lg:text-lg placeholder-gray-300 w-full bg-transparent  dark:text-gray-200 text-codecolor outline-none'
                  placeholder='Encuentra un desarrollador'
                />
              </form>
              <div className='sm:mt-0 sm:ml-3 revue-form-actions'>
                <div className='relative inline-block text-left'>
                  <div>
                    <Link
                      to='/search'
                      type='button'
                      className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-violet-100 px-6 py-[7.2px] text-md font-semibold dark:text-gray-200 dark:bg-codecolor dark:hover:bg-codecolordark dark:rounded-l-none text-codecolor shadow-sm hover:bg-violet-200'
                      id='menu-button'
                      aria-expanded='false'
                      aria-haspopup='true'
                    >
                      Buscar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a
            className=' lg:hidden bottom-8 absolute lg:mt-0'
            href='#content'
            aria-label='Scroll down'
          >
            <FontAwesomeIcon
              icon={faArrowDown}
              bounce
              className='text-xl font-light cursor-pointer text-codecolor'
            />
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
