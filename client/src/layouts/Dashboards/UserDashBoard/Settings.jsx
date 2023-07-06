import {
  faAddressCard,
  faAsterisk,
  faEdit,
  faEnvelope,
  faGraduationCap,
  faLocationDot,
  faLock,
  faUser,
  faCheck,
  faCheckCircle,
  faMoon
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { uploadImage } from '../../../firebase/client'
import { useState, useEffect } from 'react'
import { UpdateModal } from '../../../components'
import { Link } from 'react-router-dom'
import { LoaderMini } from '../../../components'

export default function Settings (props) {
  const { user, setShowTutorDashboard } = props

  const [avatar, setAvatar] = useState(user?.image)
  const [email, setEmail] = useState(user?.email)
  const [name, setName] = useState(user?.fullName)
  const [location, setLocation] = useState(user?.location)
  const [timezone, setTimezone] = useState(user?.timezone)
  const [tutorStatus, setTutorStatus] = useState(user?.tutor?.status)
  const [errorImage, setErrorImage] = useState('')
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [selectedField, setSelectedField] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [successUpload, setSuccessUpload] = useState(false)

  const [darkMode, setDarkMode] = useState(null)
  const theme = localStorage.getItem('theme')
  useEffect(() => {
    if (theme === 'dark') {
      setDarkMode(true)
    } else if (theme === 'light') {
      setDarkMode(false)
    } else if (theme === null) {
      setDarkMode('auto')
    }
  }, [theme])

  const handleDarkMode = value => {
    if (value === 'true') {
      setDarkMode(true)
      localStorage.theme = 'dark'
      const html = document.querySelector('html')
      html.classList.add('dark')
      document.getElementById('themeSyncfusion').href =
        'https://cdn.syncfusion.com/ej2/tailwind-dark.css'
      document.documentElement.classList.add('scrollbarDark')
    } else if (value === 'false') {
      setDarkMode(false)
      localStorage.theme = 'light'
      const html = document.querySelector('html')
      html.classList.remove('dark')
      document.getElementById('themeSyncfusion').href =
        'https://cdn.syncfusion.com/ej2/tailwind.css'
      document.documentElement.classList.remove('scrollbarDark')
    } else if (value === 'auto') {
      setDarkMode(
        localStorage.theme === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      )
      localStorage.removeItem('theme')
      const html = document.querySelector('html')
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark')
        document.getElementById('themeSyncfusion').href =
          'https://cdn.syncfusion.com/ej2/tailwind-dark.css'
        document.documentElement.classList.add('scrollbarDark')
      } else {
        html.classList.remove('dark')
        document.getElementById('themeSyncfusion').href =
          'https://cdn.syncfusion.com/ej2/tailwind.css'
        document.documentElement.classList.remove('scrollbarDark')
      }
    }
  }

  useEffect(() => {
    if (tutorStatus === 'approved') {
      setShowTutorDashboard(true)
    } else {
      setShowTutorDashboard(false)
    }
  }, [tutorStatus])

  const handleUploadImage = async e => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    if (
      !file.type.includes('image/png') &&
      !file.type.includes('image/jpeg') &&
      !file.type.includes('image/jpg')
    ) {
      setErrorImage('Imagen no válida')

      return
    }
    // check if file is larger than 5mb
    if (file.size > 5000000) {
      setErrorImage('Imagen demasiado grande')

      return
    }
    try {
      setIsUploading(true)
      const task = uploadImage(file)
      task.on(
        'state_changed',
        snapshot => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          // if there is an error, console.log it
          console.log(error)
          setIsUploading(false)
        },
        () => {
          // when the image is uploaded, get the url and set it to imageURL and input.image
          task.snapshot.ref.getDownloadURL().then(async url => {
            await axios.put(`${BACKEND_URL}/api/users/${user.id}`, {
              image: url
            })
            setAvatar(url)
            setIsUploading(false)
            setSuccessUpload(true)
          })
        }
      )
    } catch (error) {
      setIsUploading(false)
      console.log(error)
    }
  }

  const handleSetSelectedField = field => {
    setSelectedField(field)
    setShowModal(true)
  }

  useEffect(() => {
    if (successUpload) {
      setTimeout(() => {
        setSuccessUpload(false)
      }, 1000)
    }
  }, [successUpload])

  return (
    <div className='flex flex-col items-center lg:min-w-[580px] dark:text-gray-200 max-lg:w-full'>
      <h1 className='lg:text-4xl text-2xl font-bold text-center lg:my-8 my-4'>
        Ajustes de usuario
      </h1>
      <div className='flex flex-col min-h-[500px] w-full relative rounded-lg'>
        <input
          type='file'
          name='avatar'
          id='avatar'
          className='hidden'
          onChange={handleUploadImage}
        />
        <div className='self-center rounded-full items-center justify-center lg:w-[145px] lg:h-[145px] h-32 w-32 bg-[#D9D9D9] group'>
          <label htmlFor='avatar'>
            <img
              src={avatar}
              alt='user'
              className={
                isUploading || successUpload
                  ? 'lg:w-[145px] lg:h-[145px] h-32 w-32 rounded-full object-cover filter brightness-50 transition duration-300 ease-in-out hover:cursor-pointer'
                  : 'lg:w-[145px] lg:h-[145px] h-32 w-32 rounded-full object-cover group-hover:filter group-hover:brightness-50 transition duration-300 ease-in-out hover:cursor-pointer'
              }
              referrerPolicy='no-referrer'
            />
            {!isUploading && !successUpload && (
              <FontAwesomeIcon
                icon={faEdit}
                className='text-[25px] text-gray-200 text-opacity-70 cursor-pointer relative opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out top-[-50%] transform translate-y-[-50%]'
              />
            )}
            {isUploading && (
              <div className='relative top-[-50%] transform translate-y-[-50%]'>
                <LoaderMini />
              </div>
            )}
            {successUpload && (
              <div className='relative top-[-50%] transform translate-y-[-50%]'>
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className='text-white text-2xl'
                />
              </div>
            )}
          </label>
        </div>
        {errorImage && (
          <p className='text-red-500 text-center text-sm mt-2'>{errorImage}</p>
        )}
        <div className='flex flex-col mx-4 lg:space-y-4 space-y-2 mt-4'>
          <div className='flex flex-col max-lg:space-y-2 lg:flex-row items-center justify-between w-full p-3 rounded-lg'>
            <p className='text-lg font-bold'>
              <FontAwesomeIcon
                icon={faEnvelope}
                className='mr-2 text-codecolor'
              />
              Email: <span className=' text-md font-normal'>{email}</span>
            </p>
            <button
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200 ml-2'
              onClick={() => handleSetSelectedField('email')}
            >
              Cambiar email
            </button>
          </div>

          <div className='flex flex-col max-lg:space-y-2 lg:flex-row items-center justify-between w-full p-3 rounded-lg'>
            <p className='text-lg font-bold'>
              <FontAwesomeIcon
                icon={faAddressCard}
                className='mr-2 text-codecolor'
              />
              Nombre: <span className=' text-md font-normal'>{name}</span>
            </p>
            <button
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200 ml-2'
              onClick={() => handleSetSelectedField('name')}
            >
              Cambiar nombre
            </button>
          </div>

          <div className='flex flex-col max-lg:space-y-2 lg:flex-row items-center justify-between w-full p-3 rounded-lg'>
            <p className='text-lg font-bold'>
              <FontAwesomeIcon
                icon={faLocationDot}
                className='mr-2 text-codecolor'
              />
              Ubicación:{' '}
              <span className=' text-md font-normal'>
                {location ? (
                  <>
                    {' '}
                    {location} ({timezone})
                  </>
                ) : (
                  'No especificada'
                )}
              </span>
            </p>
            <button
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200 ml-2'
              onClick={() => handleSetSelectedField('location')}
            >
              Cambiar ubicación
            </button>
          </div>

          <div className='flex flex-col max-lg:space-y-2 lg:flex-row items-center justify-between w-full p-3 rounded-lg'>
            <p className='text-lg font-bold'>
              <FontAwesomeIcon
                icon={
                  user.role === 'Client'
                    ? faUser
                    : tutorStatus === 'approved'
                    ? faGraduationCap
                    : faUser
                }
                className='mr-2 text-codecolor'
              />
              Tipo de usuario:{' '}
              <span className=' text-md font-normal'>
                {user.role === 'Client'
                  ? 'Cliente'
                  : tutorStatus === 'approved'
                  ? 'Tutor'
                  : 'Cliente'}
              </span>
            </p>
            {user.role === 'Client' ? (
              <>
                {user.tutor?.bio ? (
                  <>
                    {user.tutor?.status === 'pending' ? (
                      <p className='text-md font-bold text-yellow-500 text-center w-[210px] py-3'>
                        Solicitud pendiente
                      </p>
                    ) : (
                      <p className='text-md font-bold text-red-500 text-center w-[210px] py-3'>
                        Solicitud rechazada
                      </p>
                    )}
                  </>
                ) : (
                  <Link
                    to='/tutor'
                    className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200 ml-2'
                  >
                    Convertirme en tutor
                  </Link>
                )}
              </>
            ) : (
              <>
                {tutorStatus === 'approved' ? (
                  <button
                    className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200 ml-2'
                    onClick={() => handleSetSelectedField('disabletutor')}
                  >
                    Darme de baja
                  </button>
                ) : (
                  <button
                    className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200 ml-2'
                    onClick={() => handleSetSelectedField('enabletutor')}
                  >
                    Reactivar perfil de tutor
                  </button>
                )}
              </>
            )}
          </div>

          <div className='flex flex-col max-lg:space-y-2 lg:flex-row items-center justify-between w-full p-3 rounded-lg'>
            <div className='flex flex-row items-center'>
              <p className='text-lg font-bold'>
                <FontAwesomeIcon
                  icon={faLock}
                  className='mr-2 text-codecolor'
                />
                Nueva contraseña:{' '}
                {Array.from({ length: 8 }).map((_, i) => (
                  <FontAwesomeIcon
                    icon={faAsterisk}
                    key={i}
                    className=' text-xs mb-0.5 font-normal mr-0.5'
                  />
                ))}
              </p>
            </div>

            <button
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200 ml-2'
              onClick={() => handleSetSelectedField('password')}
            >
              Cambiar contraseña
            </button>
          </div>
          <div className='flex flex-col max-lg:space-y-2 lg:flex-row items-center justify-between w-full p-3 rounded-lg'>
            <div className='flex flex-row items-center'>
              <p className='text-lg font-bold'>
                <FontAwesomeIcon
                  icon={faMoon}
                  className='mr-2 text-codecolor'
                />
                Modo oscuro:{' '}
              </p>
            </div>
            <select
              name='darkmode'
              id='darkmode'
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold transition-all ease-in-out duration-200 ml-2'
              onChange={e => handleDarkMode(e.target.value)}
            >
              <option
                value='true'
                selected={darkMode === 'true' || darkMode === true}
              >
                Activado
              </option>
              <option
                value='false'
                selected={darkMode === 'false' || darkMode === false}
              >
                Desactivado
              </option>
              <option value='auto' selected={darkMode === 'auto'}>
                Usar tema del sistema
              </option>
            </select>
          </div>
        </div>
      </div>
      {showModal && selectedField && (
        <UpdateModal
          setShowModal={setShowModal}
          selectedField={selectedField}
          setName={setName}
          setLocation={setLocation}
          setEmail={setEmail}
          setTimezone={setTimezone}
          user={user}
          name={name}
          location={location}
          email={email}
          timezone={timezone}
          setTutorStatus={setTutorStatus}
        />
      )}
    </div>
  )
}
