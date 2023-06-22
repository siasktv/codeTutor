import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const TutorFormProgressBar = props => {
  const {
    progress,
    setProgress,
    section,
    setSection,
    isDone,
    form,
    setForm,
    dataForm
  } = props
  const totalProgress = 6
  const progressPercent = (progress / totalProgress) * 100
  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate()

  const isDoneCount = Object.values(isDone).filter(value => value === true)

  const handleBack = e => {
    e.preventDefault()
    if (section === 'form') {
      setProgress(progress - 1 - isDoneCount.length)
      setSection('data')
    } else if (
      section === 'bio' ||
      section === 'experience' ||
      section === 'skills' ||
      section === 'projects' ||
      section === 'rate'
    ) {
      setSection('form')
      setForm({
        ...form,
        avatar: dataForm.avatar,
        editExpIndex: null,
        editSkillIndex: null,
        editProjectIndex: null
      })
    }
  }

  const handleRedirect = e => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <>
      <div className='flex items-center pl-28 gap-x-2 mt-[37px] '>
        {progress === 0 ? (
          <div
            className='rounded-full items-center justify-center flex p-2 text-[#7F56D9] text-[10px] font-bold  bg-[#7D5AE21A] w-[40px] h-[40px] hover:text-codecolordark cursor-pointer'
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faXmark} aria-hidden='true' size='lg' />
          </div>
        ) : (
          <div
            className='rounded-full items-center justify-center flex p-2 text-[#7F56D9] text-[10px] font-bold  bg-[#7D5AE21A] w-[40px] h-[40px] cursor-pointer hover:text-codecolordark'
            onClick={e => handleBack(e)}
          >
            <FontAwesomeIcon icon={faArrowLeft} aria-hidden='true' size='lg' />
          </div>
        )}

        <div className='w-full pr-28'>
          <span id='ProgressLabel' className='sr-only'>
            Loading
          </span>
          <span
            role='progressbar'
            aria-labelledby='ProgressLabel'
            aria-valuenow='50'
            className='block rounded-full bg-gray-200'
          >
            <span
              className='block h-4 rounded-full bg-[#00E300] text-center text-[10px]/4 '
              style={{ width: `${progressPercent}%` }}
            ></span>
          </span>
        </div>
      </div>
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

export default TutorFormProgressBar
