import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useUser from '../hooks/useUser'
import {
  TutorForm,
  TutorFormData,
  TutorFormBio,
  TutorFormExperience,
  TutorFormTech,
  TutorFormRate
} from '../layouts'
import { Loader } from '../components'

export default function FormTutor () {
  const user = useUser()
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [loading, setLoading] = useState(true)
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
    portfolio: '',
    tech: []
  })
  const [section, setSection] = useState('data')
  const [isDone, setIsDone] = useState({
    bio: false,
    skills: false,
    experience: false,
    projects: false,
    rate: false
  })

  useEffect(() => {
    if (user === null) {
      navigate('/login')
    } else if (user) {
      setLoading(false)
      setForm({
        ...form,
        avatar: user.image
      })
      //   if (user.tutor) {
      //     if (user.tutor.status === 'pending') {
      //       alert('Ya tienes un perfil pendiente de aprobación')
      //       return navigate('/')
      //     } else if (user.tutor.status === 'approved') {
      //       alert('Ya tienes un perfil aprobado')
      //       return navigate('/')
      //     } else if (user.tutor.status === 'rejected') {
      //       alert('Ya tienes un perfil rechazado')
      //       return navigate('/')
      //     }
      //   }
    }
  }, [user, navigate])

  useEffect(() => {
    console.log(progress)
  }, [progress])

  useEffect(() => {
    console.log(form)
  }, [form])

  return (
    <>
      {loading && (
        <div className='flex justify-center items-center h-screen'>
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
        </>
      )}
    </>
  )
}
