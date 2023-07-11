import { contrate, help, revision } from '../../assets/index'
import IconCodeTutor from '../../assets/IconCodeTutor.svg'
import dribbblef from '../../assets/dribbblef.svg'
import facebookf from '../../assets/facebookf.svg'
import githubf from '../../assets/githubf.svg'
import linkedinf from '../../assets/linkedinf.svg'
import twitterf from '../../assets/twitterf.svg'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import LoaderMini from '../../components/LoaderMini'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError(false)
      }, 1000)
    }
  }, [isError])

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setIsSuccess(false)
      }, 1000)
    }
  }, [isSuccess])

  const handleSubmit = e => {
    e.preventDefault()
    setIsSubmitting(true)
    let regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    if (
      email.trim().length === 0 ||
      !regexEmail.test(email) ||
      isSubmitting ||
      isSuccess ||
      isError
    ) {
      setIsSubmitting(false)
      setIsError(true)
      return
    }
    axios
      .post(`${BACKEND_URL}/api/newsletter`, {
        email: email
      })
      .then(res => {
        setIsSubmitting(false)
        setIsSuccess(true)
        setEmail('')
      })
      .catch(err => {
        setIsSubmitting(false)
        setIsError(true)
      })
  }

  return (
    <footer class='bg-[#101828] dark:bg-gray-800 lg:h-52 w-full flex max-md:absolute max-lg:p-5 lg:p-10 overflow-hidden'>
      <div className='flex flex-1 max-lg:flex-col'>
        <div className='flex-col flex max-lg:justify-center max-lg:items-center'>
          <div className=' flex pt-2 '>
            <Link to='/'>
              <span className='inline-block h-10 w-52'>
                <div className='flex'>
                  <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                  <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply dark:mix-blend-normal'></div>
                  <h1 className='font-bold text-2xl ml-1 text-gray-200'>
                    Code-Tutor
                  </h1>
                </div>
              </span>
            </Link>
          </div>
          <h1 className='text-white text-left pt-2 max-lg:hidden'>
            Soluciona tus problemas con la ayuda de expertos.
          </h1>
          <h1 className='text-white text-left pt-2 max-lg:hidden'>
            <Link to='/faqs'>
              <span className='text-codecolor max-lg:hidden font-semibold hover:text-codecolordark'>
                Preguntas frecuentes
              </span>
            </Link>
          </h1>
          <h1 className='text-[#98A2B3] text-left lg:pt-4'>
            © 2023 Code-Tutor. All rights reserved.
          </h1>
          <h1 className='text-white text-left pt-2 lg:hidden'>
            <Link to='/faqs'>
              <span className='text-codecolor lg:hidden font-semibold hover:text-codecolordark'>
                Preguntas frecuentes
              </span>
            </Link>
          </h1>
          {/* form mobile */}
          <div className='lg:hidden'>
            <form class='w-full pt-3 flex flex-row'>
              <input
                type='email'
                id='UserEmail'
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                class='border h-11 rounded-l-lg border-r-0 border-codecolor outline-none text-lg pl-4 w-[260px] text-white bg-[#101828]'
              />
              <button
                class='h-11 w-23 -ml-2 bg-codecolor rounded-r-lg px-2 text-sm font-bold text-white hover:bg-codecolordark transition-all duration-200 ease-in-out hover:text-white flex items-center justify-center'
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <LoaderMini />
                ) : isSuccess ? (
                  <FontAwesomeIcon icon={faCheckCircle} />
                ) : isError ? (
                  <FontAwesomeIcon icon={faXmarkCircle} />
                ) : (
                  'Suscribirse'
                )}
              </button>
            </form>
          </div>
        </div>
        <div className='flex flex-1 lg:justify-end'>
          <div class='lg:w-2/5 w-full'>
            <form class='w-full max-lg:hidden'>
              <label for='UserEmail' class='sr-only'></label>

              <div class=' bg-[#101828] rounded-lg text-white sm:flex sm:items-center'>
                <input
                  type='email'
                  id='UserEmail'
                  placeholder='Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  class='lg:w-full border h-11 rounded-l-lg border-r-0 border-codecolor outline-none text-lg pl-4 bg-[#101828]'
                />
                <button
                  class='lg:w-36 h-11 max-lg:-ml-2 bg-codecolor rounded-r-lg text-sm font-bold text-white lg:self-center hover:bg-codecolordark transition-all duration-200 ease-in-out hover:text-white lg:items-center lg:justify-center lg:flex'
                  onClick={e => handleSubmit(e)}
                >
                  {isSubmitting ? (
                    <LoaderMini />
                  ) : isSuccess ? (
                    <FontAwesomeIcon icon={faCheckCircle} />
                  ) : isError ? (
                    <FontAwesomeIcon icon={faXmarkCircle} />
                  ) : (
                    'Suscribirse'
                  )}
                </button>
              </div>
            </form>
            <p className='text-gray-200 text-right text-xs pt-2 max-lg:hidden'>
              Suscríbete a nuestro boletín para recibir las últimas noticias y
              actualizaciones.
            </p>
            <ul class='col-span-2 pt-8 flex justify-start gap-6 lg:col-span-5 lg:justify-end max-lg:justify-center'>
              <li>
                <a
                  href='/'
                  rel='noreferrer'
                  target='_blank'
                  class='text-gray-700 transition hover:opacity-75'
                >
                  <span class='sr-only'>LinkedIn</span>

                  <img src={linkedinf} alt='LinkedIn' />
                </a>
              </li>

              <li>
                <a
                  href='/'
                  rel='noreferrer'
                  target='_blank'
                  class='text-gray-700 transition hover:opacity-75'
                >
                  <span class='sr-only'>Instagram</span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
                      fill='#98A2B3'
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
