import { CardForm } from '../../index'
import { faXmark, faEdit, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const TutorFormTech = props => {
  const {
    form,
    isDone,
    setIsDone,
    setSection,
    progress,
    setProgress,
    setForm
  } = props

  const handleEdit = (e, index) => {
    e.preventDefault()
    setForm({
      ...form,
      editSkillIndex: index
    })
    setSection('skills')
  }

  const handleDelete = (e, index) => {
    e.preventDefault()
    const newSkills = form.skills.filter((skill, i) => i !== index)
    setForm({
      ...form,
      skills: newSkills
    })
    if (newSkills.length === 0) {
      setIsDone({ ...isDone, skills: false })
      setProgress(progress - 1)
    }
  }

  return (
    <>
      <CardForm
        title='Habilidades Técnicas'
        form={form}
        isDone={isDone}
        setIsDone={setIsDone}
        setSection={setSection}
        next='skills'
      >
        {isDone?.skills && (
          <div className='flex flex-row flex-wrap justify-start items-center lg:-mt-12 lg:-mb-12'>
            {form.skills.map((skill, index) => (
              <div
                className='bg-[#7D5AE21A] mr-3 max-lg:mr-2 max-w-[200px] justify-center lg:p-4 mb-2 flex flex-row items-center text-[#7D5AE2] max-lg:py-2 max-lg:px-2 max-lg:text-sm  lg:py-3 rounded-[8px] dark:text-codecolorlighter dark:bg-codecolor'
                key={index}
              >
                <p className='text-[#7D5AE2] font-semibold dark:text-codecolorlighter'>
                  {skill.tech.name}
                </p>
                <button className='ml-2' onClick={e => handleEdit(e, index)}>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className='w-3 mr-2 text-codecolor hover:text-codecolordark dark:text-codecolorlighter'
                  />
                </button>
                <button className='ml-2' onClick={e => handleDelete(e, index)}>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className='w-3 text-codecolor hover:text-codecolordark dark:text-codecolorlighter'
                  />
                </button>
              </div>
            ))}
          </div>
        )}
      </CardForm>
    </>
  )
}

export default TutorFormTech
