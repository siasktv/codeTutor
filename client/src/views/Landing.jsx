import { NavLogin } from '../components'
import {
  videocallicon,
  collaboration,
  Duolingo,
  Codecov,
  UserTesting,
  MagicLeap,
  talking,
  bag,
  lamp,
  heroimgSvg,
  devslanding,
  MagnifyingGlassSearch
} from '../assets'
import { Link } from 'react-router-dom'
import { sortedBySearch } from '../redux/features/tutors/tutorsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { tutorsFetch } from '../redux/features/tutors/tutorsSlice'
import { useNavigate } from 'react-router-dom'
import LandingContent from '../layouts/LandingContent/LandingContent'
import LandingCarousel from '../layouts/LandingContent/LandingCarousel'
import useUser from '../hooks/useUser'
import NavUserSearch from '../components/NavUserSearch'

const Landing = () => {
  const dispatch = useDispatch()
  const tutors = useSelector(state => state.tutors.tutors)
  const currentSearch = useSelector(state => state.tutors.currentSearch)
  const navigate = useNavigate()
  const user = useUser()

  useEffect(() => {
    if (!tutors[0].bio?.specialty) {
      dispatch(tutorsFetch())
    }
  }, [dispatch])

  const handleSearch = e => {
    dispatch(sortedBySearch(e.target.value))
  }

  const handleSubmit = e => {
    e.preventDefault()
    navigate('/search')
  }

  return (
    <section className='overflow-x-hidden flex-1'>
      <NavLogin className='z-50' user={user} />
      
      
    

      <div className='px-0 pt-10 pb-20 mx-auto max-w-7xl sm:px-0 md:px-0 lg:px-0 lg:pt-10'>
        <div className='flex flex-wrap items-center mx-auto max-w-7xl'>
          <div className='flex flex-col items-start text-left lg:flex-grow  lg:w-1/2 relative     '>
            <h1 className='mb-8 text-4xl font-bold pt-8 tracking-tighter  md:text-9xl lg:text-7xl'>
              <span className='block text-blackcodecolor leading-20 '>
                Encuentra
              </span>
              <span className='block text-codecolor leading-20'>
                Desarrolladores
              </span>
              <span className='text-blackcodecolor leading-20'>Y </span>
              <span className='text-codecolor'>Resuelve </span>
              <span className='text-blackcodecolor'>Tus </span>
              <br />
              <span className='text-codecolor'>Problemas</span>
            </h1>
            <p className='mb-8 text-base leading-relaxed text-left text-gray-700'>
              Code-Mentor es una plataforma donde te ayuda a conectar con <br />
              desarrolladores para solucionar tus problemas.
            </p>
            <div className='flex-col mt-0 lg:mt-6 max-w-7xl sm:flex'>
              
              <div className='h-10 w-125 p-0 mt-0  bg-gray-50 rounded-md ring-1 ring-offset-2 ring-gray-400 sm:flex shadow-md shadow-gray-400'>
                <img src={MagnifyingGlassSearch} className='pl-2'></img>
                <form
                  className='flex-1 min-w-0 revue-form-group mt-0.5'
                  onSubmit={handleSubmit}
                >
                  <input
                    type='text'
                    onChange={handleSearch}
                    value={currentSearch}
                    className='flex flex-row items-center justify-center w-full py-1 pl-2 pr-2 text-lg placeholder-gray-300   bg-transparent   text-codecolor outline-none   '
                    placeholder='Encuentra un desarrollador  '
                  />
                </form>
                <div className='mt-4 sm:mt-0 sm:ml-3 revue-form-actions'>
                  <div className='relative inline-block text-left'>
                    <div>
                      <Link
                        to='/search'
                        type='button'
                        className='inline-flex w-full justify-center gap-x-1.5 rounded-md bg-violet-100 px-6 py-2 text-md font-semibold text-codecolor shadow-sm hover:bg-violet-200'
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
              <div className='sm:max-w-lg sm:flex relative '>
                <div className='w-125 absolute bottom-96 -z-50 -left-40 '>
                  <div className='box-border absolute w-3 h-3 left-32 -top-44 border bg-codecolor rounded-full  '></div>
                  <div className='absolute w-414px h-414px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor'>
                    <div className='absolute w-344px h-344px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor'>
                      <div className='absolute w-265px h-265px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor'>
                        <div className='absolute w-162px h-162px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor'></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full lg:max-w-lg lg:w-1/2 rounded-xl h-[35rem] '>
            <div className='box-border relative w-125 h-125 right-0 top-0 border border-codecolor rounded-full  '></div>
            <div className='relative w-full h-510px   border-transparent bottom-510px z-40'>
              <div className='relative rounded-full bg-codecolor  w-125 h-125 mt-8 ml-5  overflow-hidden border-transparent '>
                <img
                  className=' relative w-91.5 h-108 object-center justify-center top-20  object-fit border-transparent mx-auto z-0 '
                  alt='hero'
                  src={heroimgSvg}
                />
              </div>

              <div className='w-125 relative -bottom-16 -z-40 ml-40'>
                <div className='box-border absolute w-11 h-11 -left-28 bottom-20 border bg-codecolor rounded-full '></div>
                <div className='box-border absolute w-4 h-4 left-20 -bottom-16 border bg-codecolor rounded-full  '></div>
                <div className='absolute w-414px h-414px left-72  top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor '>
                  <div className='absolute w-344px h-344px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor '>
                    <div className='absolute w-265px h-265px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor '>
                      <div className='absolute w-162px h-162px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor '></div>
                    </div>
                  </div>
                </div>
              </div>
            

              <div className='relative w-510px h-510px justify-center items-center bottom-[32rem] z-10'>
        <div className='relative flex-row  w-40 h-48 left-[26rem]   bg-white rounded-2xl border border-codecolor  shadow-md shadow-gray-600 z-10'>
          <div className='absolute w-20 h-20 border-8 border-solid left-10 top-5  border-gray-200  rounded-full'></div>
          <div className='absolute w-20 h-20 border-8 border-solid left-10 top-5 border-l-transparent border-b-transparent  transform rotate-12 border-codecolor rounded-full'></div>
          <h1 className='relative text-3xl text-blackcodecolor font-bold top-28 left-0'>
            5K+
          </h1>
          <p className='relative text-lg text-gray-500 top-28 left-0 '>
            Usuarios Online
          </p>
        </div>

        <div className='relativeflex-row justify-items-start  w-56 h-24 -ml-20  bg-white rounded-2xl border border-codecolor  shadow-md shadow-gray-600 z-10'>
          <div className='relative w-14 h-14 top-5 left-5 flex items-center justify-center bg-codecolor rounded-2xl '>
            <img
              src={videocallicon}
              alt='video-call-icon'
              className='w-10 h-10'
            ></img>
          </div>
          <h1 className='relative text-3xl text-blackcodecolor font-bold bottom-10 left-5'>
            2K+
          </h1>
          <p className='relative text-lg text-gray-500 bottom-10 left-8 '>
            Videollamadas
          </p>
        </div>

        <div className='relative flex-row justify-items-start  w-56 h-24 left-[24rem]  bg-white rounded-2xl border border-codecolor  shadow-md shadow-gray-600 z-10'>
          <div className='relative w-14 h-14 top-5 left-5 flex items-center justify-center bg-codecolor rounded-2xl '>
            <img src={devslanding} alt='devs-icon' className='w-10 h-10'></img>
          </div>
          <p className='relative text-lg text-gray-500 bottom-10 left-8 '>
            Desarrolladores
          </p>
          <h1 className='relative text-3xl text-blackcodecolor font-bold bottom-11 left-2'>
            250+
          </h1>
        </div>
      </div>

            </div>
            
          </div>
        </div>
        
        <div className='flex flex-row justify-between relative w-full h-10 top-20  '>
        <div className='flex '>
          <img src={talking} />
          <p className='pl-2 p-1'>Ayuda en depuración de código</p>
        </div>
        <div className='flex  '>
          <img src={bag} />
          <p className='pl-2 p-1'>
            Asesoramiento en todas las áreas de desarrollo
          </p>
        </div>
        <div className='flex  '>
          <img src={lamp} />
          <p className='pl-2 p-1'>
            Genera y desarrolla tus ideas con la ayuda de un experto
          </p>
        </div>
      </div>
      <div className='px-5 py-6  lg:px-16 pt-32'>
        <div className='mx-auto text-center'>
          <div className='grid grid-cols-5 gap-4 mx-auto lg:grid-cols-5'>
            <div>
              <img
                className='h-6 mx-auto -mt-4 lg:h-16 '
                src={collaboration}
                alt='collaboration'
              />
            </div>
            <div>
              <img
                className='h-6 mx-auto -mt-4 lg:h-16 '
                src={Duolingo}
                alt='Duolingo'
              />
            </div>
            <div>
              <img
                className='h-6 mx-auto -mt-4 lg:h-16 '
                src={Codecov}
                alt='Codecov'
              />
            </div>
            <div>
              <img
                className='h-6 mx-auto -mt-4 lg:h-16 '
                src={UserTesting}
                alt='UserTesting'
              />
            </div>
            <div>
              <img
                className='h-6 mx-auto -mt-4 lg:h-16 '
                src={MagicLeap}
                alt='MagicLeap'
              />
            </div>
          </div>
        </div>
      </div>

      </div>
      <LandingContent/>
      <LandingCarousel/>
    </section>
  )
}

export default Landing
