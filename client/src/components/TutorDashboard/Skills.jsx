import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { faXmark, faEdit, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSelector, useDispatch } from 'react-redux'
import { tutorFetchById } from '../../redux/features/tutors/tutorsSlice'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Skills = ({ skills, id }) => {
  const tutorId = id

  const dispatch = useDispatch()

  const [showModal, setShowModal] = useState(false)

  const teches = useSelector((state) => state.teches.teches)

  const closeModalHandler = () => {
    setShowModal(false)
  }

  const mappedData = skills.map((skill) => {
    return {
      techName: skill.techName._id,
      years: skill.years,
      description: skill.description,
    }
  })

  const [data, setData] = useState({
    skills: mappedData,
    tutor: tutorId,
  })

  const [editingSkillId, setEditingSkillId] = useState(null)

  const handlerUpdateSkill = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/skillstech/${id}`,
        updatedData
      )
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const showModalHandler = (skillId) => {
    setEditingSkillId(skillId)
    setShowModal(true)
  }

  const addSkillHandler = async (e) => {
    e.preventDefault()

    if (editingSkillId) {
      // Update existing skill
      const updatedData = {
        tutor: tutorId,
        techName: data.techName,
        years: data.years,
        description: data.description,
      }
      await handlerUpdateSkill(editingSkillId, updatedData)
      dispatch(tutorFetchById(tutorId))
    } else {
      // Add new skill
      try {
        const response = await axios.post(`${BACKEND_URL}/api/skillstech`, data)
        console.log(response.data)
        dispatch(tutorFetchById(tutorId))
      } catch (error) {
        console.log(error)
      }
    }

    setShowModal(false)
    setEditingSkillId(null) // Reset the editing skill ID
  }

  //deleteHandler
  const deleteHandler = async (id) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/skillstech/${id}`)
      console.log(response.data)
      dispatch(tutorFetchById(tutorId))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex flex-col bg-white rounded-[8px] border w-full gap-[18px] ">
      <div className="flex flex-col px-12 py-8">
        <div className="flex justify-between">
          <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
            Habilidades Técnicas{' '}
          </h2>
          <div className="flex">
            <button
              className="ml-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-codecolor border border-transparent rounded-md shadow-sm hover:bg-codecolordark focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              onClick={() => showModalHandler()}
            >
              Agregar
            </button>
          </div>
        </div>

        <div className="grid mt-4 grid-cols-3 gap-3">
          {skills.map((skill, index) => (
            <div
              className="bg-[#7D5AE21A] mr-3 max-w-[200px] justify-center p-4 mb-2 flex flex-row items-center text-[#7D5AE2]  py-3 rounded-[8px]"
              key={index}
            >
              <p className="text-[#7D5AE2] font-semibold">
                {skill.techName.name}
              </p>
              <button className="ml-2">
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => showModalHandler(skill._id)}
                  className="w-3 mr-2 text-codecolor hover:text-codecolordark"
                />
              </button>
              <button className="ml-2">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="w-3 text-codecolor hover:text-codecolordark"
                  onClick={() => deleteHandler(skill._id, tutorId)}
                />
              </button>
            </div>
          ))}
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
              onSubmit={(e) => addSkillHandler(e)}
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-2xl leading-6 font-semibold text-gray-900">
                      Habilidades Técnicas{' '}
                    </h3>
                    <div className="mt-6 w-full">
                      <div className="flex flex-col gap-2">
                        <div>
                          <label>Habilidades Técnicas</label>
                          <select
                            className="shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor"
                            onChange={(e) =>
                              setData({ ...data, techName: e.target.value })
                            }
                          >
                            {teches.map((tech) => (
                              <option value={tech._id} key={tech._id}>
                                {tech.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label>Años de experiencia con la tecnología</label>
                          <input
                            className="shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor"
                            type="number"
                            value={data.years}
                            onChange={(e) =>
                              setData({ ...data, years: e.target.value })
                            }
                          />
                        </div>
                        <div>
                          <label>Experiencia con la tecnología</label>
                          <textarea
                            className="shadow-sm  focus:border-codecolor text-md border-gray-300 border rounded-md w-full px-3 py-2 focus:outline-codecolor"
                            rows={6}
                            onChange={(e) =>
                              setData({ ...data, description: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 text-right">
                      <button
                        type="button"
                        onClick={() => closeModalHandler()}
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
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