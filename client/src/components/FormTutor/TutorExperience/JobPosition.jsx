const JobPosition = props => {
  const { dataForm, setDataForm, errorsData, setErrorsData } = props

  const handleInputChange = e => {
    const position = e.target.value
    if (position.trim() === '') {
      setErrorsData({
        ...errorsData,
        position: 'Por favor, ingresa tu puesto'
      })
    } else if (position.length > 30) {
      setErrorsData({
        ...errorsData,
        position: 'El puesto no puede tener más de 30 caracteres'
      })
    } else {
      setErrorsData({
        ...errorsData,
        position: ''
      })
    }
    setDataForm({
      ...dataForm,
      position: position
    })
  }

  return (
    <>
      <p className='text-[#737791] dark:text-gray-400 font-inter text-base mb-2 lg:mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Puesto <span className='text-red-500'>*</span>
      </p>
      <input
        className={
          errorsData.position
            ? 'w-full py-3 px-6 bg-none rounded-[8px] border dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none border-red-500 focus:outline-red-500'
            : 'w-full py-3 px-6 bg-none rounded-[8px] border dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none border-[#C3D3E2]'
        }
        name='position'
        type='text'
        placeholder='Ej. Desarrollador Frontend'
        value={dataForm.position}
        onChange={handleInputChange}
      />
      {errorsData.position && (
        <p className='font-inter font-normal italic text-red-500 text-left'>
          {errorsData.position}
        </p>
      )}

      {/* <div className='pt-3'>
                {errorsData.name && (
                    <p className='font-inter font-normal italic text-red-500 text-left -mt-5'>
                        {errorsData.name}
                    </p>
                )}
            </div> */}
    </>
  )
}

export default JobPosition
