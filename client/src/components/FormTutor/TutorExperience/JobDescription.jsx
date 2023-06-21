const JobDescription = () => {
  return (
    <>
      <p className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
        Descripción *
      </p>
      <textarea
        className="w-full h-40 py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
        maxLength={500}
        placeholder="Escribe una breve descripción..."
      ></textarea>
      <p className="text-[#737791] font-inter text-base font-medium leading-[27px] tracking-normal text-left">
        0/500
      </p>
    </>
  );
};

export default JobDescription;
