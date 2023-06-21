import { useSelector, useDispatch } from 'react-redux'
import { TutorInfoR, TutorInfoL } from '../layouts'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { tutorFetchById } from '../redux/features/tutors/tutorsSlice'
import { Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import NavUserNotifications from '../components/NavUserNotifications'

const TutorProfile = () => {
  const { id } = useParams()
  const tutor = useSelector(state => state.tutors.tutor)
  const error = useSelector(state => state.tutors.error)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tutorFetchById(id))
  }, [dispatch, id])

  useEffect(() => {
    if (tutor?.bio?.specialty) {
      if (tutor._id === id) {
        setIsLoading(false)
      } else {
        setIsLoading(true)
      }
    }
  }, [tutor, id])

  useEffect(() => {
    if (error) {
      navigate('/search')
    }
  }, [error])

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <>
          <NavUserNotifications/>
          <div className='bg-gray-100 flex items-start px-20 py-10 gap-2 absolute w-full h-max left-0 right-0'>
            {tutor.bio.specialty && (
              <>
                {/* Tabla de información Izquierda */}
                <TutorInfoL tutor={tutor} />
                {/* Tabla de Información Derecha */}
                <TutorInfoR tutor={tutor} />
              </>
            )}
          </div>
        </>
      )}
    </>
  )
}
export default TutorProfile
