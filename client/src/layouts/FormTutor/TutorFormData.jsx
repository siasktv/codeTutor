import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorFormProfileName,
  TutorFormProfileTime,
  TutorFormProfileSocialMedia,
  TutorFormProfileLanguages,
  CancelarPerfilButton,
  EnviarPerfilButton,
  TutorFormProfileDisponibility
} from '../../components'
import { useState, useEffect } from 'react'

const TutorFormData = props => {
  const {
    progress,
    user,
    setProgress,
    form,
    setForm,
    setSection,
    section,
    isDone,
    setIsDone
  } = props
  const [dataForm, setDataForm] = useState({
    name: '',
    avatar: form.avatar,
    location: '',
    zona_horaria: '',
    social: {
      linkedin: '',
      github: ''
    },
    languages: [],
    disponibility: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [errorsData, setErrorsData] = useState({
    name: '',
    location: '',
    zona_horaria: '',
    linkedin: '',
    github: '',
    idiomas: '',
    disponibility: ''
  })

  useEffect(() => {
    if (form) {
      setDataForm({
        name: form.name,
        location: form.location,
        zona_horaria: form.zona_horaria,
        social: {
          linkedin: form.social.linkedin,
          github: form.social.github
        },
        languages: form.languages,
        disponibility: {
          monday: form.disponibility.monday,
          tuesday: form.disponibility.tuesday,
          wednesday: form.disponibility.wednesday,
          thursday: form.disponibility.thursday,
          friday: form.disponibility.friday,
          saturday: form.disponibility.saturday,
          sunday: form.disponibility.sunday
        }
      })
    }
  }, [form])

  useEffect(() => {
    if (
      errorsData.name === '' &&
      errorsData.location === '' &&
      errorsData.zona_horaria === '' &&
      errorsData.linkedin === '' &&
      errorsData.github === '' &&
      errorsData.idiomas === '' &&
      errorsData.disponibility === '' &&
      dataForm.name !== '' &&
      dataForm.avatar !== '' &&
      dataForm.location !== '' &&
      dataForm.zona_horaria !== '' &&
      dataForm.social.linkedin !== '' &&
      dataForm.social.github !== '' &&
      dataForm.languages.length > 0 &&
      Object.values(dataForm.disponibility).some(day => day.length > 0)
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [errorsData, dataForm])

  return (
    <>
      {/* contenedor principal */}
      <section className='bg-[#FFFFFF] dark:bg-gray-900 h-full w-full'>
        <div className='flex flex-col'>
          <div className='flex flex-col mt-[33px]'>
            <TutorFormWelcome user={user} />
            <TutorFormProgressBar progress={progress} isDone={isDone} />
          </div>
        </div>

        <section className='flex justify-center lg:mt-[33px] lg:mx-28'>
          <TutorFormDataLeft
            user={user}
            form={form}
            setDataForm={setDataForm}
            dataForm={dataForm}
          />
          <section className='flex flex-col w-full lg:gap-[18px] lg:ml-6'>
            <TutorFormProfileName
              dataForm={dataForm}
              setDataForm={setDataForm}
              form={form}
              errorsData={errorsData}
              setErrorsData={setErrorsData}
            />

            <TutorFormProfileTime
              dataForm={dataForm}
              setDataForm={setDataForm}
              form={form}
              errorsData={errorsData}
              setErrorsData={setErrorsData}
            />
            <TutorFormProfileDisponibility
              dataForm={dataForm}
              setDataForm={setDataForm}
              form={form}
              errorsData={errorsData}
              setErrorsData={setErrorsData}
            />
            <TutorFormProfileSocialMedia
              dataForm={dataForm}
              setDataForm={setDataForm}
              form={form}
              errorsData={errorsData}
              setErrorsData={setErrorsData}
            />

            <TutorFormProfileLanguages
              dataForm={dataForm}
              setDataForm={setDataForm}
              form={form}
              errorsData={errorsData}
              setErrorsData={setErrorsData}
            />
            <section className='flex justify-end items-center lg:space-x-4 space-x-2 lg:mx-12 mx-2 lg:pt-6 pt-2 pb-8'>
              <CancelarPerfilButton />
              <EnviarPerfilButton
                title='Continuar'
                progress={progress}
                isDisabled={isDisabled}
                setSection={setSection}
                setProgress={setProgress}
                setForm={setForm}
                form={form}
                dataForm={dataForm}
                section={section}
                isDone={isDone}
                setIsDone={setIsDone}
              />
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export default TutorFormData
