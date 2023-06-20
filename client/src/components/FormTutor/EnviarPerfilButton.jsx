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
    isDone
  } = props

  const handleClick = () => {
    if (isDisabled) return
    if (section === 'data') {
      setSection('form')
      if (isDone.bio === false) {
        setProgress(1)
      } else {
        setProgress(2)
      }
      setForm({ ...form, ...dataForm })
    } else if (section === 'bio') {
      setSection('form')
      setForm({ ...form, bio: dataForm })
      if (isDone.bio === false) {
        setIsDone({ ...isDone, bio: true })
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
