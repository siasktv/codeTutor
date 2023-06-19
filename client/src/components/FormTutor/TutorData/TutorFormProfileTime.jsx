const TutorFormProfileTime = () => {
  return (
    <div className="bg-white w-[879px]   border border-[#1414140D] rounded-[8px]">
      <div className="flex flex-col gap-[30px] pb-[36px] pt-[36px] pl-[52px]">
        <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
          Actualizar zona horaria
        </h2>
        <select
          id="inputField"
          className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
          defaultValue="default"
        >
          <option value="default" disabled hidden>
            Zona Horaria
          </option>
          <option value="GMT-7">GMT-7</option>
          <option value="GMT-6">GMT-6</option>
          <option value="GMT-5">GMT-5</option>
          {/* Add more options as needed */}
        </select>
      </div>
    </div>
  )
}

export default TutorFormProfileTime
