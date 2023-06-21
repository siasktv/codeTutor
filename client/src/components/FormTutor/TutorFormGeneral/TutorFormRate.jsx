import { CardForm } from '../../index'

const TutorFormRate = (props) => {
  const { form, isDone, setIsDone, setSection } = props

  return (
    <>
      <CardForm
        title="Configuración de tarifas"
        form={form}
        isDone={isDone}
        setIsDone={setIsDone}
        setSection={setSection}
        next="rate"
      />
    </>
  )
}

export default TutorFormRate
