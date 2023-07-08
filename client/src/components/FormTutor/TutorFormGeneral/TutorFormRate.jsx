import { CardForm } from '../../index'

const TutorFormRate = props => {
  const { form, isDone, setIsDone, setSection } = props

  props

  return (
    <>
      <CardForm
        title='Configuración de tarifas'
        form={form}
        isDone={isDone}
        setIsDone={setIsDone}
        setSection={setSection}
        next='rate'
      >
        {isDone.rate && (
          <div className='flex flex0row justify-between items-center lg:-mt-8 mb-3 lg:-mb-8'>
            <p className='text-md font-semibold text-primary dark:text-gray-200'>
              Mentoría
            </p>
            <p className='text-md text-primary text-[#141414] dark:text-gray-200'>
              USD$ {form.rate.hour}-H
            </p>
          </div>
        )}
      </CardForm>
    </>
  )
}

export default TutorFormRate
