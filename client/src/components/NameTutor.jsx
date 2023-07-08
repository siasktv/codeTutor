/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage } from '@fortawesome/free-solid-svg-icons'

const NameTutor = props => {
  return (
    <div className='flex flex-row items-center justify-center'>
      <h2 className='text-2xl font-medium break-all dark:text-gray-200'>
        {props.fullName}
      </h2>
      {props.promo && (
        <FontAwesomeIcon
          icon={faPercentage}
          width='15'
          height='15'
          className='text-orange-700 ml-1.5 mt-1.5 dark:bg-orange-700 dark:text-orange-200 bg-orange-200 rounded-full p-1'
          title='Este tutor ofrece los primeros 15 minutos gratis para la primera sesión de nuevos usuarios.'
        />
      )}
    </div>
  )
}
export default NameTutor
