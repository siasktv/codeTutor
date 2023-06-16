import ImageSlider from '../components/ImageSlider'
import Navlogo from '../components/Navlogo'
import { Loader } from '../components'
import FormRegister from '../layouts/FormRegister'
import useUser from '../hooks/useUser'
import React, { useEffect, useState } from 'react'

const Register = () => {
  const user = useUser()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user) {
      window.location.href = '/navuser'
    } else if (user === null) {
      setIsLoading(false)
    }
  }, [user])
  return (
    <>
      {isLoading && (
        <div className='flex justify-center items-center h-screen'>
          <Loader />
        </div>
      )}
      {!isLoading && (
        <div className='overflow-hidden'>
          <Navlogo />
          <div className='flex'>
            <div className='w-6/12 mt-20'>
              <ImageSlider />
            </div>
            <div className='flex-grow flex items-center justify-center'>
              <div className='w-11/12'>
                <FormRegister />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Register
