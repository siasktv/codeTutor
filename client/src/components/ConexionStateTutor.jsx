/* eslint-disable react/prop-types */
const ConexionStateTutor = props => {
  return (
    <>
      {props.offline === true ? (
        <h2 className='font-semibold text-l text-red-500'>◉ Offline</h2>
      ) : (
        <h2 className='font-semibold text-l text-green-500'>◉ Online</h2>
      )}
    </>
  )
}
export default ConexionStateTutor
