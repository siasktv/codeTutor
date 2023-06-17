import { faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function MessageContainer (props) {
  const { tutor, handleShowMessage, user } = props

  return (
    // container must be in the bottom right corner
    <div className='fixed bottom-0 right-28 z-50 h-125 w-96 bg-white rounded-t-lg'>
      <div className='flex flex-col justify-center items-center bg-codecolor p-2 m-0 rounded-t-md'>
        <div className='flex justify-end w-full'>
          <FontAwesomeIcon
            icon={faXmark}
            className='text-white cursor-pointer'
            onClick={e => handleShowMessage(e, tutor)}
          />
        </div>
        <div className='flex justify-center items-center'>
          <h1 className='text-white font-semibold text-xl'>
            Chat con {tutor.user.fullName}
          </h1>
          {tutor.offline ? (
            <h2 className='font-semibold text-xl text-red-500 ml-2'>◉</h2>
          ) : (
            <h2 className='font-semibold text-xl text-green-500 ml-2'>◉</h2>
          )}
        </div>
        <p className='text-white text-sm'>{tutor.bio.specialty}</p>
      </div>
      <div className='flex flex-col justify-start items-center bg-white p-2 m-0 rounded-b-md overflow-y-auto overflow-x-hidden h-[365px]'>
        <div
          id='message_from_tutor'
          className='flex flex-start justify-start items-center w-full  bg-gray-100 rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-gray-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{tutor.user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>Hola, ¿cómo estás?</p>
            </div>
          </div>
        </div>
        <div
          id='message_from_student'
          className='flex flex-end justify-end items-center w-full rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-blue-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>
                Todo bien, ¿y tú? Yo testeando el chat de CodeTutor.
              </p>
            </div>
          </div>
        </div>
        <div
          id='message_from_tutor'
          className='flex flex-start justify-start items-center w-full  bg-gray-100 rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-gray-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{tutor.user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>
                Muy bien, no te olvides de hacer el deploy.
              </p>
            </div>
          </div>
        </div>
        <div
          id='message_from_student'
          className='flex flex-end justify-end items-center w-full rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-blue-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>
                Muchas gracias por el recordatorio.
              </p>
            </div>
          </div>
        </div>
        <div
          id='message_from_tutor'
          className='flex flex-start justify-start items-center w-full  bg-gray-100 rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-gray-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{tutor.user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>
                Hola, ¿cómo estás? Hola, ¿cómo estás?Hola, ¿cómo estás?Hola,
                ¿cómo estás?Hola, ¿cómo estás?Hola, ¿cómo estás?
              </p>
            </div>
          </div>
        </div>
        <div
          id='message_from_student'
          className='flex flex-end justify-end items-center w-full rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-blue-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>Hola, ¿cómo estás?</p>
            </div>
          </div>
        </div>
        <div
          id='message_from_tutor'
          className='flex flex-start justify-start items-center w-full  bg-gray-100 rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-gray-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{tutor.user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>
                Hola, ¿cómo estás? Hola, ¿cómo estás?Hola, ¿cómo estás?Hola,
                ¿cómo estás?Hola, ¿cómo estás?Hola, ¿cómo estás?
              </p>
            </div>
          </div>
        </div>
        <div
          id='message_from_student'
          className='flex flex-end justify-end items-center w-full rounded-md p-2 '
        >
          <div className='flex flex-col justify-center items-start bg-blue-100 p-4 rounded-t-md rounded-bl-md max-w-[75%]'>
            <strong className='text-blue-500'>{user.fullName}</strong>
            <div className='flex flex-col justify-center items-center text-left'>
              <p className='text-sm text-gray-500'>Hola, ¿cómo estás?</p>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center items-center bg-white p-2 m-0 rounded-b-md '>
        <input
          type='text'
          className='w-full h-10 rounded-md p-2 m-0 focus:outline-none outline-none'
          placeholder='Escribe un mensaje...'
        />
        <button className='bg-codecolor hover:bg-codecolordark text-white font-bold py-2 px-4 rounded'>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  )
}
