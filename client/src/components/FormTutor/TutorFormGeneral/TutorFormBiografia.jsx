import { CardForm } from '../../index'

const TutorFormBiografia = props => {
  const { form, isDone, setIsDone, setSection } = props
  return (
    <>
      <CardForm
        title='Biografía'
        form={form}
        isDone={isDone}
        setIsDone={setIsDone}
        setSection={setSection}
        next='bio'
      >
        {isDone?.bio && (
          <div className='flex flex-col -mt-10 -mb-14'>
            <p className='font-inter text-md font-normal leading-[28px] tracking-normal text-[#141414] text-left break-words mb-5'>
              {form.bio.description}
            </p>
          </div>
        )}
      </CardForm>
    </>
  )
}

export default TutorFormBiografia
