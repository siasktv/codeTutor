import { CardForm } from '../../index'

const TutorFormTech = (props) => {
  const { form, isDone, setIsDone, setSection } = props

  return (
    <>
      <CardForm
        title="Habilidades Técnicas"
        form={form}
        isDone={isDone}
        setIsDone={setIsDone}
        setSection={setSection}
        next="skills"
      />
    </>
  )
}

export default TutorFormTech
