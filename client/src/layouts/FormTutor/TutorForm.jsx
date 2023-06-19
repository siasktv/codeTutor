import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorFormBiografia,
  TutorFormTech,
  TutorFormExperience,
  TutorFormProjects,
  TutorFormRate,
  EnviarPerfilButton,
  CancelarPerfilButton,
} from '../../components/'

const TutorForm = () => {
  return (
    <>
      <section className="bg-[#FAFBFC] min-h-screen w-full flex flex-col">
        <div className="flex flex-col ml-[150px] justify-center mt-[33px]">
          <TutorFormWelcome />
          <TutorFormProgressBar />
        </div>

        <section className="flex justify-center mt-[33px]">
          <TutorFormDataLeft />
          <section className="flex flex-col gap-[18px] ml-8">
            {/* {/ biografia /} */}
            <TutorFormBiografia />
            {/* {/ biografia /}
            {/ Habilidades tecnicas /} */}
            <TutorFormTech />
            {/* {/ Habilidades tecnicas /} */}

            {/* {/ Experience /} */}
            <TutorFormExperience />
            {/* {/ Experience /} */}

            {/* {/ Projects /} */}
            <TutorFormProjects />
            {/* {/ Projects /} */}

            {/* {/ rate /} */}
            <TutorFormRate />
            {/* {/ rate */}
            <section className="flex justify-end items-center space-x-4 mb-[64px]">
              <EnviarPerfilButton />
              <CancelarPerfilButton />
            </section>
          </section>
        </section>
      </section>
    </>
  )
}

export default TutorForm
