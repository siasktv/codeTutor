import {
  faAddressCard,
  faAsterisk,
  faEdit,
  faEnvelope,
  faGraduationCap,
  faLocationDot,
  faLock,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { uploadImage } from '../../../firebase/client'
import { useState } from 'react'
import { UpdateModal } from '../../../components'
import { Link } from 'react-router-dom'

export default function Settings (props) {
  const { user } = props

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
        },
        () => {
          // when the image is uploaded, get the url and set it to imageURL and input.image
          task.snapshot.ref.getDownloadURL().then(async url => {
            await axios.put(`${BACKEND_URL}/api/users/${user.id}`, {
              image: url
            })
            setAvatar(url)
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleSetSelectedField = field => {
    setSelectedField(field)
    setShowModal(true)
  }

  return (
    <div className='flex flex-col items-center w-[580px]'>
      <h1 className='text-4xl font-bold text-center my-8'>
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
        <div className='self-center rounded-full items-center justify-center w-[145px] h-[145px] bg-[#D9D9D9] group'>
          <label htmlFor='avatar'>
            <img
              src={avatar}
              alt='user'
              className='w-[145px] h-[145px] rounded-full object-cover group-hover:filter group-hover:brightness-50 transition duration-300 ease-in-out hover:cursor-pointer'
              referrerPolicy='no-referrer'
            />
            <FontAwesomeIcon
              icon={faEdit}
              className='text-[25px] text-gray-200 text-opacity-70 cursor-pointer relative opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out top-[-50%] transform translate-y-[-50%]'
            />
          </label>
        </div>
        {errorImage && (
          <p className='text-red-500 text-center text-sm mt-2'>{errorImage}</p>
        )}
        <div className='flex flex-col mx-4 space-y-4 mt-4'>
          <div className='flex flex-row items-center justify-between w-full p-3 rounded-lg'>
            <p className='text-lg font-bold'>
              <FontAwesomeIcon
                icon={faEnvelope}
                className='mr-2 text-codecolor'
              />
              Email: <span className=' text-md font-normal'>{email}</span>
            </p>
            <button
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200'
              onClick={() => handleSetSelectedField('email')}
            >
              Cambiar email
            </button>
          </div>

          <div className='flex flex-row items-center justify-between w-full p-3 rounded-lg'>
            <p className='text-lg font-bold'>
              <FontAwesomeIcon
                icon={faAddressCard}
                className='mr-2 text-codecolor'
              />
              Nombre: <span className=' text-md font-normal'>{name}</span>
            </p>
            <button
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200'
              onClick={() => handleSetSelectedField('name')}
            >
              Cambiar nombre
            </button>
          </div>

          <div className='flex flex-row items-center justify-between w-full p-3 rounded-lg'>
            <p className='text-lg font-bold'>
              <FontAwesomeIcon
                icon={faLocationDot}
                className='mr-2 text-codecolor'
              />
              Ubicación :{' '}
              <span className=' text-md font-normal'>
                {location} ({timezone})
              </span>
            </p>
            <button
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200'
              onClick={() => handleSetSelectedField('location')}
            >
              Cambiar ubicación
            </button>
          </div>

          <div className='flex flex-row items-center justify-between w-full p-3 rounded-lg'>
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
                    className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200'
                  >
                    Convertirme en tutor
                  </Link>
                )}
              </>
            ) : (
              <>
                {tutorStatus === 'approved' ? (
                  <button
                    className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200'
                    onClick={() => handleSetSelectedField('disabletutor')}
                  >
                    Darme de baja
                  </button>
                ) : (
                  <button
                    className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200'
                    onClick={() => handleSetSelectedField('enabletutor')}
                  >
                    Reactivar perfil de tutor
                  </button>
                )}
              </>
            )}
          </div>

          <div className='flex flex-row items-center justify-between w-full p-3 rounded-lg'>
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
              className='bg-codecolor w-[210px] px-3 py-2 rounded-md text-white font-bold hover:bg-codecolordark transition-all ease-in-out duration-200'
              onClick={() => handleSetSelectedField('password')}
            >
              Cambiar contraseña
            </button>
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
