import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MessageMinimized (props) {
  const { tutor, handleCloseMessage, handleMaximizeMessage } = props

  return (
    <div
      className='fixed bottom-0 lg:right-28 z-50 lg:w-[380px] w-[95%] max-lg:right-1 max-lg:max-w-[380px] right-0 bg-white dark:bg-gray-200 rounded-t-lg cursor-pointer'
      onClick={e => handleMaximizeMessage(e)}
    >
      <div className='flex w-full justify-between items-center bg-codecolor p-2 m-0 rounded-t-md'>
        <h1 className='text-white dark:text-gray-200 font-semibold text-xl self-center items-center justify-center text-center flex-1'>
          Chat con {tutor.user.fullName}
        </h1>
        <div className='flex justify-end pr-2'>
          <FontAwesomeIcon
            icon={faXmark}
            className='text-white dark:text-gray-200 cursor-pointer m-0'
            onClick={e => handleCloseMessage(e)}
          />
        </div>
      </div>
    </div>
  )
}
