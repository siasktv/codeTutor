const TutorFormProfileSocialMedia = () => {
  return (
    <div className="bg-white w-[879px] border border-[#1414140D] rounded-[8px]">
      <div className="flex flex-col gap-[30px] pb-[36px] pt-[36px] pl-[52px]">
        <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
          Actualizar social media
        </h2>
        <input
          id="inputField"
          className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
          type="link"
          placeholder="Github Link"
        />
        <input
          id="inputField"
          className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
          type="link"
          placeholder="Linkedin Link"
        />
      </div>
    </div>
  )
}

export default TutorFormProfileSocialMedia
