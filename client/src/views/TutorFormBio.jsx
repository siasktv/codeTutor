import { FlechaFiltro } from '../assets';
import { TutorFormWelcome, TutorFormProgressBar, TutorFormDataLeft, TutorFormBiografia, TutorFormTech, TutorFormExperience, TutorFormProjects, TutorFormRate, EnviarPerfilButton, CancelarPerfilButton } from '../components/';

const TutorFormBio = () => {
  return (
    <>
      {/* <NavUserNotifications /> */}
      <section className="bg-[#FAFBFC] h-full w-full">
        <div className="flex flex-col">
          <div className="flex flex-col mt-[33px]">
            <TutorFormWelcome />
            <TutorFormProgressBar />
          </div>
        </div>

        <section className="flex justify-center mt-[33px] mx-28">
          <TutorFormDataLeft />
          <section className="flex flex-col bg-white rounded-[8px] border w-full border-[#1414140D] gap-[18px] ml-6">
            <div className="mx-[52px] my-[36px] ">
              <h2 className="font-inter mb-[50px]  font-bold text-[25px] text-[#05004E] text-left">
                Biografía
              </h2>
              <p className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Selecciona tu especialidad como desarrollador *
              </p>
              <div className="relative">
                <select
                  id="inputField"
                  className="w-full py-3 pl-4 pr-8 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500 appearance-none"
                  defaultValue="default"
                >
                  <option value="default" disabled hidden>
                    Fullstack Developer
                  </option>
                  <option value="GMT-7">GMT-7</option>
                  <option value="GMT-6">GMT-6</option>
                  <option value="GMT-5">GMT-5</option>
                  {/* Add more options as needed */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                  <img src={FlechaFiltro} />
                </div>
              </div>
              <p className="text-[#737791] font-inter text-base mt-[50px] mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Breve biografía *
              </p>

              <textarea
                className="w-full rounded-lg border border-[#C3D3E2] p-3 text-lg"
                rows="8"
                id="message"
              ></textarea>
              {/* ACTUALIZAR el número de caracteres de acuerdo al limite */}
              <p className="font-inter font-normal mb-[50px] italic text-[#98A2B3] text-left">
                0/500
              </p>
              <h2 className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Link del portafolio
              </h2>
              <input
                id="portfolio"
                className="w-full py-3 mb-[50px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
                type="text"
                placeholder="Portafolio Link"
              />
            </div>
          </section>
        </section>
        <section className="flex justify-end items-center space-x-4 mx-28 pt-6 pb-[64px]">
          <CancelarPerfilButton />
          <EnviarPerfilButton title="Guardar" />
        </section>
      </section>
    </>
  );
};

export default TutorFormBio;
