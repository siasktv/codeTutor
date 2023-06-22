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
import { useSelector, useDispatch } from 'react-redux'
import { techesFetch } from '../../redux/features/teches/techesSlice'

const TutorFormTech = props => {
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

  const [correct, setCorrect] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [charCount, setCharCount] = useState(0)
  const dispatch = useDispatch()
  const technologies = useSelector(state => state.teches.allTeches)
  const [errorsData, setErrorsData] = useState({
    avatar: form.avatar,
    tech: '',
    years: '',
    experience: ''
  })
  const [dataForm, setDataForm] = useState({
    tech: {},
    years: 0,
    experience: ''
  })

  useEffect(() => {
    if (!technologies[0].name) {
      dispatch(techesFetch())
    }
  }, [dispatch, technologies])

  useEffect(() => {
    if (form.editSkillIndex !== null) {
      setDataForm({
        avatar: form.avatar,
        tech: form.skills[form.editSkillIndex].tech,
        years: form.skills[form.editSkillIndex].years,
        experience: form.skills[form.editSkillIndex].experience
      })
      setIsEdit(true)
      setEditIndex(form.editSkillIndex)
      setCharCount(form.skills[form.editSkillIndex].experience.length)
    }
  }, [form.editSkillIndex, form.skills])

  useEffect(() => {
    if (
      dataForm.tech.name &&
      dataForm.years &&
      dataForm.experience &&
      !errorsData.tech &&
      !errorsData.years &&
      !errorsData.experience
    ) {
      setIsDisabled(false)
      setCorrect(true)
    } else {
      setIsDisabled(true)
      setCorrect(false)
    }
  }, [dataForm, errorsData])

  const handleYearsInput = e => {
    const years = Number(e.target.value)
    if (isNaN(years)) {
      setErrorsData({
        ...errorsData,
        years: 'Solo se permiten números'
      })
    } else if (years < 0) {
      setErrorsData({
        ...errorsData,
        years: 'No se permiten números negativos'
      })
    } else if (years > 100) {
      setErrorsData({
        ...errorsData,
        years: 'No se permiten números mayores a 100'
      })
    } else if (years === '') {
      setErrorsData({
        ...errorsData,
        years: 'Este campo es obligatorio'
      })
    } else if (years === 0) {
      setErrorsData({
        ...errorsData,
        years: 'Debes tener al menos 1 año de experiencia'
      })
    } else {
      setErrorsData({
        ...errorsData,
        years: ''
      })
    }
    setDataForm({
      ...dataForm,
      years: years
    })
  }

  const handleExperienceInput = e => {
    const experience = e.target.value
    const trimmed = experience.trim()
    if (trimmed.length <= 500) {
      if (trimmed.length === 0) {
        setErrorsData({
          ...errorsData,
          experience: 'La descripción no puede estar vacía'
        })
      } else {
        setErrorsData({
          ...errorsData,
          experience: ''
        })
      }
      setDataForm({
        ...dataForm,
        experience: experience
      })
      setCharCount(trimmed.length)
    } else {
      setCharCount(500)
    }
  }

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
              isDone={isDone}
              form={form}
              setForm={setForm}
              dataForm={dataForm}
            />
          </div>
        </div>

        <section className='flex justify-center mt-[33px] mx-28'>
          <TutorFormDataLeft
            user={user}
            form={form}
            setDataForm={setDataForm}
            dataForm={dataForm}
          />
          <section className='flex flex-col bg-white rounded-[8px] border w-full border-[#1414140D] gap-[18px] ml-6'>
            <div className='mx-[52px] my-[36px] '>
              <div className='flex flex-col w-full'>
                <h2 className='font-inter  font-bold text-[25px] text-[#05004E] text-left'>
                  Habilidades Técnicas{' '}
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
                    />
                  )}
                </h2>
                <TutorProfileFormTech
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  form={form}
                  setForm={setForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                  technologies={technologies}
                />
                <div className='flex flex-col gap-6 mt-16'>
                  <p className='font-inter text-lg  text-left text-[#737791]'>
                    Años de experiencia con la tecnología{' '}
                    <span className='text-red-500'>*</span>
                  </p>
                  <input
                    className={
                      errorsData.years
                        ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 outline-red-500'
                        : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500'
                    }
                    type='Number'
                    value={dataForm.years}
                    onChange={handleYearsInput}
                  />
                  {errorsData.years && (
                    <p className='font-inter font-normal italic text-red-500 text-left -mt-4'>
                      {errorsData.years}
                    </p>
                  )}
                </div>
                <div className='flex flex-col gap-6 mt-16'>
                  <p className='font-inter text-lg  text-left text-[#737791]'>
                    Experiencia con la tecnología{' '}
                    <span className='text-red-500'>*</span>
                  </p>
                  <div className='flex flex-col'>
                    <textarea
                      className={
                        errorsData.experience
                          ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 outline-red-500 resize-none'
                          : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 resize-none'
                      }
                      rows={8}
                      placeholder='Escribe una breve descripción...'
                      value={dataForm.experience}
                      onChange={handleExperienceInput}
                    />
                    <p
                      className={
                        charCount < 1
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
                    {errorsData.experience && (
                      <p className='font-inter font-normal italic text-red-500 text-left -mt-12'>
                        {errorsData.experience}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className='flex justify-end items-center space-x-4 mx-40 -mt-10 pb-[64px]'>
          <CancelarPerfilButton />
          <EnviarPerfilButton
            title={isEdit ? 'Actualizar' : 'Guardar'}
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
            isEdit={isEdit}
            editIndex={editIndex}
          />
        </section>
      </section>
    </>
  )
}

export default TutorFormTech
