const TutorProfileLanguages = () => {
  return (
    <div className="bg-white w-[879px] mb-[166px] border border-[#1414140D] rounded-[8px]">
      <div className="flex flex-col gap-[30px] pb-[36px] pt-[36px] pl-[52px]">
        <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
          Idiomas
        </h2>
        <p className="text-[#737791] font-inter text-base font-medium leading-[27px] tracking-normal text-left">
          Por favor, añade los idiomas en los que tienes fluidez para que
          aparezcan en tu perfil.
        </p>
        <div className="bg-[#7D5AE21A] w-[130px] justify-between items-center p-4 text-[#7D5AE2]  h-[50px] rounded-[8px]">
          <p className="text-[#7D5AE2]">Español</p>
        </div>
        <select
          id="inputField"
          className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
          defaultValue="default"
        >
          <option value="default" disabled hidden>
            Idiomas
          </option>
          <option value="GMT-7">Ingles</option>
          <option value="GMT-6">Portugues</option>
          <option value="GMT-5">Frances</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button className="mb-[36px] mt-auto ml-auto mr-[60px]  font-inter text-base font-semibold leading-[20px] tracking-normal text-center flex items-center justify-center text-white bg-[#7F56D9] w-[130px] h-[55px] rounded-[8px] border border-[#FFFFFF]">
        Agregar
      </button>
    </div>
  )
}

export default TutorProfileLanguages
