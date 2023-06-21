import { useState, useEffect } from 'react'
const JobDescription = props => {
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
      <p className='text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Descripción <span className='text-red-500'>*</span>
      </p>
      <textarea
        className={
          errorsData.description
            ? 'w-full h-40 py-3 px-6 bg-none rounded-[8px] border border-red-500 focus:outline-red-500 resize-none'
            : 'w-full h-40 py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] resize-none'
        }
        maxLength={500}
        placeholder='Escribe una breve descripción...'
        name='description'
        value={dataForm.description}
        onChange={handleInputChange}
      />
      <p
        className={
          charCount < 1
            ? 'font-inter font-normal italic mb-[50px] text-red-500 text-left'
            : charCount < 450
            ? 'font-inter font-normal mb-[50px] italic text-[#98A2B3] text-left'
            : charCount >= 450 && charCount < 475
            ? 'font-inter font-normal mb-[50px] italic text-[#FFB800] text-left'
            : charCount >= 475 && charCount < 500
            ? 'font-inter font-normal mb-[50px] italic text-[#FF8A00] text-left'
            : 'font-inter font-normal mb-[50px] italic text-[#FF0000] text-left'
        }
      >
        {charCount}/500
      </p>
      {errorsData.description && (
        <p className='font-inter font-normal -mt-[50px] italic text-red-500 text-left'>
          {errorsData.description}
        </p>
      )}
    </>
  )
}

export default JobDescription
