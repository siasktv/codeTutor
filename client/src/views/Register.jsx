import ImageSlider from '../components/ImageSlider'
import Navlogo from '../components/Navlogo'
import { Loader } from '../components'
import FormRegister from '../layouts/FormRegister'
import useUser from '../hooks/useUser'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const user = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const redirect = location.search.split('redirect=')[1]

  useEffect(() => {
    if (user) {
      if (redirect) {
        navigate(redirect)
      } else navigate('/user')
    } else if (user === null) {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center dark:bg-gray-900 lg:h-screen'>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <div className='overflow-hidden dark:bg-gray-900 h-screen'>
          <Navlogo />
          <div className='flex items-center justify-center'>
            <div className='w-6/12 mb-[450px] ml-20 max-lg:hidden'>
              <ImageSlider />
            </div>
            <div className='flex-grow flex items-center justify-center'>
              <div className='w-11/12'>
                <FormRegister redirect={redirect} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Register
