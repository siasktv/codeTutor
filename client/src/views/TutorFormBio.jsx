import { NavUserNotifications } from '../components/index'

const TutorFormBio = () => {
  return (
    <>
      <NavUserNotifications />
      <section className="bg-[#FAFBFC] min-h-screen w-full flex flex-col ">
        <div className="flex flex-col items-start pl-[142px] pt-[50px] gap-[50px]">
          <h2 className="text-[#05004E] font-bold text-[30px]">
            ¡Hola, Shi Juan! ¡Bienvenido!
          </h2>
          <p className="text-[#737791]">
            Completa el siguiente formulario para convertirte en un tutor y
            espera ser aprobado.
          </p>
        </div>

        <div className="flex items-center gap-[22px] mt-[37px] ml-[68px]">
          <div className="rounded-full flex p-2 text-[#7F56D9] text-[10px] font-bold items-center text-center bg-[#7D5AE21A] w-[40px] h-[40px]">
            Back
          </div>
          <div className="w-[1244px]">
            <span id="ProgressLabel" className="sr-only">
              Loading
            </span>
            <span
              role="progressbar"
              aria-labelledby="ProgressLabel"
              aria-valuenow="50"
              className="block rounded-full bg-gray-200"
            >
              <span
                className="block h-[20px] rounded-full bg-[#00E300] text-center text-[10px]/4 "
                style={{ width: '50%' }}
              >
                <span className="font-bold text-white"> 50% </span>
              </span>
            </span>
          </div>
        </div>

        <section className="flex ml-[68px] mb-[60px] mt-[33px]">
          <div className="bg-white items-center h-[649px] justify-center p-[93px] rounded-[8px] border border-[#1414140D] ">
            <div className="rounded-full items-center justify-center w-[153px] h-[153px] bg-[#D9D9D9]"></div>
            <p className="font-inter font-medium text-2xl leading-[37.5px] mt-[50px]">
              Shi Juan
            </p>
            <div className="flex gap-[49px] mt-[80px]">
              <div className="bg-[#7D5AE21A] flex w-[62px] rounded-[10px] h-[62px]"></div>
              <div className="bg-[#7D5AE21A] flex w-[62px] rounded-[10px] h-[62px]"></div>
            </div>
          </div>
          <section className="flex flex-col bg-white rounded-[8px] border w-[879px] border-[#1414140D] gap-[18px] ml-[86px]">
            <div className="justify-start text-left ml-[54px] mt-[50px]">
              <h2 className="font-inter mb-[50px]  font-bold text-[25px] text-[#05004E]">
                Biografía
              </h2>
              <p className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Selecciona tu especialidad como desarrollador *
              </p>
              <select
                id="inputField"
                className="w-[764px] h-[72px] mb-[50px] px-6 bg-none rounded-[8px] border border-[#C3D3E2] text-gray-500"
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
              <p className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Breve biografía *
              </p>

              <textarea
                class="w-[764px] rounded-lg border border-[#C3D3E2] p-3 text-lg"
                rows="8"
                id="message"
              ></textarea>
              <p className="font-inter font-normal mb-[50px] italic text-[#98A2B3]">
                0/500
              </p>
              <h2 className="text-[#737791] font-inter text-base mb-[30px] font-medium leading-[27px] tracking-normal text-left">
                Link del portafolio
              </h2>
              <input
                id="portfolio"
                className="w-[764px] h-[74.72px] mb-[50px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
                type="text"
                placeholder="Portafolio Link"
              />
            </div>
          </section>
        </section>
        <section className="ml-[500px] flex mt-[60px] items-center gap-[100px] mb-[64px]">
          <button className="font-inter text-base font-semibold leading-[20px] tracking-normal text-center flex items-center justify-center text-white bg-[#7F56D9] w-[519px] h-[82px] rounded-[8px] border border-[#FFFFFF]">
            Guardar
          </button>
          <button className="w-[191px] h-[67px] rounded-[8px] border border-[#C3D3E2] text-[#646464]">
            Cancelar
          </button>
        </section>
      </section>
    </>
  )
}

export default TutorFormBio
