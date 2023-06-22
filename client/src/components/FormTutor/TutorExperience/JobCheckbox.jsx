import { useState, useEffect } from 'react'

const JobCheckbox = props => {
  const { dataForm, setDataForm } = props

  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setDataForm({
      ...dataForm,
      currentlyWorking: isChecked
    })
  }, [isChecked, setDataForm])

  return (
    <>
      <input
        type='checkbox'
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        className={'h-5 w-5'}
      />
      <label
        className='text-[#737791] font-inter text-base font-medium leading-[27px] tracking-normal'
        htmlFor='checkbox'
      >
        Actualmente trabajo aquí
      </label>
    </>
  )
}

export default JobCheckbox
