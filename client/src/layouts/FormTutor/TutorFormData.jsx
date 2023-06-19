import {
  TutorFormWelcome,
  TutorFormProgressBar,
  TutorFormDataLeft,
  TutorFormProfileImage,
  TutorFormProfileName,
  TutorFormProfileTime,
  TutorFormProfileSocialMedia,
  TutorFormProfileLanguages,
} from '../../components'

const TutorFormData = () => {
  return (
    <>
      {/* contenedor principal */}
      <section className="bg-[#FAFBFC] min-h-screen w-full flex flex-col ">
        {/* componente bienvenido */}
        <TutorFormWelcome />
        {/* componente bienvenido */}

        {/* barra de progreso y boton back */}
        <TutorFormProgressBar />
        {/* barra de progreso y boton back */}

        {/* componente toda la info */}
        <section className="flex ml-[68px] mt-[33px]">
          {/* componente info/data left */}
          <TutorFormDataLeft />
          {/* componente info/data left */}

          {/* componente info/data right */}
          <section className="flex flex-col gap-[18px] ml-[86px]">
            {/* componente picture/profile */}
            <TutorFormProfileImage />
            {/* componente picture/profile */}

            {/* componente nombre/profile */}
            <TutorFormProfileName />
            {/* componente nombre/profile */}

            {/* componente zona horaria/profile */}
            <TutorFormProfileTime />
            {/* componente zona horaria/profile */}

            {/* componente social media/profile */}
            <TutorFormProfileSocialMedia />
            {/* componente social media/profile */}

            {/* componente/idiomas mas boton agregar */}
            <TutorFormProfileLanguages />
            {/* componente/idiomas */}
          </section>
          {/* componente info/data right */}
        </section>
        {/* componente toda la info */}
      </section>
      {/* contenedor principal */}
    </>
  )
}

export default TutorFormData
