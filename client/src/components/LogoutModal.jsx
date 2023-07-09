import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { signOut } from '../firebase/client'

export default function LogoutModal (props) {
  const { setShowModalLogout } = props
  return (
    <>
      <div className='fixed z-[10000] inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center h-[650px] lg:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          ></span>
          <div className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden dark:shadow-none shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
              <div className='sm:flex sm:items-center flex-col'>
                <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'>
                  <FontAwesomeIcon
                    icon={faExclamation}
                    className='text-red-600'
                  />
                </div>
                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                  <h3
                    className='text-xl font-semibold mt-3 text-center leading-6 dark:text-gray-200 text-gray-900'
                    id='modal-title'
                  >
                    Cerrar sesión
                  </h3>
                  <div className='mt-2'>
                    <p className='text-md text-gray-500 dark:text-gray-300'>
                      ¿Estás seguro de que quieres cerrar sesión?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse items-center justify-center'>
              <button
                type='button'
                className='w-full transition-all duration-200 ease-in-out inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm'
                onClick={() => {
                  signOut()
                  setShowModalLogout(false)
                }}
              >
                Cerrar sesión
              </button>
              <button
                type='button'
                className='mt-3 w-full dark:bg-gray-700 dark:text-gray-200 dark:border-none dark:hover:bg-gray-600 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200 ease-in-out '
                onClick={() => setShowModalLogout(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
