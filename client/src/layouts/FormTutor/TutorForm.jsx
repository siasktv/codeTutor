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
  CancelarPerfilButton,
} from '../../components/'
import { useState, useEffect } from 'react'

const TutorForm = (props) => {
  const {
    progress,
    setProgress,
    form,
    setForm,
    section,
    setSection,
    user,
    isDone,
    setIsDone,
  } = props
  const [isDisabled, setIsDisabled] = useState(true)

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
      <section className="bg-[#FAFBFC] h-full w-full">
        <div className="flex flex-col">
          <div className="flex flex-col mt-[33px]">
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

        <section className="flex justify-center mt-[33px] mx-28">
          <TutorFormDataLeft user={user} form={form} />
          <section className="flex flex-col w-full gap-[18px] ml-6 ">
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
            />

            <TutorFormExperience />

            <TutorFormProjects />

            <TutorFormRate
              form={form}
              isDone={isDone}
              setIsDone={setIsDone}
              setSection={setSection}
            />

            <section className="flex justify-end items-center space-x-4 mb-[64px]">
              <CancelarPerfilButton />
              <EnviarPerfilButton
                title="Enviar perfil"
                isDisabled={isDisabled}
                setSection={setSection}
                setProgress={setProgress}
                section={section}
                setForm={setForm}
                form={form}
                progress={progress}
              />
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export default TutorForm
