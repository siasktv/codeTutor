import {
  faAsterisk,
  faCalendar,
  faCheckCircle,
  faCreditCard,
  faFileInvoice,
  faReceipt,
  faXmark
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import moment from 'moment'

export default function PaymentModal ({ session, setPaymentModal }) {
  return (
    // create a centered modal
    <div className='fixed z-[9999] inset-0 overflow-y-auto'>
      {/* overlay */}
      <div className='flex items-end justify-center lg:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        {/* background overlay */}
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75' />
        </div>
        {/* center modal */}
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        {/* modal content */}
        <div
          className='inline-block align-bottom max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] max-lg:left-1/2 max-lg:-translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-codecolor sm:mx-0 sm:h-10 sm:w-10'>
                <FontAwesomeIcon
                  icon={faReceipt}
                  className='w-6 h-6 text-white'
                />
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3
                  className='text-lg leading-6 font-medium dark:text-gray-200 text-gray-900'
                  id='modal-headline'
                >
                  Datos del pago de la sesión {session.sessionId}
                </h3>
                <div className='mt-5 space-y-3'>
                  <p className='text-md text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>Fecha:</span>{' '}
                    {moment
                      .unix(session.paymentDetails.date)
                      .format('DD/MM/YYYY HH:mm:ss')}{' '}
                    hs
                  </p>
                  <p className='text-md text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>Monto:</span> USD${' '}
                    {session.paymentDetails.amount / 100}
                  </p>
                  <p className='text-md text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>Estado:</span>
                    <span className='bg-green-200 text-green-600 py-0.5 px-2 ml-2 rounded-md font-semibold text-sm dark:bg-green-600 dark:text-green-200'>
                      <FontAwesomeIcon
                        icon={faCheckCircle}
                        className='mr-0.5 text-xs'
                      />
                      Aprobado
                    </span>
                  </p>
                  <p className='text-md text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>Método de pago:</span>
                    <span className='bg-gray-200 text-gray-600 py-0.5 px-2 ml-2 rounded-md font-semibold text-sm dark:text-gray-200 dark:bg-gray-600'>
                      <FontAwesomeIcon
                        icon={faCreditCard}
                        className='mr-1 text-xs'
                      />
                      {session.paymentDetails.card.brand
                        .charAt(0)
                        .toUpperCase() +
                        session.paymentDetails.card.brand.slice(1)}{' '}
                      terminada en {session.paymentDetails.card.last4}
                    </span>
                  </p>
                  <p className='text-md text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>Tipo de tarjeta:</span>{' '}
                    {session.paymentDetails.card.type === 'credit'
                      ? 'Crédito'
                      : 'Débito'}
                  </p>
                  <p className='text-md text-gray-500 dark:text-gray-300'>
                    <span className='font-bold'>Comprobante:</span>
                    <span className='bg-codecolorlighter text-codecolor py-0.5 px-2 ml-2 rounded-md font-semibold text-sm dark:bg-codecolor dark:text-codecolorlighter'>
                      <FontAwesomeIcon
                        icon={faFileInvoice}
                        className='mr-1 text-xs'
                      />
                      <a
                        href={session.paymentDetails.receiptUrl}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Descargar comprobante
                      </a>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='text-sm text-justify wfull justify-center items-center flex flex-col'>
            <p className=' w-[80%] dark:text-gray-200'>
              <span className='font-bold'>
                ¿Tienes un problema con el pago?{' '}
              </span>
              Puedes contactarnos cuando desees a{' '}
              <a
                href='mailto:support@code-tutor.dev'
                className='text-codecolor hover:text-codecolordark transition-all duration-200'
              >
                support@code-tutor.dev
              </a>{' '}
              y analizaremos tu situación.
            </p>
          </div>
          <div className='bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-codecolor text-base font-medium text-white hover:bg-codecolordark focus:outline-none transition-all duration-200 sm:ml-3 sm:w-24 sm:text-sm'
              onClick={() => setPaymentModal(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
