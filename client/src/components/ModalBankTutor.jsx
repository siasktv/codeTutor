import axios from 'axios'
import { useState, useEffect } from 'react'
import LoaderMini from './LoaderMini'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

export default function ModalBankTutor (props) {
  const { setShowModal, tutorId } = props
  const [form, setForm] = useState({
    accountNumber: '',
    accountType: '',
    bankName: '',
    accountHolder: ''
  })
  const [errors, setErrors] = useState({
    accountNumber: '',
    accountType: '',
    bankName: '',
    accountHolder: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setShowModal(false)
        setTimeout(() => {
          window.location.reload()
        }, 500)
      }, 2000)
    }
  }, [success])

  const validateForm = form => {
    let errors = {}

    if (!form.accountNumber.trim()) {
      errors.accountNumber = 'El número de cuenta es requerido'
    } else if (!/^[0-9]+$/.test(form.accountNumber)) {
      errors.accountNumber = 'El número de cuenta debe ser numérico'
    } else if (form.accountNumber.length < 10) {
      errors.accountNumber =
        'El número de cuenta debe tener al menos 10 dígitos'
    } else if (form.accountNumber.length > 20) {
      errors.accountNumber = 'El número de cuenta debe tener máximo 20 dígitos'
    }

    if (!form.accountType.trim()) {
      errors.accountType = 'El tipo de cuenta es requerido'
    }

    if (!form.bankName.trim()) {
      errors.bankName = 'El nombre del banco es requerido'
    }

    if (!form.accountHolder.trim()) {
      errors.accountHolder = 'El titular de la cuenta es requerido'
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

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async e => {
    e.preventDefault()
    if (
      loading ||
      success ||
      Object.keys(errors).length ||
      !form.accountNumber.trim() ||
      !form.accountType.trim() ||
      !form.bankName.trim() ||
      !form.accountHolder.trim()
    ) {
      return
    }
    setLoading(true)
    try {
      const { data } = await axios
        .put(`${BACKEND_URL}/api/tutors/${tutorId}`, {
          bankAccount: {
            accountNumber: form.accountNumber,
            accountType: form.accountType,
            bankName: form.bankName,
            accountHolder: form.accountHolder
          }
        })
        .catch(err => {
          console.log(err)
          throw err
        })
      if (data) {
        setLoading(false)
        setSuccess(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const [isDisabled, setIsDisabled] = useState(true)

  useEffect(() => {
    if (
      !errors.accountNumber &&
      !errors.accountType &&
      !errors.bankName &&
      !errors.accountHolder &&
      form.accountNumber.trim() &&
      form.accountType.trim() &&
      form.bankName.trim() &&
      form.accountHolder.trim()
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [errors, form])

  return (
    <div className='fixed z-[99999] top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center'>
      <div className='bg-white dark:bg-gray-800 max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:left-1/2 max-lg:-translate-x-1/2 rounded-md p-5 w-[620px] max-h-[900px] overflow-y-auto'>
        <div
          className='flex flex-col items-center justify-center mt-1 mb-3'
          id='steps'
        >
          <p className='text-xl leading-5 text-gray-800 dark:text-gray-200 mb-3 font-semibold'>
            ¡Bienvenido a la comunidad de Tutores de Code-Tutor!
          </p>
        </div>
        <div className='flex flex-col items-center justify-center mt-1 mb-3 w-full'>
          <p className='text-base leading-5 text-gray-800 dark:text-gray-200 mb-3 w-5/6'>
            ¡Felicitaciones! Hemos aprobado tu solicitud para ser tutor en
            Code-Tutor. Para poder continuar con el uso de la plataforma, es
            necesario que completes tus datos bancarios. Esto es necesario para
            que puedas recibir tus pagos por las clases que impartas. Podrás
            actualizar tus datos bancarios en cualquier momento desde tu panel
            de tutor.
          </p>
        </div>
        <div className='flex flex-col items-center justify-center mt-1 mb-3'>
          <form
            onSubmit={e => handleSubmit(e)}
            className='flex flex-col items-center justify-center'
          >
            <div className='flex flex-col items-center justify-center'>
              <div className='flex flex-col items-center justify-center'>
                <label
                  htmlFor='bankAccount'
                  className='text-sm leading-5 text-gray-800 mb-2'
                >
                  Número de cuenta bancaria (CBU / CVU)
                </label>
                <input
                  type='text'
                  name='accountNumber'
                  className='border border-gray-300 rounded-md mb-2 px-3 py-2 w-[300px] text-sm leading-5 text-gray-800 dark:bg-gray-900 dark:border-none dark:outline-none dark:text-gray-200'
                  placeholder='Número de cuenta bancaria'
                  value={form.accountNumber}
                  onChange={e => handleChange(e)}
                />
                {errors.accountNumber && (
                  <p className='text-xs text-red-500 mb-2 -mt-2'>
                    {errors.accountNumber}
                  </p>
                )}
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label
                  htmlFor='bankAccount'
                  className='text-sm leading-5 text-gray-800 mb-2'
                >
                  Nombre del titular
                </label>
                <input
                  type='text'
                  name='accountHolder'
                  className='border border-gray-300 rounded-md px-3 mb-2 py-2 w-[300px] text-sm leading-5 text-gray-800 dark:bg-gray-900 dark:border-none dark:outline-none dark:text-gray-200'
                  placeholder='Nombre del titular'
                  value={form.accountHolder}
                  onChange={e => handleChange(e)}
                />
                {errors.accountHolder && (
                  <p className='text-xs text-red-500 mb-2 -mt-2'>
                    {errors.accountHolder}
                  </p>
                )}
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label
                  htmlFor='bankAccount'
                  className='text-sm leading-5 text-gray-800 mb-3'
                >
                  Banco de la cuenta
                </label>
                <input
                  type='text'
                  name='bankName'
                  className='border border-gray-300 rounded-md px-3 mb-2 py-2 w-[300px] text-sm leading-5 text-gray-800 dark:bg-gray-900 dark:border-none dark:outline-none dark:text-gray-200'
                  placeholder='Ej: Banco Santander'
                  value={form.bankName}
                  onChange={e => handleChange(e)}
                />
                {errors.bankName && (
                  <p className='text-xs text-red-500 mb-2 -mt-2'>
                    {errors.bankName}
                  </p>
                )}
              </div>
              <div className='flex flex-col items-center justify-center'>
                <label
                  htmlFor='bankAccount'
                  className='text-sm leading-5 text-gray-800 mb-2'
                >
                  Tipo
                </label>
                <select
                  name='accountType'
                  className='border border-gray-300 rounded-md px-3 py-2 w-[300px] text-sm leading-5 text-gray-800 dark:bg-gray-900 dark:border-none dark:outline-none dark:text-gray-200'
                  value={form.accountType}
                  onChange={e => handleChange(e)}
                >
                  <option value='' selected hidden disabled>
                    Seleccionar
                  </option>
                  <option value='Cuenta Corriente'>Cuenta Corriente</option>
                  <option value='Caja de ahorro'>Caja de Ahorro</option>
                </select>
                {errors.accountType && (
                  <p className='text-xs text-red-500'>{errors.accountType}</p>
                )}
              </div>
            </div>
            <div className='flex items-center justify-center mt-6'>
              <button
                type='submit'
                className={
                  isDisabled
                    ? 'bg-gray-300 items-center flex justify-center w-24 h-8 text-white  text-sm font-semibold rounded-md px-5 py-2 mr-2 cursor-default dark:bg-gray-700'
                    : loading || success
                    ? 'bg-codecolor items-center flex justify-center w-24 h-8 text-white text-sm font-semibold rounded-md px-5 py-2 mr-2 cursor-default'
                    : 'bg-codecolor items-center flex justify-center w-24 h-8 text-white hover:bg-codecolordark transition-all ease-in-out duration-200 text-sm font-semibold rounded-md px-5 py-2 mr-2'
                }
                disabled={isDisabled}
              >
                {loading ? (
                  <LoaderMini />
                ) : success ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : (
                  'Guardar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
