const ProjectLink = props => {
  const { dataForm, setDataForm, errorsData, setErrorsData } = props

  const handleChange = e => {
    const link = e.target.value
    // check if link is valid
    const regex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    ) // fragment locator
    if (!regex.test(link)) {
      setErrorsData({
        ...errorsData,
        link: 'Por favor ingresa un link válido'
      })
    } else {
      setErrorsData({
        ...errorsData,
        link: ''
      })
    }
    setDataForm({
      ...dataForm,
      link: link
    })
  }

  return (
    <>
      <p className='text-[#737791] dark:text-gray-400 font-inter text-base mt-4 lg:mt-[50px] mb-2 lg:mb-[30px] font-medium leading-[27px] tracking-normal text-left'>
        Link <span className='text-[#FF5757]'>*</span>
      </p>
      <input
        className={
          errorsData.link
            ? 'w-full py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none border border-red-500 outline-red-500'
            : 'w-full py-3 px-6 bg-none rounded-[8px] border dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none border-[#C3D3E2]'
        }
        name='link'
        type='text'
        placeholder='Link del proyecto'
        onChange={handleChange}
        value={dataForm.link || 'https://'}
      />
      {errorsData.link && (
        <p className='font-inter font-normal italic text-red-500 text-left'>
          {errorsData.link}
        </p>
      )}
    </>
  )
}

export default ProjectLink
