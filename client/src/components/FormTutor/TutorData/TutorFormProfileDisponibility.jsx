import { CardTutorData } from '../../'
import { useState, useEffect } from 'react'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const times = [
  { value: 0, label: '00:00 - 01:00' },
  { value: 1, label: '01:00 - 02:00' },
  { value: 2, label: '02:00 - 03:00' },
  { value: 3, label: '03:00 - 04:00' },
  { value: 4, label: '04:00 - 05:00' },
  { value: 5, label: '05:00 - 06:00' },
  { value: 6, label: '06:00 - 07:00' },
  { value: 7, label: '07:00 - 08:00' },
  { value: 8, label: '08:00 - 09:00' },
  { value: 9, label: '09:00 - 10:00' },
  { value: 10, label: '10:00 - 11:00' },
  { value: 11, label: '11:00 - 12:00' },
  { value: 12, label: '12:00 - 13:00' },
  { value: 13, label: '13:00 - 14:00' },
  { value: 14, label: '14:00 - 15:00' },
  { value: 15, label: '15:00 - 16:00' },
  { value: 16, label: '16:00 - 17:00' },
  { value: 17, label: '17:00 - 18:00' },
  { value: 18, label: '18:00 - 19:00' },
  { value: 19, label: '19:00 - 20:00' },
  { value: 20, label: '20:00 - 21:00' },
  { value: 21, label: '21:00 - 22:00' },
  { value: 22, label: '22:00 - 23:00' },
  { value: 23, label: '23:00 - 00:00' }
]

const days = [
  { value: 'monday', label: 'Lunes' },
  { value: 'tuesday', label: 'Martes' },
  { value: 'wednesday', label: 'Miércoles' },
  { value: 'thursday', label: 'Jueves' },
  { value: 'friday', label: 'Viernes' },
  { value: 'saturday', label: 'Sábado' },
  { value: 'sunday', label: 'Domingo' }
]

export default function TutorFormProfileDisponibility (props) {
  const { dataForm, setDataForm, form, errorsData, setErrorsData } = props
  const [correct, setCorrect] = useState(false)
  const [firstSelect, setFirstSelect] = useState(false)
  const [selectedDay, setSelectedDay] = useState('monday')
  const [selectedTimes, setSelectedTimes] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  })

  useEffect(() => {
    if (
      errorsData.disponibility === '' &&
      Object.values(dataForm.disponibility).some(day => day.length > 0)
    ) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [errorsData, dataForm])

  const handleChange = value => {
    setSelectedDay(value)
  }
  useEffect(() => {
    const day = document.getElementById(selectedDay)
    const days = document.querySelectorAll('.day')
    days.forEach(day => {
      day?.classList.add('hidden')
    })
    day?.classList.remove('hidden')
  }, [selectedDay])

  const handleSelectTime = e => {
    const day = selectedDay
    const time = Number(e.target.value)
    const times = selectedTimes[day]
    setFirstSelect(true)
    if (times.some(t => Number(t) === Number(time))) {
      const newTimes = times.filter(t => Number(t) !== Number(time))
      setSelectedTimes({ ...selectedTimes, [day]: newTimes })
      if (Object.values(selectedTimes).some(day => day.length === 0)) {
        setErrorsData({
          ...errorsData,
          disponibility: 'Seleccione al menos un horario'
        })
      } else {
        setErrorsData({ ...errorsData, disponibility: '' })
      }
      setDataForm({
        ...dataForm,
        disponibility: { ...dataForm.disponibility, [day]: newTimes }
      })
    } else {
      const newTimes = [...times, time]
      setSelectedTimes({ ...selectedTimes, [day]: newTimes })
      setErrorsData({ ...errorsData, disponibility: '' })
      setDataForm({
        ...dataForm,
        disponibility: { ...dataForm.disponibility, [day]: newTimes }
      })
    }
  }

  const handleSelectAll = value => {
    const day = value
    const times = selectedTimes[day]
    setFirstSelect(true)
    const allTimes = times.length === 24 ? [] : [...Array(24).keys()]
    setSelectedTimes({ ...selectedTimes, [day]: allTimes })
    setSelectedDay(day)
    setDataForm({
      ...dataForm,
      disponibility: { ...dataForm.disponibility, [day]: allTimes }
    })
  }

  useEffect(() => {
    // check if at least one time is selected
    if (firstSelect) {
      if (Object.values(selectedTimes).some(day => day.length > 0)) {
        setErrorsData({ ...errorsData, disponibility: '' })
      } else {
        setErrorsData({
          ...errorsData,
          disponibility: 'Seleccione al menos un horario'
        })
      }
    }
  }, [firstSelect, selectedTimes])

  return (
    <>
      <CardTutorData title='Seleccionar disponibilidad' correct={correct}>
        <div className='flex space-x-8'>
          <div className='block w-full'>
            <div className='flex flex-row justify-between'>
              {days.map(day => (
                <div key={day.value} className='flex flex-col items-center'>
                  {Object.values(dataForm.disponibility[day.value]).length ===
                  24 ? (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className='text-green-500 mb-2 cursor-pointer'
                      onClick={() => handleSelectAll(day.value)}
                    />
                  ) : Object.values(dataForm.disponibility[day.value]).length >
                    0 ? (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className='text-yellow-500 mb-2 cursor-pointer'
                      onClick={() => handleSelectAll(day.value)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircle}
                      className='text-red-500 mb-2 cursor-pointer'
                      onClick={() => handleSelectAll(day.value)}
                    />
                  )}

                  <p
                    value={day.value}
                    className={
                      selectedDay === day.value
                        ? 'text-codecolor cursor-pointer border-b-codecolor border-b-4 font-semibold px-1'
                        : 'text-gray-800 cursor-pointer border-b border-b-transparent font-semibold px-1'
                    }
                    onClick={() => handleChange(day.value)}
                  >
                    {day.label}
                  </p>
                </div>
              ))}
            </div>
            {days.map(day => (
              <>
                {selectedDay === day.value && (
                  <div
                    key={day.value}
                    className={
                      errorsData.disponibility
                        ? 'day max-h-72 overflow-auto border border-red-500 rounded-md mt-4 px-4'
                        : 'day max-h-72 overflow-auto border border-[#C3D3E2] rounded-md mt-4 px-4'
                    }
                    id={day.value}
                  >
                    {times.map(time => (
                      <div
                        key={time.value}
                        className='flex flex-row rounded-md justify-center items-center my-3 cursor-pointer'
                      >
                        <input
                          type='checkbox'
                          name={time.label}
                          id={time.label}
                          value={time.value}
                          style={{ display: 'none' }}
                          onChange={handleSelectTime}
                        />

                        <label
                          htmlFor={time.label}
                          className='cursor-pointer w-full h-full py-2'
                        >
                          {dataForm.disponibility[day.value].some(
                            t => Number(t) === time.value
                          ) ? (
                            <FontAwesomeIcon
                              icon={faCircle}
                              className='text-green-500 mr-2'
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={faCircle}
                              className='text-red-500 mr-2'
                            />
                          )}

                          {time.label}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ))}
            <span className=' flex justify-between items-center mr-1 mt-2'>
              <p className='font-inter font-normal italic text-red-500 text-md text-left'>
                {errorsData.disponibility && <>{errorsData.disponibility}</>}
              </p>
              <div className='text-md'>
                <FontAwesomeIcon
                  icon={faCircle}
                  className='text-green-500 mr-1'
                />
                Disponible
                <FontAwesomeIcon
                  icon={faCircle}
                  className='text-red-500 ml-4 mr-1'
                />
                No disponible
              </div>
            </span>
          </div>
        </div>
      </CardTutorData>
    </>
  )
}
