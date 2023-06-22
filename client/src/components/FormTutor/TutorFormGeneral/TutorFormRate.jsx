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
          <div className='flex flex0row justify-between items-center -mt-8 -mb-8'>
            <p className='text-md font-semibold text-primary'>Mentoría</p>
            <p className='text-md text-primary text-[#141414]'>
              USD$ {form.rate.hour}-H
            </p>
          </div>
        )}
      </CardForm>
    </>
  )
}

export default TutorFormRate
