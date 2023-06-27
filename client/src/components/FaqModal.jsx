import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from 'react'
import LoaderMini from './LoaderMini'
import axios from 'axios'

export default function FaqModal (props) {
  const { selectedOption, setShowModal, user } = props
  const [isDisabled, setIsDisabled] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [charCount, setCharCount] = useState(0)

  const [text, setText] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    setIsSubmitting(true)
  }

  const handleInput = e => {
    const { value } = e.target
    if (charCount <= 500) {
      setText(value)
      setCharCount(value.length)
    } else {
      setCharCount(500)
      return
    }
  }

  useEffect(() => {
    if (text.trim().length > 0 && charCount <= 500) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [text, charCount])

  return (
    <div className='fixed z-[9999] inset-0 overflow-y-auto'>
      {/* overlay */}
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
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
        <form
          className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4'>
            <div className='sm:flex sm:items-start'>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full'>
                <h3
                  className='text-2xl leading-6 font-semibold text-gray-900'
                  id='modal-headline'
                >
                  {selectedOption === 'question'
                    ? 'Sugerir una nueva pregunta'
                    : 'Enviar un comentario'}
                </h3>
                <div className='mt-6 w-full'>
                  {!user && (
                    <div className='flex items-center justify-between bg-orange-200 px-3 py-2 rounded-md mb-4'>
                      <p className='text-sm text-orange-700 font-semibold mb-1 text-justify'>
                        <FontAwesomeIcon
                          icon={faWarning}
                          className='mr-2 mt-2'
                        />
                        {selectedOption === 'question'
                          ? 'Estás enviando una pregunta como anónimo, por lo que quedarás excluido de los beneficios que conlleva enviar una pregunta y que sea aprobada, incluyendo los créditos que se te otorgan por ello. Si deseas enviar una pregunta con usuario, inicia sesión o regístrate.'
                          : 'Estás enviando un comentario como anónimo, por lo que quedarás excluido de los beneficios que conlleva enviar un comentario y que sea aprobado, incluyendo los créditos que se te otorgan por ello. Si deseas enviar un comentario con usuario, inicia sesión o regístrate.'}
                      </p>
                    </div>
                  )}
                  {user && (
                    <div className='flex items-center justify-between bg-green-200 px-3 py-2 rounded-md mb-4'>
                      <p className='text-sm text-green-700 font-semibold mb-1 text-justify'>
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className='mr-2 mt-2'
                        />
                        {selectedOption === 'question'
                          ? `Estás enviando una pregunta como ${user.fullName}. Esto significa que de ser aprobada, recibirás los beneficios correspondiente en tu cuenta asociada.`
                          : `Estás enviando un comentario como ${user.fullName}. Esto significa que de ser aprobado, recibirás los beneficios correspondiente en tu cuenta asociada.`}
                      </p>
                    </div>
                  )}
                  <textarea
                    className='w-full h-36 border border-gray-300 rounded-md resize-none focus:ring-codecolor focus:border-codecolor px-3 py-2'
                    placeholder={
                      selectedOption === 'question'
                        ? 'Escribe tu pregunta aquí'
                        : 'Escribe tu comentario aquí'
                    }
                    value={text}
                    onChange={e => handleInput(e)}
                    maxLength={500}
                  />
                  <div className='flex justify-end mx-1'>
                    <p className='text-sm text-gray-500'>{charCount}/500</p>
                  </div>
                  <p className='mt-2 text-sm text-gray-500'>
                    {selectedOption === 'question'
                      ? 'Tu pregunta será revisada por el equipo de CodeTutor y, si es aprobada, será publicada en la sección de preguntas frecuentes.'
                      : 'Tu comentario será revisado por el equipo de CodeTutor y será utilizado para mejorar la experiencia de los usuarios.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-codecolor text-base font-medium text-white hover:bg-codecolordark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor sm:ml-3 sm:w-20 sm:text-sm'
              onClick={() => setShowModal(false)}
            >
              Cancelar
            </button>
            <button
              disabled={isDisabled}
              className={
                isDisabled
                  ? 'mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-300 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-20 sm:text-sm'
                  : 'mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-codecolor text-base font-medium text-white hover:bg-codecolordark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor sm:mt-0 sm:ml-3 sm:w-20 sm:text-sm'
              }
              onClick={handleSubmit}
              type='submit'
            >
              {isSubmitting ? (
                <LoaderMini />
              ) : success ? (
                <FontAwesomeIcon icon={faCheckCircle} />
              ) : (
                'Enviar'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
