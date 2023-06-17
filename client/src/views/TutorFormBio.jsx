import { NavBar } from '../components'

const TutorFormData = () => {
  return (
    <>
      <NavBar />
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

        <section className="flex ml-[68px] mt-[33px]">
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
          <section className="flex flex-col gap-[18px] ml-[86px]">
            <div className="bg-white w-[879px]  h-[230px] border border-[#1414140D] rounded-[8px]">
              <div className="flex justify-between  items-center  gap-[62px] pt-[36px] pl-[52px] pr-[52px]">
                <div className="w-[153px] h-[153px] bg-slate-400 rounded-full"></div>
                <button className="w-[172px] flex items-center rounded-[8px] bg-[#7D5AE21A] text-[#7D5AE2] justify-center h-[50px]">
                  Cambiar foto
                </button>
              </div>
            </div>
            <div className="bg-white w-[879px]  h-[230px] border border-[#1414140D] rounded-[8px]">
              <div className="flex flex-col gap-[30px] pt-[36px] pl-[52px]">
                <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
                  Actualizar el nombre de la cuenta
                </h2>
                <input
                  id="inputField"
                  className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
                  type="text"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="bg-white w-[879px]   border border-[#1414140D] rounded-[8px]">
              <div className="flex flex-col gap-[30px] pb-[36px] pt-[36px] pl-[52px]">
                <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
                  Actualizar zona horaria
                </h2>
                <input
                  id="inputField"
                  className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
                  type="text"
                  placeholder="Zona Horaria"
                />
              </div>
            </div>
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

            <div className="bg-white w-[879px] mb-[166px] border border-[#1414140D] rounded-[8px]">
              <div className="flex flex-col gap-[30px] pb-[36px] pt-[36px] pl-[52px]">
                <h2 className="font-inter text-xl font-semibold leading-[38px] tracking-normal text-left text-[#05004E]">
                  Idiomas
                </h2>
                <p className="text-[#737791] font-inter text-base font-medium leading-[27px] tracking-normal text-left">
                  Por favor, añade los idiomas en los que tienes fluidez para
                  que aparezcan en tu perfil.
                </p>
                <div className="bg-[#7D5AE21A] w-[130px] justify-between items-center p-4 text-[#7D5AE2]  h-[50px] rounded-[8px]">
                  <p className="text-[#7D5AE2]">Español</p>
                </div>
                <input
                  id="inputField"
                  className="w-[764px] h-[74.72px] px-6 bg-none rounded-[8px] border border-[#C3D3E2]"
                  type="link"
                  placeholder="Español"
                />
              </div>
              <button className="mb-[36px] mt-auto ml-auto mr-[60px]  font-inter text-base font-semibold leading-[20px] tracking-normal text-center flex items-center justify-center text-white bg-[#7F56D9] w-[130px] h-[55px] rounded-[8px] border border-[#FFFFFF]">
                Agregar
              </button>
            </div>
          </section>
        </section>
      </section>
    </>
  )
}

export default TutorFormData
