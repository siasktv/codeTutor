const TutorFormWelcome = props => {
  const { user } = props
  return (
    <div className='flex flex-col w-full items-start lg:px-28 max-lg:items-center gap-y-2'>
      <h2 className='text-[#05004E] dark:text-gray-200 font-bold lg:text-2xl text-xl'>
        ¡Hola, {user.fullName}! 👋🏻
      </h2>
      <p className='text-[#737791] dark:text-gray-400'>
        Completa el siguiente formulario para convertirte en un tutor y espera
        ser aprobado.
      </p>
    </div>
  )
}

export default TutorFormWelcome
