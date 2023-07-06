/* eslint-disable react/prop-types */
const PictureTutor = props => {
  return (
    <img
      src={props.image}
      alt='Imagen de perfil Tutor'
      className='w-full h-full object-cover'
    />
  )
}
export default PictureTutor
