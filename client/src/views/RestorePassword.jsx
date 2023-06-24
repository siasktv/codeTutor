import React from 'react'
import ImageSlider from '../components/ImageSlider'
import Navlogo from '../components/Navlogo'
import FormLogin from '../layouts/FormLogin'
import useUser from '../hooks/useUser'
import { useEffect, useState } from 'react'
import { Loader } from '../components'
import { useNavigate } from 'react-router-dom'
import RestorePasswordForm from '../layouts/RestorePasswordForm'

const RestorePassword = () => {
  const user = useUser()
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const redirect = location.search.split('redirect=')[1]

  useEffect(() => {
    if (user) {
      if (redirect) {
        navigate(redirect)
      } else {
        navigate('/user')
      }
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
        <div className='overflow-hidden h-screen'>
          <Navlogo />
          <div className='flex'>
            <div className='w-6/12 mt-20'>
              <ImageSlider />
            </div>
            <div className='flex-grow flex items-center justify-center'>
              <div className='w-11/12'>
                <RestorePasswordForm  />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default RestorePassword
