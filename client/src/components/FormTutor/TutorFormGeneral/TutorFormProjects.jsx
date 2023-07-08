import { CardForm } from '../../index'

const TutorFormProjects = props => {
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
      editProjectIndex: index
    })
    setSection('projects')
  }

  const handleDelete = (e, index) => {
    e.preventDefault()
    const newProjects = form.projects.filter((project, i) => i !== index)
    setForm({
      ...form,
      projects: newProjects
    })
    if (newProjects.length === 0) {
      setIsDone({ ...isDone, projects: false })
      setProgress(progress - 1)
    }
  }

  return (
    <>
      <CardForm
        title='Proyectos'
        form={form}
        setForm={setForm}
        isDone={isDone}
        setSection={setSection}
        next='projects'
      >
        {isDone?.projects && (
          <div className='flex flex-col lg:-mt-14 -mt-4 -mb-2 lg:-mb-14'>
            {form.projects.map((project, index) => (
              <div key={index} className='flex flex-col mr-3 mb-5'>
                <a
                  className='font-inter text-base font-normal leading-[28px] tracking-normal text-[#0083FB] text-left break-words mb-3 mt-3 underline hover:text-blue-600'
                  href={project.link}
                  target='_blank'
                  rel='noreferrer'
                >
                  {project.name}
                </a>
                <div className='flex flex-row flex-wrap justify-start items-center mb-3'>
                  {project.technologies.map((tech, index) => (
                    <div
                      className='bg-[#7D5AE21A] dark:bg-codecolor dark:text-codecolorlighter mr-2 max-w-[200px] justify-center p-4 mb-2 flex flex-row items-center text-[#7D5AE2]  py-1 rounded-[8px]'
                      key={index}
                    >
                      <p className='text-[#7D5AE2] dark:text-codecolorlighter font-semibold text-sm'>
                        {tech.name}
                      </p>
                    </div>
                  ))}
                </div>
                <p className='font-inter text-md font-normal leading-[28px] tracking-normal text-[#141414] dark:text-gray-200 text-left break-words mb-5'>
                  {project.description}
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

export default TutorFormProjects
