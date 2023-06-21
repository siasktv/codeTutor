import { FlechaFiltro } from '../../assets'
import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  EnviarPerfilButton,
  CancelarPerfilButton,
} from '../../components'
import { useState, useEffect } from 'react'
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorFormBio = (props) => {
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
  const [isDisabled, setIsDisabled] = useState(true)
  const [charCount, setCharCount] = useState(form.bio.description.length)
  const [dataForm, setDataForm] = useState({
    avatar: form.avatar,
    specialty: form.bio.specialty || '',
    description: form.bio.description || '',
    portfolio: form.bio.portfolio || '',
  })
  const [errors, setErrors] = useState({
    specialty: '',
    description: '',
    portfolio: '',
  })

  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    if (
      errors.specialty === '' &&
      errors.description === '' &&
      errors.portfolio === '' &&
      dataForm.avatar !== '' &&
      dataForm.specialty !== '' &&
      dataForm.description !== ''
    ) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [errors, dataForm])

  const handleSpecialtySelect = (e) => {
    if (e.target.value === 'default') {
      setErrors({
        ...errors,
        specialty: 'Selecciona una especialidad',
      })
    } else {
      setErrors({
        ...errors,
        specialty: '',
      })
    }
    setDataForm({
      ...dataForm,
      specialty: e.target.value,
    })
  }

  const handleDescriptionInput = (e) => {
    const { value } = e.target
    const trimmed = value.trim()
    if (trimmed.length <= 500) {
      if (trimmed.length < 50) {
        setErrors({
          ...errors,
          description: 'La descripción debe tener al menos 50 caracteres',
        })
      } else {
        setErrors({
          ...errors,
          description: '',
        })
      }
      setDataForm({
        ...dataForm,
        description: value,
      })
      setCharCount(trimmed.length)
    } else {
      setCharCount(500)
    }
  }

  const handlePortfolioInput = (e) => {
    // check if input is a valid url
    const urlRegex = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i'
    )
    if (e.target.value.trim() === '') {
      setErrors({
        ...errors,
        portfolio: '',
      })
    } else if (!urlRegex.test(e.target.value)) {
      setErrors({
        ...errors,
        portfolio: 'Ingresa una URL válida',
      })
    } else {
      setErrors({
        ...errors,
        portfolio: '',
      })
    }
    setDataForm({
      ...dataForm,
      portfolio: e.target.value,
    })
  }

  useEffect(() => {
    if (
      dataForm.specialty !== '' &&
      dataForm.description !== '' &&
      errors.description === '' &&
      errors.specialty === '' &&
      errors.portfolio === ''
    ) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [dataForm, errors])

  return (
    <>
      {/* <NavUserNotifications /> */}
      <section className="bg-[#FAFBFC] h-full w-full">
        <div className="flex flex-col">
          <div className="flex flex-col mt-[33px]">
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

        <section className="flex justify-center mt-[33px] mx-28">
          <TutorFormDataLeft
            user={user}
            form={form}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
          <section className="flex flex-col bg-white rounded-[8px] border w-full border-[#1414140D] gap-[18px] ml-6">
            <div className="mx-[52px] my-[36px] ">
              <div className="flex flex-row items-center mb-[50px]">
                <h2 className="font-inter   font-bold text-[25px] text-[#05004E] text-left">
                  Biografía{' '}
                  {correct && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-green-500 text-xl"
                    />
                  )}
                  {!correct && (
                    <FontAwesomeIcon
                      icon={faWarning}
                      className="text-orange-300 text-xl"
                    />
                  )}
                </h2>
              </div>
              <p className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Selecciona tu especialidad como desarrollador *
              </p>
              <div className="relative">
                <select
                  id="inputField"
                  className="w-full py-3 pl-4 pr-8 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none"
                  onChange={handleSpecialtySelect}
                >
                  <option value="default" disabled hidden selected>
                    Selecciona una especialidad
                  </option>
                  <option
                    value="Front-end Developer"
                    selected={dataForm.specialty === 'Front-end Developer'}
                  >
                    Front End Developer
                  </option>
                  <option
                    value="Back-end Developer"
                    selected={dataForm.specialty === 'Back-end Developer'}
                  >
                    Back End Developer
                  </option>
                  <option
                    value="Full Stack Developer"
                    selected={dataForm.specialty === 'Full Stack Developer'}
                  >
                    Full Stack Developer
                  </option>
                  <option
                    value="Data Base Speciality"
                    selected={dataForm.specialty === 'Data Base Speciality'}
                  >
                    Database Specialist
                  </option>
                  {/* Add more options as needed */}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <img src={FlechaFiltro} />
                </div>
              </div>
              {errors.specialty && (
                <p className="font-inter font-normal mb-[50px] text-red-500 text-left">
                  {errors.specialty}
                </p>
              )}
              <p className="text-[#737791] font-inter text-base mt-[50px] mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Breve biografía *
              </p>

              <textarea
                className={
                  errors.description
                    ? 'w-full rounded-lg border border-red-500 p-3 text-lg focus:outline-red-500 resize-none'
                    : 'w-full rounded-lg border border-[#C3D3E2] p-3 text-lg resize-none'
                }
                rows="8"
                id="message"
                maxLength={500}
                placeholder="Escribe una breve biografía"
                onChange={handleDescriptionInput}
                value={dataForm.description}
              ></textarea>
              {/* ACTUALIZAR el número de caracteres de acuerdo al limite */}
              <p
                className={
                  charCount < 50
                    ? 'font-inter font-normal italic mb-[50px] text-red-500 text-left'
                    : charCount < 450
                    ? 'font-inter font-normal mb-[50px] italic text-[#98A2B3] text-left'
                    : charCount >= 450 && charCount < 475
                    ? 'font-inter font-normal mb-[50px] italic text-[#FFB800] text-left'
                    : charCount >= 475 && charCount < 500
                    ? 'font-inter font-normal mb-[50px] italic text-[#FF8A00] text-left'
                    : 'font-inter font-normal mb-[50px] italic text-[#FF0000] text-left'
                }
              >
                {charCount}/500
              </p>
              {errors.description && (
                <p className="font-inter font-normal mb-[50px] -mt-[50px] italic text-red-500 text-left">
                  {errors.description}
                </p>
              )}
              <h2 className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Link del portafolio
              </h2>
              <input
                id="portfolio"
                className={
                  errors.portfolio
                    ? 'w-full py-3 mb-[50px] px-6 bg-none rounded-[8px] border border-red-500 focus:outline-red-500'
                    : 'w-full py-3 mb-[50px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]'
                }
                type="text"
                placeholder="Portafolio Link"
                onChange={handlePortfolioInput}
                value={dataForm.portfolio || form.bio.portfolio}
              />
              {errors.portfolio && (
                <p className="font-inter font-normal -mt-[40px] italic text-red-500 text-left">
                  {errors.portfolio}
                </p>
              )}
            </div>
          </section>
        </section>
        <section className="flex justify-end items-center space-x-4 mx-28 pt-6 pb-[64px]">
          <CancelarPerfilButton />
          <EnviarPerfilButton
            title="Guardar"
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

export default TutorFormBio
