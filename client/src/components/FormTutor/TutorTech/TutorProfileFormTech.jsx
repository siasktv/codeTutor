import { CardTutorInputFields } from '../../index'
import { useState, useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorProfileFormTech = props => {
  const {
    dataForm,
    setDataForm,
    form,
    setForm,
    errorsData,
    setErrorsData,
    technologies
  } = props

  const handleSelect = e => {
    const tech = e.target.value
    if (tech === 'default') {
      setErrorsData({
        ...errorsData,
        tech: 'Debes seleccionar una tecnología'
      })
    } else {
      setErrorsData({ ...errorsData, tech: '' })
    }
    setDataForm({
      ...dataForm,
      tech: {
        id: tech,
        name: technologies.find(t => t._id === tech).name
      }
    })
  }

  const formTeches = form.skills.map(skill => skill.tech.id)
  const filteredTeches = technologies.filter(
    tech => !formTeches.includes(tech._id)
  )

  return (
    <>
      <CardTutorInputFields>
        <select
          id='inputField'
          className={
            errorsData.tech
              ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 gap-8 outline-red-500'
              : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 gap-8'
          }
          defaultValue='default'
          onChange={handleSelect}
        >
          <option value='default' selected hidden>
            Agregar tecnología
          </option>
          {filteredTeches.map((tech, index) => (
            <option
              key={index}
              value={tech._id}
              className='text-gray-500 bg-white'
              selected={dataForm.tech.name === tech.name}
            >
              {tech.name}
            </option>
          ))}
        </select>
        {errorsData.tech && (
          <p className='font-inter font-normal italic text-red-500 text-left -mt-6'>
            {errorsData.tech}
          </p>
        )}
      </CardTutorInputFields>
    </>
  )
}

export default TutorProfileFormTech
