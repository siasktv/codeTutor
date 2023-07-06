import { Link } from 'react-router-dom'
import bianca from '../../assets/Bianca.png'
import dante from '../../assets/Dante.png'
import juan from '../../assets/Juan.jpg'
import lautaro from '../../assets/Lautaro.png'
import nahuel from '../../assets/Nahuel.png'
import { LinkedIn } from '../../assets'
import { GitHub } from '../../assets'

const LandingFounders = () => {
  return (
    <div className='relative items-center w-full overflow-x-hidden'>
      <section class='text-gray-600 dark:text-gray-200 body-font flex justify-center w-full '>
        <div class=' w-full py-24'>
          <div class='flex flex-col text-center w-full mb-20'>
            <h1 class='text-4xl font-semibold max-lg:text-2xl title-font mb-4 dark:text-codecolor text-blackcodecolor'>
              Conoce a los fundadores
            </h1>
            <p class=' w-screen max-lg:text-md max-lg:-mt-2 leading-relaxed text-base'>
              Descubre y conoce más sobre los desarrolladores que han
              desarrollado Code-tutor.
            </p>
          </div>
          <div class='flex flex-wrap max-lg:px-3 gap-6 justify-center '>
            <div class='px-4 py-10 lg:w-1/6 rounded-md md:w-1/2 bg-[#F9FAFB] dark:bg-gray-800 shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-32  object-cover object-center mb-4'
                  src={bianca}
                />
                <div class='w-full'>
                  <h2 class='title-font font-medium text-lg text-gray-900 dark:text-gray-200'>
                    Bianca Benitez
                  </h2>
                  <h3 class='text-codecolor mb-3 dark:font-semibold'>
                    Full Stack Developer
                  </h3>
                  <p class='mb-4 dark:text-gray-400'>
                    Con experiencia en PERN y MERN stacks, si bien tengo
                    conocimientos tanto como en el backend y frontend, tengo una
                    inclinación particular hacia el front. Me considero una
                    persona creativa y curiosa, a la que le encanta resolver
                    problemas y desarrollar productos digitales de calidad.
                  </p>
                </div>
              </div>
              <div class='inline-flex relative bottom-6 gap-4'>
                <Link to='https://github.com/siasktv' target='_blank'>
                  <a class='text-gray-500'>
                    <img src={GitHub} alt='BiancaGitHub' className='w-8 h-8' />
                  </a>
                </Link>

                <Link
                  to='https://www.linkedin.com/in/bianca-bm/'
                  target='_blank'
                >
                  <a class=' text-gray-500'>
                    <img
                      src={LinkedIn}
                      alt='BiancaLinkedin'
                      className='w-8 h-8'
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div class='px-4 py-10 lg:w-1/6 rounded-md md:w-1/2 bg-[#F9FAFB] dark:bg-gray-800 shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-32  object-cover object-center mb-4'
                  src={dante}
                />
                <div class='w-full'>
                  <h2 class='title-font font-medium text-lg text-gray-900 dark:text-gray-200'>
                    Dante De Nicoló
                  </h2>
                  <h3 class='text-codecolor mb-3 dark:font-semibold'>
                    Full Stack Developer
                  </h3>
                  <p class='mb-4 dark:text-gray-400'>
                    Especializado en el desarrollo de aplicaciones web con PERN
                    y MERN stacks. Proactivo, con capacidad de adaptación y
                    aprendizaje en ambientes profesionales. Priorizo la
                    experiencia de usuario y el ambiente de trabajo
                    colaborativo.
                  </p>
                </div>
              </div>
              <div class='inline-flex relative bottom-6 gap-4'>
                <Link to='https://github.com/dantedenicolo' target='_blank'>
                  <a class='text-gray-500'>
                    <img src={GitHub} alt='DanteGitHub' className='w-8 h-8' />
                  </a>
                </Link>
                <Link
                  to='https://www.linkedin.com/in/dantedenicolo/'
                  target='_blank'
                >
                  <a class=' text-gray-500'>
                    <img
                      src={LinkedIn}
                      alt='DanteLinkedin'
                      className='w-8 h-8'
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div class='px-4 py-10 lg:w-1/6 rounded-md md:w-1/2 bg-[#F9FAFB] dark:bg-gray-800 shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-32 h-32  object-cover object-center mb-4'
                  src={juan}
                />
                <div class='w-full'>
                  <h2 class='title-font font-medium text-lg text-gray-900 dark:text-gray-200'>
                    Juan Carlos Valero
                  </h2>
                  <h3 class='text-codecolor mb-3 dark:font-semibold'>
                    Full Stack Developer
                  </h3>
                  <p class='mb-4 dark:text-gray-400'>
                    Mi objetivo es fortalecer mis conocimientos y habilidades
                    para superar obstáculos. Me enfoco en la investigación, la
                    documentación y el trabajo en equipo para crear productos de
                    calidad y proporcionar una excelente U|X.
                  </p>
                </div>
              </div>
              <div class='inline-flex relative bottom-6 gap-4'>
                <Link to='https://github.com/JCValeroVergara' target='_blank'>
                  <a class='text-gray-500'>
                    <img src={GitHub} alt='JuanGitHub' className='w-8 h-8' />
                  </a>
                </Link>
                <Link
                  to='https://www.linkedin.com/in/juankvalero/'
                  target='_blank'
                >
                  <a class=' text-gray-500'>
                    <img
                      src={LinkedIn}
                      alt='JuanLinkedin'
                      className='w-8 h-8'
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div class='px-4 py-10 lg:w-1/6 rounded-md md:w-1/2 bg-[#F9FAFB] dark:bg-gray-800 shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-32  object-cover object-center mb-4'
                  src={lautaro}
                />
                <div class='w-full'>
                  <h2 class='title-font font-medium text-lg text-gray-900 dark:text-gray-200'>
                    Lautaro Barrios
                  </h2>
                  <h3 class='text-codecolor mb-3 dark:font-semibold'>
                    Full Stack Developer
                  </h3>
                  <p class='mb-4 dark:text-gray-400'>
                    {' '}
                    Con gustos por igual en cuanto al Front-end como en el
                    Back-end. Gracias a mi experiencia y habilidades, desarrollo
                    web amigables y funcionales para el usuario.Mi pasión por el
                    aprendizaje me ha llevado a aprender e incorporar las
                    últimas tecnologías para aplicarlas en en campo del
                    desarrollo.
                  </p>
                </div>
              </div>
              <div class='inline-flex relative bottom-6 gap-4'>
                <Link to='https://github.com/LautaroBarrios' target='_blank'>
                  <a class='text-gray-500'>
                    <img src={GitHub} alt='LautaroGitHub' className='w-8 h-8' />
                  </a>
                </Link>

                <Link
                  to='https://www.linkedin.com/in/lautaro-g-barrios/'
                  target='_blank'
                >
                  <a class=' text-gray-500'>
                    <img
                      src={LinkedIn}
                      alt='LautaroLinkedin'
                      className='w-8 h-8'
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div class='px-4 py-10 lg:w-1/6 rounded-md md:w-1/2 bg-[#F9FAFB] dark:bg-gray-800 shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-32  object-cover object-center mb-4'
                  src={nahuel}
                />
                <div class='w-full'>
                  <h2 class='title-font font-medium text-lg text-gray-900 dark:text-gray-200'>
                    Nahuel Rotela
                  </h2>
                  <h3 class='text-codecolor mb-3 dark:font-semibold'>
                    Full Stack Developer
                  </h3>
                  <p class='mb-4 dark:text-gray-400'>
                    Enfocado al front-end con una actitud positiva, con
                    habilidades técnicas sólidas y pasión por la implementación
                    de nuevas ideas.Logrando que todos los proyectos en los que
                    he participado destaquen por una funcionalidad e interfaz
                    limpia, pero por sobre todo la calidad humana que brindamos
                    a los usuarios y al equipo de trabajo.{' '}
                  </p>
                </div>
              </div>
              <div class='inline-flex relative bottom-6 gap-4'>
                <Link to='https://github.com/MNahuelRotela' target='_blank'>
                  <a class='text-gray-500'>
                    <img src={GitHub} alt='NahuelGitHub' className='w-8 h-8' />
                  </a>
                </Link>
                <Link
                  to='https://www.linkedin.com/in/nahuelrotela/'
                  target='_blank'
                >
                  <a class=' text-gray-500'>
                    <img
                      src={LinkedIn}
                      alt='NahuelLinkedin'
                      className='w-8 h-8'
                    />
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingFounders
