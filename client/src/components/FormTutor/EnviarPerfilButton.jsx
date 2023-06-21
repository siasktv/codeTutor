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
    editIndex
  } = props

  const isDoneCount = Object.values(isDone).filter(value => value === true)

  const handleClick = () => {
    if (isDisabled) return
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
    }
  }
  return (
    <button
      className='inline-block rounded border transition-all duration-200 ease-in-out border-codecolor bg-codecolor px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-codecolor focus:outline-none focus:ring active:text-codecolor disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-default disabled:border-gray-400 disabled:opacity-50'
      disabled={isDisabled}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default EnviarPerfilButton
