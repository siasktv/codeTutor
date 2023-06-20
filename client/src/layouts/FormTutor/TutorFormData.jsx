import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorFormProfileName,
  TutorFormProfileTime,
  TutorFormProfileSocialMedia,
  TutorFormProfileLanguages,
  CancelarPerfilButton,
  EnviarPerfilButton
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
    zona_horaria: '',
    social: {
      linkedin: '',
      github: ''
    },
    languages: []
  })
  const [isDisabled, setIsDisabled] = useState(true)
  const [errorsData, setErrorsData] = useState({
    name: '',
    zona_horaria: '',
    linkedin: '',
    github: '',
    idiomas: ''
  })

  useEffect(() => {
    if (form) {
      setDataForm({
        name: form.name,
        zona_horaria: form.zona_horaria,
        social: {
          linkedin: form.social.linkedin,
          github: form.social.github
        },
        languages: form.languages
      })
    }
  }, [form])

  useEffect(() => {
    if (
      errorsData.name === '' &&
      errorsData.zona_horaria === '' &&
      errorsData.linkedin === '' &&
      errorsData.github === '' &&
      errorsData.idiomas === '' &&
      dataForm.name !== '' &&
      dataForm.zona_horaria !== '' &&
      dataForm.social.linkedin !== '' &&
      dataForm.social.github !== '' &&
      dataForm.languages.length > 0
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [errorsData, dataForm])

  return (
    <>
      {/* contenedor principal */}
      <section className='bg-[#FAFBFC] h-full w-full'>
        <div className='flex flex-col'>
          <div className='flex flex-col mt-[33px]'>
            <TutorFormWelcome user={user} />
            <TutorFormProgressBar progress={progress} isDone={isDone} />
          </div>
        </div>

        <section className='flex justify-center mt-[33px] mx-28'>
          <TutorFormDataLeft user={user} form={form} />
          <section className='flex flex-col w-full gap-[18px] ml-6'>
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
            <section className='flex justify-end items-center space-x-4 mx-12 pb-[64px]'>
              <CancelarPerfilButton />
              <EnviarPerfilButton
                title='Continuar'
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
