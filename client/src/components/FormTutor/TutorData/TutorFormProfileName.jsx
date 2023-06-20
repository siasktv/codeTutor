import { CardTutorData } from '../../index'

const TutorFormProfileName = () => {
  return (
    <>
      <CardTutorData title="Actualizar el nombre de la cuenta">
        <input
          id="inputField"
          className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
          type="text"
          placeholder="Nombre Completo"
        />
      </CardTutorData>
    </>
  )
}

export default TutorFormProfileName
