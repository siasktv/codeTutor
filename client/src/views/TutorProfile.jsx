import { useSelector, useDispatch } from 'react-redux'
// import { TutorInfoR, TutorInfoL } from '../layouts'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { tutorFetchById } from '../redux/features/tutors/tutorsSlice'

const TutorProfile = () => {
  const {id} = useParams()
  const tutor = useSelector((state) => state.tutors.tutor);

  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(tutorFetchById(id))
  }, [dispatch,id])
  
console.log(tutor);
  return (
    <div className='bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0'>
      {/* Tabla de información Izquierda */}
      {/* <TutorInfoL /> */}
      {/* Tabla de Información Derecha */}
      {/* <TutorInfoR /> */}
    </div>
  )
}
export default TutorProfile
