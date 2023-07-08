/* eslint-disable react/prop-types */
const PictureTutor = props => {
  return (
    <img
      src={props.image}
      alt='Imagen de perfil Tutor'
      className='w-full h-full object-cover'
      referrerPolicy='no-referrer'
    />
  )
}
export default PictureTutor
