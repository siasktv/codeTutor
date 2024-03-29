import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loaderGoogle } from '../assets'
import { signIn, loginWithGoogle } from '../firebase/client'
import axios from 'axios'
import { LoaderMini } from '../components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const FormRegister = props => {
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    start: true
  })
  const [errorsReset, setErrorsReset] = useState({
    start: true
  })
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  const [formReset, setFormReset] = useState({
    email: ''
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [isDisabledReset, setIsDisabledReset] = useState(true)
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false)
  const [formsDisabled, setFormsDisabled] = useState(false)
  const [firebaseError, setFirebaseError] = useState(null)
  const [firebaseErrorReset, setFirebaseErrorReset] = useState(null)
  const [forgotPassword, setForgotPassword] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)
  const [isSubmitingLogin, setIsSubmitingLogin] = useState(false)
  const [isSubmitingReset, setIsSubmitingReset] = useState(false)
  const [successLogin, setSuccessLogin] = useState(false)
  const [successReset, setSuccessReset] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const isFormValid = Object.values(errors).every(error => !error)
    if (!isFormValid) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [errors])

  useEffect(() => {
    const isFormValidReset = Object.values(errorsReset).every(error => !error)
    if (!isFormValidReset || isSubmiting) {
      setIsDisabledReset(true)
    } else {
      setIsDisabledReset(false)
    }
  }, [errorsReset])

  const validateForm = form => {
    let errors = {}
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
    if (!form.email.trim()) {
      errors.email = 'Por favor, ingrese un correo electrónico'
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = 'Por favor, ingrese un correo electrónico válido'
    }
    if (!form.password.trim()) {
      errors.password = 'Por favor, ingrese una contraseña'
    } else if (form.password.trim().length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    } else if (form.password.trim().length > 20) {
      errors.password = 'La contraseña debe tener menos de 20 caracteres'
    }
    return errors
  }

  const validateFormReset = formReset => {
    let errorsReset = {}
    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
    if (!formReset.email.trim()) {
      errorsReset.email = 'Por favor, ingrese un correo electrónico'
    } else if (!regexEmail.test(formReset.email.trim())) {
      errorsReset.email = 'Por favor, ingrese un correo electrónico válido'
    }
    return errorsReset
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

  const handleChangeReset = e => {
    setFormReset({
      ...formReset,
      [e.target.name]: e.target.value
    })
    setErrorsReset(
      validateFormReset({
        ...formReset,
        [e.target.name]: e.target.value
      })
    )
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (isDisabled || formsDisabled) return
    setErrors(
      validateForm({
        ...form
      })
    )
    if (Object.values(errors).some(error => error)) {
      return alert('Por favor, corrija los errores antes de continuar')
    } else if (form.email && form.password) {
      setIsDisabled(true)
      setIsSubmitingLogin(true)
      setFormsDisabled(true)
      setFirebaseError(null)
      signIn(form.email, form.password)
        .then(() => {
          setSuccessLogin(true)
          setIsSubmitingLogin(false)
        })
        .catch(err => {
          setIsDisabled(false)
          setFormsDisabled(false)
          setIsSubmitingLogin(false)
          if (err.code === 'auth/wrong-password') {
            setFirebaseError('La contraseña es incorrecta')
          } else if (err.code === 'auth/user-not-found') {
            setFirebaseError(
              'No se ha encontrado ninguna cuenta con este correo electrónico'
            )
          } else if (err.code === 'auth/too-many-requests') {
            setFirebaseError(
              'Has enviado demasiadas solicitudes en muy poco tiempo. Por favor, inténtelo de nuevo más tarde'
            )
          } else {
            setFirebaseError(
              'Ha ocurrido un error, por favor inténtelo de nuevo'
            )
          }
        })
    }
  }

  const handleResetPassword = async e => {
    e.preventDefault()
    if (isDisabledReset || formsDisabled) return
    setErrorsReset(
      validateFormReset({
        ...formReset
      })
    )
    if (Object.values(errorsReset).some(error => error)) {
      return alert('Por favor, corrija los errores antes de continuar')
    } else if (formReset.email) {
      setIsSubmiting(true)
      setIsDisabledReset(true)
      setIsSubmitingReset(true)
      setFirebaseErrorReset(null)
      try {
        await axios.post(`${BACKEND_URL}/api/users/resetpassword`, {
          email: formReset.email
        })
        setSuccessReset(true)
        setIsSubmitingReset(false)
        setIsSubmiting(false)
        setFormReset({
          email: ''
        })
        setErrorsReset({
          email: ''
        })
      } catch (err) {
        setIsSubmitingReset(false)
        setIsDisabledReset(false)
        setIsSubmiting(false)
        if (err.response.data.code === 'auth/email-not-found') {
          setFirebaseErrorReset(
            'No se ha encontrado ninguna cuenta con este correo electrónico.'
          )
        } else if (err.response.data.code === 'auth/too-many-requests') {
          setFirebaseErrorReset(
            'Has enviado demasiadas solicitudes en muy poco tiempo. Por favor, inténtelo de nuevo más tarde.'
          )
        } else {
          setFirebaseErrorReset(
            'Ha ocurrido un error, por favor inténtelo de nuevo.'
          )
        }
      }
    }
  }

  const handleGoogleLogin = () => {
    if (isLoadingGoogle || formsDisabled) return
    setIsLoadingGoogle(true)
    setFormsDisabled(true)
    setFirebaseError(null)
    loginWithGoogle().catch(err => {
      setFormsDisabled(false)
      setIsLoadingGoogle(false)
      setFirebaseError('Hubo un error al iniciar sesión con Google')
    })
  }

  const handleForgotPassword = () => {
    setForgotPassword(true)
  }

  const UnhandleForgotPassword = () => {
    setForgotPassword(false)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleAlert = () => {
    setShowAlert(true)
  }

  const UnhandleAlert = () => {
    setShowAlert(false)
  }

  const registerRedirect = props.redirect
    ? `/register?redirect=${props.redirect}`
    : '/register'

  useEffect(() => {
    if (successLogin) {
      setTimeout(() => {
        setSuccessLogin(false)
        setRedirecting(true)
      }, 1000)
    }
  }, [successLogin])

  useEffect(() => {
    if (successReset) {
      setTimeout(() => {
        setSuccessReset(false)
        setIsDisabledReset(true)
        setIsDisabled(true)
        handleAlert()
      }, 1000)
    }
  }, [successReset])

  return (
    <div className='flex flex-col items-center justify-center'>
      {!forgotPassword && (
        <div className='bg-white dark:bg-gray-800 rounded lg:w-12/12 md:w-12/12 w-full p-5 lg:p-10 mt-4'>
          <p
            tabIndex='0'
            className='focus:outline-none text-2xl font-bold leading-6 dark:text-gray-200 text-gray-800 text-left'
          >
            Iniciar Sesión
          </p>
          <p className='pt-4 text-left   focus:text-violet-400 focus:outline-none focus:underline text-sm font-medium leading-none text-codecolor'>
            <span className='text-black dark:text-gray-400'>
              ¿No tienes una cuenta?{' '}
            </span>
            <Link
              to={registerRedirect}
              className='hover:underline cursor-pointer hover:text-violet-400 dark:hover:text-codecolordark'
            >
              Registrate aquí
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div className='w-full mt-4'>
              <label
                id='email'
                className='text-sm font-medium leading-none text-gray-800'
              >
                <p className='text-base font-normal leading-6 dark:text-gray-200 text-gray-800 text-left'>
                  Email
                </p>
              </label>
              <input
                aria-labelledby='email'
                type='email'
                className={
                  errors.email
                    ? 'border rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 border-red-500 dark:bg-gray-900 dark:outline-none dark:text-gray-200 outline-red-500 bg-red-100'
                    : 'bg-white border rounded dark:bg-gray-900 dark:outline-none dark:border-none dark:text-gray-200 text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                }
                name='email'
                onChange={handleChange}
              />
              {errors.email && (
                <p className='text-red-500 text-sm font-medium leading-none text-left mt-2'>
                  {errors.email}
                </p>
              )}
            </div>
            <div className='mt-6 w-full'>
              <label
                htmlFor='pass'
                className='text-sm font-medium leading-none text-gray-800'
              >
                <p className='text-base font-normal dark:text-gray-200 leading-6 text-gray-800 text-left'>
                  Contraseña
                </p>
              </label>
              <div className='relative flex items-center justify-center'>
                <input
                  id='pass'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  onChange={handleChange}
                  className={
                    errors.password
                      ? 'border rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 border-red-500 dark:bg-gray-900 dark:outline-none dark:text-gray-200 outline-red-500 bg-red-100'
                      : 'bg-white border rounded dark:bg-gray-900 dark:outline-none dark:border-none dark:text-gray-200 text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                  }
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
                <p className='text-red-500 text-sm font-medium leading-none text-left mt-2'>
                  {errors.password}
                </p>
              )}
            </div>
            <p
              className='pt-4 text-left hover:text-violet-400 dark:hover:text-codecolordark focus:text-violet-400 focus:outline-none focus:underline hover:underline text-base font-medium leading-none text-codecolor cursor-pointer'
              onClick={handleForgotPassword}
            >
              ¿Olvidaste tu contraseña?
            </p>
            <div className='mt-8'>
              <button
                role='button'
                className={
                  !isSubmitingLogin && !successLogin && !redirecting
                    ? !isDisabled && !formsDisabled
                      ? 'hover:ring-4 hover:ring-violet-300 text-base font-semibold leading-none text-white focus:outline-none dark:border-none dark:hover:ring-gray-700 bg-codecolor border rounded-lg hover:bg-violet-600 py-6 w-full'
                      : 'text-base font-semibold leading-none text-white focus:outline-none bg-gray-400 border rounded-lg dark:bg-gray-700 dark:border-none py-6 w-full cursor-not-allowed'
                    : 'text-base font-semibold leading-none dark:border-none text-white focus:outline-none bg-codecolor border rounded-lg py-6 w-full cursor-not-allowed'
                }
                disabled={isDisabled || formsDisabled}
                type='submit'
              >
                {isSubmitingLogin ? (
                  <LoaderMini />
                ) : successLogin ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : redirecting ? (
                  <span className='flex items-center justify-center'>
                    <span className='mr-1'>Redireccionando</span>
                    <LoaderMini />
                  </span>
                ) : (
                  'Iniciar sesión'
                )}
              </button>
            </div>
            {firebaseError && (
              <p className='text-red-500 font-medium leading-none text-center mt-2 text-md'>
                {firebaseError}
              </p>
            )}
          </form>
          <div className='w-full flex items-center justify-between py-10 max-lg:py-4'>
            <hr className='w-full bg-gray-400 dark:border-gray-700' />
          </div>

          <button
            aria-label='Continue with Google'
            role='button'
            className={
              !isLoadingGoogle
                ? 'hover:outline-none hover:ring-4 dark:bg-white dark:hover:ring-gray-700  hover:ring-gray-300 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center justify-center w-full mt-0'
                : 'py-3.5 px-4 border rounded-lg dark:bg-white border-gray-700 flex items-center justify-center w-full mt-0 cursor-not-allowed'
            }
            onClick={isLoadingGoogle ? null : handleGoogleLogin}
          >
            {!isLoadingGoogle ? (
              <>
                <svg
                  width='19'
                  height='40'
                  viewBox='0 0 19 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
                    fill='#4285F4'
                  />
                  <path
                    d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
                    fill='#34A853'
                  />
                  <path
                    d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
                    fill='#FBBC05'
                  />
                  <path
                    d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
                    fill='#EB4335'
                  />
                </svg>
                <p className='text-base font-medium ml-4 text-gray-700'>
                  Continuar con Google
                </p>
              </>
            ) : (
              <img src={loaderGoogle} alt='loader' className='w-auto h-10' />
            )}
          </button>
        </div>
      )}
      {forgotPassword && (
        <div className='bg-white dark:bg-gray-800 rounded lg:w-12/12 md:w-12/12 w-full p-5 lg:p-10 lg:pt-32 mt-4'>
          {showAlert && (
            <div
              role='alert'
              class='rounded-xl absolute border dark:bg-gray-900 dark:border-none border-gray-100 bg-white p-4  shadow-xl mr-auto ml-auto left-0 right-0 text-center top-0 bottom-0 flex justify-center items-center transition-opacity'
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
                  <strong class='ml-1 font-medium lg:text-2xl text-xl dark:text-gray-200 text-gray-900'>
                    Correo de restablecimiento enviado.
                  </strong>
                </div>
                <p class='mt-1 lg:text-lg text-md dark:text-gray-400 text-gray-700'>
                  Revisa tu correo y sigue lo pasos para restablecer tu
                  contraseña.
                </p>
                <button
                  onClick={() => {
                    setShowAlert(false)
                    setForgotPassword(false)
                    setIsDisabledReset(true)
                  }}
                  className='mt-4 bg-codecolor lg:py-3 py-2 px-3 lg:px-5 text-lg w-auto self-center rounded-md text-white font-semibold text-center hover:bg-codecolordark transition duration-200 ease-in-out cursor-pointer'
                >
                  Volver a iniciar sesión
                </button>
              </div>
            </div>
          )}
          <p
            tabIndex='0'
            className='focus:outline-none text-2xl font-bold leading-6 dark:text-gray-200 text-gray-800 text-left lg:-mt-20'
          >
            ¿Olvidaste tu contraseña?
          </p>
          <p className='pt-4 text-left focus:text-violet-400 focus:outline-none focus:underline text-sm font-medium leading-none text-codecolor'>
            <span className='text-black dark:text-gray-400'>
              ¿No tienes una cuenta?{' '}
            </span>
            <Link
              to={registerRedirect}
              className='hover:underline cursor-pointer hover:text-violet-400 dark:hover:text-codecolordark'
            >
              Registrate aquí
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div className='w-full mt-4'>
              <label
                id='email'
                className='text-sm font-medium leading-none text-gray-800'
              >
                <p className='text-base font-normal leading-6 dark:text-gray-200 text-gray-800 text-left'>
                  Email
                </p>
              </label>
              <input
                aria-labelledby='email'
                type='email'
                value={formReset.email}
                className={
                  errorsReset.email
                    ? 'border rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2 border-red-500 dark:text-gray-200 dark:bg-gray-900 dark:outline-none outline-red-500 bg-red-100'
                    : 'bg-white border rounded dark:border-none dark:text-gray-200 dark:bg-gray-900 dark:outline-none text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                }
                name='email'
                onChange={handleChangeReset}
              />
              {errorsReset.email && (
                <p className='text-red-500 text-sm font-medium leading-none text-left mt-2'>
                  {errorsReset.email}
                </p>
              )}
            </div>
            <p
              className='pt-4 text-left hover:text-violet-400 dark:hover:text-codecolordark focus:text-violet-400 focus:outline-none focus:underline hover:underline text-base font-medium leading-none text-codecolor cursor-pointer'
              onClick={UnhandleForgotPassword}
            >
              ¿No haz olvidado tu contraseña?
            </p>
            <div className='mt-8'>
              <button
                role='button'
                onClick={handleResetPassword}
                className={
                  !isSubmitingReset && !successReset
                    ? isDisabledReset
                      ? 'text-base font-semibold leading-none text-white focus:outline-none bg-gray-400 border rounded-lg py-6 w-full dark:border-none dark:bg-gray-700'
                      : 'hover:ring-4 hover:ring-violet-300 text-base dark:border-none dark:hover:ring-gray-700 font-semibold leading-none text-white focus:outline-none bg-codecolor border rounded-lg hover:bg-violet-600 py-6 w-full'
                    : 'text-base font-semibold leading-none dark:border-none text-white focus:outline-none bg-codecolor border rounded-lg py-6 w-full'
                }
                disabled={isDisabledReset}
                type='submit'
              >
                {isSubmitingReset ? (
                  <LoaderMini />
                ) : successReset ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  'Recupera tu contraseña'
                )}
              </button>
            </div>

            {firebaseErrorReset && (
              <p className='text-red-500 font-medium leading-none text-center mt-2 text-md'>
                {firebaseErrorReset}
              </p>
            )}
          </form>
          <p className='text-center text-sm pt-4 text-gray-500 dark:text-gray-400'>
            ¿Como se restablecerá tu contraseña?
            <br />
            Revisa tu mail, allí llegará un correo con las instrucciones para
            restablecer tu contraseña.
          </p>
        </div>
      )}
    </div>
  )
}

export default FormRegister
