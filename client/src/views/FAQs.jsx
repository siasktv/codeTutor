import NavUserNotifications from '../components/NavUserNotifications'
import useUser from '../hooks/useUser'
import { FlechaFiltro } from '../assets'
import faqslist from '../utils/faqslist'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown,
  faChevronUp,
  faMinus,
  faSearch
} from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import FaqModal from '../components/FaqModal'

const FAQs = () => {
  // Datos Usuario Navbar
  const user = useUser()
  const [showModal, setShowModal] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const [isOpened, setIsOpened] = useState(
    faqslist.map(() => {
      return false
    })
  )

  // Función de despligue de h3 de preguntas
  const toggleAnswer = index => {
    const respuesta = document.getElementById(index)
    respuesta.classList.toggle('hidden')
    setIsOpened(
      isOpened.map((item, i) => {
        if (i === index) {
          return !item
        } else {
          return item
        }
      })
    )
  }

  useEffect(() => {
    //scroll to top
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const faqs = document.querySelectorAll('.faq')
    const isOpened = [...faqs].map(faq => {
      return !faq.classList.contains('hidden')
    })
    setIsOpened(isOpened)
  }, [])

  const [faqs, setFaqs] = useState([...faqslist])

  const [search, setSearch] = useState('')

  useEffect(() => {
    const filteredFaqs = faqslist.filter(faq => {
      // ignore case and accents
      const faqQuestion = faq.question
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      const faqAnswer = faq.answer
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      const searchNormalized = search
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
      return (
        faqQuestion.includes(searchNormalized) ||
        faqAnswer.includes(searchNormalized)
      )
    })
    setFaqs(filteredFaqs)
  }, [search])

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <NavUserNotifications user={user} redirect={'/faqs'} />
      {/* Contenedor principal */}
      <div className='bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col items-center lg:px-10 lg:py-10 p-4 gap-2 w-full h-full'>
        {/* Contenedor secundario de bordes redondeados */}
        <h1 className='font-bold lg:text-3xl text-xl mb-4 dark:text-gray-200'>
          FAQs - Preguntas frecuentes
        </h1>
        <div className='relative w-full'>
          <input
            type='text'
            placeholder='Buscar'
            className='lg:w-1/2 w-full lg:px-4 lg:py-3 mb-2 px-2 py-1 text-lg focus:outline-codecolor border border-gray-200 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 dark:focus:outline-none rounded-md shadow-md'
            onChange={e => setSearch(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faSearch}
            className='absolute lg:mt-5 mt-3 lg:-ml-8 -ml-6 text-gray-400'
          />
        </div>

        <div className='lg:w-1/2 p-4 text-left bg-white dark:bg-gray-800 dark:border-none border border-gray-200 shadow-md rounded-lg space-y-2 w-full'>
          {/* Título */}
          <div className='flex justify-end items-center pb-1'>
            <div className=' space-x-2'>
              {/* Pregunta para ser aprobada y sumada a las FAQs */}
              <button
                className='px-2 py-1 bg-violet-100 border rounded text-codecolor lg:text-md text-sm hover:bg-codecolor hover:text-white font-semibold active:scale-90 transition duration-200 select-none dark:bg-codecolor dark:text-gray-200 dark:border-none'
                onClick={() => {
                  setSelectedOption('question')
                  setShowModal(true)
                }}
              >
                Nueva pregunta
              </button>
              {/* Espacio para dar una opinion constructiva sobre code-tutor */}
              <button
                className='px-2 py-1 bg-violet-100 border rounded text-codecolor lg:text-md text-sm hover:bg-codecolor hover:text-white font-semibold active:scale-90 transition duration-200 select-none dark:bg-codecolor dark:text-gray-200 dark:border-none'
                onClick={() => {
                  setSelectedOption('opinion')
                  setShowModal(true)
                }}
              >
                Dar mi opinión
              </button>
            </div>
          </div>
          {/* Información */}
          <div className='flex flex-col space-y-3'>
            {faqs.map((faq, index) => {
              return (
                <div key={index + 1}>
                  {/* Pregunta */}
                  <div
                    className='flex justify-between items-center cursor-pointer border border-gray-200 dark:border-gray-700 dark:text-gray-200 rounded-md px-4 py-3'
                    onClick={() => toggleAnswer(index)}
                  >
                    <h3 className='font-semibold lg:text-xl select-none'>
                      {faq.question}
                    </h3>
                    {isOpened[index] ? (
                      <FontAwesomeIcon icon={faMinus} className='ml-2' />
                    ) : (
                      <FontAwesomeIcon icon={faChevronDown} className='ml-2' />
                    )}
                  </div>
                  {/* Respuesta */}
                  <div
                    id={index}
                    className='faq hidden lg:text-lg lg:mt-5 mt-2 font-normal dark:text-gray-200 text-gray-900 text-justify px-4'
                  >
                    {faq.answer}
                  </div>
                </div>
              )
            })}
            {faqs.length === 0 && (
              <div className='text-lg text-gray-900 text-center dark:text-gray-200 py-10'>
                No se encontraron resultados.
              </div>
            )}
          </div>
        </div>
        {showModal && (
          <FaqModal
            selectedOption={selectedOption}
            setShowModal={setShowModal}
            user={user}
          />
        )}
      </div>
    </>
  )
}
export default FAQs
