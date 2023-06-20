import { CardTutorData } from '../../index'
import { useEffect, useState } from 'react'

const TutorFormProfileSocialMedia = props => {
  const { dataForm, setDataForm, form, errorsData, setErrorsData } = props
  const [correct, setCorrect] = useState(false)

  useEffect(() => {
    if (
      errorsData.linkedin === '' &&
      errorsData.github === '' &&
      dataForm.social.linkedin !== '' &&
      dataForm.social.github !== ''
    ) {
      setCorrect(true)
    } else {
      setCorrect(false)
    }
  }, [errorsData, dataForm])

  const handleChange = e => {
    const { name, value } = e.target
    // check if value is a link
    if (name === 'github' && !value.includes('github.com/')) {
      setErrorsData({
        ...errorsData,
        github: 'Ingresa un link de Github válido'
      })
    } else if (name === 'linkedin' && !value.includes('linkedin.com/')) {
      setErrorsData({
        ...errorsData,
        linkedin: 'Ingresa un link de Linkedin válido'
      })
    } else if (name === 'github' && !value.includes('https://')) {
      setErrorsData({
        ...errorsData,
        github: 'El link debe comenzar con https://'
      })
    } else if (name === 'linkedin' && !value.includes('https://')) {
      setErrorsData({
        ...errorsData,
        linkedin: 'El link debe comenzar con https://'
      })
    } else {
      setErrorsData({
        ...errorsData,
        [name]: ''
      })
    }
    setDataForm({
      ...dataForm,
      social: {
        ...dataForm.social,
        [name]: value
      }
    })
  }

  useEffect(() => {
    if (dataForm.social.linkedin && dataForm.social.github) {
      if (!dataForm.social.linkedin.includes('linkedin.com/' || 'https://')) {
        setErrorsData({
          ...errorsData,
          linkedin: 'Ingresa un link de Linkedin válido'
        })
      }
      if (!dataForm.social.github.includes('github.com/' || 'https://')) {
        setErrorsData({
          ...errorsData,
          github: 'Ingresa un link de Github válido'
        })
      }
    }
  }, [dataForm])

  return (
    <>
      <CardTutorData title='Actualizar Social Media' correct={correct}>
        <div className='flex space-x-8'>
          <div className='block w-full'>
            <input
              id='inputField'
              className={
                errorsData.github
                  ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 bg-red-100 focus:outline-red-500'
                  : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]'
              }
              name='github'
              onChange={handleChange}
              value={dataForm.social.github || form.social.github || 'https://'}
              type='link'
              placeholder='https://'
            />
            <div className='pt-3'>
              {errorsData.github && (
                <p className='font-inter font-normal italic text-red-500 text-left'>
                  {errorsData.github}
                </p>
              )}
            </div>
          </div>
          <div className='block w-full'>
            <input
              id='inputField'
              name='linkedin'
              onChange={handleChange}
              value={dataForm.social.linkedin || form.social.linkedin || 'https://'}
              className={
                errorsData.linkedin
                  ? 'w-full py-3 px-6 bg-none rounded-[8px] border border-red-500 text-red-500 bg-red-100 focus:outline-red-500'
                  : 'w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]'
              }
              type='link'
              placeholder='https://'
            />
            <div className='pt-3'>
              {errorsData.linkedin && (
                <p className='font-inter font-normal italic text-red-500 text-left'>
                  {errorsData.linkedin}
                </p>
              )}
            </div>
          </div>
        </div>
      </CardTutorData>
    </>
  )
}

{
  /* <input
id="inputField"
className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
type="link"
placeholder="Github Link"
/>
<input
id="inputField"
className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
type="link"
placeholder="Linkedin Link"
/> */
}

export default TutorFormProfileSocialMedia
