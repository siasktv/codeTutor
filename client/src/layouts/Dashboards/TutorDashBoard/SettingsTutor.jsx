import {
  LoaderMini,
  Biography,
  Skills,
  Projects,
  Rates,
  Experience,
} from '../../../components'

import { useSelector, useDispatch } from 'react-redux'
import { tutorFetchById } from '../../../redux/features/tutors/tutorsSlice'
import { useEffect, useState } from 'react'

export default function SettingsTutor(props) {
  const { user } = props

  const tutor = useSelector((state) => state.tutors.tutor)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tutorFetchById(user.tutor._id))
  }, [dispatch])

  console.log('tutor', tutor)

  console.log('user', user)

  //skills

  return (
    <div className="flex mx-52 w-full flex-col gap-11 ">
      <Biography bio={user.tutor.bio} id={user.tutor._id} />
      <Skills skills={tutor.skills} id={tutor._id} />
      <Experience experience={tutor.experience} id={tutor._id} />
      <Projects projects={tutor.projects} id={tutor._id} />
      <Rates rates={user.tutor.rates[0]} id={user.tutor._id} />
    </div>
  )
}
