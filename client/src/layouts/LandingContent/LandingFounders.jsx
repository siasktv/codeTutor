import { Link } from "react-router-dom";
import bianca from "../../assets/Bianca.png";
import dante from "../../assets/Dante.png";
import juan from "../../assets/Juan.jpg";
import lautaro from "../../assets/Lautaro.png";
import nahuel from "../../assets/Nahuel.png";
import { LinkedIn } from "../../assets";
import { GitHub } from "../../assets";

const LandingFounders = () => {
  return (
    <div className="relative items-center w-full">
    <section class="text-gray-600 body-font flex justify-center w-full ">
  <div class=" w-full py-24">
    <div class="flex flex-col text-center w-full mb-20">
      <h1 class="text-4xl font-medium title-font mb-4 text-blackcodecolor">Conoce a los fundadores</h1>
      <p class=" w-screen  leading-relaxed text-base">Descubre y conoce más sobre los desarrolladores que han desarrollado Code-tutor.</p>
    </div>
    <div class="flex flex-wrap  gap-10 justify-center ">
      <div class="p-4 lg:w-1/6 md:w-1/2 bg-[#F9FAFB] shadow-md">
        <div class="h-full flex flex-col items-center text-center">
          <img alt="team" class="flex-shrink-0 rounded-full w-32  object-cover object-center mb-4" src={bianca}/>
          <div class="w-full">
            <h2 class="title-font font-medium text-lg text-gray-900">Bianca Benitez</h2>
            <h3 class="text-codecolor mb-3">Full Stack Developer</h3>
            <p class="mb-4">Con experiencia en PERN y MERN stacks, si bien tengo conocimientos tanto como en el backend y frontend, tengo una inclinación particular hacia el front. Me considero una persona creativa y curiosa, a la que le encanta resolver problemas y desarrollar productos digitales de calidad.</p>
          </div>
        </div>
            <div class="inline-flex relative bottom-6 gap-4">
            <Link to="https://github.com/siasktv" target="_blank">
              <a class="text-gray-500">
                <img src={GitHub} alt="BiancaGitHub"  className="w-8 h-8"/>
              </a>
            </Link>

                <Link to="https://www.linkedin.com/in/bianca-bm/" target="_blank">
              <a class=" text-gray-500">
              <img src={LinkedIn} alt="BiancaLinkedin"className="w-8 h-8" />
              </a>
                </Link>
              
            </div>
      </div>
      <div class="p-4 lg:w-1/6 md:w-1/2 bg-[#F9FAFB] shadow-md">
        <div class="h-full flex flex-col items-center text-center">
          <img alt="team" class="flex-shrink-0 rounded-full w-32  object-cover object-center mb-4" src={dante}/>
          <div class="w-full">
            <h2 class="title-font font-medium text-lg text-gray-900">Dante De Nicoló</h2>
            <h3 class="text-codecolor mb-3">Full Stack Developer</h3>
            <p class="mb-4">Me especializo en desarrollo frontend y backend, con dominio de HTML, CSS, JavaScript, React, Redux, NodeJS, NextJS, Express y Flask. Adicionalmente, tengo experiencia trabajando con bases de datos MySQL y PostgreSQL.Como autodidacta, me apasiona aprender continuamente y expandir mi conjunto de habilidades. </p>
          </div>
        </div>
        <div class="inline-flex relative bottom-6 gap-4">
            <Link to="https://github.com/dantedenicolo" target="_blank">
              <a class="text-gray-500">
                <img src={GitHub} alt="DanteGitHub"  className="w-8 h-8"/>
              </a>
            </Link>
            <Link to="https://www.linkedin.com/in/dantedenicolo/" target="_blank">
              <a class=" text-gray-500">
              <img src={LinkedIn} alt="DanteLinkedin"className="w-8 h-8" />
              </a>
            </Link>
        </div>
      </div>
      <div class="p-4 lg:w-1/6 md:w-1/2 bg-[#F9FAFB] shadow-md">
        <div class="h-full flex flex-col items-center text-center">
          <img alt="team" class="flex-shrink-0 rounded-full w-32 h-32  object-cover object-center mb-4" src={juan}/>
          <div class="w-full">
            <h2 class="title-font font-medium text-lg text-gray-900">Juan Carlos Valero</h2>
            <h3 class="text-codecolor mb-3">Full Stack Developer</h3>
            <p class="mb-4">Mi objetivo es fortalecer mis conocimientos y habilidades para superar obstáculos. Me enfoco en la investigación, la documentación y el trabajo en equipo para crear productos de calidad y proporcionar una excelente U|X.</p>
          </div>
        </div>
        <div class="inline-flex relative bottom-6 gap-4">
            <Link to="https://github.com/JCValeroVergara" target="_blank">
              <a class="text-gray-500">
                <img src={GitHub} alt="JuanGitHub"  className="w-8 h-8"/>
              </a>
            </Link>
            <Link to="https://www.linkedin.com/in/juankvalero/" target="_blank">
              <a class=" text-gray-500">
              <img src={LinkedIn} alt="JuanLinkedin"className="w-8 h-8" />
              </a>
            </Link>
            </div>
      </div>
      <div class="p-4 lg:w-1/6 md:w-1/2 bg-[#F9FAFB] shadow-md">
        <div class="h-full flex flex-col items-center text-center">
          <img alt="team" class="flex-shrink-0 rounded-full w-32  object-cover object-center mb-4" src={lautaro}/>
          <div class="w-full">
            <h2 class="title-font font-medium text-lg text-gray-900">Lautaro Barrios</h2>
            <h3 class="text-codecolor mb-3">Full Stack Developer</h3>
            <p class="mb-4"> Con gustos por igual en cuanto al Front-end como en el Back-end. Gracias a mi experiencia y habilidades, desarrollo web amigables y funcionales para el usuario.Mi pasión por el aprendizaje me ha llevado a aprender e incorporar las últimas tecnologías para aplicarlas en en campo del desarrollo.</p>
          </div>
        </div>
        <div class="inline-flex relative bottom-6 gap-4">
            <Link to="https://github.com/LautaroBarrios" target="_blank">
              <a class="text-gray-500">
                <img src={GitHub} alt="LautaroGitHub"  className="w-8 h-8"/>
              </a>
            </Link>
            
            <Link to="https://www.linkedin.com/in/lautaro-g-barrios/" target="_blank">
              <a class=" text-gray-500">
              <img src={LinkedIn} alt="LautaroLinkedin"className="w-8 h-8" />
              </a>
            </Link>
            </div>
      </div>
      <div class="p-4 lg:w-1/6 md:w-1/2 bg-[#F9FAFB] shadow-md">
        <div class="h-full flex flex-col items-center text-center">
          <img alt="team" class="flex-shrink-0 rounded-full w-32  object-cover object-center mb-4" src={nahuel}/>
          <div class="w-full">
            <h2 class="title-font font-medium text-lg text-gray-900">Nahuel Rotela</h2>
            <h3 class="text-codecolor mb-3">Full Stack Developer</h3>
            <p class="mb-4">Enfocado al front-end con una actitud positiva, con habilidades técnicas sólidas y pasión por la implementación de nuevas ideas.Logrando que todos los proyectos en los que he participado destaquen por una funcionalidad e interfaz limpia, pero por sobre todo la calidad humana que brindamos a los usuarios y al equipo de trabajo. </p>
          </div>
        </div>
        <div class="inline-flex relative bottom-6 gap-4">
            <Link to="https://github.com/MNahuelRotela" target="_blank">
              <a class="text-gray-500">
                <img src={GitHub} alt="NahuelGitHub"  className="w-8 h-8"/>
              </a>
            </Link>
            <Link to="https://www.linkedin.com/in/nahuelrotela/" target="_blank">
              <a class=" text-gray-500">
              <img src={LinkedIn} alt="NahuelLinkedin"className="w-8 h-8" />
              </a>
            </Link>
            </div>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default LandingFounders;