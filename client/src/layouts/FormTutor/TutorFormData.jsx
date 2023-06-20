import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorFormProfileName,
  TutorFormProfileTime,
  TutorFormProfileSocialMedia,
  TutorFormProfileLanguages,
} from '../../components'

const TutorFormData = () => {
  return (
    <>
      {/* contenedor principal */}
      <section className="bg-[#FAFBFC] h-full w-full">
        <div className="flex flex-col">
          <div className="flex flex-col mt-[33px]">
            <TutorFormWelcome />
            <TutorFormProgressBar />
          </div>
        </div>

        <section className="flex justify-center mt-[33px] mx-28">
          <TutorFormDataLeft />

          <section className="flex flex-col w-full gap-[18px] ml-6">
            <TutorFormProfileName />

            <TutorFormProfileTime />

            <TutorFormProfileSocialMedia />

            <TutorFormProfileLanguages />
          </section>
        </section>
      </section>
    </>
  )
}

export default TutorFormData
