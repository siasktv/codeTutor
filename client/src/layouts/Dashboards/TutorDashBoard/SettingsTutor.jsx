import {
  LoaderMini,
  Biography,
  Skills,
  Projects,
  Rates,
  Experience,
  Loader
} from '../../../components'

import { useSelector, useDispatch } from 'react-redux'
import { tutorFetchById } from '../../../redux/features/tutors/tutorsSlice'
import { useEffect, useState } from 'react'

export default function SettingsTutor (props) {
  const { user } = props

  const tutor = useSelector(state => state.tutors.tutor)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(tutorFetchById(user.tutor._id))
  }, [dispatch])

  useEffect(() => {
    if (tutor?.bio?.description?.length > 0) {
      setIsLoading(false)
    }
  }, [tutor])

  //skills

  return (
    <>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen -mt-28 overflow-hidden'>
          <Loader />
        </div>
      ) : (
        <div className='flex mx-52 w-full flex-col gap-4 max-lg:mx-2 max-lg:gap-2'>
          <Biography bio={user.tutor.bio} id={user.tutor._id} />
          <Skills skills={tutor.skills} id={tutor._id} />
          <Experience experience={tutor.experience} id={tutor._id} />
          <Projects projects={tutor.projects} id={tutor._id} />
          <Rates rates={user.tutor.rates[0]} id={user.tutor._id} />
        </div>
      )}
    </>
  )
}
