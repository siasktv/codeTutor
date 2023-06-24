const JobName = props => {
  const { dataForm, setDataForm, errorsData, setErrorsData } = props

  const handleInputChange = e => {
    const company = e.target.value
    if (company.trim() === '') {
      setErrorsData({
        ...errorsData,
        company: 'Por favor, ingresa tu empresa'
      })
    } else if (company.length > 30) {
      setErrorsData({
        ...errorsData,
        company: 'La empresa no puede tener más de 30 caracteres'
      })
    } else {
      setErrorsData({
        ...errorsData,
        company: ''
      })
    }
    setDataForm({
      ...dataForm,
      company: company
    })
  }

  return (
    <>
      <p className='text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Companía <span className='text-red-500'>*</span>
      </p>
      <input
        className={
          errorsData.company
            ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 focus:outline-red-500'
            : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]'
        }
        name='company'
        type='text'
        placeholder='Ej. CodeTutor'
        value={dataForm.company}
        onChange={handleInputChange}
      />
      {errorsData.company && (
        <p className='font-inter font-normal italic text-red-500 text-left'>
          {errorsData.company}
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

export default JobName
