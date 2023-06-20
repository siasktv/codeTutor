import { useNavigate } from 'react-router-dom'

const CancelarPerfilButton = () => {
  const navigate = useNavigate()

  const handleCancel = () => {
    if (window.confirm('¿Estás seguro de cancelar el formulario?')) {
      navigate('/')
    } else {
      return
    }
  }
  return (
    <button
      className='inline-block rounded border transition-all duration-200 ease-in-out border-[#C3D3E2] px-8 py-3 text-sm font-medium text-[#646464] hover:bg-red-600 hover:text-white focus:outline-none'
      onClick={handleCancel}
    >
      Cancelar
    </button>
  )
}

export default CancelarPerfilButton
