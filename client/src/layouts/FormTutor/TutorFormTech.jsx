import { FlechaFiltro } from '../../assets'
import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorProfileFormTech,
  EnviarPerfilButton,
  CancelarPerfilButton,
} from '../../components'
import { useState, useEffect } from 'react'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorFormTech = (props) => {
  const {
    progress,
    setProgress,
    form,
    setForm,
    setSection,
    user,
    section,
    isDone,
    setIsDone,
  } = props

  const [correct, setCorrect] = useState(false)
  const [dataForm, setDataForm] = useState({
    tech: [],
  })

  useEffect(() => {
    if (form) {
      setDataForm({
        tech: form.tech,
      })
    }
  }, [form])

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
              isDone={isDone}
            />
          </div>
        </div>

        <section className="flex justify-center mt-[33px] mx-28">
          <TutorFormDataLeft user={user} form={form} />
          <section className="flex flex-col bg-white rounded-[8px] border w-full border-[#1414140D] gap-[18px] ml-6">
            <div className="mx-[52px] my-[36px] ">
              <div className="flex flex-col w-full">
                <h2 className="font-inter  font-bold text-[25px] text-[#05004E] text-left">
                  Habilidades Técnicas{' '}
                  {correct && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-green-500 text-xl"
                    />
                  )}
                </h2>
                <TutorProfileFormTech
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  form={form}
                />
                <div className="flex flex-col gap-6 mt-16">
                  <p className="font-inter text-lg  text-left text-[#737791]">
                    Años de experiencia con la tecnología*
                  </p>
                  <input
                    className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
                    type="Number"
                  />
                </div>
                <div className="flex flex-col gap-6 mt-16">
                  <p className="font-inter text-lg  text-left text-[#737791]">
                    Experiencia con la tecnología*
                  </p>
                  <div className="flex flex-col">
                    <textarea
                      className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
                      rows={8}
                      placeholder="Escribe una breve descripción..."
                    />
                    <p className="font-inter  italic  text-[#98A2B3] text-start">
                      0/500
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className="flex justify-end items-center space-x-4 mx-28 pt-6 pb-[64px]">
          <CancelarPerfilButton />
          <EnviarPerfilButton title="Guardar" />
        </section>
      </section>
    </>
  )
}

export default TutorFormTech
