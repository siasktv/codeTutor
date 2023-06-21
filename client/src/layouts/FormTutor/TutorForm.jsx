import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorFormBiografia,
  TutorFormTech,
  TutorFormExperience,
  TutorFormProjects,
  TutorFormRate,
  EnviarPerfilButton,
  CancelarPerfilButton
} from '../../components/'
import { useState, useEffect } from 'react'

const TutorForm = props => {
  const {
    progress,
    setProgress,
    form,
    setForm,
    section,
    setSection,
    user,
    isDone,
    setIsDone
  } = props
  const [isDisabled, setIsDisabled] = useState(true)

  const [dataForm, setDataForm] = useState({
    avatar: form.avatar
  })

  useEffect(() => {
    if (dataForm.avatar !== form.avatar) {
      setForm({ ...form, avatar: dataForm.avatar })
    }
  }, [dataForm])

  const [submit, setSubmit] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    if (submit) {
      setShowModal(true)
    }
  }, [submit])

  useEffect(() => {
    if (
      isDone.bio &&
      isDone.skills &&
      isDone.experience &&
      isDone.projects &&
      isDone.rate
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [isDone])

  return (
    <>
      <section className='bg-[#FAFBFC] h-full w-full'>
        <div className='flex flex-col'>
          <div className='flex flex-col mt-[33px]'>
            <TutorFormWelcome user={user} />
            <TutorFormProgressBar
              progress={progress}
              section={section}
              setSection={setSection}
              setProgress={setProgress}
              isDone={isDone}
            />
          </div>
        </div>

        <section className='flex justify-center mt-[33px] mx-28'>
          <TutorFormDataLeft
            user={user}
            form={form}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
          <section className='flex flex-col w-full gap-[18px] ml-6 '>
            <TutorFormBiografia
              form={form}
              isDone={isDone}
              setIsDone={setIsDone}
              setSection={setSection}
            />

            <TutorFormTech
              form={form}
              isDone={isDone}
              setIsDone={setIsDone}
              setSection={setSection}
              progress={progress}
              setProgress={setProgress}
              setForm={setForm}
            />

            <TutorFormExperience
              form={form}
              setForm={setForm}
              isDone={isDone}
              setIsDone={setIsDone}
              setSection={setSection}
              progress={progress}
              setProgress={setProgress}
            />

            <TutorFormProjects
              form={form}
              setForm={setForm}
              isDone={isDone}
              setIsDone={setIsDone}
              setSection={setSection}
              progress={progress}
              setProgress={setProgress}
            />

            <TutorFormRate
              form={form}
              isDone={isDone}
              setIsDone={setIsDone}
              setSection={setSection}
            />

            <section className='flex justify-end items-center space-x-4 mb-[64px]'>
              <CancelarPerfilButton />
              <EnviarPerfilButton
                title='Enviar perfil'
                isDisabled={isDisabled}
                setSection={setSection}
                setProgress={setProgress}
                section={section}
                setForm={setForm}
                form={form}
                progress={progress}
                isDone={isDone}
                setSubmit={setSubmit}
              />
            </section>
          </section>
        </section>
      </section>
      {showModal && (
        <div
          className='relative z-10'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'
        >
          <div className='fixed inset-0 bg-[#141414] bg-opacity-70 transition-opacity'></div>

          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-center justify-center'>
                    <div className='mt-3 text-center'>
                      <h3
                        className='text-lg font-semibold leading-6 text-[#05004E] text-center pb-8 pt-16'
                        id='modal-title'
                      >
                        Muchas gracias por la información.
                      </h3>
                      <div className='mt-2 max-w-lg'>
                        <p className='text-lg font-semibold text-[#05004E] text-center'>
                          Vamos a analizar tu formulario y te avisaremos en las
                          próximas semanas.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 pb-12 pt-10 sm:flex sm:flex-row justify-center sm:px-6'>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-lg bg-codecolor px-12 py-5 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-codecolordark transition-all ease-in-out duration-200 sm:mt-0 sm:w-auto'
                    onClick={() => {
                      setShowModal(false)
                      setSubmit(false)
                    }}
                  >
                    Continuar con la plataforma
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default TutorForm
