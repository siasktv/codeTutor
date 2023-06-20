import { LinkGitHub, LinkLinkedIn } from '../index'
import { Pais, es, uk, pt, fr } from '../../assets'

const TutorFormDataLeft = props => {
  const { user, form } = props

  return (
    <div className='flex flex-col bg-white items-center h-full justify-center p-[80px] rounded-[8px] border border-[#1414140D] '>
      <div className=' rounded-full items-center justify-center w-[145px] h-[145px] bg-[#D9D9D9]'>
        <img
          className='rounded-full items-center justify-center w-[145px] h-[145px]'
          src={user?.image}
          alt='user'
        />
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
            {user?.location}
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
                <img src={es} alt='es' className='w-[20px] h-[20px]' />
              ) : language === 'Inglés' ? (
                <img src={uk} alt='us' className='w-[20px] h-[20px]' />
              ) : language === 'Portugués' ? (
                <img src={pt} alt='pt' className='w-[20px] h-[20px]' />
              ) : language === 'Francés' ? (
                <img src={fr} alt='fr' className='w-[20px] h-[20px]' />
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
