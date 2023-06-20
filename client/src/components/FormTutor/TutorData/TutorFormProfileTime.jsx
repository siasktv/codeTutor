import { CardTutorData } from '../../index'

const TutorFormProfileTime = () => {
  return (
    <>
      <CardTutorData title="Actualizar zona horaria">
        <select
          id="inputField"
          className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
          defaultValue="default"
        >
          <option value="default" disabled hidden>
            Zona Horaria
          </option>
          <option value="GMT-7">GMT-7</option>
          <option value="GMT-6">GMT-6</option>
          <option value="GMT-5">GMT-5</option>
        </select>
      </CardTutorData>
    </>
  )
}

export default TutorFormProfileTime
