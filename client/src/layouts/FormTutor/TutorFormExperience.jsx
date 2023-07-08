import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  EnviarPerfilButton,
  CancelarPerfilButton
} from '../../components'

import JobPosition from '../../components/FormTutor/TutorExperience/JobPosition'
import JobName from '../../components/FormTutor/TutorExperience/JobName'
import JobLocation from '../../components/FormTutor/TutorExperience/JobLocation'
import JobDuration from '../../components/FormTutor/TutorExperience/JobDuration'
import JobCheckbox from '../../components/FormTutor/TutorExperience/JobCheckbox'
import JobDescription from '../../components/FormTutor/TutorExperience/JobDescription'
import JobTechnologies from '../../components/FormTutor/TutorExperience/JobTechnologies'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { techesFetch } from '../../redux/features/teches/techesSlice'
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TutorFormExperience = props => {
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
  const [dataForm, setDataForm] = useState({
    avatar: form.avatar,
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: '',
    technologies: []
  })
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [isDisabled, setIsDisabled] = useState(true)
  const dispatch = useDispatch()
  const technologies = useSelector(state => state.teches.allTeches)
  const [errorsData, setErrorsData] = useState({
    position: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    technologies: ''
  })
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    if (!technologies[0].name) {
      dispatch(techesFetch())
    }
  }, [dispatch, technologies])

  useEffect(() => {
    if (form.editExpIndex !== null) {
      setDataForm({
        avatar: form.avatar,
        position: form.experience[form.editExpIndex].position,
        company: form.experience[form.editExpIndex].company,
        location: form.experience[form.editExpIndex].location,
        startDate: form.experience[form.editExpIndex].startDate,
        endDate: form.experience[form.editExpIndex].endDate,
        currentlyWorking: form.experience[form.editExpIndex].currentlyWorking,
        description: form.experience[form.editExpIndex].description,
        technologies: form.experience[form.editExpIndex].technologies
      })
      setIsEdit(true)
      setEditIndex(form.editExpIndex)
    }
  }, [form])

  useEffect(() => {
    if (
      dataForm.position !== '' &&
      dataForm.company !== '' &&
      dataForm.location !== '' &&
      dataForm.startDate !== '' &&
      dataForm.endDate !== '' &&
      dataForm.description !== '' &&
      dataForm.technologies.length !== 0 &&
      errorsData.position === '' &&
      errorsData.company === '' &&
      errorsData.location === '' &&
      errorsData.startDate === '' &&
      errorsData.endDate === '' &&
      errorsData.description === '' &&
      errorsData.technologies === ''
    ) {
      setIsDisabled(false)
      setCorrect(true)
    } else {
      setIsDisabled(true)
      setCorrect(false)
    }
  }, [errorsData, dataForm])

  return (
    <>
      {/* <NavUserNotifications /> */}
      <section className='bg-[#FFFFFF] min-h-screen dark:bg-gray-900 h-full w-full'>
        <div className='flex flex-col pt-[33px]'>
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

        <section className='flex justify-center lg:mt-[33px] lg:mx-28'>
          <TutorFormDataLeft
            user={user}
            form={form}
            setDataForm={setDataForm}
            dataForm={dataForm}
          />
          <section className='flex flex-col bg-white dark:bg-gray-900 rounded-[8px] border w-full border-[#1414140D] gap-[18px] lg:ml-6'>
            <div className='lg:mx-[52px] lg:my-[36px] m-2'>
              <div className='flex flex-row items-center mb-2 lg:mb-[50px]'>
                <h2 className='font-inter font-bold text-[25px] dark:text-gray-200 text-[#05004E] text-left'>
                  Empleo{' '}
                  {correct && (
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className='text-green-500 text-xl'
                    />
                  )}
                  {!correct && (
                    <FontAwesomeIcon
                      icon={faWarning}
                      title='Completa todos los campos'
                      className='text-orange-300 text-xl'
                    />
                  )}
                </h2>
              </div>

              <div className='flex lg:space-x-8 space-x-2'>
                <div className='block w-full'>
                  <JobPosition
                    dataForm={dataForm}
                    setDataForm={setDataForm}
                    errorsData={errorsData}
                    setErrorsData={setErrorsData}
                  />
                </div>
                <div className='block w-full'>
                  <JobName
                    dataForm={dataForm}
                    setDataForm={setDataForm}
                    errorsData={errorsData}
                    setErrorsData={setErrorsData}
                  />
                </div>
              </div>

              <div>
                <JobLocation
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                />
              </div>

              <div className='flex space-x-2 lg:space-x-8 mt-4 lg:mt-[50px] mb-2 lg:mb-[50px]'>
                <JobDuration
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                />
              </div>

              <div className='flex lg:space-x-6 space-x-2 items-center'>
                <JobCheckbox dataForm={dataForm} setDataForm={setDataForm} />
              </div>

              <div className='mt-4 lg:mt-[50px] mb-4 lg:mb-[30px]'>
                <JobDescription
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                />
              </div>

              <div className='mt-4 lg:mt-[50px] mb-2 lg:mb-[30px]'>
                <JobTechnologies
                  technologies={technologies}
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                />
              </div>
            </div>
          </section>
        </section>
        <section className='flex justify-end items-center space-x-2 lg:space-x-4 mx-2 lg:mx-28 lg:pt-6 lg:pb-8 max-lg:py-2 dark:lg:mx-[165px]'>
          <CancelarPerfilButton />
          <EnviarPerfilButton
            title={isEdit ? 'Actualizar' : 'Guardar'}
            isDisabled={isDisabled}
            setSection={setSection}
            setProgress={setProgress}
            isEdit={isEdit}
            editIndex={editIndex}
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

export default TutorFormExperience
