/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPercentage } from '@fortawesome/free-solid-svg-icons'

const NameTutor = props => {
  console.log(props)
  return (
    <div className='flex flex-row items-center justify-center'>
      <h2 className='text-2xl font-medium'>{props.fullName}</h2>
      {props.promo && (
        <FontAwesomeIcon
          icon={faPercentage}
          width='15'
          height='15'
          className='text-orange-700 ml-1.5 mt-1.5 bg-orange-200 rounded-full p-1'
          title='Este tutor ofrece los primeros 15 minutos gratis para la primera sesión de nuevos usuarios.'
        />
      )}
    </div>
  )
}
export default NameTutor
