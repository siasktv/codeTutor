const JobLocation = props => {
  const { dataForm, setDataForm, errorsData, setErrorsData } = props

  const handleInputChange = e => {
    const location = e.target.value
    if (location.trim() === '') {
      setErrorsData({
        ...errorsData,
        location: 'Por favor, ingresa tu ubicación'
      })
    } else if (location.length > 30) {
      setErrorsData({
        ...errorsData,
        location: 'La ubicación no puede tener más de 30 caracteres'
      })
    } else {
      setErrorsData({
        ...errorsData,
        location: ''
      })
    }
    setDataForm({
      ...dataForm,
      location: location
    })
  }
  return (
    <>
      <p className='text-[#737791] dark:text-gray-400 font-inter text-base mt-4 lg:mt-[50px] mb-2 lg:mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Ubicación <span className='text-red-500'>*</span>
      </p>
      <input
        className={
          errorsData.location
            ? 'w-full py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none border border-red-500 focus:outline-red-500'
            : 'w-full py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none border border-[#C3D3E2]'
        }
        name='location'
        type='text'
        placeholder='Ej. Lima, Perú'
        value={dataForm.location}
        onChange={handleInputChange}
      />
      {errorsData.location && (
        <p className='font-inter font-normal italic text-red-500 text-left'>
          {errorsData.location}
        </p>
      )}
    </>
  )
}

export default JobLocation
