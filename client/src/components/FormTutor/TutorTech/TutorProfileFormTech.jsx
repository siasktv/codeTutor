import { CardTutorInputFields } from '../../index'
import { useState, useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorProfileFormTech = (props) => {
  const { dataForm, setDataForm, form } = props
  const [selectedTech, setSelectedTech] = useState([])
  const availableTech = ['React', 'Javascript', 'Nodejs', 'Redux']
  const [correct, setCorrect] = useState(false)

  // useEffect(() => {
  //   if (errorsData.idiomas === '' && selectedLangs.length > 0) {
  //     setCorrect(true)
  //   } else {
  //     setCorrect(false)
  //   }
  // }, [errorsData, selectedLangs])

  useEffect(() => {
    if (form.tech.length > 0) {
      setSelectedTech(form.tech)
    }
  }, [])

  const handleSelect = (e) => {
    const tech = e.target.value
    // if (lang === 'default') {
    //   setErrorsData({
    //     ...errorsData,
    //     idiomas: 'Debes seleccionar un idioma',
    //   })
    // } else {
    //   setErrorsData({ ...errorsData, idiomas: '' })
    // }
    if (!selectedTech.includes(tech)) {
      setSelectedTech([...selectedTech, tech])
    }
    setDataForm({ ...dataForm, tech: [...selectedTech, tech] })
    e.target.value = 'default'
  }

  const handleDelete = (tech) => {
    const newTech = selectedTech.filter((t) => t !== tech)
    setSelectedTech(newTech)
    setDataForm({ ...dataForm, tech: newTech })
    // if (newLangs.length === 0) {
    //   setErrorsData({
    //     ...errorsData,
    //     idiomas: 'Debes seleccionar al menos un idioma',
    //   })
    // }
  }

  return (
    <>
      <CardTutorInputFields correct={correct}>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-4">
            {selectedTech.map((tech, index) => (
              <div
                className="bg-[#7D5AE21A] w-[100px] justify-center p-4 flex flex-row items-center text-[#7D5AE2]  py-3 rounded-[8px]"
                key={index}
              >
                <p className="text-[#7D5AE2]">{tech}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => handleDelete(tech)}
                  className="ml-2 mt-[1px] hover:text-codecolordark cursor-pointer"
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>
        {availableTech.filter((tech) => !selectedTech.includes(tech)).length >
          0 && (
          <select
            id="inputField"
            className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
            // className={
            //   errorsData.idiomas
            //     ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 focus:outline-red-500 bg-red-100'
            //     : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500'
            // }
            defaultValue="default"
            onChange={handleSelect}
          >
            <option value="default" selected disabled hidden>
              Agregar tecnología
            </option>
            {availableTech
              .filter((tech) => !selectedTech.includes(tech))
              .map((tech, index) => (
                <option
                  key={index}
                  value={tech}
                  className="text-gray-500 bg-white"
                >
                  {tech}
                </option>
              ))}
          </select>
        )}
        {/* {errorsData.idiomas && (
          <p className="font-inter font-normal italic text-red-500 text-left -mt-5">
            {errorsData.idiomas}
          </p>
        )} */}
      </CardTutorInputFields>
    </>
  )
}

export default TutorProfileFormTech
