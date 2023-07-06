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
      <section className='bg-[#FFFFFF] min-h-screen dark:bg-gray-900 h-full w-full'>
        <div className='flex flex-col'>
          <div className='flex flex-col lg:mt-[33px]'>
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
            setDataForm={setDataForm}
            dataForm={dataForm}
          />
          <section className='flex flex-col bg-white dark:bg-gray-900 rounded-[8px] border w-full border-[#1414140D] gap-[18px] lg:ml-6'>
            <div className='lg:mx-[52px] m-2 lg:my-[36px] '>
              <div className='flex flex-col w-full'>
                <h2 className='font-inter font-bold text-[25px] dark:text-gray-200 text-[#05004E] text-left'>
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
                <div className='flex flex-col gap-6 lg:mt-16 mt-4'>
                  <p className='font-inter text-lg dark:text-gray-400  text-left text-[#737791]'>
                    Años de experiencia con la tecnología{' '}
                    <span className='text-red-500'>*</span>
                  </p>
                  <input
                    className={
                      errorsData.years
                        ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 outline-red-500 dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none'
                        : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none'
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
                <div className='flex flex-col lg:gap-6 gap-2 mt-4 lg:mt-16'>
                  <p className='font-inter text-lg  text-left dark:text-gray-400 text-[#737791]'>
                    Experiencia con la tecnología{' '}
                    <span className='text-red-500'>*</span>
                  </p>
                  <div className='flex flex-col'>
                    <textarea
                      className={
                        errorsData.experience
                          ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 outline-red-500 resize-none dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none'
                          : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 resize-none dark:bg-gray-800 dark:outline-none dark:text-gray-200 dark:focus:outline-none dark:border-none'
                      }
                      rows={8}
                      placeholder='Escribe una breve descripción...'
                      value={dataForm.experience}
                      onChange={handleExperienceInput}
                    />
                    <p
                      className={
                        charCount < 1
                          ? 'font-inter font-normal italic mb-2 lg:mb-[50px] text-red-500 text-left'
                          : charCount < 450
                          ? 'font-inter font-normal mb-2 lg:mb-[50px] italic text-[#98A2B3] text-left'
                          : charCount >= 450 && charCount < 475
                          ? 'font-inter font-normal mb-2 lg:mb-[50px] italic text-[#FFB800] text-left'
                          : charCount >= 475 && charCount < 500
                          ? 'font-inter font-normal mb-2 lg:mb-[50px] italic text-[#FF8A00] text-left'
                          : 'font-inter font-normal mb-2 lg:mb-[50px] italic text-[#FF0000] text-left'
                      }
                    >
                      {charCount}/500
                    </p>
                    {errorsData.experience && (
                      <p className='font-inter font-normal italic text-red-500 text-left lg:-mt-12 -mt-2 mb-2'>
                        {errorsData.experience}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
        <section className='flex justify-end items-center space-x-2 lg:space-x-4 mx-2 lg:mx-28 dark:lg:mx-[165px] lg:pt-6 lg:pb-8 max-lg:py-2'>
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
