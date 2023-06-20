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

const TutorFormRate = (props) => {
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
    rates: [],
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
                  Configuración de tarifas{' '}
                  {correct && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-green-500 text-xl"
                    />
                  )}
                </h2>
                <div className="flex flex-col gap-6 mt-16">
                  <h2 className="font-inter text-left font-bold text-[#05004E]">
                    Tarifa de mentoría
                  </h2>
                  <p className="font-inter text-left text-[#737791]">
                    Para la tarifa de las sesiones de mentoría. Existe un cargo
                    mínimo de 30 minutos por cada sesión a la tarifa del mentor.
                    Después de la media hora, Code-Tutor cobrará a la tarifa del
                    mentor por minuto.
                  </p>

                  <div className="flex items-center gap-8">
                    <input
                      className="w-1/4 py-3 px-6  bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
                      type="Number"
                      placeholder="US$"
                    />
                    <p className="font-inter  text-[#737791]">
                      por cada hora (00 : 60 min)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-6 mt-16">
                  <h2 className="font-inter text-left font-bold text-[#05004E]">
                    Promoción
                  </h2>

                  <div className="flex items-center gap-20">
                    <p className="font-inter  text-[#737791]">
                      Primeros 15 minutos gratuitos
                    </p>
                    <div className="flex gap-2 justify-center">
                      <checkbox className="p-3 rounded border border-[#C3D3E2]" />
                      <p className="font-inter  text-[#737791]">Aceptar</p>
                    </div>
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

export default TutorFormRate
