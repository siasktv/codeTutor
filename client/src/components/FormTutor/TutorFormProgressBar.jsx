import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const TutorFormProgressBar = () => {
  return (
    <div className="flex items-center pl-28 gap-x-2 mt-[37px] ">
      <div className="rounded-full items-center justify-center flex p-2 text-[#7F56D9] text-[10px] font-bold  bg-[#7D5AE21A] w-[40px] h-[40px]">
        <FontAwesomeIcon icon={faArrowLeft} aria-hidden="true" size="lg" />
      </div>
      <div className="w-full pr-28">
        <span id="ProgressLabel" className="sr-only">
          Loading
        </span>
        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          aria-valuenow="50"
          className="block rounded-full bg-gray-200"
        >
          <span
            className="block h-4 rounded-full bg-[#00E300] text-center text-[10px]/4 "
            style={{ width: '50%' }}
          ></span>
        </span>
      </div>
    </div>
  )
}

export default TutorFormProgressBar
