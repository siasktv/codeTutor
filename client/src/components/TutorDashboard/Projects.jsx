import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { faXmark, faEdit, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import { tutorFetchById } from '../../redux/features/tutors/tutorsSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Projects = ({ projects, id }) => {
  const [showModal, setShowModal] = useState(false)

  const dispatch = useDispatch()

  const tutorId = id

  const [newProject, setNewProject] = useState(false)

  const [editingProject, setEditingProject] = useState(null)

  const teches = useSelector(state => state.teches.teches)

  const [charCount, setCharCount] = useState(0)

  const [errors, setErrors] = useState({
    name: '',
    link: '',
    description: '',
    technologies: ''
  })

  const [newData, setNewData] = useState({
    techName: [],
    end_date: '',
    description: '',
    link: '',
    name: '',
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

  //projectNameHandler with Errors
  const handleNameChange = e => {
    const newName = e.target.value

    if (newName.length < 3) {
      setErrors({ name: 'El nombre debe tener al menos 3 caracteres' })
    } else if (newName.length > 30) {
      setErrors({ name: 'El nombre debe tener menos de 30 caracteres' })
    } else {
      setErrors({ name: '' })
    }

    setNewData({ ...newData, name: newName })
  }

  //projectTechHandler with Errors
  const handleTechNameChange = values => {
    if (values.length === 0) {
      setErrors({
        ...errors,
        technologies: 'Selecciona al menos una tecnología'
      })
    } else {
      setErrors({ ...errors, technologies: '' })
      setNewData({
        ...newData,
        techName: values.map(i => i.value)
      })
    }
  }

  //projectDescriptionHandler with Errors
  const handleDescriptionChange = e => {
    const description = e.target.value
    const trimmed = description.trim()
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
      setNewData({
        ...newData,
        description: description
      })
      setCharCount(trimmed.length)
    } else {
      setCharCount(500)
    }
  }

  //projectLinkHandler with Errors
  const handleLinkChange = e => {
    const newLink = e.target.value
    // check if link is valid
    const regex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    if (!regex.test(newLink)) {
      setErrors({
        ...errors,
        link: 'Por favor ingresa un link válido'
      })
    } else {
      setErrors({
        ...errors,
        link: ''
      })
    }
    setNewData({
      ...newData,
      link: newLink
    })
  }

  const closeModalHandler = () => {
    setNewProject(false)
    setShowModal(false)
    setEditingProject(null)
    setNewData({
      techName: [],
      end_date: '',
      description: '',
      link: '',
      name: '',
      tutor: tutorId
    })
  }

  const openModalHandler = (isNew, id) => {
    if (!isNew) {
      const project = projects.find(project => project._id === id)
      setEditingProject(project)
      setNewData({
        techName: project.techName.map(tech => tech._id),
        description: project.description,
        link: project.link,
        name: project.name,
        tutor: tutorId
      })
    }
    setNewProject(isNew)
    setShowModal(true)
  }

  const selectOptions = () => {
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

  const submitNewItem = async e => {
    // .... axios.post
    e.preventDefault()
    try {
      const response = await axios.post(`${BACKEND_URL}/api/projects`, newData)
      console.log(response.data)
      closeModalHandler()
      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      console.log(error)
    }
  }

  const submitEditItem = async e => {
    e.preventDefault()

    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/projects/${editingProject._id}`,
        newData
      )
      console.log(response.data)
      closeModalHandler()
      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = e => {
    newProject ? submitNewItem(e) : submitEditItem(e)
  }

  const deleteItem = async (id, tutorId) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/projects/${id}`)
      console.log(response.data)

      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    setCharCount(newData.description.length)
  }, [newData.description])

  return (
    <div className='flex flex-col bg-white dark:bg-gray-800 dark:border-none rounded-[8px] border w-full gap-[18px] '>
      <div className='flex flex-col px-12 py-8 max-lg:p-6'>
        <div className='flex justify-between'>
          <h2 className='font-inter dark:text-gray-200 text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]'>
            Proyectos{' '}
          </h2>
          <div className='flex'>
            <button
              className='ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
              onClick={() => openModalHandler(true)}
            >
              Agregar
            </button>
          </div>
        </div>

        <div className='lg:mt-4 mt-2 flex flex-wrap'>
          {projects.map((project, index) => (
            <div className='bg-[#7D5AE21A] lg:mr-3 justify-center p-4 flex flex-row items-center text-[#7D5AE2]  py-3 rounded-[8px] dark:bg-codecolor dark:text-codecolorlighter max-lg:p-1 m-1'>
              <p className='text-[#7D5AE2] font-semibold dark:text-codecolorlighter'>
                {project.name}
              </p>
              <button className='ml-2'>
                <FontAwesomeIcon
                  icon={faEdit}
                  className='w-3 mr-2 max-lg:mr-0 text-codecolor hover:text-codecolordark dark:text-codecolorlighter'
                  onClick={() => openModalHandler(false, project._id)}
                />
              </button>
              <button className='ml-2'>
                <FontAwesomeIcon
                  icon={faXmark}
                  className='lg:w-3 max-lg:mr-1 text-codecolor hover:text-codecolordark dark:text-codecolorlighter'
                  onClick={() => deleteItem(project._id, tutorId)}
                />
              </button>
            </div>
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
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
              onSubmit={e => onSubmit(e)}
            >
              <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <h3 className='text-2xl leading-6 font-semibold dark:text-gray-200 text-gray-900'>
                      Proyectos{' '}
                    </h3>
                    <div className='mt-6 w-full'>
                      <div className='flex flex-col gap-2 dark:text-gray-200 max-lg:text-left'>
                        <div>
                          <label>Nombre del proyecto</label>
                          <input
                            className={
                              errors.name
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none max-lg:mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-none dark:outline-none max-lg:mt-1'
                            }
                            value={newData.name}
                            onChange={e => handleNameChange(e)}
                          />
                          <span className='text-red-500 text-sm italic'>
                            {errors.name}
                          </span>
                        </div>
                        <div>
                          <p className='max-lg:mb-1'>Tecnologías Utilizadas</p>
                          <Select
                            placeholder='Selecciona una o más tecnologías'
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
                              })
                            }}
                            theme={theme => ({
                              ...theme,
                              primary: '#EF4444'
                            })}
                            isMulti
                            name='techName'
                            defaultValue={selectOptions}
                            options={selectTeches}
                            onChange={values => {
                              handleTechNameChange(values)
                            }}
                          />
                          <span className='text-red-500 text-sm italic'>
                            {errors.technologies}
                          </span>
                        </div>

                        <div>
                          <label>Descripción</label>
                          <textarea
                            className={
                              errors.description
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none resize-none max-lg:mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-none dark:outline-none resize-none max-lg:mt-1'
                            }
                            rows={6}
                            value={newData.description}
                            onChange={e => handleDescriptionChange(e)}
                          ></textarea>
                          <span className='italic text-sm text-gray-400'>
                            0/500
                          </span>
                          <div className='flex'>
                            <span className='text-red-500 text-sm italic'>
                              {errors.description}
                            </span>
                          </div>
                        </div>
                        <div>
                          <label>Link</label>
                          <input
                            className={
                              errors.name
                                ? 'w-full py-2 px-3 bg-none rounded-[8px] border border-red-500 outline-red-500 dark:bg-gray-900 dark:text-gray-200 dark:border-red-500 dark:outline-none max-lg:mt-1'
                                : 'shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:text-gray-200 dark:border-none dark:outline-none max-lg:mt-1'
                            }
                            value={newData.link}
                            onChange={e => handleLinkChange(e)}
                          />
                          <span className='text-red-500 text-sm italic'>
                            {errors.link}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 text-right'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 dark:border-none'
                        onClick={() => closeModalHandler()}
                      >
                        Cancelar
                      </button>
                      <button
                        type='submit'
                        className='ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-codecolor border border-none rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                      >
                        Guardar
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

export default Projects
