import { FlechaFiltro } from '../../../assets'
import { useState, useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const JobTechnologies = props => {
  const { technologies, dataForm, setDataForm, errorsData, setErrorsData } =
    props
  const [selectedTechs, setSelectedTechs] = useState([])

  useEffect(() => {
    if (dataForm.technologies.length > 0) {
      setSelectedTechs(dataForm.technologies)
    }
  }, [dataForm])

  const handleSelect = e => {
    const tech = e.target.value
    const techName = technologies.find(t => t._id === tech).name
    if (techName === 'default') {
      setErrorsData({
        ...errorsData,
        technologies: 'Debes seleccionar una tecnología'
      })
    } else {
      setErrorsData({ ...errorsData, technologies: '' })
    }
    if (!selectedTechs.includes(techName)) {
      setSelectedTechs([
        ...selectedTechs,
        {
          id: tech,
          name: techName
        }
      ])
    }
    setDataForm({
      ...dataForm,
      technologies: [
        ...selectedTechs,
        {
          id: tech,
          name: techName
        }
      ]
    })
    e.target.value = 'default'
  }

  const handleDelete = tech => {
    const newTechs = selectedTechs.filter(t => t.id !== tech)
    setSelectedTechs(newTechs)
    setDataForm({
      ...dataForm,
      technologies: newTechs
    })
    if (newTechs.length === 0) {
      setErrorsData({
        ...errorsData,
        technologies: 'Debes seleccionar al menos una tecnología'
      })
    }
  }

  return (
    <>
      <p className='text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Tecnologías Utilizadas*
      </p>
      <div className='flex flex-row justify-start flex-wrap'>
        {selectedTechs.map((tech, index) => (
          <div
            className='bg-[#7D5AE21A] mr-3 max-w-[200px] justify-center p-4 mb-2 flex flex-row items-center text-[#7D5AE2]  py-3 rounded-[8px]'
            key={index}
          >
            <p className='text-[#7D5AE2]'>{tech.name}</p>
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => handleDelete(tech.id)}
              className='ml-2 mt-[1px] hover:text-codecolordark cursor-pointer'
              size='sm'
            />
          </div>
        ))}
      </div>
      {technologies.filter(
        tech =>
          !selectedTechs.find(t => t.id === tech._id) && tech.name !== 'default'
      ).length > 0 && (
        <div className='relative'>
          <select
            className={
              errorsData.technologies
                ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 focus:outline-red-500 appearance-none'
                : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none'
            }
            onChange={handleSelect}
          >
            <option value='default' selected hidden>
              Agregar tecnología
            </option>
            {
              // filter to show only the technologies that are not selected
              technologies
                .filter(tech => !selectedTechs.find(t => t.id === tech._id))
                .map((tech, index) => (
                  <option key={index} value={tech._id}>
                    {tech.name}
                  </option>
                ))
            }
            {/* {availableLangs
              .filter(lang => !selectedLangs.includes(lang))
              .map((lang, index) => (
              <option
                  key={index}
                  value={lang}
                  className='text-gray-500 bg-white'
              >
                  {lang}
              </option>
            ))} */}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700'>
            <img src={FlechaFiltro} />
          </div>
        </div>
      )}
      {errorsData.technologies && (
        <p className='font-inter font-normal italic text-red-500 text-left'>
          {errorsData.technologies}
        </p>
      )}
    </>
  )
}

export default JobTechnologies
