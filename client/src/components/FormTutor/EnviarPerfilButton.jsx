import LoaderMini from '../LoaderMini'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const EnviarPerfilButton = props => {
  const {
    title,
    isDisabled,
    setSection,
    setProgress,
    section,
    setForm,
    form,
    dataForm,
    progress,
    setIsDone,
    isDone,
    isEdit,
    editIndex,
    setSubmit,
    success,
    isSubmitting
  } = props

  const isDoneCount = Object.values(isDone).filter(value => value === true)

  const handleClick = () => {
    if (isDisabled) return
    window.scrollTo(0, 0)
    if (section === 'data') {
      setSection('form')
      setProgress(progress + 1 + isDoneCount.length)
      setForm({ ...form, ...dataForm })
    } else if (section === 'bio') {
      setSection('form')
      setForm({
        ...form,
        avatar: dataForm.avatar,
        bio: {
          specialty: dataForm.specialty,
          description: dataForm.description,
          portfolio: dataForm.portfolio
        }
      })
      if (!isDone.bio) {
        setIsDone({ ...isDone, bio: true })
        setProgress(progress + 1)
      }
    } else if (section === 'experience') {
      setSection('form')
      if (isEdit) {
        const newExperience = form.experience.map((experience, index) => {
          if (index === editIndex) {
            return {
              position: dataForm.position,
              company: dataForm.company,
              location: dataForm.location,
              startDate: dataForm.startDate,
              endDate: dataForm.endDate,
              currentlyWorking: dataForm.currentlyWorking,
              description: dataForm.description,
              technologies: dataForm.technologies
            }
          }
          return experience
        })
        setForm({
          ...form,
          experience: newExperience,
          editExpIndex: null
        })
        return
      }
      setForm({
        ...form,
        avatar: dataForm.avatar,
        experience: [
          ...form.experience,
          {
            position: dataForm.position,
            company: dataForm.company,
            location: dataForm.location,
            startDate: dataForm.startDate,
            endDate: dataForm.endDate,
            currentlyWorking: dataForm.currentlyWorking,
            description: dataForm.description,
            technologies: dataForm.technologies
          }
        ]
      })
      if (!isDone.experience) {
        setIsDone({ ...isDone, experience: true })
        setProgress(progress + 1)
      }
    } else if (section === 'skills') {
      setSection('form')
      if (isEdit) {
        const newSkills = form.skills.map((skill, index) => {
          if (index === editIndex) {
            return {
              tech: dataForm.tech,
              years: dataForm.years,
              experience: dataForm.experience
            }
          }
          return skill
        })
        setForm({
          ...form,
          avatar: dataForm.avatar,
          skills: newSkills,
          editSkillIndex: null
        })
        return
      }
      setForm({
        ...form,
        avatar: dataForm.avatar,
        skills: [
          ...form.skills,
          {
            tech: dataForm.tech,
            years: dataForm.years,
            experience: dataForm.experience
          }
        ]
      })
      if (!isDone.skills) {
        setIsDone({ ...isDone, skills: true })
        setProgress(progress + 1)
      }
    } else if (section === 'projects') {
      setSection('form')
      if (isEdit) {
        const newProjects = form.projects.map((project, index) => {
          if (index === editIndex) {
            return {
              name: dataForm.name,
              description: dataForm.description,
              technologies: dataForm.technologies,
              link: dataForm.link
            }
          }
          return project
        })
        setForm({
          ...form,
          avatar: dataForm.avatar,
          projects: newProjects,
          editProjectIndex: null
        })
        return
      }
      setForm({
        ...form,
        avatar: dataForm.avatar,
        projects: [
          ...form.projects,
          {
            name: dataForm.name,
            description: dataForm.description,
            technologies: dataForm.technologies,
            link: dataForm.link
          }
        ]
      })
      if (!isDone.projects) {
        setIsDone({ ...isDone, projects: true })
        setProgress(progress + 1)
      }
    } else if (section === 'rate') {
      setSection('form')
      setForm({
        ...form,
        avatar: dataForm.avatar,
        rate: {
          hour: dataForm.hour,
          promo: dataForm.promo
        }
      })
      if (!isDone.rate) {
        setIsDone({ ...isDone, rate: true })
        setProgress(progress + 1)
      }
    } else if (section === 'form') {
      setSubmit(true)
    }
  }
  return (
    <button
      className={
        isSubmitting || success
          ? 'inline-block rounded border transition-all duration-200 ease-in-out border-codecolor bg-codecolor px-12 py-3 text-sm font-medium text-white focus:outline-none cursor-default w-44 h-[46px]'
          : 'inline-block rounded border transition-all duration-200 ease-in-out border-codecolor bg-codecolor px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-codecolor focus:outline-none active:text-codecolor disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:border-gray-400 disabled:opacity-50 w-44 h-[46px]'
      }
      disabled={isDisabled}
      onClick={handleClick}
    >
      {section === 'form' ? (
        <>
          {isSubmitting && <LoaderMini />}
          {success && <FontAwesomeIcon icon={faCheckCircle} className='mr-2' />}
          {!isSubmitting && !success && <>{title}</>}
        </>
      ) : (
        <>{title}</>
      )}
    </button>
  )
}

export default EnviarPerfilButton
