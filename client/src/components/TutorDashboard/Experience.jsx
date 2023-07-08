import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {
  faXmark,
  faEdit,
  faBriefcase,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { tutorFetchById } from '../../redux/features/tutors/tutorsSlice'
import LoaderMini from '../LoaderMini'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Experience = ({ experience, id }) => {
  const tutorId = id

  const [showModal, setShowModal] = useState(false)

  const teches = useSelector(state => state.teches.teches)

  const [editingExperience, setEditingExperience] = useState(null)

  const [charCount, setCharCount] = useState(0)

  const [newExperience, setNewExperience] = useState(false)

  const [isDisabled, setIsDisabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const dispatch = useDispatch()

  //errors
  const [errors, setErrors] = useState({
    company: '',
    current: false,
    description: '',
    end_date: '',
    start_date: '',
    position: '',
    location: '',
    technologies: ''
  })

  //data + tutorid
  const [newData, setNewData] = useState({
    company: '',
    current: false,
    description: '',
    end_date: '',
    start_date: '',
    position: '',
    location: '',
    techName: [],
    tutor: tutorId
  })

  const theme = localStorage.getItem('theme')
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark' ||
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? true
      : false
  )
  useEffect(() => {
    if (theme === 'dark') {
      setDarkMode(true)
    } else if (theme === 'light') {
      setDarkMode(false)
    } else if (theme === null) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode(true)
      } else {
        setDarkMode(false)
      }
    }
  }, [theme])

  useEffect(() => {
    setNewData(prev => {
      return {
        ...prev,
        tutor: tutorId
      }
    })
  }, [tutorId])

  useEffect(() => {
    if (newData.current) {
      const actualDate = new Date()
      setNewData({
        ...newData,
        end_date: actualDate.toISOString().substr(0, 10)
      })
    } else {
      setNewData({
        ...newData,
        end_date: ''
      })
    }
  }, [newData.current])

  //Date handler

  const handleDateChange = e => {
    const { name, value } = e.target
    const actualDate = new Date()
    if (name === 'startDate') {
      if (value.trim() === '') {
        setErrors({
          ...errors,
          start_date: 'Por favor, ingresa tu fecha de inicio'
        })
      } else if (newData.start_date > actualDate.toISOString().substr(0, 10)) {
        setErrors({
          ...errors,
          start_date: 'La fecha de inicio no puede ser mayor a la fecha actual'
        })
      } else if (newData.end_date !== '' && value > newData.end_date) {
        setErrors({
          ...errors,
          start_date: 'La fecha de inicio no puede ser mayor a la fecha de fin',
          end_date: 'La fecha de fin no puede ser menor a la fecha de inicio'
        })
      } else {
        setErrors({
          ...errors,
          start_date: '',
          end_date: ''
        })
      }
    }
    if (name === 'endDate') {
      if (value.trim() === '') {
        setErrors({
          ...errors,
          end_date: 'Por favor, ingresa tu fecha de fin'
        })
      } else if (newData.end_date > actualDate.toISOString().substr(0, 10)) {
        setErrors({
          ...errors,
          end_date: 'La fecha de fin no puede ser mayor a la fecha actual'
        })
      } else if (newData.start_date !== '' && value < newData.start_date) {
        setErrors({
          ...errors,
          end_date: 'La fecha de fin no puede ser menor a la fecha de inicio',
          start_date: 'La fecha de inicio no puede ser mayor a la fecha de fin'
        })
      } else {
        setErrors({
          ...errors,
          end_date: '',
          start_date: ''
        })
      }
    }
    if (name === 'startDate') {
      setNewData({
        ...newData,
        start_date: value
      })
    } else {
      setNewData({
        ...newData,
        end_date: value
      })
    }
  }

  //SelectHandler
  const handleTechNameChange = values => {
    if (values.length === 0) {
      setErrors({
        ...errors,
        technologies: 'Selecciona al menos una tecnología'
      })
    } else {
      setErrors({ ...errors, technologies: '' })
    }
    setNewData({
      ...newData,
      techName: values.map(i => i.value)
    })
  }

  //Company handler
  const handleCompanyChange = e => {
    const newCompany = e.target.value
    if (newCompany.length === 0) {
      setErrors({ ...errors, company: 'La empresa es requerida' })
    } else {
      setErrors({ ...errors, company: '' })
    }
    setNewData({ ...newData, company: newCompany })
  }

  //Postion handler
  const handlePositionChange = e => {
    const newPosition = e.target.value
    if (newPosition.length === 0) {
      setErrors({ ...errors, position: 'La posición es requerida' })
    } else {
      setErrors({ ...errors, position: '' })
    }
    setNewData({ ...newData, position: newPosition })
  }

  //Description handler
  const handleDescriptionChange = e => {
    const newDescription = e.target.value
    const trimmed = newDescription.trim()
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
      setNewData({ ...newData, description: newDescription })
    } else {
      setCharCount(500)
    }
  }

  //Location handler
  const handleLocationChange = e => {
    const newLocation = e.target.value
    if (newLocation.length === 0) {
      setErrors({ ...errors, location: 'La ubicación es requerida' })
    } else {
      setErrors({ ...errors, location: '' })
    }
    setNewData({ ...newData, location: newLocation })
  }

  //Current handler

  const handleCurrentChange = e => {
    const newCurrent = e.target.checked
    setNewData({ ...newData, current: newCurrent })
  }

  //closeModal
  const closeModalHandler = () => {
    setNewExperience(false)
    setShowModal(false)
    setEditingExperience(null)
    setNewData({
      company: '',
      current: '',
      description: '',
      end_date: '',
      start_date: '',
      position: '',
      location: '',
      techName: '',
      tutor: tutorId
    })
    setErrors({
      company: '',
      current: '',
      description: '',
      end_date: '',
      start_date: '',
      position: '',
      location: '',
      techName: '',
      tutor: tutorId
    })
    setCharCount(0)
  }
  //openModal
  const openModalHandler = (isNew, id) => {
    if (!isNew) {
      const currentExperience = experience.find(exp => exp._id === id)
      setEditingExperience({
        _id: currentExperience._id,
        company: currentExperience.company,
        current: currentExperience.current,
        description: currentExperience.description,
        end_date: new Date(currentExperience.end_date)
          .toISOString()
          .substr(0, 10),
        start_date: new Date(currentExperience.start_date)
          .toISOString()
          .substr(0, 10),
        position: currentExperience.position,
        location: currentExperience.location,
        techName: currentExperience.techName.map(tech => tech._id),
        tutor: tutorId
      })
      const newEndDate = new Date(currentExperience.end_date)
      const newStartDate = new Date(currentExperience.start_date)
      setNewData({
        company: currentExperience.company,
        current: currentExperience.current,
        description: currentExperience.description,
        end_date: newEndDate.toISOString().substr(0, 10),
        start_date: newStartDate.toISOString().substr(0, 10),
        position: currentExperience.position,
        location: currentExperience.location,
        techName: currentExperience.techName.map(tech => tech._id),
        tutor: tutorId
      })
      setCharCount(currentExperience.description.length)
    }
    setNewExperience(isNew)
    setShowModal(true)
  }

  //select
  const selectOptions = () => {
    if (!newData || !newData?.techName) return []
    const selectedOptions = newData.techName?.map(tech => {
      return {
        value: tech,
        label: teches.find(t => t._id === tech).name
      }
    })
    return selectedOptions
  }

  const selectTeches = useMemo(() => {
    return teches.map(tech => {
      return {
        value: tech._id,
        label: tech.name
      }
    })
  }, [teches])

  //submitHandler

  const submitNewItem = async e => {
    // .... axios.post
    e.preventDefault()
    if (isDisabled || isSubmitting || success) return
    setIsSubmitting(true)
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/experiences`,
        newData
      )
      setIsSubmitting(false)
      setSuccess(true)
      console.log(response.data)
      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
    }
  }

  const submitEditItem = async e => {
    e.preventDefault()
    if (isDisabled || isSubmitting || success) return
    setIsSubmitting(true)
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/experiences/${editingExperience._id}`,
        newData
      )
      setIsSubmitting(false)
      setSuccess(true)
      console.log(response.data)
      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
    }
  }

  const onSubmit = e => {
    newExperience ? submitNewItem(e) : submitEditItem(e)
    //   submitEditItem(e)
  }

  //deleteHandler
  const deleteHandler = id => {
    if (experience.length <= 1) {
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
      const response = await axios.delete(
        `${BACKEND_URL}/api/experiences/${id}`
      )
      console.log(response.data)
      setIsSubmitting(false)
      setSuccess(true)
      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      setIsSubmitting(false)
      console.log(error)
    }
  }

  useEffect(() => {
    if (
      newData.position.trim() === '' ||
      newData.company.trim() === '' ||
      newData.description.trim() === '' ||
      newData.location.trim() === '' ||
      newData.start_date.trim() === '' ||
      newData.end_date.trim() === '' ||
      newData.techName.length === 0 ||
      errors.position.trim() !== '' ||
      errors.company.trim() !== '' ||
      errors.description.trim() !== '' ||
      errors.location.trim() !== '' ||
      errors.start_date.trim() !== '' ||
      errors.end_date.trim() !== '' ||
      (newData.position === editingExperience?.position &&
        newData.company === editingExperience?.company &&
        newData.description === editingExperience?.description &&
        newData.location === editingExperience?.location &&
        newData.start_date === editingExperience?.start_date &&
        newData.end_date === editingExperience?.end_date &&
        JSON.stringify(newData.techName) ===
          JSON.stringify(editingExperience?.techName) &&
        newData.current === editingExperience?.current)
    ) {
      setIsDisabled(true)
    } else {
      setIsDisabled(false)
    }
  }, [newData, errors])

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false)
        closeModalHandler()
        setShowDeleteModal(false)
        setDeleteId(null)
      }, 1000)
    }
  }, [success])

  return (
    <div className='flex flex-col bg-white dark:bg-gray-800 dark:border-none rounded-[8px] border w-full gap-[18px] '>
      <div className='flex flex-col px-12 py-8 max-lg:p-6'>
        <div className='flex justify-between'>
          <h2 className='font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E] dark:text-gray-200'>
            Experiencias{' '}
          </h2>
          <div className='flex'>
            <button
              className='ml-2 inline-flex justify-center h-9 w-20 items-center text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={() => openModalHandler(true)}
            >
              Agregar
            </button>
          </div>
        </div>
        <div className='lg:mt-4 mt-2 flex flex-wrap'>
          {experience.map((exp, index) => (
            <div
              className='bg-[#7D5AE21A] lg:mr-3 justify-center p-4 flex flex-row items-center text-[#7D5AE2]  py-3 rounded-[8px] dark:bg-codecolor dark:text-codecolorlighter max-lg:p-1 m-1'
              key={index}
            >
              <p className='text-[#7D5AE2] font-semibold dark:text-codecolorlighter'>
                {exp.company} - {exp.position}
              </p>
              <button className='ml-2'>
                <FontAwesomeIcon
                  icon={faEdit}
                  className='w-3 mr-2 max-lg:mr-0 text-codecolor hover:text-codecolordark dark:text-codecolorlighter'
                  onClick={() => openModalHandler(false, exp._id)}
                />
              </button>
              <button className='ml-2'>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='w-3 text-codecolor max-lg:mr-1 hover:text-codecolordark dark:text-codecolorlighter'
                  onClick={() => deleteHandler(exp._id)}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* showModal */}
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
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
              onSubmit={e => onSubmit(e)}
            >
              <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <h3 className='text-2xl leading-6 dark:text-gray-200 font-semibold text-gray-900'>
                      Experiencias{' '}
                    </h3>
                    <div className='mt-6 w-full'>
                      <div className='flex flex-col dark:text-gray-200 max-lg:text-left'>
                        <label>Puesto</label>
                        <input
                          value={newData.position}
                          onChange={e => handlePositionChange(e)}
                          className={
                            errors.position
                              ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none max-lg:mt-1'
                              : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none max-lg:mt-1'
                          }
                        />
                        <span className='text-red-500 text-md italic'>
                          {errors.position}
                        </span>

                        <label>Compañía</label>
                        <input
                          value={newData.company}
                          onChange={e => handleCompanyChange(e)}
                          className={
                            errors.company
                              ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none max-lg:mt-1'
                              : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none max-lg:mt-1'
                          }
                        />
                        <span className='text-red-500 text-md italic'>
                          {errors.company}
                        </span>
                        <div>
                          <label>Ubicación</label>
                          <input
                            value={newData.location}
                            onChange={e => handleLocationChange(e)}
                            className={
                              errors.location
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none max-lg:mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none max-lg:mt-1'
                            }
                          />
                          <span className='text-red-500 text-md italic'>
                            {errors.location}
                          </span>
                        </div>

                        <div className='flex justify-between gap-8'>
                          <div className='block w-full'>
                            <p>
                              Desde <span className='text-red-500'>*</span>
                            </p>
                            <input
                              className={
                                errors.start_date
                                  ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none max-lg:mt-1'
                                  : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none max-lg:mt-1'
                              }
                              name='startDate'
                              type='date'
                              value={newData.start_date}
                              onChange={e => handleDateChange(e)}
                            />
                            {errors.start_date && (
                              <p className='font-inter font-normal italic text-red-500 text-left'>
                                {errors.start_date}
                              </p>
                            )}
                          </div>
                          <div className='block w-full'>
                            <p>
                              Hasta <span className='text-red-500'>*</span>
                            </p>
                            <input
                              className={
                                errors.end_date
                                  ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none max-lg:mt-1'
                                  : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none max-lg:mt-1'
                              }
                              name='endDate'
                              type='date'
                              value={newData.end_date}
                              onChange={e => handleDateChange(e)}
                            />
                            {errors.end_date && (
                              <p className='font-inter font-normal italic text-red-500 text-left'>
                                {errors.end_date}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className='flex items-center gap-2 mt-2'>
                          <input
                            type='checkbox'
                            checked={newData.current}
                            onChange={e => handleCurrentChange(e)}
                            className='form-checkbox h-5 w-5 border-gray-300 border text-codecolor'
                          />
                          <span>Actualmente trabajo aquí</span>
                        </div>

                        <div>
                          <p className='max-lg:mb-1'>Tecnologías Utilizadas</p>
                          <Select
                            placeholder='Selecciona una o más tecnologías'
                            // styles={{
                            //   control: (base) => ({
                            //     ...base,
                            //     border: errors.technologies
                            //       ? '2px solid #EF4444'
                            //       : '2px solid rgb(209 213 219 / 30%)',
                            //     boxShadow: 'none',
                            //     '&:hover': {
                            //       border: errors.technologies
                            //         ? '2px solid #EF4444'
                            //         : '2px solid #7F56D9',

                            //       // errors.technologies,
                            //     },
                            //   }),
                            // }}
                            // theme={(theme) => ({
                            //   ...theme,
                            //   primary: '#EF4444',
                            // })}
                            isMulti
                            name='techName'
                            defaultValue={selectOptions}
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                background: darkMode ? '#111827' : '#fff',
                                color: darkMode ? 'rgb(229 231 235)' : '#000',
                                border: darkMode ? 'none' : '1px solid #d1d5db',
                                outline: 'none',
                                ':active': {
                                  outline: 'none'
                                },
                                ':focus': {
                                  outline: 'none'
                                },
                                boxShadow: 'none'
                              }),
                              option: (
                                styles,
                                { data, isDisabled, isFocused, isSelected }
                              ) => {
                                return {
                                  ...styles,
                                  backgroundColor: isDisabled
                                    ? null
                                    : isSelected
                                    ? darkMode
                                      ? '#7F56D9'
                                      : '#7F56D9'
                                    : isFocused
                                    ? darkMode
                                      ? '#7F56D9'
                                      : '#7F56D9'
                                    : darkMode
                                    ? '#111827'
                                    : '#fff',
                                  color: isDisabled
                                    ? '#ccc'
                                    : isSelected
                                    ? darkMode
                                      ? 'rgb(229 231 235)'
                                      : '#fff'
                                    : darkMode
                                    ? 'rgb(229 231 235)'
                                    : isFocused
                                    ? '#fff'
                                    : '#000',
                                  cursor: isDisabled
                                    ? 'not-allowed'
                                    : 'default',
                                  ':active': {
                                    ...styles[':active'],
                                    backgroundColor:
                                      !isDisabled &&
                                      (isSelected
                                        ? darkMode
                                          ? '#7F56D9'
                                          : '#7F56D9'
                                        : darkMode
                                        ? '#7F56D9'
                                        : '#7F56D9')
                                  }
                                }
                              },
                              multiValue: (styles, { data }) => {
                                return {
                                  ...styles,
                                  backgroundColor: darkMode
                                    ? '#7F56D9'
                                    : '#7F56D9',
                                  color: darkMode ? 'rgb(229 231 235)' : '#fff'
                                }
                              },
                              multiValueLabel: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#fff'
                              }),
                              multiValueRemove: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#fff',
                                ':hover': {
                                  backgroundColor: darkMode
                                    ? '#7F56D9'
                                    : '#7F56D9',
                                  color: darkMode ? 'rgb(229 231 235)' : '#fff'
                                }
                              }),
                              menu: (styles, { data }) => ({
                                ...styles,
                                backgroundColor: darkMode ? '#111827' : '#fff',
                                color: darkMode ? 'rgb(229 231 235)' : '#000'
                              }),
                              menuList: (styles, { data }) => ({
                                ...styles,
                                backgroundColor: darkMode ? '#111827' : '#fff',
                                color: darkMode ? 'rgb(229 231 235)' : '#000'
                              }),
                              indicatorSeparator: (styles, { data }) => ({
                                ...styles,
                                backgroundColor: darkMode
                                  ? 'rgb(229 231 235)'
                                  : '#000'
                              }),
                              dropdownIndicator: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#000',
                                ':hover': {
                                  color: darkMode ? 'rgb(229 231 235)' : '#000'
                                }
                              }),
                              clearIndicator: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#000',
                                ':hover': {
                                  color: darkMode ? 'rgb(229 231 235)' : '#000'
                                }
                              }),
                              placeholder: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#000'
                              }),
                              singleValue: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#000'
                              }),
                              valueContainer: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#000'
                              }),
                              input: (styles, { data }) => ({
                                ...styles,
                                color: darkMode ? 'rgb(229 231 235)' : '#000'
                              })
                            }}
                            options={selectTeches}
                            onChange={values => {
                              handleTechNameChange(values)
                            }}
                          />
                          <span className='text-red-500 text-md italic'>
                            {errors.technologies}
                          </span>
                        </div>

                        <div className='mt-2'>
                          <label>Descripción</label>
                          <textarea
                            className={
                              errors.description
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-gray-900 dark:outline-none resize-none'
                            }
                            value={newData.description}
                            onChange={e => handleDescriptionChange(e)}
                            rows={6}
                          ></textarea>
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

                          <div className='flex'>
                            <p className='text-red-500 text-md italic'>
                              {errors.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* buttons */}
                    <div className='mt-4 text-right flex justify-end items-center'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 w-20 h-9'
                        onClick={() => {
                          setSuccess(false)
                          closeModalHandler()
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
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
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
                      {deleteId === 'error' ? 'Error' : 'Eliminar experiencia'}
                    </h3>
                    <div className='mt-2'>
                      {deleteId === 'error' ? (
                        <>
                          <p className='text-md text-gray-500 dark:text-gray-300'>
                            No puedes eliminar todas tus experiencias.
                          </p>
                        </>
                      ) : (
                        <>
                          <p className='text-md text-gray-500 dark:text-gray-300'>
                            ¿Estás seguro que deseas eliminar esta experiencia?
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

export default Experience
