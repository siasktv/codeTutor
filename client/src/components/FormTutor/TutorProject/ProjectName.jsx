const ProjectName = props => {
  const { dataForm, setDataForm, errorsData, setErrorsData } = props

  const handleChange = e => {
    const name = e.target.value
    if (name.length < 3) {
      setErrorsData({
        ...errorsData,
        name: 'El nombre debe tener al menos 3 caracteres'
      })
    } else if (name.length > 30) {
      setErrorsData({
        ...errorsData,
        name: 'El nombre debe tener menos de 30 caracteres'
      })
    } else {
      setErrorsData({
        ...errorsData,
        name: ''
      })
    }
    setDataForm({
      ...dataForm,
      name: name
    })
  }

  return (
    <>
      <p className='text-[#737791] font-inter text-base mt-[50px] mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Nombre <span className='text-[#FF5757]'>*</span>
      </p>
      <input
        className={
          errorsData.name
            ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 outline-red-500'
            : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]'
        }
        name='name'
        type='text'
        placeholder='Nombre del proyecto'
        onChange={handleChange}
        value={dataForm.name}
      />
      {errorsData.name && (
        <p className='font-inter font-normal italic text-red-500 text-left'>
          {errorsData.name}
        </p>
      )}
    </>
  )
}

export default ProjectName
