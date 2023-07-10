import {
  Hero,
  Services,
  Team,
  Testimonials,
  Footer,
  NavLogin,
} from '../components'

import useUser from '../hooks/useUser'

const Landing2 = () => {
  const user = useUser()
  return (
    <section className="w-full min-h-screen bg-gray-50">
      <div className="sticky top-0 z-[99999]">
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
