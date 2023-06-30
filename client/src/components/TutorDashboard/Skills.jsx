import React from 'react'
import { useState } from 'react'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Skills = ({ bio, id }) => {
  const [showModal, setShowModal] = useState(false)

  const [data, setData] = useState({
    specialty: bio.specialty,
    description: bio.description,
    portfolio: bio.linkBriefcase,
  })

  const handleEditButtonClick = () => {
    setShowModal(true)
  }

  const updateBio = async (e) => {
    e.preventDefault()
    const submitData = {
      specialty: data.specialty,
      description: data.description,
      linkBriefcase: data.portfolio,
    }
    try {
      const res = await axios.put(`${BACKEND_URL}/api/tutors/${id}`, {
        bio: submitData,
      })
      console.log(res.data)
      setShowModal(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-[8px] border w-full gap-[18px] ">
      <div className="flex px-12 py-8 justify-between ">
        <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
          Habilidades Técnicas{' '}
        </h2>
        <div className="flex">
          <button
            className='"ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"'
            onClick={handleEditButtonClick}
          >
            Editar
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed z-[9999] inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75" />
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <form
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
              onSubmit={(e) => updateBio(e)}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-2xl leading-6 font-semibold text-gray-900">
                      Biografia{' '}
                    </h3>
                    <div className="mt-6 w-full">
                      <div className="flex flex-col gap-2">
                        <div>
                          <label>Especialidad</label>
                          <select
                            className="shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor"
                            value={data.specialty}
                            onChange={(e) =>
                              setData({ ...data, specialty: e.target.value })
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
                            className="shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor"
                            rows={6}
                            value={data.description}
                            onChange={(e) =>
                              setData({ ...data, description: e.target.value })
                            }
                          ></textarea>
                        </div>
                        <div>
                          <label>Link del portafolio</label>
                          <input
                            className="shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor"
                            value={data.portfolio}
                            onChange={(e) =>
                              setData({ ...data, portfolio: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-right">
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={() => setShowModal(false)}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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

export default Skills
