import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MessageMinimized (props) {
  const { tutor, handleCloseMessage, handleMaximizeMessage } = props

  return (
    <div
      className='fixed bottom-0 right-28 z-50  w-96 bg-white rounded-t-lg cursor-pointer'
      onClick={e => handleMaximizeMessage(e)}
    >
      <div className='flex w-full justify-between items-center bg-codecolor p-2 m-0 rounded-t-md'>
        <h1 className='text-white font-semibold text-xl self-center items-center justify-center text-center flex-1'>
          Chat con {tutor.user.fullName}
        </h1>
        <div className='flex justify-end'>
          <FontAwesomeIcon
            icon={faXmark}
            className='text-white cursor-pointer m-0'
            onClick={e => handleCloseMessage(e)}
          />
        </div>
      </div>
    </div>
  )
}
