import { Link } from 'react-router-dom'
import bianca from '../../assets/Bianca.png'
import dante from '../../assets/Dante.png'
import juan from '../../assets/Juan.jpg'
import lautaro from '../../assets/Lautaro.png'
import nahuel from '../../assets/Nahuel.png'
import { LinkedIn } from '../../assets'
import { GitHub } from '../../assets'

const Team = () => {
  return (
    <div className='relative items-center w-full overflow-x-hidden'>
      <section class=' dark:text-gray-200 body-font flex justify-center w-full '>
        <div class=' w-full py-24'>
          <div class='flex flex-col text-center w-full '>
            <h1 class='text-codecolor dark:text-codecolor font-bold text-lg max-lg:mt-10'>
              Conoce al equipo 🚀
            </h1>
            <p class='lg:pb-16  text-3xl dark:text-gray-200 font-semibold max-lg:text-xl'>
              Descubre y conoce más sobre los programadores que han desarrollado{' '}
              <br />
              Code-tutor.
            </p>
          </div>
          <div class='flex flex-wrap max-lg:px-3 gap-6 justify-center '>
            {/* Bianca */}
            <div class=' py-6 lg:w-1/6 border rounded-xl md:w-1/2 bg-white px-8 shadow-lg dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 dark:border-none dark:hover:shadow-gray-800 dark:shadow-transparent max-lg:hover:shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-28 object-cover object-center mb-4'
                  src={bianca}
                />
                <div class='w-full'>
                  <h2 class='title-font font-bold text-lg text-gray-900 dark:text-gray-200'>
                    Bianca Benitez
                  </h2>
                  <h3 class='text-codecolor font-semibold mb-4 dark:font-semibold'>
                    Full Stack Developer
                  </h3>

                  <p class='mb-4 text-center text-gray-500 dark:text-gray-400'>
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
                    <img src={GitHub} alt='BiancaGitHub' className='w-6 h-6' />
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
                      className='w-6 h-6'
                    />
                  </a>
                </Link>
              </div>
            </div>

            {/* Dante  */}

            <div class=' py-6 lg:w-1/6 border rounded-xl md:w-1/2 bg-white px-8 shadow-lg dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 dark:border-none dark:hover:shadow-gray-800 dark:shadow-transparent max-lg:hover:shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-28  object-cover object-center mb-4'
                  src={dante}
                />
                <div class='w-full'>
                  <h2 class='title-font font-bold text-lg text-gray-900 dark:text-gray-200'>
                    Dante De Nicoló
                  </h2>
                  <h3 class='text-codecolor font-semibold mb-4 dark:font-semibold'>
                    Full Stack Developer
                  </h3>

                  <p class='mb-4 text-center text-gray-500 dark:text-gray-400'>
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
                    <img src={GitHub} alt='DanteGitHub' className='w-6 h-6' />
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
                      className='w-6 h-6'
                    />
                  </a>
                </Link>
              </div>
            </div>

            {/* Juan  */}
            <div class=' py-6 lg:w-1/6 border rounded-xl md:w-1/2 bg-white px-8 shadow-lg dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 dark:border-none dark:hover:shadow-gray-800 dark:shadow-transparent max-lg:hover:shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-28 h-28 object-cover object-center mb-4'
                  src={juan}
                />
                <div class='w-full'>
                  <h2 class='title-font font-bold text-lg text-gray-900 dark:text-gray-200'>
                    Juan Carlos Valero
                  </h2>
                  <h3 class='text-codecolor font-semibold mb-4 dark:font-semibold'>
                    Full Stack Developer
                  </h3>

                  <p class='mb-4 text-center text-gray-500 dark:text-gray-400'>
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
                    <img src={GitHub} alt='JuanGitHub' className='w-6 h-6' />
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
                      className='w-6 h-6'
                    />
                  </a>
                </Link>
              </div>
            </div>

            {/* Lautaro  */}

            <div class=' py-6 lg:w-1/6 border rounded-xl md:w-1/2 bg-white px-8 shadow-lg dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 dark:border-none dark:hover:shadow-gray-800 dark:shadow-transparent max-lg:hover:shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-28 h-28 object-cover object-center mb-4'
                  src={lautaro}
                />
                <div class='w-full'>
                  <h2 class='title-font font-bold text-lg text-gray-900 dark:text-gray-200'>
                    Lautaro Barrios
                  </h2>
                  <h3 class='text-codecolor font-semibold mb-4 dark:font-semibold'>
                    Full Stack Developer
                  </h3>

                  <p class='mb-4 text-center text-gray-500 dark:text-gray-400'>
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
                    <img src={GitHub} alt='LautaroGitHub' className='w-6 h-6' />
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
                      className='w-6 h-6'
                    />
                  </a>
                </Link>
              </div>
            </div>

            {/* Nahuel  */}
            <div class=' py-6 lg:w-1/6 border rounded-xl md:w-1/2 bg-white px-8 shadow-lg dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 dark:border-none dark:hover:shadow-gray-800 dark:shadow-transparent max-lg:hover:shadow-md'>
              <div class='h-full flex flex-col items-center text-center'>
                <img
                  alt='team'
                  class='flex-shrink-0 rounded-full w-28 h-28 object-cover object-center mb-4'
                  src={nahuel}
                />
                <div class='w-full'>
                  <h2 class='title-font font-bold text-lg text-gray-900 dark:text-gray-200'>
                    Nahuel Rotela
                  </h2>
                  <h3 class='text-codecolor font-semibold mb-4 dark:font-semibold'>
                    Full Stack Developer
                  </h3>

                  <p class='mb-4 text-center text-gray-500 dark:text-gray-400'>
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
                    <img src={GitHub} alt='NahuelGitHub' className='w-6 h-6' />
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
                      className='w-6 h-6'
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

export default Team
