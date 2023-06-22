import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const CancelarPerfilButton = () => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const handleRedirect = e => {
    e.preventDefault()
    // scroll to top
    window.scrollTo(0, 0)
    navigate('/')
  }

  return (
    <>
      <button
        className='inline-block rounded border transition-all duration-200 ease-in-out border-[#C3D3E2] px-8 py-3 text-sm font-medium text-[#646464] hover:bg-red-600 hover:text-white focus:outline-none'
        onClick={() => setShowModal(true)}
      >
        Cancelar
      </button>
      {showModal === true && (
        <div
          className='relative z-10'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'
        >
          <div className='fixed inset-0 bg-[#141414] bg-opacity-70 transition-opacity'></div>
          <div className='fixed inset-0 z-10 overflow-y-auto'>
            <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
              <div className='relative transform overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
                <div className='bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                  <div className='sm:flex sm:items-center justify-center'>
                    <div className='mt-3 text-center'>
                      <h3
                        className='text-lg font-semibold leading-6 text-[#05004E] text-center pb-8 pt-16'
                        id='modal-title'
                      >
                        ¿Estás seguro de que deseas cancelar el formulario?
                      </h3>
                      <div className='mt-2 max-w-lg'>
                        <p className='text-lg font-semibold text-[#05004E] text-center'>
                          Si cancelas el formulario, perderás todos los datos
                          ingresados hasta el momento.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='bg-gray-50 px-4 pb-12 pt-10 sm:flex sm:flex-row justify-center sm:px-6'>
                  <button
                    type='button'
                    className='mt-3 inline-flex justify-center rounded-lg bg-codecolor px-3 py-3 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-codecolordark transition-all ease-in-out duration-200 sm:mt-0 sm:w-auto mr-2'
                    onClick={() => setShowModal(false)}
                  >
                    No, continuar con el formulario
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex justify-center rounded-lg bg-red-500 px-3 py-3 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-700 transition-all ease-in-out duration-200 sm:mt-0 sm:w-auto'
                    onClick={e => handleRedirect(e)}
                  >
                    Sí, volver al inicio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CancelarPerfilButton
