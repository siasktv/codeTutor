import { CardTutorData } from '../../index'
import { useState, useEffect } from 'react'

const TutorFormProfileName = props => {
  const { dataForm, setDataForm, form, errorsData, setErrorsData } = props
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    if (errorsData.name === '' && dataForm.name !== '') {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [errorsData, dataForm])

  const handleInput = e => {
    const name = e.target.value
    if (name.length < 3) {
      setErrorsData({
        ...errorsData,
        name: 'El nombre debe tener al menos 3 caracteres'
      })
    } else if (name.length > 50) {
      setErrorsData({
        ...errorsData,
        name: 'El nombre debe tener menos de 50 caracteres'
      })
    } else if (name.match(/[^a-zA-ZÀ-ÿ\s]/g)) {
      setErrorsData({
        ...errorsData,
        name: 'El nombre solo puede contener letras'
      })
    } else if (name.trim() === '') {
      setErrorsData({ ...errorsData, name: 'El nombre no puede estar vacío' })
    } else {
      setErrorsData({ ...errorsData, name: '' })
    }
    setDataForm({ ...dataForm, name: name })
  }

  return (
    <>
      <CardTutorData
        title='Actualizar el nombre de la cuenta'
        correct={correct}
      >
        <input
          id='inputField'
          className={
            errorsData.name
              ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 bg-red-100 text-red-500 focus:outline-red-500 dark:bg-gray-800 dark:outline-none dark:focus:outline-none'
              : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none'
          }
          type='text'
          value={dataForm.name || form.name}
          onChange={handleInput}
          placeholder='Nombre Completo'
        />
        {errorsData.name && (
          <p className='font-inter font-normal italic text-red-500 text-left lg:-mt-5'>
            {errorsData.name}
          </p>
        )}
      </CardTutorData>
    </>
  )
}

export default TutorFormProfileName
