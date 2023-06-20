import { LinkGitHub, LinkLinkedIn } from '../index'
import { Pais, es, uk, pt, fr } from '../../assets'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { uploadImage } from '../../firebase/client'

const TutorFormDataLeft = props => {
  const { user, form, setDataForm, dataForm } = props
  const [avatar, setAvatar] = useState(form.avatar || user.avatar)
  const [errorImage, setErrorImage] = useState('')

  const handleUploadImage = async e => {
    const file = e.target.files[0]

    if (!file) {
      return
    }
    if (
      !file.type.includes('image/png') &&
      !file.type.includes('image/jpeg') &&
      !file.type.includes('image/jpg')
    ) {
      setErrorImage('Por favor, selecciona un archivo de imagen válido')

      return
    }
    // check if file is larger than 5mb
    if (file.size > 5000000) {
      setErrorImage('El archivo no puede ser mayor a 5MB')

      return
    }
    try {
      const task = uploadImage(file)
      task.on(
        'state_changed',
        snapshot => {
          const percentage =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        },
        error => {
          // if there is an error, console.log it
          console.log(error)
        },
        () => {
          // when the image is uploaded, get the url and set it to imageURL and input.image
          task.snapshot.ref.getDownloadURL().then(url => {
            setAvatar(url)
            setErrorImage('')
          })
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (avatar) {
      setDataForm({
        ...dataForm,
        avatar
      })
    }
  }, [avatar])

  return (
    <div className='flex flex-col bg-white items-center h-full justify-center p-[80px] rounded-[8px] border border-[#1414140D]'>
      <div className='rounded-full items-center justify-center w-[145px] h-[145px] bg-[#D9D9D9] group'>
        <input
          type='file'
          name='avatar'
          id='avatar'
          className='hidden'
          onChange={handleUploadImage}
        />
        <label htmlFor='avatar'>
          <img
            className='rounded-full w-[145px] h-[145px] group-hover:filter group-hover:brightness-50 transition duration-300 ease-in-out hover:cursor-pointer'
            src={dataForm?.avatar || avatar}
            alt='user'
          />
          <FontAwesomeIcon
            icon={faEdit}
            className='text-[25px] text-gray-200 cursor-pointer relative opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out top-[-50%] transform translate-y-[-50%]'
          />
        </label>
      </div>
      <p className='font-inter font-medium text-2xl leading-[37.5px] mt-5'>
        {form?.name || user?.fullName}
      </p>
      {form?.bio?.specialty && (
        <p className='font-inter font-semi text-[15px] leading-[28px] mt-2'>
          {form?.bio?.specialty}
        </p>
      )}
      {user?.location && (
        <div className='inline-flex items-center mt-2'>
          <img src={Pais} alt='pais' />
          <p className='font-inter font-normal text-sm leading-[28px] ml-1'>
            {form?.location || user?.location}
          </p>
        </div>
      )}
      {form?.zona_horaria && (
        <p className='font-inter font-normal text-xs leading-[28px] ml-1'>
          {form?.zona_horaria}
        </p>
      )}
      {form?.languages && (
        <div className='flex justify-center gap-1 items-center mt-2'>
          {form?.languages?.map((language, index) => (
            <div key={index}>
              {language === 'Español' ? (
                <img
                  src={es}
                  alt='es'
                  className='w-[20px] h-[20px]'
                  title='Español'
                />
              ) : language === 'Inglés' ? (
                <img
                  src={uk}
                  alt='us'
                  className='w-[20px] h-[20px]'
                  title='Inglés'
                />
              ) : language === 'Portugués' ? (
                <img
                  src={pt}
                  alt='pt'
                  className='w-[20px] h-[20px]'
                  title='Portugués'
                />
              ) : language === 'Francés' ? (
                <img
                  src={fr}
                  alt='fr'
                  className='w-[20px] h-[20px]'
                  title='Francés'
                />
              ) : (
                language
              )}
            </div>
          ))}
        </div>
      )}
      <div className='flex justify-center gap-8 mt-8'>
        <LinkGitHub link={form?.social?.github} />
        <LinkLinkedIn link={form?.social?.linkedin} />
      </div>
      {form?.bio?.portfolio && (
        <div className='flex items-center justify-center mt-5'>
          <a
            href={
              form?.bio?.portfolio.includes('https://')
                ? form?.bio?.portfolio
                : `https://${form?.bio?.portfolio}`
            }
            target='_blank'
            rel='noreferrer'
            className='font-inter font-normal text-md leading-[28px] text-codecolor hover:underline'
          >
            {form?.bio?.portfolio.includes('https://') ? (
              <p>{form?.bio?.portfolio}</p>
            ) : (
              <p>https://{form?.bio?.portfolio}</p>
            )}
          </a>
        </div>
      )}
    </div>
  )
}

export default TutorFormDataLeft
