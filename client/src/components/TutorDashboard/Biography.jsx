import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import LoaderMini from '../LoaderMini'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Biography = ({ bio, id }) => {
  const [showModal, setShowModal] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [data, setData] = useState({
    specialty: bio.specialty,
    description: bio.description,
    portfolio: bio.linkBriefcase
  })

  const [formData, setFormData] = useState({
    specialty: bio.specialty,
    description: bio.description,
    portfolio: bio.linkBriefcase
  })

  const [errors, setErrors] = useState({
    specialty: '',
    description: '',
    portfolio: ''
  })

  const handleEditButtonClick = () => {
    setShowModal(true)
  }

  const updateBio = async e => {
    e.preventDefault()
    if (isDisabled || isSubmitting || success) return
    setIsSubmitting(true)
    const submitData = {
      specialty: formData.specialty,
      description: formData.description,
      linkBriefcase: formData.portfolio
    }
    try {
      const res = await axios.put(`${BACKEND_URL}/api/tutors/${id}`, {
        bio: submitData
      })
      setData(submitData)
      setIsSubmitting(false)
      setSuccess(true)
    } catch (err) {
      setIsSubmitting(false)
      console.log(err)
    }
  }

  useEffect(() => {
    if (
      formData.specialty.trim() === '' ||
      formData.description.trim() === '' ||
      formData.portfolio.trim() === '' ||
      (formData.specialty === data.specialty &&
        formData.description === data.description &&
        formData.portfolio === data.portfolio) ||
      errors.specialty !== '' ||
      errors.description !== '' ||
      errors.portfolio !== ''
    ) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [formData, errors, data])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setShowModal(false)
        setSuccess(false)
        setFormData(data)
      }, 1000)
    }
  }, [success])

  const [charCount, setCharCount] = useState(formData.description.length)

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'specialty') {
      if (value.trim() === '') {
        setErrors(prev => ({
          ...prev,
          specialty: 'La especialidad no puede estar vacía'
        }))
      } else {
        setErrors(prev => ({ ...prev, specialty: '' }))
      }
    }
    if (name === 'description') {
      const trimmed = value.trim()
      if (trimmed.length <= 500) {
        if (trimmed.length < 50) {
          setErrors({
            ...errors,
            description: 'La descripción debe tener al menos 50 caracteres'
          })
        } else {
          setErrors({
            ...errors,
            description: ''
          })
        }
        setCharCount(trimmed.length)
      } else {
        setCharCount(500)
      }
    }
    if (name === 'portfolio') {
      let regex = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$',
        'i'
      )
      if (value.trim() === '') {
        setErrors(prev => ({
          ...prev,
          portfolio: 'El link no puede estar vacío'
        }))
      } else if (!regex.test(value)) {
        setErrors(prev => ({
          ...prev,
          portfolio: 'El link debe ser válido'
        }))
      } else {
        setErrors(prev => ({ ...prev, portfolio: '' }))
      }
    }
    if (name === 'description' && value.length > 500) {
      return
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <div className='flex flex-col bg-white dark:bg-gray-800 rounded-[8px] dark:border-none border gap-[18px]'>
      <div className='flex flex-col px-12 py-8 max-lg:p-6 justify-between'>
        <div className='flex justify-between'>
          <h2 className='font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E] dark:text-gray-200'>
            Biografía{' '}
          </h2>

          <button
            className='ml-2 inline-flex justify-center h-9 w-20 items-center text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
            onClick={handleEditButtonClick}
          >
            Editar
          </button>
        </div>

        <div className='flex flex-col mt-2 gap-2'>
          <div className='flex'>
            <h2 className='font-semibold dark:text-gray-200'>
              {data.specialty}
            </h2>
          </div>
          <div className='flex'>
            <p className='italic dark:text-gray-200 break-words text-left'>
              {data.description}
            </p>
          </div>
          <div className='flex'>
            <a
              className='text-sm text-blue-700 break-all dark:text-codecolor dark:font-semibold'
              href={data.portfolio}
              target='_blank'
            >
              {data.portfolio}
            </a>
          </div>
        </div>
      </div>

      {showModal && (
        <div className='fixed z-[9999] inset-0 overflow-y-auto'>
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 transition-opacity'
              aria-hidden='true'
            >
              <div className='absolute inset-0 bg-gray-500 opacity-75' />
            </div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <form
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
              onSubmit={e => updateBio(e)}
            >
              <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <h3 className='text-2xl leading-6 dark:text-gray-200 font-semibold text-gray-900'>
                      Biografia{' '}
                    </h3>
                    <div className='mt-6 w-full'>
                      <div className='flex flex-col gap-2 dark:text-gray-200 max-lg:text-left'>
                        <div>
                          <label>Especialidad</label>
                          <select
                            className={
                              errors.specialty
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none resize-none mt-1'
                            }
                            value={formData.specialty}
                            name='specialty'
                            onChange={e => handleChange(e)}
                          >
                            <option>Front End Developer</option>
                            <option>Back End Developer</option>
                            <option>Full Stack Developer</option>
                            <option>Database Specialist</option>
                          </select>
                          <p className='text-md text-red-500 italic'>
                            {errors.specialty}
                          </p>
                        </div>
                        <div>
                          <label>Breve biografía</label>
                          <textarea
                            className={
                              errors.description
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none resize-none mt-1'
                            }
                            rows={6}
                            value={formData.description}
                            name='description'
                            onChange={e => handleChange(e)}
                          ></textarea>
                          <p
                            className={
                              charCount < 50
                                ? 'italic text-red-500 text-left'
                                : charCount < 450
                                ? 'italic text-[#98A2B3] text-left'
                                : charCount >= 450 && charCount < 475
                                ? 'italic text-[#FFB800] text-left'
                                : charCount >= 475 && charCount < 500
                                ? 'italic text-[#FF8A00] text-left'
                                : 'italic text-[#FF0000] text-left'
                            }
                          >
                            {charCount}/500
                          </p>
                          <p className='text-md text-red-500 italic'>
                            {errors.description}
                          </p>
                        </div>
                        <div>
                          <label>Link del portafolio</label>
                          <input
                            className={
                              errors.portfolio
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none resize-none mt-1'
                            }
                            value={formData.portfolio}
                            name='portfolio'
                            onChange={e => handleChange(e)}
                          />
                          <p className='text-md text-red-500 italic'>
                            {errors.portfolio}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 text-right flex justify-end items-center'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 w-20 h-9'
                        onClick={() => {
                          setFormData({
                            specialty: data.specialty,
                            description: data.description,
                            portfolio: data.portfolio
                          })
                          setCharCount(data.description.length)
                          setSuccess(false)
                          setErrors({
                            specialty: '',
                            description: '',
                            portfolio: ''
                          })
                          setShowModal(false)
                        }}
                      >
                        Cancelar
                      </button>
                      <button
                        type='submit'
                        disabled={isSubmitting || success || isDisabled}
                        className={
                          isDisabled
                            ? 'ml-2 inline-flex justify-center text-sm font-medium text-white bg-gray-400 dark:bg-gray-700 cursor-not-allowed border border-none rounded-md w-20 h-9 items-center'
                            : isSubmitting || success
                            ? 'ml-2 inline-flex justify-center text-sm font-medium text-white bg-codecolor border border-none rounded-md shadow-sm cursor-default w-20 h-9 items-center'
                            : 'ml-2 inline-flex justify-center text-sm font-medium text-white bg-codecolor border border-none rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500  w-20 h-9 items-center'
                        }
                      >
                        {isSubmitting ? (
                          <LoaderMini className='self-center' />
                        ) : success ? (
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className='self-center'
                          />
                        ) : (
                          'Guardar'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Biography
