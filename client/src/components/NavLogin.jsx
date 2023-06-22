import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Default } from '../assets'
import { signOut } from '../firebase/client'

const NavLogin = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const handleDocumentClick = event => {
      if (!event.target.closest('.menu-button') && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isMenuOpen])

  const handleMenuButtonClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleShowProfile = () => {
    setShowProfile(!showProfile)
  }

  return (
    <header className=''>
      <div className='mx-auto max-w-screen-xl p-4'>
        <div className='flex items-center justify-between gap-4 lg:gap-10'>
          <div className='flex lg:w-0 lg:flex-1'>
            <Link to='/'>
              <span className='inline-block h-10 w-52'>
                <div className='flex'>
                  <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                  <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply'></div>
                  <h1 className='font-bold text-2xl ml-1'>Code-Tutor.</h1>
                </div>
              </span>
            </Link>
          </div>

          <div className='hidden flex-1 items-center justify-end gap-4 sm:flex'>
            {!user && (
              <>
                <Link
                  className='rounded-lg px-5 py-2 text-sm font-medium hover:rounded-lg hover:bg-codecolor hover:text-white hover:outline-4 hover:outline-violet-300 hover:outline'
                  to='/login'
                >
                  Iniciar sesión
                </Link>

                <div className='relative inline-block text-left'>
                  <button
                    type='button'
                    className='px-5 py-2 menu-button text-sm font-medium hover:bg-codecolor hover:text-white hover:rounded-lg hover:outline-4 hover:outline-violet-300 hover:outline'
                    onClick={handleMenuButtonClick}
                    aria-expanded={isMenuOpen}
                    aria-haspopup='true'
                  >
                    Crea tu cuenta gratis
                  </button>
                  {isMenuOpen && (
                    <div
                      className='absolute z-50 mt-2 w-44 origin-top-right rounded-md bg-transparent'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='menu-button'
                      tabIndex='-1'
                    >
                      <div className='' role='none'>
                        <Link
                          to='/register'
                          className='text-white bg-codecolor rounded-lg flex items-center py-2 my-2 text-sm font-medium justify-center text-center outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 hover:outline'
                          role='menuitem'
                          tabIndex='-1'
                          id='menu-item-0'
                        >
                          <span className=''>Soy estudiante</span>
                        </Link>
                        <Link
                          to='/register'
                          className='text-white bg-codecolor rounded-lg flex items-center py-2 my-3 text-sm font-medium justify-center text-center outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 hover:outline'
                          role='menuitem'
                          tabIndex='-1'
                          id='menu-item-1'
                        >
                          <span className='ml-2'>Soy tutor</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
            {user && (
              <>
                <div className='flex flex-col items-center'>
                  <div className='bg-black rounded-full border-none'>
                    <img
                      src={user ? user.image : Default}
                      alt='avatar'
                      className='w-10 h-10  rounded-full border-none cursor-pointer'
                      onClick={handleShowProfile}
                    ></img>
                  </div>
                  {showProfile && (
                    <div className='absolute top-16 bg-white rounded-xl shadow-xl z-50 border border-[#1414140D]'>
                      <div className='flex flex-col gap-2 p-2'>
                        <div className='flex flex-col gap-2'>
                          <Link to='/user'>
                            <button className='text-white bg-codecolor rounded-xl p-2 outline-violet-100 outline-4 outline hover:outline-4 hover:outline-violet-300 w-32 hover:outline text-center'>
                              {user ? 'Ir a mi perfil' : 'Iniciar sesión'}
                            </button>
                          </Link>
                          {user && (
                            <button
                              className='text-white bg-red-500 rounded-xl p-2 mt-1 outline-red-100 outline-4 outline hover:outline-4 hover:outline-red-300 w-32 hover:outline text-center'
                              onClick={signOut}
                            >
                              Cerrar sesión
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div className='lg:hidden'>
            <button
              className='rounded-lg bg-gray-100 p-2 text-gray-600'
              type='button'
            >
              <span className='sr-only'>Open menu</span>
              <svg
                aria-hidden='true'
                className='h-5 w-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M4 6h16M4 12h16M4 18h16'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavLogin
