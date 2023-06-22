import { CardForm } from '../../index'
import { faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

const TutorFormExperience = props => {
  const {
    form,
    setForm,
    isDone,
    setIsDone,
    setSection,
    progress,
    setProgress
  } = props
  const handleEdit = (e, index) => {
    e.preventDefault()
    setForm({
      ...form,
      editExpIndex: index
    })
    setSection('experience')
  }

  const handleDelete = (e, index) => {
    e.preventDefault()
    const newExperience = form.experience.filter((exp, i) => i !== index)
    setForm({
      ...form,
      experience: newExperience
    })
    if (newExperience.length === 0) {
      setIsDone({ ...isDone, experience: false })
      setProgress(progress - 1)
    }
  }

  return (
    <>
      <CardForm
        title='Experiencia Laboral'
        form={form}
        isDone={isDone}
        setIsDone={setIsDone}
        setSection={setSection}
        next='experience'
      >
        {isDone?.experience && (
          <div className='flex flex-col -mt-14 -mb-14'>
            {form.experience.map((experience, index) => (
              <div key={index} className='flex flex-col mr-3 mb-5'>
                <p className='font-inter text-base font-semibold leading-[28px] tracking-normal text-[#141414] text-left break-words mb-3 mt-3'>
                  {experience.position}
                </p>
                <div className='flex flex-row mb-5'>
                  <p className='font-inter text-sm font-normal leading-[28px] tracking-normal text-[#141414] text-left'>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className='w-3 mr-1 text-codecolor'
                    />
                    {experience.location}
                  </p>
                  <p className='font-inter text-sm font-normal leading-[28px] tracking-normal text-[#141414] text-left break-words ml-6'>
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      className='w-3 mr-1 text-codecolor'
                    />
                    {experience.company}
                  </p>
                </div>
                <div className='flex flex-row flex-wrap justify-start items-center mb-3'>
                  {experience.technologies.map((tech, index) => (
                    <div
                      className='bg-[#7D5AE21A] mr-2 max-w-[200px] justify-center p-4 mb-2 flex flex-row items-center text-[#7D5AE2]  py-1 rounded-[8px]'
                      key={index}
                    >
                      <p className='text-[#7D5AE2] font-semibold text-sm'>
                        {tech.name}
                      </p>
                    </div>
                  ))}
                </div>
                <p className='font-inter text-md font-normal leading-[28px] tracking-normal text-[#141414] text-left break-words mb-5'>
                  {experience.description}
                </p>
                <div className='flex flex-row justify-left'>
                  <button
                    className='flex flex-row items-center justify-center bg-codecolor rounded-[8px] text-white font-inter font-semibold text-sm leading-[28px] tracking-normal hover:bg-codecolordark px-5 py-1 focus:outline-none transition-all ease-in-out duration-200'
                    onClick={e => handleEdit(e, index)}
                  >
                    Editar
                  </button>
                  <button
                    className='flex flex-row items-center justify-center bg-red-500 rounded-[8px] text-white font-inter font-semibold text-sm leading-[28px] tracking-normal hover:bg-red-700 px-5 py-1 ml-2 focus:outline-none transition-all ease-in-out duration-200'
                    onClick={e => handleDelete(e, index)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardForm>
    </>
  )
}

export default TutorFormExperience
