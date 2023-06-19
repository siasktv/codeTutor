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
      <section className="bg-[#FAFBFC] h-full w-full">
        <div className='flex flex-col'>
          <div className="flex flex-col mt-[33px]">
            <TutorFormWelcome />
            <TutorFormProgressBar />
          </div>
        </div>

        <section className="flex justify-center mt-[33px] mx-8">
          <TutorFormDataLeft />
          <section className="flex flex-col w-full gap-[18px] ml-6 ">
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
