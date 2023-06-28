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

const LandingFooter = () => {
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
    <footer class='bg-[#101828] h-52 w-full flex p-10'>
      <div className='flex flex-1 '>
        <div className='flex-col flex'>
          <div className=' flex pt-2 '>
            <Link to='/'>
              <span className='inline-block h-10 w-52  '>
                <div className='flex'>
                  <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                  <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-soft-light'></div>
                  <h1 className='font-bold text-2xl ml-1 text-white'>
                    Code-Tutor.
                  </h1>
                </div>
              </span>
            </Link>
          </div>
          <h1 className='text-white text-left pt-2'>
            Soluciona tus problemas con la ayuda de expertos.
          </h1>
          <h1 className='text-white text-left pt-2'>
            <Link to='/faqs'>
              <span className='text-codecolor font-semibold hover:text-codecolordark'>
                Preguntas frecuentes
              </span>
            </Link>
          </h1>
          <h1 className='text-[#98A2B3] text-left pt-4'>
            © 2023 Code-Tutor. All rights reserved.
          </h1>
        </div>
        <div className='flex flex-1  justify-end'>
          <div class='w-2/5'>
            <form class='w-full'>
              <label for='UserEmail' class='sr-only'></label>

              <div class='  bg-[#101828] rounded-lg text-white sm:flex sm:items-center'>
                <input
                  type='email'
                  id='UserEmail'
                  placeholder='Email'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  class='w-full border h-11 rounded-l-lg border-r-0 border-codecolor outline-none text-lg pl-4 bg-[#101828]'
                />

                <button
                  class='w-36 h-11 bg-codecolor rounded-r-lg text-sm font-bold text-white self-center hover:bg-codecolordark transition-all duration-200 ease-in-out hover:text-white items-center justify-center flex'
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
            <p className='text-gray-200 text-right text-xs pt-2'>
              Suscríbete a nuestro boletín para recibir las últimas noticias y
              actualizaciones.
            </p>
            <ul class='col-span-2 pt-8 flex justify-start gap-6 lg:col-span-5 lg:justify-end'>
              <li>
                <a
                  href='/'
                  rel='noreferrer'
                  target='_blank'
                  class='text-gray-700 transition hover:opacity-75'
                >
                  <span class='sr-only'>Facebook</span>

                  <img src={twitterf} alt='Twitter' />
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

                  <img src={linkedinf} alt='Linkedin' />
                </a>
              </li>

              <li>
                <a
                  href='/'
                  rel='noreferrer'
                  target='_blank'
                  class='text-gray-700 transition hover:opacity-75'
                >
                  <span class='sr-only'>Twitter</span>

                  <img src={facebookf} alt='Facebook' />
                </a>
              </li>

              <li>
                <a
                  href='/'
                  rel='noreferrer'
                  target='_blank'
                  class='text-gray-700 transition hover:opacity-75'
                >
                  <span class='sr-only'>GitHub</span>

                  <img src={githubf} alt='GitHub' />
                </a>
              </li>

              <li>
                <a
                  href='/'
                  rel='noreferrer'
                  target='_blank'
                  class='text-gray-700 transition hover:opacity-75'
                >
                  <span class='sr-only'>Dribbble</span>

                  <img src={dribbblef} alt='Dribbble' />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default LandingFooter
