import NavLogin from "./NavLogin";
import LandingDropdown from "./LandingDropdown";
import videocallicon from "../assets/videocallicon.svg";
import collaboration from "../assets/collaboration.svg";
import Duolingo from "../assets/Duolingo.svg";
import Codecov from "../assets/Codecov.svg";
import UserTesting from "../assets/UserTesting.svg";
import MagicLeap from "../assets/MagicLeap.svg";
import talk from "../assets/talking.svg";
import bag from "../assets/bag.svg";
import lamp from "../assets/lamp.svg";

const Landing = () => {
  return (
    <section>
      <NavLogin className="z-50" />
      <div className="absolute flex-row justify-items-start  w-40 h-48 top-36 right-20 bg-white rounded-2xl border border-codecolor z-40 shadow-md shadow-gray-600">
        <div className="absolute w-20 h-20 border-8 border-solid left-10 top-5  border-gray-200  rounded-full"></div>
        <div className="absolute w-20 h-20 border-8 border-solid left-10 top-5 border-l-transparent border-b-transparent  transform rotate-12 border-codecolor rounded-full"></div>
        <h1 className="relative text-3xl text-blackcodecolor font-bold top-28 left-0">5K+</h1>
        <p className="relative text-lg text-gray-500 top-28 left-0 ">Usuarios Online</p>
      </div>

      <div className="absolute flex-row justify-items-start  w-56 h-24 top-72 right-510px bg-white rounded-2xl border border-codecolor z-40 shadow-md shadow-gray-600">
        <div className="relative w-14 h-14 top-5 left-5 flex items-center justify-center bg-codecolor rounded-2xl ">
          <img src={videocallicon} alt="video-call-icon" className="w-10 h-10"></img>
        </div>
        <h1 className="relative text-3xl text-blackcodecolor font-bold bottom-10 left-5">2K+</h1>
        <p className="relative text-lg text-gray-500 bottom-10 left-8 " >Videollamadas</p>
      </div>

      <div className="absolute flex-row justify-items-start  w-56 h-24 bottom-20 right-12 bg-white rounded-2xl border border-codecolor z-40 shadow-md shadow-gray-600">
        <div className="relative w-14 h-14 top-5 left-5 flex items-center justify-center bg-codecolor rounded-2xl ">
          <img src={videocallicon} alt="video-call-icon" className="w-10 h-10"></img>
        </div>
        <h1 className="relative text-3xl text-blackcodecolor font-bold bottom-10 left-5">2K+</h1>
        <p className="relative text-lg text-gray-500 bottom-10 left-8 " >Videollamadas</p>
      </div>

      <div className="px-0 pt-10 pb-20 mx-auto max-w-7xl sm:px-0 md:px-0 lg:px-0 lg:pt-10 " >
        <div className="flex flex-wrap items-center mx-auto max-w-7xl">
          <div className="flex flex-col items-start  ml-0 text-left lg:flex-grow  lg:w-1/2 lg:pl-6 xl:pl-5 md:mb-0 xl:mt-0">
            <h1 className="mb-8 text-4xl font-bold pt-8 tracking-tighter  md:text-9xl lg:text-7xl">
              <span className="block text-blackcodecolor leading-20 ">Encuentra</span>
              <span className="block text-codecolor leading-20">Desarrolladores</span>
              <span className="text-blackcodecolor leading-20">Y </span><span className="text-codecolor">Resuelve </span><span className="text-blackcodecolor">Tus </span><br/><span className="text-codecolor">Problemas</span>
            </h1>
            <p className="mb-8 text-base leading-relaxed text-left text-gray-700">
              Code-Mentor es una plataforma donde te ayuda a conectar con <br/>
              desarrolladores para solucionar tus problemas.
            </p>
            <div className="flex-col mt-0 lg:mt-6 max-w-7xl sm:flex">
              <div className="w-125 absolute bottom-8 -z-50 right-0 " >
                <div className="box-border absolute w-11 h-11 -left-40 bottom-16 border bg-codecolor rounded-full z-0 "></div>
                <div className="box-border absolute w-4 h-4 left-20 -bottom-16 border bg-codecolor rounded-full z-0 "></div>
                <div className="absolute w-414px h-414px left-72  top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor">
                  <div className="absolute w-344px h-344px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor">
                    <div className="absolute w-265px h-265px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor">
                      <div className="absolute w-162px h-162px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor"></div>
                    </div>
                  </div>
                </div>
              </div>
              <form action="" method="post" id="revue-form" name="revue-form" target="_blank" className="h-10 w-125 p-0 mt-0  bg-gray-50 rounded-md ring-1 ring-offset-2 ring-gray-400 sm:flex shadow-md shadow-gray-400">
                <svg className="w-5 h-5 m-3 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <div className="flex-1 min-w-0 revue-form-group">
                  <input id="cta-email" type="email" className="block w-full px-5 py-2 text-lg placeholder-gray-300   bg-transparent   text-codecolor outline-none   " placeholder ="Encuentra un desarrollador  "  />
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-3 revue-form-actions">
                  <LandingDropdown/>
                </div>
              </form>
              <div className="sm:max-w-lg sm:flex">
                <div className="w-125 absolute bottom-96 -z-50 -left-16 " >
                  <div className="box-border absolute w-3 h-3 left-32 -top-44 border bg-codecolor rounded-full z-0 "></div>
                  <div className="absolute w-414px h-414px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor">
                    <div className="absolute w-344px h-344px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor">
                      <div className="absolute w-265px h-265px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor">
                        <div className="absolute w-162px h-162px left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full box-border border border-spiralcolor"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
            <div className="box-border absolute w-125 h-125 right-44 top-32 border border-codecolor rounded-full z-0 "></div>
            <div className="relative w-full max-w-lg z-10 border-transparent" >
              <div className="absolute rounded-full bg-codecolor -top-56 right-12 w-125 h-125 mix-blend-multiply overflow-hidden border-transparent ">
                <img className=" relative w-91.5 h-108 object-center justify-center top-20  object-fit border-transparent    mx-auto " alt="hero" src="src\assets\heroimg.svg"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row items-start  pl-10 absolute w-1224px h-10  ">
        <div className="flex basis-3/12 ">
          <img src={talk}/>
          <p className="pl-2 p-1">Ayuda en depuración de código</p>
        </div>
        <div className="flex basis-4/12">
          <img src={bag}/>
          <p className="pl-2 p-1">Asesoramiento en todas las áreas de desarrollo</p>
        </div>
        <div className="flex basis-5/12">
          <img src={lamp}/>
          <p className="pl-2 p-1">Genera y desarrolla tus ideas con la ayuda de un experto</p>
        </div>
      </div>
      <div className="px-5 py-14 mx-auto lg:px-16">
        <div className="mx-auto text-center">
          <div className="grid grid-cols-5 gap-4 mx-auto lg:grid-cols-5">
            <div>
              <img className="h-6 mx-auto -mt-4 lg:h-16 " src={collaboration} alt="collaboration"/>

              
            </div>
            <div>
              <img className="h-6 mx-auto -mt-4 lg:h-16 " src={Duolingo} alt="Duolingo"/>

              
            </div>
            <div>
              <img className="h-6 mx-auto -mt-4 lg:h-16 " src={Codecov} alt="Codecov"/>

              
            </div>
            <div>
              <img className="h-6 mx-auto -mt-4 lg:h-16 " src={UserTesting} alt="UserTesting"/>

              
            </div>
            <div>
              <img className="h-6 mx-auto -mt-4 lg:h-16 " src={MagicLeap} alt="MagicLeap"/>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;