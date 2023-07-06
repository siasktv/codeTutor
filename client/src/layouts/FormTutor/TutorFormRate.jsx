import { FlechaFiltro } from '../../assets'
import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorProfileFormTech,
  EnviarPerfilButton,
  CancelarPerfilButton
} from '../../components'
import { useState, useEffect } from 'react'
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorFormRate = props => {
  const {
    progress,
    setProgress,
    form,
    setForm,
    setSection,
    user,
    section,
    isDone,
    setIsDone
  } = props

  const [isDisabled, setIsDisabled] = useState(true)
  const [correct, setCorrect] = useState(false)
  const [dataForm, setDataForm] = useState({
    avatar: form.avatar,
    hour: 0,
    promo: false
  })
  const [errorsData, setErrorsData] = useState({
    hour: ''
  })

  useEffect(() => {
    if (dataForm.hour !== 0 && errorsData.hour === '') {
      setIsDisabled(false)
      setCorrect(true)
    } else {
      setIsDisabled(true)
      setCorrect(false)
    }
  }, [dataForm, errorsData])

  useEffect(() => {
    if (form.rate.hour !== 0 && form.rate.promo !== null) {
      setDataForm({
        ...dataForm,
        hour: form.rate.hour,
        promo: form.rate.promo
      })
    }
  }, [])

  const handleHourInput = e => {
    const hour = e.target.value
    // Check if the input is a number
    if (isNaN(hour)) {
      setErrorsData({
        ...errorsData,
        hour: 'El valor ingresado debe ser un número'
      })
    } else if (hour < 8) {
      setErrorsData({
        ...errorsData,
        hour: 'La tarifa mínima por hora es de USD$ 8'
      })
    } else if (hour > 120) {
      setErrorsData({
        ...errorsData,
        hour: 'La tarifa máxima por hora es de USD$ 120'
      })
    } else {
      setErrorsData({
        ...errorsData,
        hour: ''
      })
    }
    setDataForm({
      ...dataForm,
      hour: e.target.value
    })
  }

  return (
    <>
      <section className='bg-[#FFFFFF] min-h-screen dark:bg-gray-900 h-full w-full'>
        <div className='flex flex-col'>
          <div className='flex flex-col mt-[33px]'>
            <TutorFormWelcome user={user} />
            <TutorFormProgressBar
              progress={progress}
              section={section}
              setSection={setSection}
              isDone={isDone}
              form={form}
              setForm={setForm}
              dataForm={dataForm}
            />
          </div>
        </div>

        <section className='flex justify-center lg:mt-[33px] lg:mx-28'>
          <TutorFormDataLeft
            user={user}
            form={form}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
          <section className='flex flex-col bg-white dark:bg-gray-900 rounded-[8px] border w-full border-[#1414140D] lg:gap-[18px] lg:ml-6'>
            <div className='lg:mx-[52px] lg:my-[36px] mx-2'>
              <div className='flex flex-col w-full'>
                <h2 className='font-inter  font-bold text-[25px] dark:text-gray-200 text-[#05004E] text-left'>
                  Configuración de tarifas{' '}
                  {correct && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className='text-green-500 text-xl'
                    />
                  )}
                  {!correct && (
                    <FontAwesomeIcon
                      icon={faWarning}
                      className='text-orange-300 text-xl'
                      title='Completa todos los campos'
                    />
                  )}
                </h2>
                <div className='flex flex-col lg:gap-6 gap-2 mt-2 lg:mt-16'>
                  <h2 className='font-inter text-left dark:text-gray-400 font-bold text-[#05004E]'>
                    Tarifa de mentoría
                  </h2>
                  <p className='font-inter text-left max-lg:text-sm dark:text-gray-400 text-[#737791]'>
                    Para la tarifa de las sesiones de mentoría. Existe un cargo
                    mínimo de 30 minutos por cada sesión a la tarifa del mentor.
                    Después de la media hora, Code-Tutor cobrará a la tarifa del
                    mentor por minuto.
                  </p>

                  <div className='flex items-center lg:gap-8 gap-2'>
                    <input
                      className={
                        errorsData.hour
                          ? 'lg:w-1/4 w-20 lg:py-3 lg:px-6 px-2 py-2 bg-none rounded-[8px] border border-red-500 text-red-500 outline-red-500 dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none'
                          : 'lg:w-1/4 w-20 lg:py-3 lg:px-6 px-2 py-2 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none'
                      }
                      type='Number'
                      placeholder='US$'
                      value={dataForm.hour === 0 ? '' : dataForm.hour}
                      onChange={handleHourInput}
                    />
                    <p className='font-inter max-lg:text-sm dark:text-gray-400 text-[#737791]'>
                      por cada hora (00 : 60 min)
                    </p>
                  </div>
                </div>
                {errorsData.hour && (
                  <p className='font-inter font-normal max-lg:text-sm mt-2 italic text-red-500 text-left'>
                    {errorsData.hour}
                  </p>
                )}

                <div className='flex flex-col gap-2 lg:gap-6 mt-4 lg:mt-12'>
                  <h2 className='font-inter text-left font-bold dark:text-gray-400 text-[#05004E]'>
                    Promoción
                  </h2>

                  <div className='flex items-center lg:gap-20 max-lg:flex-col max-lg:justify-start max-lg:items-start max-lg:space-y-2'>
                    <p className='font-inter dark:text-gray-400  text-[#737791]'>
                      Primeros 15 minutos gratuitos
                    </p>
                    <div className='flex gap-2 justify-center max-lg:items-center max-lg:pb-2'>
                      <input
                        type='checkbox'
                        className='text-[#737791] font-inter font-medium leading-[27px] w-5 tracking-normal'
                        checked={dataForm.promo}
                        onChange={() =>
                          setDataForm({ ...dataForm, promo: !dataForm.promo })
                        }
                      />
                      <p className='font-inter dark:text-gray-400 text-[#737791] max-lg:self-center'>
                        Aceptar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className='flex justify-end items-center space-x-2 lg:space-x-4 mx-2 dark:lg:mx-[165px] lg:mx-28 lg:pt-6 lg:pb-[64px] pt-2'>
          <CancelarPerfilButton />
          <EnviarPerfilButton
            title='Guardar'
            isDisabled={isDisabled}
            setSection={setSection}
            setProgress={setProgress}
            progress={progress}
            dataForm={dataForm}
            form={form}
            setForm={setForm}
            section={section}
            isDone={isDone}
            setIsDone={setIsDone}
          />
        </section>
      </section>
    </>
  )
}

export default TutorFormRate
