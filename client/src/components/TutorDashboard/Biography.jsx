import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Biography = ({ bio, id }) => {
  const [showModal, setShowModal] = useState(false)

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

  const handleEditButtonClick = () => {
    setShowModal(true)
  }

  const updateBio = async e => {
    e.preventDefault()
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
      setShowModal(false)
    } catch (err) {
      console.log(err)
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
            className='ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
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
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
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
                            className='shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:border-none dark:outline-none max-lg:mt-1'
                            value={formData.specialty}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                specialty: e.target.value
                              })
                            }
                          >
                            <option>Front End Developer</option>
                            <option>Back End Developer</option>
                            <option>Full Stack Developer</option>
                            <option>Database Specialist</option>
                          </select>
                        </div>
                        <div>
                          <label>Breve biografía</label>
                          <textarea
                            className='shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:border-none dark:outline-none resize-none max-lg:mt-1'
                            rows={6}
                            value={formData.description}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                description: e.target.value
                              })
                            }
                          ></textarea>
                        </div>
                        <div>
                          <label>Link del portafolio</label>
                          <input
                            className='shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:border-none dark:outline-none max-lg:mt-1'
                            value={formData.portfolio}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                portfolio: e.target.value
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 text-right'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-none dark:hover:bg-gray-600'
                        onClick={() => setShowModal(false)}
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

export default Biography
