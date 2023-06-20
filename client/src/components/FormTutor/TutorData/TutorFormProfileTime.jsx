import { CardTutorData } from '../../index'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FlechaFiltro } from '../../../assets'

const TutorFormProfileTime = props => {
  const { dataForm, setDataForm, form, errorsData, setErrorsData } = props
  const [timeZones, setTimeZones] = useState([])
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    if (errorsData.zona_horaria === '' && dataForm.zona_horaria !== '') {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [errorsData, dataForm])

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/locations')
      .then(res => {
        // set timeZones from res.data.timeZones[]
        const locations = res.data
        const timeZones = locations.map(location =>
          location.timezones.map(timezone => timezone)
        )
        const removeDuplicates = timeZones
          .flat()
          .filter((timezone, index, self) => self.indexOf(timezone) === index)
          .filter(timezone => timezone !== 'UTC')
        // order timeZones from end to start (UTC-12 to UTC+14)
        removeDuplicates.sort((a, b) => {
          const aNumber = parseInt(a.slice(3))
          const bNumber = parseInt(b.slice(3))
          return bNumber - aNumber
        })
        setTimeZones(removeDuplicates)
      })
      .catch(err => console.log(err))
  }, [])

  const handleSelect = e => {
    const zona_horaria = e.target.value
    if (zona_horaria === 'default') {
      setErrorsData({
        ...errorsData,
        zona_horaria: 'Debes seleccionar una zona horaria'
      })
    } else {
      setErrorsData({ ...errorsData, zona_horaria: '' })
    }
    setDataForm({ ...dataForm, zona_horaria: zona_horaria })
  }

  return (
    <>
      <CardTutorData title='Actualizar zona horaria' correct={correct}>
        <div className='relative'>
          <select
            id='inputField'
            onChange={handleSelect}
            className={
              errorsData.zona_horaria
                ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 bg-red-100 appearance-none'
                : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none'
            }
            defaultValue='default'
          >
            <option value='default' disabled hidden>
              Zona Horaria
            </option>
            {timeZones.map((timezone, index) => (
              <option
                key={index}
                value={timezone}
                selected={
                  dataForm.zona_horaria === timezone ||
                  form.zona_horaria === timezone
                }
                className='bg-white text-gray-500'
              >
                {timezone}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700'>
            <img src={FlechaFiltro} />
          </div>
        </div>
        {errorsData.zona_horaria && (
          <p className='font-inter font-normal italic text-red-500 text-left -mt-5'>
            {errorsData.zona_horaria}
          </p>
        )}
      </CardTutorData>
    </>
  )
}

export default TutorFormProfileTime
