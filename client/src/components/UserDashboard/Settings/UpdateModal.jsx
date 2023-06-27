import { useState, useEffect } from 'react'
import axios from 'axios'
import { updateEmail, updatePassword } from '../../../firebase/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLocations } from '../../../redux/features/locations/locationsSlice'
import { LoaderMini } from '../../../components'

export default function UpdateModal (props) {
  const {
    user,
    setShowModal,
    selectedField,
    setName,
    setEmail,
    setLocation,
    setTimezone,
    name,
    email,
    location,
    timezone,
    setTutorStatus
  } = props

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [isDisabled, setIsDisabled] = useState(true)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: name,
    email: email,
    previousPassword: '',
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch()
  const locations = useSelector(state => state.locations.locations)
  const [timezones, setTimezones] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedTimezone, setSelectedTimezone] = useState('')
  const [disableTutorCheckbox, setDisableTutorCheckbox] = useState(false)
  const [enableTutorCheckbox, setEnableTutorCheckbox] = useState(false)

  useEffect(() => {
    if (selectedField === 'location') {
      dispatch(fetchLocations())
    }
  }, [selectedField])

  useEffect(() => {
    if (selectedLocation !== null && selectedLocation !== '') {
      const location = locations.find(
        location => location.name === selectedLocation
      )
      const timezones = location.timezones.map(timezone => timezone)
      setTimezones(timezones)
    }
  }, [selectedLocation])

  const handleInputChange = (e, field) => {
    const { value } = e.target
    if (field === 'name') {
      if (value.length < 3) {
        setErrors({
          ...errors,
          name: 'El nombre debe tener al menos 3 caracteres'
        })
      } else if (value.length > 50) {
        setErrors({
          ...errors,
          name: 'El nombre debe tener menos de 50 caracteres'
        })
      } else if (value.match(/[^a-zA-ZÀ-ÿ\s]/g)) {
        setErrors({ ...errors, name: 'El nombre solo puede contener letras' })
      } else if (value.trim() === '') {
        setErrors({ ...errors, name: 'El nombre no puede estar vacío' })
      } else {
        setErrors({ ...errors, name: '' })
      }
    }
    setFormData({ ...formData, [field]: value })
  }

  const validatePassword = form => {
    let errors = {}
    if (!form.previousPassword.trim()) {
      errors.previousPassword = 'Por favor, ingrese su contraseña actual'
    } else if (form.previousPassword.trim().length < 6) {
      errors.previousPassword = 'La contraseña debe tener al menos 6 caracteres'
    } else if (form.previousPassword.trim().length > 20) {
      errors.previousPassword =
        'La contraseña debe tener menos de 20 caracteres'
    }
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

  const validateEmail = form => {
    let errors = {}

    let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
    if (!form.email.trim()) {
      errors.email = 'El email no puede estar vacío'
    } else if (!regexEmail.test(form.email.trim())) {
      errors.email = 'Por favor, ingrese un email válido'
    }
    if (form.previousPassword.trim().length < 6) {
      errors.previousPassword = 'La contraseña debe tener al menos 6 caracteres'
    } else if (form.previousPassword.trim().length > 20) {
      errors.previousPassword =
        'La contraseña debe tener menos de 20 caracteres'
    }
    return errors
  }

  const handlePasswordInputChange = (e, field) => {
    const { value } = e.target
    setFormData({ ...formData, [field]: value })
    setErrors(validatePassword({ ...formData, [field]: value }))
  }

  const handleEmailInputChange = (e, field) => {
    const { value } = e.target
    setFormData({ ...formData, [field]: value })
    setErrors(validateEmail({ ...formData, [field]: value }))
  }

  useEffect(() => {
    if (selectedField === 'name') {
      if (formData.name === name || errors.name) {
        setIsDisabled(true)
      } else if (formData.name.trim() === name) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    } else if (selectedField === 'email') {
      if (formData.email === email || errors.email || errors.previousPassword) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    } else if (selectedField === 'location') {
      if (selectedLocation === location && selectedTimezone === timezone) {
        setIsDisabled(true)
      } else {
        if (selectedLocation === '' || selectedTimezone === '') {
          setIsDisabled(true)
        } else {
          setIsDisabled(false)
        }
      }
    } else if (selectedField === 'password') {
      if (
        formData.previousPassword === '' ||
        formData.password === '' ||
        formData.confirmPassword === '' ||
        errors.previousPassword ||
        errors.password ||
        errors.confirmPassword
      ) {
        setIsDisabled(true)
      } else {
        setIsDisabled(false)
      }
    } else if (selectedField === 'disabletutor') {
      if (disableTutorCheckbox) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    } else if (selectedField === 'enabletutor') {
      if (enableTutorCheckbox) {
        setIsDisabled(false)
      } else {
        setIsDisabled(true)
      }
    }
  }, [
    formData,
    errors,
    selectedField,
    selectedLocation,
    selectedTimezone,
    disableTutorCheckbox,
    enableTutorCheckbox
  ])

  const handleSelectLocation = e => {
    setSelectedLocation(e.target.value)
    setSelectedTimezone('')
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (isDisabled || isSubmitting || success) return
    setIsSubmitting(true)
    if (selectedField === 'name') {
      try {
        const res = await axios.put(`${BACKEND_URL}/api/users/${user?.id}`, {
          fullName: formData.name
        })
        setName(res.data.fullName)
        setIsSubmitting(false)
        setSuccess(true)
      } catch (error) {
        setIsSubmitting(false)
        console.log(error)
      }
    } else if (selectedField === 'email') {
      try {
        await updateEmail(formData.previousPassword, formData.email)
        try {
          const res = await axios.put(`${BACKEND_URL}/api/users/${user?.id}`, {
            email: formData.email
          })
          setEmail(res.data.email)
          setIsSubmitting(false)
          setSuccess(true)
        } catch (error) {
          setIsSubmitting(false)
          console.log(error)
        }
      } catch (error) {
        setIsSubmitting(false)
        setSuccess(false)
        setIsDisabled(true)
        if (error.code === 'auth/wrong-password') {
          setErrors({
            ...errors,
            previousPassword: 'La contraseña es incorrecta'
          })
        } else if (error.code === 'auth/too-many-requests') {
          setErrors({
            ...errors,
            previousPassword:
              'Demasiados intentos fallidos. Por favor, vuelva a intentarlo más tarde.'
          })
        } else if (error.code === 'auth/requires-recent-login') {
          setErrors({
            ...errors,
            email:
              'Se requiere reautenticación. Por favor, inicie sesión de nuevo y vuelva a intentarlo.'
          })
        } else if (error.code === 'auth/email-already-in-use') {
          setErrors({
            ...errors,
            email: 'El email ya está en uso. Por favor, elija otro.'
          })
        } else {
          setErrors({
            ...errors,
            email: 'Ha ocurrido un error. Por favor, vuelva a intentarlo.'
          })
        }
      }
    } else if (selectedField === 'location') {
      try {
        const res = await axios.put(`${BACKEND_URL}/api/users/${user?.id}`, {
          location: selectedLocation,
          timezone: selectedTimezone
        })
        setLocation(res.data.location)
        setTimezone(res.data.timezone)
        setIsSubmitting(false)
        setSuccess(true)
      } catch (error) {
        setIsSubmitting(false)
        console.log(error)
      }
    } else if (selectedField === 'password') {
      try {
        await updatePassword(formData.previousPassword, formData.password)
        setIsSubmitting(false)
        setSuccess(true)
      } catch (error) {
        setIsSubmitting(false)
        setSuccess(false)
        setIsDisabled(true)
        if (error.code === 'auth/wrong-password') {
          setErrors({
            ...errors,
            previousPassword: 'La contraseña ingresada es incorrecta'
          })
        } else if (error.code === 'auth/too-many-requests') {
          setErrors({
            ...errors,
            previousPassword:
              'Demasiados intentos fallidos. Por favor, vuelva a intentarlo más tarde.'
          })
        } else if (error.code === 'auth/requires-recent-login') {
          setErrors({
            ...errors,
            password:
              'Se requiere reautenticación. Por favor, inicie sesión de nuevo y vuelva a intentarlo.'
          })
        } else if (error.code === 'auth/weak-password') {
          setErrors({
            ...errors,
            password: 'La contraseña ingresada es demasiado débil'
          })
        } else {
          setErrors({
            ...errors,
            password: 'Ha ocurrido un error. Por favor, vuelva a intentarlo.'
          })
        }
      }
    } else if (selectedField === 'disabletutor') {
      try {
        const res = await axios.put(
          `${BACKEND_URL}/api/tutors/${user?.tutor?._id}`,
          {
            status: 'disabled'
          }
        )
        setIsSubmitting(false)
        setSuccess(true)
        setTutorStatus('disabled')
      } catch (error) {
        setIsSubmitting(false)
        console.log(error)
      }
    } else if (selectedField === 'enabletutor') {
      try {
        const res = await axios.put(
          `${BACKEND_URL}/api/tutors/${user?.tutor?._id}`,
          {
            status: 'approved'
          }
        )
        setIsSubmitting(false)
        setSuccess(true)
        setTutorStatus('approved')
      } catch (error) {
        setIsSubmitting(false)
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setShowModal(false)
        setSuccess(false)
      }, 1000)
    }
  }, [success, setShowModal])

  return (
    // create a centered modal
    <div className='fixed z-[9999] inset-0 overflow-y-auto'>
      {/* overlay */}
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        {/* background overlay */}
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75' />
        </div>
        {/* center modal */}
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        {/* modal content */}
        <form
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                <h3
                  className='text-2xl leading-6 font-semibold text-gray-900'
                  id='modal-headline'
                >
                  {selectedField === 'name' && 'Cambiar nombre'}
                  {selectedField === 'email' && 'Cambiar email'}
                  {selectedField === 'location' && 'Cambiar ubicación'}
                  {selectedField === 'password' && 'Cambiar contraseña'}
                  {selectedField === 'disabletutor' &&
                    'Darme de baja como tutor'}
                  {selectedField === 'enabletutor' &&
                    'Reactivar mi cuenta de tutor'}
                </h3>
                <div className='mt-6 w-full'>
                  {selectedField === 'name' && (
                    <>
                      <input
                        type='text'
                        name='name'
                        id='name'
                        className={
                          errors.name
                            ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500'
                            : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor'
                        }
                        placeholder='Nombre completo'
                        value={formData.name}
                        onChange={e => handleInputChange(e, 'name')}
                      />
                      {errors.name && (
                        <p className='text-red-500 text-sm mt-1 ml-1'>
                          {errors.name}
                        </p>
                      )}
                    </>
                  )}
                  {selectedField === 'email' && (
                    <>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        className={
                          errors.email
                            ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500'
                            : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor'
                        }
                        placeholder='Correo electrónico'
                        value={formData.email}
                        onChange={e => handleEmailInputChange(e, 'email')}
                      />
                      {errors.email && (
                        <p className='text-red-500 text-sm mt-1 ml-1'>
                          {errors.email}
                        </p>
                      )}
                      <input
                        type='password'
                        name='previousPassword'
                        id='previousPassword'
                        className={
                          errors.previousPassword
                            ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500 mt-4'
                            : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor mt-4'
                        }
                        placeholder='Ingresa tu contraseña'
                        value={formData.previousPassword}
                        onChange={e =>
                          handleEmailInputChange(e, 'previousPassword')
                        }
                      />
                      {errors.previousPassword && (
                        <p className='text-red-500 text-sm mt-1 ml-1'>
                          {errors.previousPassword}
                        </p>
                      )}
                    </>
                  )}
                  {selectedField === 'location' && (
                    <>
                      <select
                        id='location'
                        name='location'
                        autoComplete='location'
                        className={
                          errors.location
                            ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500'
                            : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor'
                        }
                        value={selectedLocation}
                        onChange={e => handleSelectLocation(e)}
                      >
                        <option value='' hidden disabled selected>
                          Selecciona una ubicación
                        </option>
                        {locations.map(location => (
                          <option key={location.id} value={location.name}>
                            {location.name}
                          </option>
                        ))}
                      </select>
                      {selectedLocation && (
                        <select
                          id='timezone'
                          name='timezone'
                          autoComplete='timezone'
                          className={
                            errors.timezone
                              ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500 mt-4'
                              : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor mt-4'
                          }
                          value={selectedTimezone}
                          onChange={e => setSelectedTimezone(e.target.value)}
                        >
                          <option value='' hidden disabled selected>
                            Selecciona una zona horaria
                          </option>
                          {timezones.map((timezone, index) => (
                            <option
                              key={index}
                              value={timezone}
                              className='bg-white text-gray-500'
                            >
                              {timezone}
                            </option>
                          ))}
                        </select>
                      )}
                    </>
                  )}
                  {selectedField === 'password' && (
                    <>
                      <input
                        type='password'
                        name='previousPassword'
                        id='previousPassword'
                        className={
                          errors.previousPassword
                            ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500'
                            : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor'
                        }
                        placeholder='Contraseña actual'
                        value={formData.previousPassword}
                        onChange={e =>
                          handlePasswordInputChange(e, 'previousPassword')
                        }
                      />
                      {errors.previousPassword && (
                        <p className='text-red-500 text-sm mt-1 ml-1'>
                          {errors.previousPassword}
                        </p>
                      )}
                      <input
                        type='password'
                        name='password'
                        id='password'
                        className={
                          errors.password
                            ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500 mt-4'
                            : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor mt-4'
                        }
                        placeholder='Nueva contraseña'
                        value={formData.password}
                        onChange={e => handlePasswordInputChange(e, 'password')}
                      />
                      {errors.password && (
                        <p className='text-red-500 text-sm mt-1 ml-1'>
                          {errors.password}
                        </p>
                      )}
                      <input
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        className={
                          errors.confirmPassword
                            ? 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-red-500 border rounded-md w-full px-3 py-2 placeholder:text-red-500 focus:outline-red-500 mt-4'
                            : 'shadow-sm focus:ring-codecolor focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor mt-4'
                        }
                        placeholder='Confirmar contraseña'
                        value={formData.confirmPassword}
                        onChange={e =>
                          handlePasswordInputChange(e, 'confirmPassword')
                        }
                      />
                      {errors.confirmPassword && (
                        <p className='text-red-500 text-sm mt-1 ml-1'>
                          {errors.confirmPassword}
                        </p>
                      )}
                    </>
                  )}
                  {selectedField === 'disabletutor' && (
                    <>
                      <p className='text-md font-semibold text-justify self-start'>
                        Estas a punto de desactivar tu cuenta de tutor. Estas
                        son algunas cosas que debes saber antes de continuar:
                      </p>
                      <ul className='list-disc list-inside text-sm text-justify self-start mt-2 space-y-3'>
                        <li>
                          <strong>Perderás acceso al panel de tutor.</strong>{' '}
                          Esto significa que no podrás editar tu perfil ni
                          acceder a tu historial de sesiones.
                        </li>
                        <li>
                          Al perder acceso al panel de tutor, no podrás acceder
                          a tu calendario de sesiones ni recibir pagos
                          pendientes.
                          <strong>
                            {' '}
                            Si tienes pagos pendientes, te recomendamos que los
                            retires ya que una vez desactivada tu cuenta, no
                            podrás acceder al panel de tutor para retirarlos.
                          </strong>
                        </li>
                        <li>
                          Si tienes sesiones pendientes, te recomendamos que las
                          canceles ya que no se cancelarán automáticamente y
                          <strong>
                            {' '}
                            podría influir en tu reputación como tutor si en un
                            futuro decides volver a activar tu perfil.
                          </strong>
                        </li>
                        <li>
                          Podrás volver a activar tu perfil en cualquier momento
                          sin necesidad de que sea revisado nuevamente. Sin
                          embargo,
                          <strong>
                            {' '}
                            recuerda mantener tu perfil actualizado y completo
                            para evitar que sea desactivado nuevamente.
                          </strong>
                        </li>
                      </ul>
                      <div className=' bg-orange-200 px-3 py-2 mb-6 rounded-md mt-4'>
                        <p className='text-sm text-orange-600 font-semibold text-justify self-start'>
                          <FontAwesomeIcon
                            icon={faWarning}
                            className='mr-2 text-orange-600 mt-1.5'
                          />
                          Si bien no perderás las ganancias que hayas generado a
                          través de la plataforma, no podrás retirarlas hasta
                          que vuelvas a activar tu perfil. Si tienes pagos
                          pendientes, te recomendamos que los retires antes de
                          continuar con este proceso.
                        </p>
                      </div>
                      <div className='flex items-center'>
                        <input
                          id='disabletutor'
                          name='disabletutor'
                          type='checkbox'
                          className='text-[#737791] font-inter font-medium leading-[27px] w-15 tracking-normal'
                          checked={disableTutorCheckbox}
                          onChange={() =>
                            setDisableTutorCheckbox(!disableTutorCheckbox)
                          }
                        />
                        <label
                          htmlFor='disabletutor'
                          className='ml-2 block text-sm font-medium text-gray-700'
                        >
                          Entiendo las consecuencias y deseo continuar con el
                          proceso.
                        </label>
                      </div>
                    </>
                  )}
                  {selectedField === 'enabletutor' && (
                    <>
                      <p className='text-md font-semibold text-justify self-start'>
                        Estas a punto de reactivar tu cuenta de tutor. Estas son
                        algunas cosas que debes saber antes de continuar:
                      </p>
                      <ul className='list-disc list-inside text-sm text-justify self-start mt-2 space-y-3 mb-6'>
                        <li>
                          <strong>
                            Volverás a tener acceso al panel de tutor.
                          </strong>{' '}
                          Esto significa que podrás editar tu perfil, acceder a
                          tu historial de sesiones, recibir pagos pendientes y
                          futuros.
                        </li>
                        <li>
                          Al volver a tener acceso al panel de tutor, podrás
                          acceder a tu calendario de sesiones y los clientes
                          podrán agendar sesiones contigo.
                        </li>
                        <li>
                          Ni bien vuelvas a activar tu perfil, aparecerás en la
                          lista de tutores disponibles para agendar sesiones.{' '}
                          <strong>
                            Te recomendamos que actualices tu perfil y
                            disponibilidad cuanto antes para prevenir que se
                            agenden sesiones a las que no puedas atender.
                          </strong>
                        </li>
                      </ul>
                      <div className='flex items-center'>
                        <input
                          id='enabletutor'
                          name='enabletutor'
                          type='checkbox'
                          className='text-[#737791] font-inter font-medium leading-[27px] w-15 tracking-normal'
                          checked={enableTutorCheckbox}
                          onChange={() =>
                            setEnableTutorCheckbox(!enableTutorCheckbox)
                          }
                        />
                        <label
                          htmlFor='enabletutor'
                          className='ml-2 block text-sm font-medium text-gray-700'
                        >
                          Entiendo las consecuencias y deseo reactivar mi cuenta
                          de tutor.
                        </label>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-codecolor text-base font-medium text-white hover:bg-codecolordark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor sm:ml-3 sm:w-20 sm:text-sm'
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            <button
              disabled={isDisabled}
              className={
                isDisabled
                  ? 'mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-20 sm:text-sm'
                  : 'mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-codecolor text-base font-medium text-white hover:bg-codecolordark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor sm:mt-0 sm:ml-3 sm:w-20 sm:text-sm'
              }
              onClick={handleSubmit}
              type='submit'
            >
              {isSubmitting ? (
                <LoaderMini />
              ) : success ? (
                <FontAwesomeIcon icon={faCheckCircle} className='self-center' />
              ) : selectedField === 'disabletutor' ? (
                'Desactivar'
              ) : selectedField === 'enabletutor' ? (
                'Reactivar'
              ) : (
                'Guardar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
