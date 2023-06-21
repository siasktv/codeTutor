import { FlechaFiltro } from "../../../assets";

const ProjectTechnologies = () => {
  return (
    <>
      <p className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
        Tecnologías Utilizadas*
      </p>
      <div className="relative">
        <select
          // id='inputField'
          className={
            "w-full py-3 px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none"
          }
          // defaultValue='default'
          // onChange={handleSelect}
        >
          <option value="default" selected disabled hidden>
            Agregar tecnología
          </option>
          {/* {availableLangs
              .filter(lang => !selectedLangs.includes(lang))
              .map((lang, index) => (
              <option
                  key={index}
                  value={lang}
                  className='text-gray-500 bg-white'
              >
                  {lang}
              </option>
            ))} */}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
          <img src={FlechaFiltro} />
        </div>
      </div>
    </>
  );
};

export default ProjectTechnologies;
