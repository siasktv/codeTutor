import { CardTutorData, EnviarPerfilButton } from '../../index'

const TutorProfileLanguages = () => {
  return (
    <>
      <CardTutorData title="Idiomas">
        <div className="flex flex-col gap-8">
          <p className="text-[#737791] font-inter text-base font-medium text-left">
            Por favor, añade los idiomas en los que tienes fluidez para que
            aparezcan en tu perfil.
          </p>
          <button className="bg-[#7D5AE21A] w-[100px] justify-between items-center p-4 text-[#7D5AE2]  py-3 rounded-[8px]">
            <p className="text-[#7D5AE2]">Español</p>
          </button>
        </div>
        <select
          id="inputField"
          className="w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
          defaultValue="default"
        >
          <option value="default" disabled hidden>
            Idiomas
          </option>
          <option value="GMT-7">Ingles</option>
          <option value="GMT-6">Portugues</option>
          <option value="GMT-5">Frances</option>
        </select>
        <button className="mb-[36px] mt-auto ml-auto font-inter text-sm font-semibold leading-[20px] tracking-normal text-center flex items-center justify-center text-white bg-[#7F56D9] px-6 py-3 rounded-[8px] border border-[#FFFFFF]">
          Agregar
        </button>
      </CardTutorData>
    </>
  )
}

export default TutorProfileLanguages
