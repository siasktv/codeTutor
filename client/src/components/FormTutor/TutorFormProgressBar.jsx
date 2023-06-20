import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const TutorFormProgressBar = props => {
  const { progress, setProgress, section, setSection, isDone } = props
  const totalProgress = 7
  const progressPercent = (progress / totalProgress) * 100
  const navigate = useNavigate()

  const handleBack = e => {
    e.preventDefault()
    if (section === 'form') {
      if (isDone.bio === false) {
        setProgress(progress - 1)
      } else {
        setProgress(progress - 2)
      }
      setSection('data')
    } else if (section === 'bio') {
      setSection('form')
    }
  }

  const handleCancel = e => {
    e.preventDefault()
    if (window.confirm('¿Estás seguro de que deseas cancelar el registro?')) {
      navigate('/')
    } else {
      return
    }
  }

  return (
    <div className='flex items-center pl-28 gap-x-2 mt-[37px] '>
      {progress === 0 ? (
        <div
          className='rounded-full items-center justify-center flex p-2 text-[#7F56D9] text-[10px] font-bold  bg-[#7D5AE21A] w-[40px] h-[40px] hover:text-codecolordark cursor-pointer'
          onClick={e => handleCancel(e)}
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
  )
}

export default TutorFormProgressBar
