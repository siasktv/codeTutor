import { AgregarButton } from '../../index'
import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardForm = props => {
  const { next, title, children, form, setIsDone, setSection, isDone } = props

  const handleAdd = () => {
    setSection(next)
    // scroll to top
    window.scrollTo(0, 0)
  }

  return (
    <div className='bg-white w-full h-full border border-[#1414140D] rounded-[8px]'>
      <div className='flex flex-col w-full gap-[62px] py-[36px] px-[52px]'>
        <h2 className='font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]'>
          {title}{' '}
          {next === 'bio' && isDone?.bio && (
            <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />
          )}
          {next === 'bio' && !isDone?.bio && (
            <FontAwesomeIcon icon={faWarning} className='text-orange-300' />
          )}
          {next === 'experience' && isDone?.experience && (
            <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />
          )}
          {next === 'experience' && !isDone?.experience && (
            <FontAwesomeIcon icon={faWarning} className='text-orange-300' />
          )}
          {next === 'skills' && isDone?.skills && (
            <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />
          )}
          {next === 'skills' && !isDone?.skills && (
            <FontAwesomeIcon icon={faWarning} className='text-orange-300' />
          )}
          {next === 'projects' && isDone?.projects && (
            <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />
          )}
          {next === 'projects' && !isDone?.projects && (
            <FontAwesomeIcon icon={faWarning} className='text-orange-300' />
          )}
          {next === 'rate' && isDone?.rate && (
            <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />
          )}
          {next === 'rate' && !isDone?.rate && (
            <FontAwesomeIcon icon={faWarning} className='text-orange-300' />
          )}
        </h2>
        {children}
        <AgregarButton onClick={handleAdd} isDone={isDone} next={next} />
      </div>
    </div>
  )
}

export default CardForm
