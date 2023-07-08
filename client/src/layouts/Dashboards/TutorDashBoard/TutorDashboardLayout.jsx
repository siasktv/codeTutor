import { Link } from 'react-router-dom'
import IconCodeTutor from '../../../assets/IconCodeTutor.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faChartLine,
  faChartPie,
  faClockRotateLeft,
  faCreditCard,
  faExternalLinkAlt,
  faGear,
  faHome,
  faQuestionCircle,
  faSignOut,
  faUser,
  faWallet
} from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { LogoutModal } from '../../../components'

const TutorDashboardLayout = props => {
  const { selectedSection, setSelectedSection } = props
  const [showModalLogout, setShowModalLogout] = useState(false)
  return (
    <div className='flex overflow-hidden bg-white dark:bg-gray-900 rounded-lg'>
      <div className='flex overflow-hidden'>
        <div className='flex flex-col h-screen'>
          <div className='flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-900 border-r dark:border-r-gray-900'>
            <div className='flex pt-2 ml-12 h-10'>
              <Link to='/'>
                <span className='flex h-10 w-52'>
                  <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                  <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply dark:mix-blend-normal'></div>
                  <h1 className='font-bold text-xl ml-1 dark:text-gray-200'>
                    Code-Tutor.
                  </h1>
                </span>
              </Link>
            </div>
            <div className='flex flex-col flex-grow px-4 mt-5'>
              <nav className='flex-1 space-y-1 bg-white dark:bg-gray-900'>
                <ul>
                  <li>
                    <button
                      className={
                        selectedSection === 'dashboard'
                          ? 'inline-flex items-center w-full px-4 py-4 mt-1 font-semibold  text-white transition duration-200 ease-in-out transform bg-codecolor rounded-lg shadow-lg pl-8'
                          : 'inline-flex items-center w-full px-4 py-4 mt-1 pl-8 border border-transparent hover:border-codecolor text-gray-700 transition duration-200 ease-in-out transform bg-white rounded-lg dark:bg-gray-800 dark:text-gray-200'
                      }
                      white=''
                      onClick={() => setSelectedSection('dashboard')}
                    >
                      <FontAwesomeIcon
                        icon={faChartPie}
                        className={
                          selectedSection === 'dashboard'
                            ? 'w-5 h-5'
                            : 'w-5 h-5'
                        }
                      />
                      <span className=' ml-4'>Estadisticas</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={
                        selectedSection === 'calendar'
                          ? 'inline-flex items-center w-full px-4 py-4 mt-1 font-semibold  text-white transition duration-200 ease-in-out transform bg-codecolor rounded-lg shadow-lg pl-8'
                          : 'inline-flex items-center w-full px-4 py-4 mt-1 pl-8 border border-transparent hover:border-codecolor text-gray-700 transition duration-200 ease-in-out transform bg-white rounded-lg dark:bg-gray-800 dark:text-gray-200'
                      }
                      onClick={() => setSelectedSection('calendar')}
                    >
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className={
                          selectedSection === 'calendar'
                            ? 'w-5 h-5 '
                            : 'w-5 h-5'
                        }
                      />
                      <span className='ml-4'>Calendario</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={
                        selectedSection === 'sessions'
                          ? 'inline-flex items-center w-full px-4 py-4 mt-1 font-semibold  text-white transition duration-200 ease-in-out transform bg-codecolor rounded-lg shadow-lg pl-8'
                          : 'inline-flex items-center w-full px-4 py-4 mt-1 pl-8 border border-transparent hover:border-codecolor text-gray-700 transition duration-200 ease-in-out transform bg-white rounded-lg dark:bg-gray-800 dark:text-gray-200'
                      }
                      onClick={() => setSelectedSection('sessions')}
                    >
                      <FontAwesomeIcon
                        icon={faClockRotateLeft}
                        className={
                          selectedSection === 'sessions'
                            ? 'w-5 h-5 '
                            : 'w-5 h-5'
                        }
                      />
                      <span className='ml-4'>Mis sesiones</span>
                    </button>
                  </li>
                  <li>
                    <button
                      className={
                        selectedSection === 'payments'
                          ? 'inline-flex items-center w-full px-4 py-4 mt-1 font-semibold  text-white transition duration-200 ease-in-out transform bg-codecolor rounded-lg shadow-lg pl-8'
                          : 'inline-flex items-center w-full px-4 py-4 mt-1 pl-8 border border-transparent hover:border-codecolor text-gray-700 transition duration-200 ease-in-out transform bg-white rounded-lg dark:bg-gray-800 dark:text-gray-200'
                      }
                      white=''
                      onClick={() => setSelectedSection('payments')}
                    >
                      <FontAwesomeIcon
                        icon={faWallet}
                        className={
                          selectedSection === 'payments'
                            ? 'w-5 h-5 '
                            : 'w-5 h-5'
                        }
                      />
                      <span className='ml-4'>Cobros</span>
                    </button>
                  </li>

                  <li>
                    <button
                      className={
                        selectedSection === 'settings'
                          ? 'inline-flex items-center w-full px-4 py-4 mt-1 font-semibold  text-white transition duration-200 ease-in-out transform bg-codecolor rounded-lg shadow-lg pl-8'
                          : 'inline-flex items-center border border-transparent hover:border-codecolor w-full px-4 py-4 mt-1 pl-8  text-gray-700 transition duration-200 ease-in-out transform bg-white rounded-lg dark:bg-gray-800 dark:text-gray-200'
                      }
                      white=''
                      onClick={() => setSelectedSection('settings')}
                    >
                      <FontAwesomeIcon
                        icon={faGear}
                        className={
                          selectedSection === 'settings'
                            ? 'w-5 h-5 '
                            : 'w-5 h-5'
                        }
                      />
                      <span className='ml-4'>Ajustes</span>
                    </button>
                  </li>
                  <li>
                    <Link
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-gray-700 hover:border-codecolor transition duration-200 ease-in-out border-transparent transform border rounded-lg focus:shadow-outlinecursor-pointer bg-white cursor-pointer dark:bg-gray-800 dark:text-gray-200'
                      to='/user'
                    >
                      <FontAwesomeIcon icon={faUser} className='w-5 h-5' />
                      <span className='ml-4'>
                        Panel de usuario
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          className='w-3 h-3 ml-2'
                        />
                      </span>
                    </Link>
                  </li>

                  <li>
                    <Link
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-gray-700 hover:border-codecolor transition duration-200 ease-in-out border-transparent transform border rounded-lg focus:shadow-outlinecursor-pointer bg-white cursor-pointer dark:bg-gray-800 dark:text-gray-200'
                      to='/'
                    >
                      <FontAwesomeIcon icon={faHome} className='w-5 h-5' />
                      <span className='ml-4'>Volver al inicio</span>
                    </Link>
                  </li>
                  <li>
                    <a
                      className='inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-red-500 hover:border-red-500 transition duration-200 ease-in-out border-transparent transform border rounded-lg focus:shadow-outlinecursor-pointer bg-white cursor-pointer dark:bg-gray-800 '
                      white=''
                      onClick={setShowModalLogout}
                    >
                      <FontAwesomeIcon icon={faSignOut} className='w-5 h-5' />
                      <span className='ml-4'>Cerrar sesión</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            {showModalLogout && (
              <LogoutModal setShowModalLogout={setShowModalLogout} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default TutorDashboardLayout
