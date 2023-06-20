import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardTutorData = ({ children, title, correct }) => {
  return (
    <div className='bg-white w-full h-full border border-[#1414140D] rounded-[8px]'>
      <div className='flex flex-col w-full gap-8 py-[36px] px-[52px]'>
        <h2 className='font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]'>
          {title}{' '}
          {correct && (
            <FontAwesomeIcon icon={faCheckCircle} className='text-green-500' />
          )}
          {!correct && (
            <FontAwesomeIcon icon={faWarning} className='text-orange-300' />
          )}
        </h2>
        {children}
      </div>
    </div>
  )
}

export default CardTutorData
