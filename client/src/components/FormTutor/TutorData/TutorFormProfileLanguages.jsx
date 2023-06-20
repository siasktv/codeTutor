import { CardTutorData } from '../../index'
import { useState, useEffect } from 'react'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FlechaFiltro } from '../../../assets'

const TutorProfileLanguages = props => {
  const { dataForm, setDataForm, form, errorsData, setErrorsData } = props
  const [selectedLangs, setSelectedLangs] = useState([])
  const availableLangs = ['Español', 'Inglés', 'Francés', 'Portugués']
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    if (errorsData.idiomas === '' && selectedLangs.length > 0) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [errorsData, selectedLangs])

  useEffect(() => {
    if (form.languages.length > 0) {
      setSelectedLangs(form.languages)
    }
  }, [])

  const handleSelect = e => {
    const lang = e.target.value
    if (lang === 'default') {
      setErrorsData({
        ...errorsData,
        idiomas: 'Debes seleccionar un idioma'
      })
    } else {
      setErrorsData({ ...errorsData, idiomas: '' })
    }
    if (!selectedLangs.includes(lang)) {
      setSelectedLangs([...selectedLangs, lang])
    }
    setDataForm({ ...dataForm, languages: [...selectedLangs, lang] })
    e.target.value = 'default'
  }

  const handleDelete = lang => {
    const newLangs = selectedLangs.filter(l => l !== lang)
    setSelectedLangs(newLangs)
    setDataForm({ ...dataForm, languages: newLangs })
    if (newLangs.length === 0) {
      setErrorsData({
        ...errorsData,
        idiomas: 'Debes seleccionar al menos un idioma'
      })
    }
  }

  return (
    <>
      <CardTutorData title='Idiomas' correct={correct}>
        <div className='flex flex-col'>
          <p className='text-[#737791] -mt-6 font-inter text-base font-medium text-left'>
            Por favor, añade los idiomas en los que tienes fluidez para que
            aparezcan en tu perfil.
          </p>
          <div className='flex flex-row'>
            {selectedLangs.map((lang, index) => (
              <div
                className='bg-[#7D5AE21A] w-[100px] justify-center p-4 mt-2 -mb-4 flex flex-row items-center text-[#7D5AE2]  py-3 rounded-[8px]'
                key={index}
              >
                <p className='text-[#7D5AE2]'>{lang}</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => handleDelete(lang)}
                  className='ml-2 mt-[1px] hover:text-codecolordark cursor-pointer'
                  size='sm'
                />
              </div>
            ))}
          </div>
        </div>
        {availableLangs.filter(lang => !selectedLangs.includes(lang)).length >
          0 && (
          <div className='relative'>
            <select
              id='inputField'
              className={
                errorsData.idiomas
                  ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 focus:outline-red-500 bg-red-100 appearance-none'
                  : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none'
              }
              defaultValue='default'
              onChange={handleSelect}
            >
              <option value='default' selected disabled hidden>
                Agregar idioma
              </option>
              {availableLangs
                .filter(lang => !selectedLangs.includes(lang))
                .map((lang, index) => (
                  <option
                    key={index}
                    value={lang}
                    className='text-gray-500 bg-white'
                  >
                    {lang}
                  </option>
                ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700'>
              <img src={FlechaFiltro} />
            </div>
          </div>
        )}
        {errorsData.idiomas && (
          <p className='font-inter font-normal italic text-red-500 text-left -mt-5'>
            {errorsData.idiomas}
          </p>
        )}
      </CardTutorData>
    </>
  )
}

export default TutorProfileLanguages
