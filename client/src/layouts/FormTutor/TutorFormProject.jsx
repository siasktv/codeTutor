import { FlechaFiltro } from '../../assets'
import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  EnviarPerfilButton,
  CancelarPerfilButton
} from '../../components'

import ProjectDescription from '../../components/FormTutor/TutorProject/ProjectDescription'
import ProjectLink from '../../components/FormTutor/TutorProject/ProjectLink'
import ProjectName from '../../components/FormTutor/TutorProject/ProjectName'
import ProjectTechnologies from '../../components/FormTutor/TutorProject/ProjectTechnologies'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { techesFetch } from '../../redux/features/teches/techesSlice'

const TutorFormProject = props => {
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
    avatar: form.avatar,
    name: '',
    link: '',
    description: '',
    technologies: []
  })
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [errorsData, setErrorsData] = useState({
    name: '',
    link: '',
    description: '',
    technologies: ''
  })
  const [correct, setCorrect] = useState(false)
  const technologies = useSelector(state => state.teches.allTeches)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!technologies[0]?.name) {
      dispatch(techesFetch())
    }
  }, [dispatch, technologies])

  useEffect(() => {
    if (form.editProjectIndex !== null) {
      setDataForm({
        avatar: form.avatar,
        name: form.projects[form.editProjectIndex].name,
        link: form.projects[form.editProjectIndex].link,
        description: form.projects[form.editProjectIndex].description,
        technologies: form.projects[form.editProjectIndex].technologies
      })
      setIsEdit(true)
      setEditIndex(form.editExpIndex)
    }
  }, [form.editExpIndex, form.avatar, form.projects])

  useEffect(() => {
    if (
      dataForm.name !== '' &&
      dataForm.link !== '' &&
      dataForm.description !== '' &&
      dataForm.technologies.length !== 0 &&
      errorsData.name === '' &&
      errorsData.link === '' &&
      errorsData.description === '' &&
      errorsData.technologies === ''
    ) {
      setCorrect(true)
      setIsDisabled(false)
    } else {
      setCorrect(false)
      setIsDisabled(true)
    }
  }, [dataForm, errorsData])

  return (
    <>
      {/* <NavUserNotifications /> */}
      <section className='bg-[#FAFBFC] h-full w-full'>
        <div className='flex flex-col pt-[33px]'>
          <TutorFormWelcome user={user} />
          <TutorFormProgressBar
            progress={progress}
            setProgress={setProgress}
            section={section}
            setSection={setSection}
            isDone={isDone}
            form={form}
            setForm={setForm}
            dataForm={dataForm}
          />
        </div>

        <section className='flex justify-center mt-[33px] mx-28'>
          <TutorFormDataLeft
            user={user}
            form={form}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />

          <section className='flex flex-col bg-white rounded-[8px] border w-full border-[#1414140D] gap-[18px] ml-6'>
            <div className='mx-[52px] my-[36px] '>
              <div className='flex flex-row items-center mb-[50px]'>
                <h2 className='font-inter   font-bold text-[25px] text-[#05004E] text-left'>
                  Proyecto{' '}
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
              </div>

              <div>
                <ProjectName
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                />
              </div>

              <div>
                <ProjectLink
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                />
              </div>

              <div className='mt-[50px] mb-[30px]'>
                <ProjectDescription
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                />
              </div>

              <div className='mt-[50px] mb-[30px]'>
                <ProjectTechnologies
                  dataForm={dataForm}
                  setDataForm={setDataForm}
                  errorsData={errorsData}
                  setErrorsData={setErrorsData}
                  technologies={technologies}
                />
              </div>
            </div>
          </section>
        </section>
        <section className='flex justify-end items-center space-x-4 mx-40 -mt-12 pt-6 pb-[64px]'>
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

export default TutorFormProject
