const AgregarButton = (props) => {
  const { onClick, isDone } = props

  return (
    <button
      className="w-28 transition-all duration-100 ease-in-out hover:border-codecolor border-transparent border hover:border py-2 flex items-center rounded bg-[#7D5AE21A] text-[#7D5AE2] justify-center "
      onClick={onClick}
    >
      {isDone?.bio ? 'Editar' : 'Agregar'}
    </button>
  )
}

export default AgregarButton
