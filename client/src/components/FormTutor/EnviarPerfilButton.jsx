const EnviarPerfilButton = (props) => {
  return (
    <button className="inline-block rounded border transition-all duration-200 ease-in-out border-codecolor bg-codecolor px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-codecolor focus:outline-none focus:ring active:text-codecolor">
      {props.title}
    </button>
  )
}

export default EnviarPerfilButton
