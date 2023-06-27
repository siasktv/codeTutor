import React from 'react'
import { resetPassword, validateOobCode } from '../firebase/client'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Loader, LoaderMini } from '../components'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function useQuery () {
  const location = useLocation()
  return new URLSearchParams(location.search)
}

const RestorePasswordForm = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const query = useQuery()
  const oobCode = query.get('oobCode')
  const navigate = useNavigate()
  const [errors, setErrors] = useState({
    start: 'true'
  })
  const [form, setForm] = useState({
    password: '',
    confirmPassword: ''
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [firebaseError, setFirebaseError] = useState(null)
  const [showAlert, setShowAlert] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  useEffect(() => {
    const isFormValid = Object.values(errors).every(error => !error)
    if (!isFormValid || isSubmitting) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [errors])

  const validateForm = form => {
    let errors = {}
    if (!form.password.trim()) {
      errors.password = 'Por favor, ingrese una contraseña'
    } else if (form.password.trim().length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    } else if (form.password.trim().length > 20) {
      errors.password = 'La contraseña debe tener menos de 20 caracteres'
    }
    if (!form.confirmPassword.trim()) {
      errors.confirmPassword = 'Por favor, confirme su contraseña'
    } else if (form.password.trim() !== form.confirmPassword.trim()) {
      errors.confirmPassword = 'Las contraseñas no coinciden'
    }
    return errors
  }

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
    setErrors(
      validateForm({
        ...form,
        [e.target.name]: e.target.value
      })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isDisabled) return
    setErrors(
      validateForm({
        ...form
      })
    )
    setIsSubmitting(true)
    setIsDisabled(true)
    resetPassword(oobCode, form.password)
      .then(() => {
        setIsSubmitting(false)
        setSuccess(true)
        setIsDisabled(true)
      })
      .catch(err => {
        setIsSubmitting(false)
        if (err.code === 'auth/weak-password') {
          setFirebaseError(
            'La contraseña debe tener al menos 6 caracteres y no puede ser una contraseña común.'
          )
        } else {
          setFirebaseError(
            'Ha ocurrido un error. Inténtalo de nuevo más tarde.'
          )
        }
      })
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
        setShowAlert(true)
      }, 1000)
    }
  }, [success])

  useEffect(() => {
    if (oobCode) {
      validateOobCode(oobCode)
        .then(() => {
          setIsLoading(false)
        })
        .catch(err => {
          if (err.code === 'auth/invalid-action-code') {
            setError(
              'El link no es válido o ha expirado. Si quieres restablecer tu contraseña, vuelve a enviar el correo de restablecimiento.'
            )
          } else if (err.code === 'auth/user-disabled') {
            setError(
              'El usuario al que pertenece el link ha sido deshabilitado.'
            )
          } else if (err.code === 'auth/user-not-found') {
            setError(
              'El usuario al que pertenece el link no existe o ha sido eliminado.'
            )
          } else if (err.code === 'auth/expired-action-code') {
            setError(
              'El link ha expirado. Si quieres restablecer tu contraseña, vuelve a enviar el correo de restablecimiento.'
            )
          } else {
            setError('Ha ocurrido un error. Inténtalo de nuevo más tarde.')
          }
          setIsLoading(false)
        })
    } else {
      navigate('/')
    }
  }, [oobCode])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      {isLoading && (
        <div className='flex flex-col items-center justify-center'>
          <div className='bg-white rounded lg:w-12/12 md:w-12/12 w-full p-10 pt-36'>
            <Loader />
          </div>
        </div>
      )}
      {!isLoading && !error && (
        <div className='flex flex-col items-center justify-center'>
          <div className='bg-white rounded lg:w-12/12 md:w-12/12 w-full p-10 pt-36'>
            <p
              tabIndex='0'
              className='focus:outline-none text-2xl font-bold leading-6 text-gray-800 text-left'
            >
              Ingresa una nueva contraseña
            </p>

            <form onSubmit={handleSubmit}>
              <div className='w-full mt-4'>
                <label
                  id='password'
                  className='text-sm font-medium leading-none text-gray-800'
                >
                  <p className='text-base font-normal leading-6 text-gray-800 text-left'>
                    Nueva contraseña
                  </p>
                </label>
                <div className='relative flex items-center justify-center'>
                  <input
                    aria-labelledby='Nueva contraseña'
                    type={showPassword ? 'text' : 'password'}
                    className={
                      errors.password
                        ? 'bg-red-100 border border-red-500 outline-red-500 rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                        : 'bg-white border rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                    }
                    name='password'
                    onChange={handleChange}
                    required
                    value={form.password}
                  />
                  <div
                    className='absolute right-0 mt-2 mr-3 cursor-pointer'
                    onClick={togglePasswordVisibility}
                  >
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z'
                        fill='#71717A'
                      />
                    </svg>
                  </div>
                </div>
                {errors.password && (
                  <p className='text-red-500 text-md text-left mt-2'>
                    {errors.password}
                  </p>
                )}
                <label
                  id='password'
                  className='text-sm font-medium leading-none text-gray-800'
                >
                  <p className='text-base font-normal leading-6 text-gray-800 text-left pt-4'>
                    Repite tu nueva contraseña
                  </p>
                </label>
                <div className='relative flex items-center justify-center'>
                  <input
                    aria-labelledby='Repite tu nueva contraseña'
                    type={showPassword ? 'text' : 'password'}
                    className={
                      errors.confirmPassword
                        ? 'bg-red-100 border border-red-500 outline-red-500 rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                        : 'bg-white border rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                    }
                    onChange={handleChange}
                    required
                    name='confirmPassword'
                    value={form.confirmPassword}
                  />

                  <div
                    className='absolute right-0 mt-2 mr-3 cursor-pointer'
                    onClick={togglePasswordVisibility}
                  >
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z'
                        fill='#71717A'
                      />
                    </svg>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className='text-red-500 text-md text-left mt-2'>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div className='mt-8'>
                <button
                  role='button'
                  className={
                    !isSubmitting && !success
                      ? isDisabled
                        ? ' cursor-default text-base font-semibold leading-none text-white focus:outline-none bg-gray-400 border rounded-lg py-6 w-full'
                        : 'hover:ring-4 hover:ring-violet-300 text-base font-semibold leading-none text-white focus:outline-none bg-codecolor border rounded-lg hover:bg-violet-600 py-6 w-full'
                      : 'cursor-default text-base font-semibold leading-none text-white focus:outline-none bg-codecolor border rounded-lg py-6 w-full'
                  }
                  type='submit'
                  disabled={isDisabled}
                >
                  {isSubmitting ? (
                    <LoaderMini />
                  ) : success ? (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  ) : (
                    'Restablece tu contraseña'
                  )}
                </button>
              </div>
              {firebaseError && (
                <p className='text-red-500 text-md text-center mt-2'>
                  {firebaseError}
                </p>
              )}
            </form>
          </div>
          {showAlert && (
            <div
              role='alert'
              class='rounded-xl absolute border border-gray-100 bg-white p-4  shadow-xl mr-auto ml-auto left-0 right-0 text-center top-0 bottom-0 flex justify-center items-center transition-opacity'
            >
              <div className='flex flex-col'>
                <div class='flex items-center justify-center'>
                  <span class='text-codecolor'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.5'
                      stroke='currentColor'
                      className='h-8 w-8 mt-0.5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                  </span>
                  <strong class='ml-1 font-medium text-2xl text-gray-900'>
                    Contraseña restablecida correctamente
                  </strong>
                </div>
                <p class='mt-1 text-lg text-gray-700'>
                  Ahora puedes iniciar sesión con tu nueva contraseña.
                </p>
                <button
                  onClick={() => {
                    navigate('/login')
                  }}
                  className='mt-4 bg-codecolor py-3 px-5 text-lg w-auto self-center rounded-md text-white font-semibold text-center hover:bg-codecolordark transition duration-200 ease-in-out cursor-pointer'
                >
                  Volver a iniciar sesión
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {error && (
        <div className='flex flex-col items-center justify-center'>
          <div className=' lg:w-12/12 md:w-12/12 pt-72 justify-center items-center w-[600px]'>
            <p className='text-red-500 text-md text-center mb-5 break-words'>
              {error}
            </p>
            <Link
              to='/login'
              className='text-white bg-codecolor rounded-lg p-4 font-semibold hover:bg-codecolordark w-full text-center transition-all duration-200 ease-in-out self-center
            '
            >
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      )}
    </>
  )
}

export default RestorePasswordForm
