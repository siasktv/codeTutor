import { useEffect } from 'react'
const JobDuration = (props) => {
  const { dataForm, setDataForm, errorsData, setErrorsData } = props

  useEffect(() => {
    if (dataForm.currentlyWorking) {
      const actualDate = new Date()
      setDataForm({
        ...dataForm,
        endDate: actualDate.toISOString().substr(0, 10),
      })
    } else {
      setDataForm({
        ...dataForm,
        endDate: '',
      })
    }
  }, [dataForm.currentlyWorking])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const actualDate = new Date()
    if (name === 'startDate') {
      if (value.trim() === '') {
        setErrorsData({
          ...errorsData,
          startDate: 'Por favor, ingresa tu fecha de inicio',
        })
      } else if (dataForm.startDate > actualDate.toISOString().substr(0, 10)) {
        setErrorsData({
          ...errorsData,
          startDate: 'La fecha de inicio no puede ser mayor a la fecha actual',
        })
      } else if (dataForm.endDate !== '' && value > dataForm.endDate) {
        setErrorsData({
          ...errorsData,
          startDate: 'La fecha de inicio no puede ser mayor a la fecha de fin',
          endDate: 'La fecha de fin no puede ser menor a la fecha de inicio',
        })
      } else {
        setErrorsData({
          ...errorsData,
          startDate: '',
          endDate: '',
        })
      }
    }
    if (name === 'endDate') {
      if (value.trim() === '') {
        setErrorsData({
          ...errorsData,
          endDate: 'Por favor, ingresa tu fecha de fin',
        })
      } else if (dataForm.endDate > actualDate.toISOString().substr(0, 10)) {
        setErrorsData({
          ...errorsData,
          endDate: 'La fecha de fin no puede ser mayor a la fecha actual',
        })
      } else if (dataForm.startDate !== '' && value < dataForm.startDate) {
        setErrorsData({
          ...errorsData,
          endDate: 'La fecha de fin no puede ser menor a la fecha de inicio',
          startDate: 'La fecha de inicio no puede ser mayor a la fecha de fin',
        })
      } else {
        setErrorsData({
          ...errorsData,
          endDate: '',
          startDate: '',
        })
      }
    }
    setDataForm({
      ...dataForm,
      [name]: value,
    })
  }
  return (
    <>
      <div className="block w-full">
        <p className="text-[#737791] dark:text-gray-400 font-inter text-base mb-2 lg:mb-[30px] font-medium leading-[27px] tracking-normal text-left">
          Desde <span className="text-red-500">*</span>
        </p>
        <input
          className={
            errorsData.startDate
              ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 focus:outline-red-500 dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none'
              : 'w-full py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none border border-[#C3D3E2]'
          }
          name="startDate"
          type="date"
          value={dataForm.startDate}
          onChange={handleInputChange}
        />
        {errorsData.startDate && (
          <p className="font-inter font-normal italic text-red-500 text-left">
            {errorsData.startDate}
          </p>
        )}
        {/* <div className='pt-3'>
                    {errorsData.name && (
                        <p className='font-inter font-normal italic text-red-500 text-left -mt-5'>
                            {errorsData.name}
                        </p>
                    )}
                </div> */}
      </div>
      <div className="block w-full">
        <p className="text-[#737791] dark:text-gray-400 font-inter text-base mb-2 lg:mb-[30px] font-medium leading-[27px] tracking-normal text-left">
          Hasta *
        </p>
        <input
          className={
            errorsData.endDate
              ? 'w-full py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none border border-red-500 focus:outline-red-500'
              : 'w-full py-3 px-6 bg-none rounded-[8px] dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none border border-[#C3D3E2]'
          }
          name="endDate"
          type="date"
          value={dataForm.endDate}
          onChange={handleInputChange}
        />
        {errorsData.endDate && (
          <p className="font-inter font-normal italic text-red-500 text-left">
            {errorsData.endDate}
          </p>
        )}
      </div>
    </>
  )
}

export default JobDuration
