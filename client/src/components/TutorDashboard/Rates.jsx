import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { faXmark, faEdit, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Rates = ({ rates, id }) => {
  const [showModal, setShowModal] = useState(false)

  const [data, setData] = useState({
    name: rates.name,
    promo: rates.promo,
    value: rates.value
  })

  const [newData, setNewData] = useState({
    name: rates.name,
    promo: rates.promo,
    value: rates.value
  })

  const handleEditButtonClick = () => {
    setShowModal(true)
  }

  const updateRate = async e => {
    e.preventDefault()
    const submitData = {
      name: data.name,
      promo: data.promo,
      value: data.value
    }
    try {
      const res = await axios.put(`${BACKEND_URL}/api/tutors/${id}`, {
        rates: [
          submitData,
          {
            name: 'Freelance',
            promo: false,
            value: 0
          }
        ]
      })

      setNewData(submitData)

      console.log(res.data)
      setShowModal(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    setShowModal(false)
    setData({
      name: newData.name,
      promo: newData.promo,
      value: newData.value
    })
  }

  return (
    <div className='flex flex-col bg-white dark:bg-gray-800 dark:border-none rounded-[8px] border gap-[18px] '>
      <div className='flex flex-col px-12 py-8 justify-between max-lg:p-6'>
        <div className='flex justify-between'>
          <h2 className='font-inter dark:text-gray-200 text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]'>
            Tarifa{' '}
          </h2>

          <button
            className='ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
            onClick={handleEditButtonClick}
          >
            Agregar
          </button>
        </div>

        <div className='flex flex-col mt-2 gap-2'>
          <div className='flex'>
            <h2 className='font-semibold  dark:text-gray-200'>
              {newData.name}
            </h2>
          </div>
          <div className='flex'>
            <p className='italic dark:text-gray-200'>{newData.promo}</p>
          </div>
          <div className='flex'>
            <p className='text-sm  dark:text-gray-200'>${newData.value}/hora</p>
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
              className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] dark:bg-gray-800 bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
              role='dialog'
              aria-modal='true'
              aria-labelledby='modal-headline'
              onSubmit={updateRate}
            >
              <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                    <h3 className='text-2xl dark:text-gray-200 leading-6 font-semibold text-gray-900'>
                      Tarifa{' '}
                    </h3>
                    <div className='lg:mt-6 mt-2 w-full'>
                      <div className='flex flex-col lg:gap-2 dark:text-gray-200 max-lg:text-left'>
                        <div>
                          <label>{data.name}</label>
                          <input
                            className='shadow-sm mt-4 focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor dark:bg-gray-900 dark:border-none dark:outline-none max-lg:mt-1'
                            type='number'
                            placeholder='$ por hora'
                            value={data.value}
                            onChange={e =>
                              setData({ ...data, value: e.target.value })
                            }
                          />
                        </div>
                        <div className='mt-4 max-lg:mt-2'>
                          <label>Promo</label>
                          <div className='flex items-center mt-4 max-lg:mt-1'>
                            <input
                              className='mr-2 max-lg:mr-0 w-4 h-4 border-gray-300 rounded focus:outline-codecolor !important'
                              type='checkbox'
                              checked={data.promo}
                              onChange={e =>
                                setData({ ...data, promo: e.target.checked })
                              }
                            />
                            <span className='ml-2'>
                              Primeros 15 minutos gratis
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-4 text-right'>
                      <button
                        type='button'
                        className='inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-none dark:outline-none dark:text-gray-200'
                        onClick={() => handleCancel()}
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

export default Rates
