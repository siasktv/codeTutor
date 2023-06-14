import { TutorInfoR, TutorInfoL } from '../layouts'

const TutorProfile = () => {
  return (
    <div className='bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0'>
      {/* Tabla de información Izquierda */}
      <TutorInfoL />
      {/* Tabla de Información Derecha */}
      <TutorInfoR />
    </div>
  )
}
export default TutorProfile
