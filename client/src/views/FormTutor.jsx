import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import {
  TutorForm,
  TutorFormData,
  TutorFormBio,
  TutorFormExperience,
  TutorFormTech,
  TutorFormRate,
  TutorFormProject
} from '../layouts'
import { Loader } from '../components'

export default function FormTutor () {
  const user = useUser()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(null)
  const [form, setForm] = useState({
    name: '',
    avatar: '',
    location: '',
    zona_horaria: '',
    social: {
      linkedin: '',
      github: ''
    },
    languages: [],
    bio: {
      specialty: '',
      description: '',
      portfolio: ''
    },
    experience: [],
    editExpIndex: null,
    skills: [],
    editSkillIndex: null,
    projects: [],
    editProjectIndex: null,
    rate: {
      hour: 0,
      promo: null
    },
    disponibility: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    }
  })
  const [section, setSection] = useState(null)
  const [isDone, setIsDone] = useState({
    bio: false,
    skills: false,
    experience: false,
    projects: false,
    rate: false
  })

  useEffect(() => {
    if (user === null) {
      navigate('/login?redirect=/tutor')
    } else if (user) {
      setLoading(false)
      setForm({
        ...form,
        avatar: user.image
      })
      if (user.tutor) {
        if (user.tutor.status === 'pending') {
          setShowModal('pending')
          setSection(null)
        } else if (user.tutor.status === 'rejected') {
          setShowModal('rejected')
          setSection(null)
        } else if (user.tutor.status === 'approved') {
          navigate('/tutordashboard')
        }
      } else {
        setSection('data')
      }
    }
  }, [user, navigate])

  const handleRedirect = e => {
    e.preventDefault()
    navigate('/user')
  }

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {loading && (
        <div className='flex justify-center items-center h-screen dark:bg-gray-900'>
          <Loader />
        </div>
      )}
      {!loading && (
        <>
          {section === 'data' && (
            <TutorFormData
              progress={progress}
              setProgress={setProgress}
              form={form}
              setForm={setForm}
              setSection={setSection}
              user={user}
              section={section}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          )}
          {section === 'form' && (
            <TutorForm
              progress={progress}
              setProgress={setProgress}
              form={form}
              setForm={setForm}
              section={section}
              setSection={setSection}
              user={user}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          )}
          {section === 'bio' && (
            <TutorFormBio
              progress={progress}
              setProgress={setProgress}
              form={form}
              setForm={setForm}
              section={section}
              setSection={setSection}
              user={user}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          )}
          {section === 'skills' && (
            <TutorFormTech
              progress={progress}
              setProgress={setProgress}
              form={form}
              setForm={setForm}
              section={section}
              setSection={setSection}
              user={user}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          )}
          {section === 'experience' && (
            <TutorFormExperience
              progress={progress}
              setProgress={setProgress}
              form={form}
              setForm={setForm}
              section={section}
              setSection={setSection}
              user={user}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          )}
          {section === 'projects' && (
            <TutorFormProject
              progress={progress}
              setProgress={setProgress}
              form={form}
              setForm={setForm}
              section={section}
              setSection={setSection}
              user={user}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          )}
          {section === 'rate' && (
            <TutorFormRate
              progress={progress}
              setProgress={setProgress}
              form={form}
              setForm={setForm}
              section={section}
              setSection={setSection}
              user={user}
              isDone={isDone}
              setIsDone={setIsDone}
            />
          )}
          {showModal === 'pending' && (
            <div
              className='relative z-10'
              aria-labelledby='modal-title'
              role='dialog'
              aria-modal='true'
            >
              <div className='fixed inset-0 bg-[#141414] bg-opacity-70 transition-opacity'></div>
              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <div className='relative transform overflow-hidden rounded-lg max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
                    <div className='bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-center justify-center'>
                        <div className='mt-3 text-center'>
                          <h3
                            className='text-lg font-semibold leading-6 dark:text-gray-200 text-[#05004E] text-center pb-8 pt-16'
                            id='modal-title'
                          >
                            Estamos evaluando tu solicitud.
                          </h3>
                          <div className='mt-2 max-w-lg'>
                            <p className='text-lg font-semibold text-[#05004E] dark:text-gray-200 text-center'>
                              Ya hemos recibido tu formulario y nos encargaremos
                              de revisarlo. Te notificaremos cuando tu perfil
                              esté listo.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 dark:bg-gray-800 px-4 pb-12 pt-10 sm:flex sm:flex-row justify-center sm:px-6'>
                      <button
                        type='button'
                        className='mt-3 inline-flex w-full justify-center rounded-lg bg-codecolor px-12 py-5 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-codecolordark transition-all ease-in-out duration-200 sm:mt-0 sm:w-auto dark:border-none dark:outline-none dark:ring-0'
                        onClick={e => handleRedirect(e)}
                      >
                        Continuar con la plataforma
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {showModal === 'rejected' && (
            <div
              className='relative z-10'
              aria-labelledby='modal-title'
              role='dialog'
              aria-modal='true'
            >
              <div className='fixed inset-0 bg-[#141414] bg-opacity-70 transition-opacity'></div>
              <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                  <div className='relative transform overflow-hidden rounded-lg max-lg:absolute max-lg:top-1/2 max-lg:-translate-y-1/2 max-lg:w-[95%] bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl'>
                    <div className='bg-white dark:bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4'>
                      <div className='sm:flex sm:items-center justify-center'>
                        <div className='mt-3 text-center'>
                          <h3
                            className='text-lg font-semibold dark:text-gray-200 leading-6 text-[#05004E] text-center pb-8 pt-16'
                            id='modal-title'
                          >
                            Hemos rechazado tu solicitud.
                          </h3>
                          <div className='mt-2 max-w-lg'>
                            <p className='text-lg font-semibold dark:text-gray-200 text-[#05004E] text-center'>
                              Luego de revisar tu formulario, hemos determinado
                              que no cumples con los requisitos para ser tutor
                              en CodeTutor. Si crees que esto es un error,
                              contáctanos a support@code-tutor.dev.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='bg-gray-50 dark:bg-gray-800  px-4 pb-12 pt-10 sm:flex sm:flex-row justify-center sm:px-6'>
                      <button
                        type='button'
                        className='mt-3 inline-flex w-full justify-center rounded-lg bg-codecolor px-12 py-5 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-codecolordark transition-all ease-in-out duration-200 sm:mt-0 sm:w-auto dark:border-none dark:outline-none dark:ring-0'
                        onClick={e => handleRedirect(e)}
                      >
                        Continuar con la plataforma
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
