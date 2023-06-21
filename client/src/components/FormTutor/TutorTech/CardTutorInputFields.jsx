import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CardTutorInputFields = ({ children, title, correct }) => {
  return (
    <div className="w-full h-full ">
      <div className="flex flex-col w-full gap-8">
        <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
          {title}{' '}
          {correct && (
            <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
          )}
        </h2>
        {children}
      </div>
    </div>
  )
}

export default CardTutorInputFields
