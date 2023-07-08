import { CardTutorData } from '../../index'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchLocations } from '../../../redux/features/locations/locationsSlice'
import { FlechaFiltro } from '../../../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const TutorFormProfileTime = props => {
  const { dataForm, setDataForm, form, errorsData, setErrorsData } = props
  const [timeZones, setTimeZones] = useState([])
  const [correct, setCorrect] = useState(false)
  const locations = useSelector(state => state.locations.locations)
  const [locationSelected, setLocationSelected] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (form.zona_horaria !== '' && form.location !== '') {
      setLocationSelected(form.location)
      setDataForm({
        ...dataForm,
        zona_horaria: form.zona_horaria,
        location: form.location
      })
    }
  }, [form])

  useEffect(() => {
    if (
      errorsData.zona_horaria === '' &&
      errorsData.location === '' &&
      dataForm.zona_horaria !== '' &&
      dataForm.location !== ''
    ) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [errorsData, dataForm])

  useEffect(() => {
    if (!locations[0]?.name) {
      dispatch(fetchLocations())
    } else if (locations.length > 0) {
      const getTimeZones = locations.map(location =>
        location.timezones.map(timezone => timezone)
      )
      // remove duplicates
      const timeZones = [
        ...new Set(getTimeZones.flat().filter(timezone => timezone !== 'UTC'))
      ]
      setTimeZones(timeZones)
    }
  }, [locations])

  useEffect(() => {
    if (locationSelected !== '' && locationSelected !== 'default') {
      const location = locations.find(
        location => location.name === locationSelected
      )
      const timeZones = location.timezones.map(timezone => timezone)
      setTimeZones(timeZones)
    }
  }, [locationSelected])

  const handleSelectLocation = e => {
    const location = e.target.value
    setLocationSelected(location)
    if (location === 'default') {
      setErrorsData({
        ...errorsData,
        location: 'Debes seleccionar una ubicación'
      })
    } else {
      setErrorsData({ ...errorsData, location: '' })
    }
    setDataForm({ ...dataForm, location: location, zona_horaria: '' })
    const inputField = document.getElementById('inputField')
    // set index 0 to default
    inputField.selectedIndex = 0
  }

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
            id='inputFieldLocation'
            onChange={handleSelectLocation}
            className={
              errorsData.location
                ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 bg-red-100 appearance-none dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none'
                : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none'
            }
            defaultValue='default'
          >
            <option value='default' disabled hidden>
              Ubicación
            </option>
            {locations.map((location, index) => (
              <option
                key={index}
                value={location.name}
                selected={locationSelected === location.name}
                className='bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-200'
              >
                {location.name}
              </option>
            ))}
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-200'>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>

        {errorsData.location && (
          <p className='font-inter font-normal italic text-red-500 text-left -mt-5'>
            {errorsData.location}
          </p>
        )}
        {locationSelected !== '' && locationSelected !== 'default' && (
          <>
            <div className='relative'>
              <select
                id='inputField'
                onChange={handleSelect}
                className={
                  errorsData.zona_horaria
                    ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 bg-red-100 appearance-none dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none'
                    : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none'
                }
              >
                <option value='default' hidden selected>
                  Zona Horaria
                </option>
                {timeZones.map((timezone, index) => (
                  <option
                    key={index + 1}
                    value={timezone}
                    selected={
                      dataForm.zona_horaria === timezone ||
                      form.zona_horaria === timezone
                    }
                    className='bg-white text-gray-500 dark:text-gray-200 dark:bg-gray-800'
                  >
                    {timezone}
                  </option>
                ))}
              </select>
              <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 dark:text-gray-200'>
                <FontAwesomeIcon icon={faChevronDown} />
              </div>
            </div>
            {errorsData.zona_horaria && (
              <p className='font-inter font-normal italic text-red-500 text-left lg:-mt-5'>
                {errorsData.zona_horaria}
              </p>
            )}
          </>
        )}
      </CardTutorData>
    </>
  )
}

export default TutorFormProfileTime
