import {
  heroimgSvg,
  MagnifyingGlassSearch,
  talking,
  bag,
  lamp,
} from '../../assets'
import { Link } from 'react-router-dom'
import teamWork from '../../assets/teamwork.png'
import mentor from '../../assets/mentor.png'

const Hero = () => {
  return (
    <section className=" w-full bg-gray-50">
      <div className="flex flex-col items-center px-8">
        <div className="flex mt-8  items-center">
          <div className="flex gap-8 mt-8 w-3/5 pr-16 text-left flex-col ">
            <h1 className="text-6xl font-bold leading-tight whitespace-nowrap">
              Encuentra <br />{' '}
              <span className="text-codecolor">Desarrolladores</span> <br />Y{' '}
              <span className="text-codecolor">Resuelve</span> Tus <br />
              <span className="text-codecolor">Problemas</span>
            </h1>
            <p className="text  text-[#646464]">
              Code-Tutor es una plataforma donde te ayuda a conectar con{' '}
              desarrolladores para solucionar tus problemas en codigo.
            </p>
            <div className="h-10  lg:w-125 p-0 mt-0 bg-gray-50 dark:bg-gray-900 dark:ring-gray-600 dark:shadow-gray-800 dark:border-gray-400 rounded-md ring-1 ring-offset-2 dark:ring-offset-0 ring-gray-400 flex shadow-md shadow-gray-400">
              <img
                src={MagnifyingGlassSearch}
                className="pl-2 max-sm:w-6"
              ></img>
              <form
                className="flex-1 dark:border-gray-800  min-w-0 revue-form-group mt-0.5 max-lg:mt-1"
                // onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  //   onChange={handleSearch}
                  //   value={currentSearch}
                  className="flex flex-row items-center justify-center lg:w-full py-1 pl-2 pr-2 lg:text-lg placeholder-gray-300  bg-transparent  dark:text-gray-200 text-codecolor outline-none  md:w-96"
                  placeholder="Encuentra un desarrollador  "
                />
              </form>
              <div className="sm:mt-0 sm:ml-3 revue-form-actions">
                <div className="relative inline-block text-left">
                  <div>
                    <Link
                      to="/search"
                      type="button"
                      className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-violet-100 px-6 py-2 text-md font-semibold dark:text-gray-200 dark:bg-codecolor dark:hover:bg-codecolordark dark:rounded-l-none text-codecolor shadow-sm hover:bg-violet-200 "
                      id="menu-button"
                      aria-expanded="false"
                      aria-haspopup="true"
                    >
                      Buscar
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-2/5 ">
            <div className="relative">
              <div className="absolute top-0 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-2 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-20 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
              <div className=" relative  border border-gray-200 rounded-full bg-codecolor  w-125 h-125 mt-8 ml-5 overflow-hidden ">
                <img
                  className="relative w-91.5 h-108 object-center justify-center top-20  object-fit  mx-auto z-0 "
                  src={heroimgSvg}
                  alt="heroimgSvg"
                />
              </div>
            </div>
            <div className="absolute items-center right-12 border border-codecolorlighter top-0 lg:top-28 flex flex-col py-5 px-7 rounded-2xl shadow-xl bg-white/40 backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <div className="flex ">
                <img className="w-16 h-16" src={teamWork} alt="teamwork" />
              </div>

              <div className="pt-3 font-bold text-xl">3k+</div>
              <div className="flex items-center text-gray-800 leading-relaxed">
                <span className="pl-1">usuarios online</span>
              </div>
            </div>
            <div className="px-2 py-2 absolute bottom-0 items-center border border-codecolorlighters md:bottom-32 lg:bottom-38 flex bg-white/40 rounded-2xl shadow-xl backdrop-blur-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
              <img src={mentor} className="w-16 h-16 self-end" alt="mentor" />
              <div class="ml-4">
                <div class="font-bold text-xl">2k+</div>
                <div class="text-gray-600 leading-relaxed">
                  más de 2,500 sesiones 🚀
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row pb-8 justify-between px-8 w-full h-10 top-20 mt-20 ">
        <div className="flex items-center ">
          <img src={talking} />
          <p className="pl-2 p-1 dark:text-gray-200">
            Ayuda en depuración de código
          </p>
        </div>
        <div className="flex items-center">
          <img src={bag} />
          <p className="pl-2 p-1 dark:text-gray-200">
            Asesoramiento en todas las áreas de desarrollo
          </p>
        </div>
        <div className="flex items-center ">
          <img src={lamp} />
          <p className="pl-2 p-1 dark:text-gray-200">
            Genera y desarrolla tus ideas con la ayuda de un experto
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
