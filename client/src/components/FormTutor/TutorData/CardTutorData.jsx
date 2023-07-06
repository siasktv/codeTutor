import { faCheckCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardTutorData = ({ children, title, correct }) => {
  return (
    <div className='bg-white dark:bg-gray-900 w-full h-full border border-[#1414140D] rounded-[8px]'>
      <div className='flex flex-col w-full lg:gap-8 gap-2 lg:py-[36px] lg:px-[52px] px-2 py-2'>
        <h2 className='font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E] dark:text-gray-200'>
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
