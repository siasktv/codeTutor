const AgregarButton = props => {
  const { onClick, isDone, next } = props

  return (
    <button
      className='lg:w-28 w-24 transition-all duration-100 ease-in-out hover:border-codecolor border-transparent border hover:border py-1 lg:py-2 flex items-center rounded bg-[#7D5AE21A] text-[#7D5AE2] justify-center dark:bg-codecolor dark:text-codecolorlighter dark:hover:bg-codecolordark dark:border-none'
      onClick={onClick}
    >
      {next === 'bio' && <>{isDone?.bio ? 'Editar' : 'Agregar'}</>}
      {next === 'experience' && 'Agregar'}
      {next === 'skills' && 'Agregar'}
      {next === 'projects' && 'Agregar'}
      {next === 'rate' && <>{isDone?.rate ? 'Editar' : 'Agregar'}</>}
    </button>
  )
}

export default AgregarButton
