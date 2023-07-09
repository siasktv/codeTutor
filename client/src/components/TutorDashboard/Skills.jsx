import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {
  faXmark,
  faEdit,
  faBriefcase,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { tutorFetchById } from '../../redux/features/tutors/tutorsSlice'
import LoaderMini from '../LoaderMini'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Skills = ({ skills, id }) => {
  const tutorId = id

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({
    techName: '',
    years: '',
    description: ''
  })

  const teches = useSelector(state => state.teches.teches)

  const [data, setData] = useState({
    techName: '',
    years: '',
    description: '',
    tutor: tutorId
  })

  const [editingSkillId, setEditingSkillId] = useState(false)
  const [editingSkill, setEditingSkill] = useState({
    techName: '',
    years: '',
    description: '',
    tutor: tutorId
  })

  const handlerUpdateSkill = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/skillstech/${id}`,
        updatedData
      )
    } catch (error) {
      setIsSubmitting(false)
      setSuccess(false)
      console.log(error)
    }
  }

  const showModalHandler = skillId => {
    if (skillId) {
      setData({
        techName: skills.find(skill => skill._id === skillId).techName._id,
        years: skills.find(skill => skill._id === skillId).years,
        description: skills.find(skill => skill._id === skillId).description,
        tutor: tutorId
      })
      setCharCount(
        skills.find(skill => skill._id === skillId).description.length
      )
      setEditingSkill({
        techName: skills.find(skill => skill._id === skillId).techName._id,
        years: skills.find(skill => skill._id === skillId).years,
        description: skills.find(skill => skill._id === skillId).description,
        tutor: tutorId
      })
      setEditingSkillId(true)
    } else {
      setData({
        techName: '',
        years: '',
        description: '',
        tutor: tutorId
      })
      setEditingSkillId(false)
    }
    setShowModal(true)
  }

  const addSkillHandler = async e => {
    e.preventDefault()
    if (isDisabled || isSubmitting || success) return
    if (editingSkillId) {
      // Update existing skill
      const updatedData = {
        tutor: tutorId,
        techName: data.techName,
        years: data.years,
        description: data.description
      }
      setIsSubmitting(true)
      await handlerUpdateSkill(editingSkillId, updatedData)
      setIsSubmitting(false)
      setSuccess(true)
      dispatch(tutorFetchById(tutorId))
    } else {
      // Add new skill
      setIsSubmitting(true)
      try {
        const response = await axios.post(`${BACKEND_URL}/api/skillstech`, data)
        setIsSubmitting(false)
        setSuccess(true)
        dispatch(tutorFetchById(tutorId))
      } catch (error) {
        setIsSubmitting(false)
        console.log(error)
      }
    }
  }

  //deleteHandler

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const deleteHandler = id => {
    if (skills.length <= 1) {
      setDeleteId('error')
      setShowDeleteModal(true)
      return
    }
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const submitDelete = async id => {
    if (isSubmitting || success) return
    setIsSubmitting(true)
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/skillstech/${id}`)
      setIsSubmitting(false)
      setSuccess(true)
      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
    }
  }

  const [charCount, setCharCount] = useState(data.description.length)

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'techName') {
      if (value.trim() === '' || value.trim() === 'default') {
        setErrors(prevState => ({
          ...prevState,
          techName: 'Por favor seleccione una tecnología'
        }))
      } else {
        setErrors(prevState => ({
          ...prevState,
          techName: ''
        }))
      }
    }
    if (name === 'years') {
      const years = Number(value)
      if (isNaN(years)) {
        setErrors({
          ...errors,
          years: 'Solo se permiten números'
        })
      } else if (years < 0) {
        setErrors({
          ...errors,
          years: 'No se permiten números negativos'
        })
      } else if (years > 100) {
        setErrors({
          ...errors,
          years: 'No se permiten números mayores a 100'
        })
      } else if (years === '') {
        setErrors({
          ...errors,
          years: 'Este campo es obligatorio'
        })
      } else if (years === 0) {
        setErrors({
          ...errors,
          years: 'Debes tener al menos 1 año de experiencia'
        })
      } else {
        setErrors({
          ...errors,
          years: ''
        })
      }
    }
    if (name === 'description') {
      const trimmed = value.trim()
      if (trimmed.length <= 500) {
        if (trimmed.length === 0) {
          setErrors({
            ...errors,
            description: 'La descripción no puede estar vacía'
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
    if (name === 'description' && value.length > 500) {
      return
    } else {
      setData({
        ...data,
        [name]: value
      })
    }
  }

  useEffect(() => {
    if (
      data.techName.trim() === '' ||
      data.years === '' ||
      data.description.trim() === '' ||
      errors.techName !== '' ||
      errors.years !== '' ||
      errors.description !== '' ||
      (data.techName === editingSkill.techName &&
        data.years === editingSkill.years &&
        data.description === editingSkill.description)
    ) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [data, errors, editingSkill])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setShowModal(false)
        setSuccess(false)
        setData({
          techName: '',
          years: '',
          description: '',
          tutor: tutorId
        })
        setErrors({
          techName: '',
          years: '',
          description: ''
        })
        setEditingSkillId(false)
        setEditingSkill({
          techName: '',
          years: '',
          description: '',
          tutor: tutorId
        })
        setDeleteId(null)
        setShowDeleteModal(false)
      }, 1000)
    }
  }, [success])

  return (
    <div className='flex flex-col bg-white dark:bg-gray-800 dark:border-none rounded-[8px] border w-full gap-[18px] '>
      <div className='flex flex-col px-12 py-8 max-lg:p-6'>
        <div className='flex justify-between'>
          <h2 className='font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E] dark:text-gray-200'>
            Habilidades Técnicas{' '}
          </h2>
          <div className='flex'>
            <button
              className='ml-2 inline-flex justify-center h-9 w-20 items-center text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={() => showModalHandler()}
            >
              Agregar
            </button>
          </div>
        </div>

        <div className='lg:mt-4 mt-2 flex flex-wrap'>
          {skills.map((skill, index) => (
            <>
              <div
                className='bg-[#7D5AE21A] lg:mr-3 justify-center p-4 flex flex-row items-center text-[#7D5AE2]  py-3 rounded-[8px] dark:bg-codecolor dark:text-codecolorlighter max-lg:p-1 m-1'
                key={index}
              >
                <p className='text-[#7D5AE2] font-semibold break-all dark:text-codecolorlighter'>
                  {skill.techName.name}
                </p>
                <button
                  className='ml-2'
                  onClick={() => showModalHandler(skill._id)}
                >
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='w-3 mr-2 max-lg:mr-0 text-codecolor hover:text-codecolordark dark:text-codecolorlighter'
                  />
                </button>
                <button
                  className='ml-2'
                  onClick={() => deleteHandler(skill._id)}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className='w-3 text-codecolor max-lg:mr-1 hover:text-codecolordark dark:text-codecolorlighter'
                  />
                </button>
              </div>
            </>
          ))}
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
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:left-1/2 max-lg:-translate-x-1/2 dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
              onSubmit={e => addSkillHandler(e)}
            >
              <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <h3 className='text-2xl leading-6 dark:text-gray-200 font-semibold text-gray-900'>
                      Habilidades Técnicas{' '}
                    </h3>
                    <div className='mt-6 w-full'>
                      <div className='flex flex-col gap-2 dark:text-gray-200 max-lg:text-left'>
                        <div>
                          <label>Habilidades Técnicas</label>
                          <select
                            className={
                              errors.techName
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none resize-none mt-1'
                            }
                            onChange={e => handleChange(e)}
                            name='techName'
                          >
                            <option value='' selected disabled hidden>
                              Seleccione una tecnología
                            </option>
                            {teches.map(tech => (
                              <option
                                value={tech._id}
                                key={tech._id}
                                selected={tech._id === data.techName}
                              >
                                {tech.name}
                              </option>
                            ))}
                          </select>
                          <p className='text-md text-red-500 italic'>
                            {errors.techName}
                          </p>
                        </div>
                        <div>
                          <label>Años de experiencia con la tecnología</label>
                          <input
                            className={
                              errors.years
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none resize-none mt-1'
                            }
                            type='number'
                            value={data.years}
                            name='years'
                            onChange={e => handleChange(e)}
                          />
                        </div>
                        <p className='text-md text-red-500 italic'>
                          {errors.years}
                        </p>

                        <div>
                          <label>Experiencia con la tecnología</label>
                          <textarea
                            className={
                              errors.description
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none resize-none mt-1'
                            }
                            rows={6}
                            value={data.description}
                            name='description'
                            onChange={e => handleChange(e)}
                          />
                          <p
                            className={
                              charCount < 1
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
                      </div>
                    </div>
                    <div className='mt-4 text-right flex justify-end items-center'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 w-20 h-9'
                        onClick={() => {
                          setData({
                            techName: '',
                            years: '',
                            description: '',
                            tutor: tutorId
                          })
                          setSuccess(false)
                          setErrors({
                            techName: '',
                            years: '',
                            description: ''
                          })
                          setCharCount(0)
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
      {showDeleteModal && (
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
            <div
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:left-1/2 max-lg:-translate-x-1/2 dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
            >
              <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex items-center justify-center'>
                  <div className='mt-3 text-center sm:mt-0'>
                    <h3
                      className='text-lg leading-6 font-medium text-gray-900 dark:text-gray-200'
                      id='modal-headline'
                    >
                      {deleteId === 'error'
                        ? 'Error'
                        : 'Eliminar habilidad técnica'}
                    </h3>
                    <div className='mt-2'>
                      {deleteId === 'error' ? (
                        <>
                          <p className='text-md text-gray-500 dark:text-gray-300'>
                            No puedes eliminar todas tus habilidades técnicas.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className='text-md text-gray-500 dark:text-gray-300'>
                            ¿Estás seguro que deseas eliminar esta habilidad
                            técnica?
                          </p>
                          <p className='text-md text-gray-500 dark:text-gray-300'>
                            Esta acción no se puede deshacer.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mt-4 text-right flex justify-end items-center'>
                  <button
                    type='button'
                    className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 w-20 h-9'
                    onClick={() => {
                      setSuccess(false)
                      setShowDeleteModal(false)
                      setDeleteId(null)
                    }}
                  >
                    {deleteId === 'error' ? 'Aceptar' : 'Cancelar'}
                  </button>
                  {deleteId !== 'error' && (
                    <button
                      type='button'
                      disabled={isSubmitting || success}
                      onClick={() => submitDelete(deleteId)}
                      className={
                        isSubmitting || success
                          ? 'ml-2 inline-flex justify-center text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm cursor-default w-20 h-9 items-center'
                          : 'ml-2 inline-flex justify-center text-sm font-medium text-white bg-red-500 border border-transparent rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500  w-20 h-9 items-center'
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
                        'Eliminar'
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Skills
