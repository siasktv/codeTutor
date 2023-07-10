import {
  Hero,
  Services,
  Team,
  Testimonials,
  Footer,
  NavLogin
} from '../components'

import useUser from '../hooks/useUser'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { tutorsFetch } from '../redux/features/tutors/tutorsSlice'

const Landing2 = () => {
  const dispatch = useDispatch()
  const tutors = useSelector(state => state.tutors.tutors)

  const user = useUser()

  useEffect(() => {
    if (!tutors[0]?.bio?.specialty) {
      dispatch(tutorsFetch())
    }
  }, [dispatch])

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className='w-full min-h-screen'>
      <div className='sticky top-0 z-[99999]'>
        <NavLogin user={user} />
      </div>
      <Hero />
      <Services />
      <Team />
      <Testimonials />
      <Footer />
    </section>
  )
}

export default Landing2
