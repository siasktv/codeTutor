import { useState, useEffect } from 'react'

const ProjectDescription = props => {
  const { dataForm, setDataForm, errorsData, setErrorsData } = props
  const [charCount, setCharCount] = useState(0)

  const handleInputChange = e => {
    const description = e.target.value
    const trimmed = description.trim()
    if (trimmed.length <= 500) {
      if (trimmed.length === 0) {
        setErrorsData({
          ...errorsData,
          description: 'La descripción no puede estar vacía'
        })
      } else {
        setErrorsData({
          ...errorsData,
          description: ''
        })
      }
      setDataForm({
        ...dataForm,
        description: description
      })
      setCharCount(trimmed.length)
    } else {
      setCharCount(500)
    }
  }

  useEffect(() => {
    setCharCount(dataForm.description.length)
  }, [dataForm.description])

  return (
    <>
      <p className='text-[#737791] dark:text-gray-400 font-inter text-base mb-2 lg:mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Descripción <span className='text-[#FF5757]'>*</span>
      </p>
      <textarea
        className={
          errorsData.description
            ? 'w-full h-40 py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none border border-red-500 resize-none outline-red-500'
            : 'w-full h-40 py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none resize-none border border-[#C3D3E2]'
        }
        maxLength={500}
        placeholder='Escribe una breve descripción...'
        onChange={handleInputChange}
        value={dataForm.description}
        name='description'
      ></textarea>
      <p
        className={
          charCount < 1
            ? 'font-inter font-normal italic lg:mb-[50px] text-red-500 text-left'
            : charCount < 450
            ? 'font-inter font-normal lg:mb-[50px] italic text-[#98A2B3] text-left'
            : charCount >= 450 && charCount < 475
            ? 'font-inter font-normal lg:mb-[50px] italic text-[#FFB800] text-left'
            : charCount >= 475 && charCount < 500
            ? 'font-inter font-normal lg:mb-[50px] italic text-[#FF8A00] text-left'
            : 'font-inter font-normal lg:mb-[50px] italic text-[#FF0000] text-left'
        }
      >
        {charCount}/500
      </p>
      {errorsData.description && (
        <p className='font-inter font-normal lg:-mt-[50px] italic text-red-500 text-left'>
          {errorsData.description}
        </p>
      )}
    </>
  )
}

export default ProjectDescription
