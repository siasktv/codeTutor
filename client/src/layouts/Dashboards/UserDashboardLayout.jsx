import { Link } from 'react-router-dom'
import { signOut } from '../../firebase/client'
import IconCodeTutor from '../../assets/IconCodeTutor.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faChartLine,
  faChartPie,
  faCreditCard,
  faGear,
  faQuestionCircle,
  faSignOut
} from '@fortawesome/free-solid-svg-icons'

const UserDashboardLayout = () => {
  return (
    <div className='flex overflow-hidden bg-white rounded-lg'>
      <div className='flex overflow-hidden'>
        <div className='flex flex-col h-screen'>
          <div className='flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r'>
            <div className='flex pt-2 ml-12 h-10'>
              <Link to='/'>
                <span className='flex h-10 w-52'>
                  <img className='h-8' src={IconCodeTutor} />
                  <h1 className='font-bold text-xl ml-1'>Code-Tutor.</h1>
                </span>
              </Link>
            </div>
            <div className='flex flex-col flex-grow px-4 mt-5'>
              <nav className='flex-1 space-y-1 bg-white'>
                <ul>
                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 text-lg font-semibold  text-white transition duration-500 ease-in-out transform bg-codecolor rounded-lg shadow-lg'
                      white=''
                      href='#'
                    >
                      <FontAwesomeIcon
                        icon={faChartPie}
                        className='w-5 h-5 ml-5'
                      />
                      <span className=' pl-8'>Dashboard</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white'
                      href='#'
                    >
                      <FontAwesomeIcon icon={faCalendar} className='w-5 h-5' />
                      <span className='ml-4'>Calendario</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white'
                      href='#'
                    >
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className='w-5 h-5'
                      />
                      <span className='ml-4'>Método de pago</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8  text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white'
                      href='#'
                    >
                      <FontAwesomeIcon icon={faChartLine} className='w-5 h-5' />
                      <span className='ml-4'>Historial</span>
                    </a>
                  </li>

                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8  text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white'
                      white=''
                      href='#'
                    >
                      <FontAwesomeIcon icon={faGear} className='w-5 h-5' />
                      <span className='ml-4'>Ajustes</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8  text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white'
                      white=''
                      href='#'
                    >
                      <FontAwesomeIcon
                        icon={faQuestionCircle}
                        className='w-5 h-5'
                      />
                      <span className='ml-4'>FAQs</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-red-500 hover:border-red-500 transition duration-200 ease-in-out border-transparent transform border rounded-lg focus:shadow-outlinecursor-pointer bg-white cursor-pointer'
                      white=''
                      onClick={signOut}
                    >
                      <FontAwesomeIcon icon={faSignOut} className='w-5 h-5' />
                      <span className='ml-4'>Salir</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserDashboardLayout
