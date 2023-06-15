import notification from '../assets/notification.svg'
import useUser from '../hooks/useUser'
import { useEffect } from 'react'
import { signOut } from '../firebase/client'

const NavUserNotifications = () => {
  const user = useUser()

  useEffect(() => {
    if (user === null) {
      window.location.href = '/login'
    }
  }, [user])

  return (
    <>
      {user && (
        <>
          <header className=' sm:w-screen 2xl:w-1500px -ml-0 xl:-ml-28'>
            <div className='mx-auto max-w-screen-xl p-4 '>
              <div className='flex items-center justify-between gap-4 lg:gap-10'>
                <div className='flex lg:w-0 lg:flex-1'>
                  <a href='#'>
                    <span className='inline-block h-10 w-52'>
                      <div className='flex'>
                        <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                        <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply'></div>
                        <h1 className='font-bold text-2xl ml-1'>Code-Tutor.</h1>
                      </div>
                    </span>
                  </a>
                </div>
                <div className='w-72px h-72px bg-black rounded-full border-none'>
                  <img
                    src={user.image}
                    alt='avatar'
                    className='w-72px h-72px  rounded-full border-none cursor-pointer'
                  ></img>
                </div>
                <div className=' sm:mx-2 xl:-mr-20 p-4  bg-violet-100 rounded-xl  cursor-pointer'>
                  <img src={notification} className=''></img>
                </div>
              </div>
            </div>
          </header>
          <div className='flex justify-center items-center'>
            <button onClick={signOut}>Sign Out</button>
          </div>
        </>
      )}
      {!user && (
        <div className='flex justify-center items-center h-screen'>
          <h1 className='text-4xl font-bold'>Loading...</h1>
        </div>
      )}
    </>
  )
}

export default NavUserNotifications
