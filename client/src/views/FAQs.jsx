import NavUserNotifications from "../components/NavUserNotifications";
import useUser from "../hooks/useUser";
import { FlechaFiltro } from "../assets";

const FAQs = () => {
  // Datos Usuario Navbar
  const user = useUser();

  // Función de despligue de h3 de preguntas
  function toggleAnswer(event) {
    var respuestaId = event.target.getAttribute("data-respuesta-id");
    var respuesta = document.getElementById(respuestaId);
    respuesta.classList.toggle("hidden");
  }
  return (
    <>
      <NavUserNotifications user={user} />
      {/* Contenedor principal */}
      <div className="bg-gray-100 flex flex-col items-start px-10 py-10 gap-2 w-full h-full">
        {/* Contenedor secundario de bordes redondeados */}
        <div className="w-full p-10 text-left bg-white border border-gray-200 shadow-md rounded-lg space-y-2">
          {/* Título */}
          <div className="flex justify-between items-center pb-3">
            <h1 className="font-semibold text-2xl">
              FAQs - Preguntas frecuentes
            </h1>
            <div className=" space-x-1">
              <button className="px-2 py-1 bg-violet-100 border rounded text-codecolor text-sm font-semibold active:scale-90 transition duration-150 select-none">
                Nueva pregunta
              </button>
              <button className="px-2 py-1 bg-violet-100 border rounded text-codecolor text-sm font-semibold active:scale-90 transition duration-150 select-none">
                Dar mi opinión
              </button>
            </div>
          </div>

          {/* Información */}
          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta1"
              >
                ¿Qué es Code Tutor y para qué sirve?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta1"
              />
            </div>
            <h3 id="respuesta1" className="text-sm hidden">
              Code Tutor es una plataforma en línea orientada a usuarios de
              Latinoamérica que sirve para conectar usuarios con tutores para
              proyectos de programación de manera independiente.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta2"
              >
                ¿Cuáles son las ventajas de utilizar la plataforma en
                comparación con buscar un tutor de programación de forma
                tradicional?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta2"
              />
            </div>
            <h3 id="respuesta2" className="text-sm hidden">
              {/* <br />► Mayor accesibilidad: Code-Tutor te permite acceder a una
              amplia cantidad de programadores en línea, lo que te brinda una
              mayor posibilidad de encontrar un tutor adecuado para tus
              necesidades, sin importar tu ubicación geográfica.
              <br />► Filtrado personalizado: Puedes utilizar los filtros de
              búsqueda de Code-Tutor para encontrar un tutor que se ajuste a tus
              criterios específicos, como país de origen, idioma, calificación
              de los usuarios y tarifa. Esto te permite encontrar el tutor ideal
              según tus preferencias y requisitos. También brinda la opción de
              filtrar los tutores de programación según la tecnología en la que
              estás interesado. Esta función te permite encontrar tutores
              especializados en tecnologías específicas, como Python,
              JavaScript, Java, C++, entre otras.
              <br />► Información detallada del tutor: En los perfiles de los
              tutores de Code-Tutor, encontrarás información detallada sobre su
              experiencia, tecnologías trabajadas, proyectos anteriores,
              trabajos y enlaces a plataformas como GitHub y LinkedIn. Esto te
              permite evaluar su experiencia y habilidades antes de elegir un
              tutor.
              <br />► Reviews y testimonios: Los perfiles de los tutores en
              Code-Tutor cuentan con reviews y testimonios de otros usuarios.
              Esto te brinda una visión general de la calidad y la experiencia
              del tutor, ayudándote a tomar una decisión informada.
              <br />► Facilidad de contacto y contratación: A través de
              Code-Tutor, puedes contactar directamente con los tutores y
              programar reuniones para discutir tus necesidades y contratar sus
              servicios.
              <br />► Flexibilidad horaria: Los tutores de Code-Tutor suelen
              ofrecer horarios flexibles para adaptarse a tus necesidades. Esto
              te permite programar las sesiones de tutoría de acuerdo con tu
              disponibilidad, lo cual puede ser más conveniente que coordinar
              horarios con un tutor de forma tradicional.
              <br />► Tarifas competitivas: Code-Tutor ofrece una variedad de
              tutores con diferentes tarifas, lo que te permite encontrar
              opciones que se ajusten a tu presupuesto. Además, al tener la
              opción de filtrar por tarifa mínima, lo cual puede resultar más
              económico que buscar un tutor de programación de forma
              tradicional.
              <br />
              ►Comunidad y networking: Al utilizar Code-Tutor, tienes la
              oportunidad de conectarte con una comunidad de usuarios y tutores
              de programación. Esto te brinda la posibilidad de establecer
              contactos con profesionales del campo, compartir conocimientos e
              incluso encontrar oportunidades laborales o proyectos
              colaborativos.
              <br />► Mayor comodidad y ahorro de tiempo: Utilizar Code-Tutor te
              brinda la comodidad de acceder a tutores de programación desde
              cualquier lugar y en cualquier momento. No tienes que desplazarte
              físicamente ni coordinar horarios complicados. Esto te ahorra
              tiempo y te permite aprovechar al máximo tus sesiones de tutoría.
              <br />► Actualización constante de habilidades: Los tutores de
              Code-Tutor suelen estar al día con las últimas tendencias y
              tecnologías de programación. Esto te brinda la oportunidad de
              aprender y desarrollar habilidades relevantes en el campo de la
              programación, manteniéndote actualizado en un entorno que
              evoluciona rápidamente.
              <br />► Seguridad y confidencialidad: Code-Tutor se preocupa por
              garantizar la seguridad y confidencialidad de los usuarios. La
              plataforma implementa medidas de seguridad para proteger la
              información personal y los datos sensibles. Además, cualquier
              información compartida durante las sesiones de tutoría se trata de
              manera confidencial y solo se comparte entre el tutor y el usuario
              involucrado.
              <br />► Pagos seguros y confiables: Code-Tutor ofrece un sistema
              de pagos seguro y confiable para garantizar transacciones sin
              problemas entre los usuarios y los tutores. La plataforma utiliza
              métodos de pago seguros y encriptados para proteger la información
              financiera de los usuarios.
              <br />► Oportunidad de encontrar un tutor con conocimientos
              especializados en el área específica en la que necesitas ayuda.
              <br />► Chat incorporado: Code-Tutor cuenta con un chat
              incorporado en la plataforma, lo que te permite comunicarte
              directamente con los tutores de programación de manera conveniente
              y segura. A través de este chat, puedes hacer preguntas, discutir
              tus necesidades, acordar horarios de tutoría y compartir
              información relevante para el desarrollo de tu proyecto de
              programación.
              <br />► Control del tiempo de sesión: Durante las sesiones de
              tutoría en Code-Tutor, se cuenta con un cronómetro especial que
              permite registrar y contabilizar el tiempo de la sesión. Esto es
              útil tanto para los tutores como para los usuarios, ya que
              facilita la medición precisa del tiempo invertido en la tutoría y
              permite establecer la tarifa correspondiente de manera justa y
              transparente.
              <br />► Recordatorios de tiempo: Code-Tutor ofrece un sistema de
              recordatorios de tiempo durante las sesiones de tutoría. Estos
              recordatorios sirven para alertar en momentos específicos durante
              la sesión, lo que ayuda a mantener un seguimiento del tiempo
              transcurrido. Además de servir como una herramienta útil para
              administrar eficientemente el tiempo y asegurarse de que se
              aproveche al máximo durante la tutoría.
              <br />► Uso de salas en plataformas conocidas: Code-Tutor
              recomienda y facilita la creación de salas de reunión en
              plataformas populares y ampliamente utilizadas, como Zoom, Google
              Meet y Google Hangouts. Estas plataformas ofrecen funcionalidades
              adicionales, como videollamadas, compartición de pantalla y chat
              en tiempo real, que mejoran la experiencia de tutoría y facilitan
              la interacción entre el tutor y el usuario.
              <br />► Amplia disponibilidad: Code-Tutor ofrece una amplia
              variedad de tutores de programación disponibles en diferentes
              zonas horarias. Esto significa que puedes encontrar un tutor
              adecuado independientemente de tu ubicación geográfica y tener
              acceso a sesiones de tutoría incluso en horarios no
              convencionales. */}
              Las ventajas de utilizar la plataforma Code-Tutor en comparación
              con buscar un tutor de programación de forma tradicional son:
              mayor accesibilidad a una amplia cantidad de programadores en
              línea, filtrado personalizado para encontrar el tutor ideal,
              información detallada del tutor en los perfiles, reviews y
              testimonios de otros usuarios, facilidad de contacto y
              contratación, flexibilidad horaria, tarifas competitivas,
              comunidad y networking con otros profesionales, mayor comodidad y
              ahorro de tiempo al acceder a tutores desde cualquier lugar,
              actualización constante de habilidades, seguridad y
              confidencialidad de los datos, pagos seguros, oportunidad de
              encontrar un tutor especializado, chat incorporado para
              comunicarse directamente, control del tiempo de sesión,
              recordatorios de tiempo, uso de salas en plataformas conocidas y
              amplia disponibilidad de tutores en diferentes zonas horarias.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta3"
              >
                ¿Cómo funciona la plataforma de conexión de usuarios con tutores
                de programación?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta3"
              />
            </div>
            <h3 id="respuesta3" className="text-sm hidden">
              1- Registro o inicio de sesión: Los usuarios pueden acceder a la
              plataforma mediante un proceso de registro o inicio de sesión.
              Esto les brinda acceso a las funciones y características de la
              plataforma. <br />
              2- Búsqueda de tutores: Una vez dentro de la plataforma, los
              usuarios pueden buscar tutores de programación que se ajusten a
              sus necesidades. Pueden utilizar filtros como tecnología, país de
              origen, idioma y calificación para encontrar el tutor adecuado.
              <br />
              3- Explorar perfiles y chatear: Los usuarios pueden ver los
              perfiles de los tutores para obtener más información sobre su
              experiencia, habilidades y proyectos anteriores. También pueden
              iniciar un chat con los tutores para hacer preguntas y discutir
              detalles específicos antes de comprometerse con una tutoría.{" "}
              <br />
              4- Acomodar la sesión: Una vez que los usuarios han seleccionado
              un tutor, pueden coordinar la sesión de tutoría según la
              disponibilidad del tutor y el usuario. Esto se realiza utilizando
              un calendario que muestra los horarios disponibles del tutor.{" "}
              <br />
              5- Iniciar la sesión: Una vez que se ha acordado el horario, la
              sesión de tutoría se lleva a cabo utilizando plataformas de
              videoconferencia como Zoom, Google Meet o Google Hangouts. Estas
              plataformas ofrecen herramientas de comunicación en tiempo real,
              como videollamadas y compartición de pantalla, para facilitar la
              interacción entre el tutor y el usuario. <br />
              6-Registro del tiempo y pago: Durante la sesión de tutoría, se
              registra el tiempo transcurrido para calcular la duración exacta
              de la sesión. Esto se utiliza para el cobro de los servicios del
              tutor, que se realiza de acuerdo con la tarifa establecida. <br />
              En resumen, la plataforma de conexión de usuarios con tutores de
              programación permite a los usuarios registrarse, buscar y
              seleccionar tutores, chatear con ellos para discutir detalles,
              coordinar sesiones según la disponibilidad, llevar a cabo las
              tutorías utilizando plataformas de videoconferencia y realizar el
              pago por los servicios recibidos.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta4"
              >
                ¿Qué tipo de proyectos de programación se pueden solicitar en la
                plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta4"
              />
            </div>
            <h3 id="respuesta4" className="text-sm hidden">
              En la plataforma Code-Tutor, se pueden solicitar una amplia
              variedad de proyectos de programación. Algunos ejemplos de los
              tipos de proyectos que puedes solicitar incluyen:
              <br />
              1- Desarrollo de aplicaciones web: Puedes solicitar proyectos de
              desarrollo de aplicaciones web utilizando tecnologías como
              Angular, React, Django, Laravel, Node.js, entre otras. Estos
              proyectos pueden involucrar la creación de sitios web
              interactivos, aplicaciones de comercio electrónico, paneles de
              administración, y más. <br />
              2- Desarrollo de aplicaciones móviles: Si necesitas desarrollar
              una aplicación móvil para plataformas como Android o iOS, puedes
              encontrar tutores especializados en tecnologías como Kotlin,
              Swift, React Native, Ionic, entre otras. Estos tutores pueden
              ayudarte con la creación de aplicaciones nativas, híbridas o
              multiplataforma. <br />
              3- Desarrollo de software: Si estás trabajando en un proyecto de
              desarrollo de software en general, puedes encontrar tutores con
              experiencia en lenguajes de programación como Java, C++, C#,
              Python, Ruby, entre otros. Estos proyectos pueden incluir el
              desarrollo de software de escritorio, aplicaciones de línea de
              comandos, sistemas embebidos, entre otros. <br />
              4- Inteligencia Artificial y Aprendizaje Automático: Si estás
              interesado en proyectos relacionados con Inteligencia Artificial
              (IA) y Aprendizaje Automático (Machine Learning), puedes encontrar
              tutores especializados en tecnologías como Tensorflow, Python, R y
              Matlab. Estos tutores pueden ayudarte a desarrollar modelos de IA,
              aplicaciones de procesamiento de lenguaje natural, análisis de
              datos y más. <br />
              5- Bases de datos y administración de sistemas: Si necesitas ayuda
              con proyectos relacionados con bases de datos y administración de
              sistemas, puedes encontrar tutores con experiencia en tecnologías
              como MySQL, PostgreSQL, MongoDB, y herramientas como Docker, AWS,
              GCP, entre otros. Estos tutores pueden ayudarte con la
              configuración, optimización y administración de bases de datos y
              sistemas en la nube. <br />
              <br />
              Estos son solo algunos ejemplos, pero en general, en Code-Tutor
              puedes solicitar proyectos de programación en diversas áreas y
              tecnologías. La plataforma cuenta con tutores especializados en
              diferentes campos de la programación para brindarte asesoramiento
              y apoyo en tu proyecto específico.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta5"
              >
                ¿Cómo puedo encontrar un tutor adecuado para mi proyecto de
                programación?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta5"
              />
            </div>
            <h3 id="respuesta5" className="text-sm hidden">
              Para encontrar un tutor adecuado para tu proyecto de programación
              en la plataforma Code-Tutor, puedes seguir estos pasos: <br />
              1- Registro o inicio de sesión: Si aún no tienes una cuenta en
              Code-Tutor, regístrate en la plataforma o inicia sesión si ya
              tienes una cuenta. <br />
              2-Define los requisitos de tu proyecto: Antes de comenzar la
              búsqueda, es importante tener claros los requisitos y objetivos de
              tu proyecto de programación. Esto te ayudará a buscar un tutor que
              tenga experiencia y conocimientos relevantes.
              <br />
              3- Utiliza los filtros de búsqueda: En la plataforma, podrás
              utilizar los filtros de búsqueda para refinar tus resultados.
              Puedes filtrar por tecnología, país de origen, idioma y
              calificación de los usuarios para encontrar tutores que se ajusten
              a tus necesidades. <br />
              4- Explora perfiles de tutor: Examina los perfiles de los tutores
              que aparecen en los resultados de búsqueda. Lee la descripción de
              su experiencia, tecnologías trabajadas, proyectos anteriores y
              cualquier otra información relevante que proporcione.
              <br />
              5- Verifica las calificaciones y reviews: Revisa las
              calificaciones y comentarios dejados por otros usuarios sobre los
              tutores. Esto te dará una idea de la calidad de las tutorías
              brindadas por cada tutor. <br />
              6- Contacta con los tutores: Si encuentras un tutor que te parezca
              adecuado, puedes iniciar un chat con él a través de la plataforma.
              Utiliza este chat para hacer preguntas adicionales, discutir los
              detalles de tu proyecto y evaluar si el tutor tiene la experiencia
              y las habilidades necesarias. <br />
              7- Evalúa la disponibilidad y compatibilidad: Asegúrate de
              discutir la disponibilidad del tutor y verificar si coincide con
              tus horarios. También considera la compatibilidad en términos de
              comunicación y enfoque de enseñanza. Es importante sentirse cómodo
              y tener una buena conexión con el tutor.
              <br />
              8- Organiza una reunión y contrata al tutor: Si estás satisfecho
              con la comunicación y la compatibilidad, puedes organizar una
              reunión con el tutor utilizando las herramientas de programación
              disponibles en la plataforma. Si todo va bien y el tutor está
              disponible, puedes proceder a contratar sus servicios para tu
              proyecto de programación. <br />
              <br />
              Recuerda que la plataforma Code-Tutor está diseñada para ayudarte
              a encontrar tutores especializados en diferentes tecnologías y
              campos de programación. Aprovecha los recursos proporcionados en
              la plataforma, como los perfiles de tutor, las calificaciones y
              los chats, para tomar una decisión informada y encontrar el tutor
              adecuado para tu proyecto.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta6"
              >
                ¿Qué nivel de experiencia tienen los tutores disponibles en la
                plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta6"
              />
            </div>
            <h3 id="respuesta6" className="text-sm hidden">
              En la plataforma Code-Tutor, encontrarás tutores con diferentes
              niveles de experiencia. Los tutores en la plataforma suelen tener
              experiencia en programación y en las tecnologías específicas en
              las que se especializan. <br />
              Al buscar un tutor en la plataforma, podrás ver información
              detallada en sus perfiles, donde se mencionará su experiencia
              laboral, proyectos anteriores, certificaciones relevantes y
              cualquier otra información relevante que puedan proporcionar.
              <br />
              Algunos tutores pueden tener una amplia experiencia profesional en
              la industria de la programación, trabajando en empresas o
              proyectos destacados. Otros pueden tener experiencia académica o
              de enseñanza, brindando tutorías a estudiantes o profesionales en
              el campo de la programación. <br />
              La plataforma también ofrece un sistema de calificaciones y
              comentarios, donde los usuarios anteriores pueden dejar reseñas
              sobre la experiencia y la calidad de la tutoría recibida. Esto
              puede ayudarte a evaluar el nivel de experiencia y la calidad de
              los tutores disponibles en la plataforma. <br />
              <br />
              Es importante tener en cuenta que la experiencia puede variar
              entre los diferentes tutores, por lo que te recomendaría revisar
              cuidadosamente los perfiles de los tutores, sus calificaciones y
              las reseñas de otros usuarios para seleccionar el tutor que mejor
              se adapte a tus necesidades y expectativas en términos de nivel de
              experiencia.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta7"
              >
                ¿Cuál es el proceso de selección y verificación de los tutores
                en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta7"
              />
            </div>
            <h3 id="respuesta7" className="text-sm hidden">
              En Code-Tutor, se lleva a cabo un proceso de selección y
              verificación cuidadoso para garantizar la calidad de los tutores
              disponibles en la plataforma. El proceso de selección y
              verificación puede incluir lo siguiente:
              <br />
              ► Solicitud de ser tutor: Los interesados en convertirse en
              tutores en Code-Tutor pueden enviar una solicitud a la plataforma.
              Esto puede implicar completar un formulario en línea con
              información sobre su experiencia, habilidades y áreas de
              especialización en programación.
              <br />
              ► Evaluación de la solicitud: El equipo de Code-Tutor revisa
              cuidadosamente las solicitudes recibidas y evalúa la idoneidad de
              los candidatos para convertirse en tutores en la plataforma. Se
              consideran factores como la experiencia laboral, la formación
              académica, las certificaciones y cualquier otra información
              relevante proporcionada por los candidatos.
              <br />► Revisión de calificaciones y comentarios: Si un candidato
              ha brindado tutorías previamente en Code-Tutor, el equipo puede
              revisar las calificaciones y comentarios dejados por los usuarios
              anteriores. Esto proporciona información adicional sobre la
              calidad de las tutorías brindadas y ayuda a evaluar la
              satisfacción de los usuarios con los servicios del tutor.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta8"
              >
                ¿Cómo se establece la tarifa de los tutores en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta8"
              />
            </div>
            <h3 id="respuesta8" className="text-sm hidden">
              En Code-Tutor, los tutores tienen la flexibilidad de establecer su
              propia tarifa por hora para sus servicios de tutoría en
              programación. Al convertirse en tutor en la plataforma, se les
              solicitará completar un formulario donde podrán especificar la
              tarifa que desean cobrar por su tiempo y conocimientos. <br />
              La tarifa establecida por los tutores puede depender de varios
              factores, como su nivel de experiencia, especialización en
              tecnologías específicas, demanda en el mercado y la complejidad de
              los proyectos que están dispuestos a abordar. Algunos tutores
              pueden optar por establecer tarifas más altas si tienen una amplia
              experiencia y conocimientos especializados, mientras que otros
              pueden establecer tarifas más bajas para atraer a un mayor número
              de estudiantes.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta9"
              >
                ¿Cuáles son los métodos de pago aceptados para contratar a un
                tutor?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta9"
              />
            </div>
            <h3 id="respuesta9" className="text-sm hidden">
              En Code-Tutor, el método de pago aceptado para contratar a un
              tutor es mediante tarjetas de crédito y débito. Los usuarios
              pueden utilizar tarjetas emitidas por instituciones financieras
              reconocidas, como Visa, Mastercard, American Express y otras
              tarjetas principales, para realizar el pago por los servicios de
              tutoría. <br />
              Al contratar a un tutor en la plataforma, se te solicitará
              ingresar los detalles de tu tarjeta de crédito o débito para
              completar la transacción. Estos detalles se utilizan para procesar
              el pago de manera segura y confidencial. <br />
              Es importante asegurarse de tener una tarjeta de crédito o débito
              válida y con fondos suficientes al momento de realizar la
              contratación del tutor. Esto garantizará que el pago se realice
              correctamente y sin problemas. <br />
              <br />
              Code-Tutor se esfuerza por garantizar la seguridad de los pagos en
              línea y utiliza medidas de protección para proteger la información
              financiera de los usuarios durante las transacciones.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta10"
              >
                ¿Puedo ver reseñas o comentarios de otros usuarios sobre los
                tutores antes de contratarlos?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta10"
              />
            </div>
            <h3 id="respuesta10" className="text-sm hidden">
              Sí, en Code-Tutor puedes ver reseñas y comentarios de otros
              usuarios sobre los tutores antes de contratarlos. La plataforma
              cuenta con un sistema de calificaciones y reseñas que permite a
              los usuarios compartir su experiencia y opinión sobre los tutores
              con los que han trabajado. <br />
              Cuando buscas un tutor en la plataforma, podrás acceder a sus
              perfiles individuales. En estos perfiles, encontrarás información
              detallada sobre la experiencia del tutor, las tecnologías con las
              que trabajan, proyectos anteriores, enlaces a perfiles en GitHub y
              LinkedIn, entre otros detalles relevantes.
              <br /> Además, podrás ver las reseñas y comentarios que otros
              usuarios han dejado sobre ese tutor en particular. Estas reseñas
              pueden darte una idea de la calidad del servicio que ofrecen, su
              capacidad para explicar conceptos, su disponibilidad, puntualidad
              y otros aspectos importantes.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta11"
              >
                ¿Cómo puedo comunicarme con un tutor antes de contratarlo?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta11"
              />
            </div>
            <h3 id="respuesta11" className="text-sm hidden">
              En Code-Tutor, puedes comunicarte con un tutor antes de
              contratarlo a través del sistema de chat incorporado en la
              plataforma. Una vez que encuentres un tutor que te interese,
              podrás iniciar un chat con él para discutir los detalles de tu
              proyecto de programación, hacer preguntas adicionales.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta12"
              >
                ¿Qué sucede si no estoy satisfecho con los servicios del tutor
                que contraté?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta12"
              />
            </div>
            <h3 id="respuesta12" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta13"
              >
                ¿Hay algún tipo de garantía o reembolso en caso de problemas con
                el tutor?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta13"
              />
            </div>
            <h3 id="respuesta13" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta14"
              >
                ¿Cuál es el tiempo de respuesta esperado de los tutores en la
                plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta14"
              />
            </div>
            <h3 id="respuesta14" className="text-sm hidden">
              En Code-Tutor, el tiempo de respuesta esperado de los tutores
              puede variar dependiendo de diversos factores, como la
              disponibilidad del tutor, la carga de trabajo y la ubicación
              geográfica. Sin embargo, la plataforma promueve una comunicación
              eficiente y rápida entre los usuarios y los tutores.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta15"
              >
                ¿Puedo solicitar una tutoría de programación en un horario
                específico?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta15"
              />
            </div>
            <h3 id="respuesta15" className="text-sm hidden">
              Sí, en Code-Tutor puedes solicitar una tutoría de programación en
              un horario específico. La plataforma permite a los usuarios y
              tutores coordinar y acordar un horario conveniente para llevar a
              cabo la sesión de tutoría.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta16"
              >
                ¿Qué herramientas o plataformas de comunicación se utilizan para
                las sesiones de tutoría?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta16"
              />
            </div>
            <h3 id="respuesta16" className="text-sm hidden">
              En Code-Tutor, se utilizan principalmente las plataformas de
              videoconferencia Zoom, Google Meet y Google Hangouts para llevar a
              cabo las sesiones de tutoría. Estas son herramientas populares y
              ampliamente utilizadas que ofrecen una variedad de funciones y
              opciones de comunicación en tiempo real.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta17"
              >
                ¿Se ofrece algún tipo de soporte técnico en caso de problemas
                técnicos durante las sesiones de tutoría?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta17"
              />
            </div>
            <h3 id="respuesta17" className="text-sm hidden">
              Code-Tutor por el momento no ofrece algún tipo de soporte técnico
              en caso de problemas técnicos durante las sesiones de tutoría pero
              esta pensado para más adelante.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta18"
              >
                ¿Qué sucede si no encuentro un tutor adecuado para mi proyecto
                de programación en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta18"
              />
            </div>
            <h3 id="respuesta18" className="text-sm hidden">
              Si no encuentras un tutor adecuado para tu proyecto de
              programación en la plataforma de Code-Tutor, hay algunas opciones
              que puedes considerar: <br />
              1- Ampliar tus criterios de búsqueda: Revisa los filtros que has
              aplicado en tu búsqueda y considera ajustarlos para ampliar el
              rango de tutores disponibles. Esto puede incluir modificar el
              idioma, país de origen, tecnologías trabajadas u otros aspectos
              que puedan influir en la selección de un tutor. <br />
              2- Revisar los perfiles detalladamente: Asegúrate de revisar
              cuidadosamente los perfiles de los tutores disponibles en la
              plataforma. Verifica su experiencia, proyectos anteriores,
              tecnologías trabajadas y cualquier otro detalle relevante que
              pueda ayudarte a evaluar su idoneidad para tu proyecto. <br />
              3- Solicitar recomendaciones: Puedes solicitar recomendaciones a
              otros usuarios de la plataforma o a colegas en la industria de la
              programación. Pregunta si han tenido experiencias positivas con
              algún tutor en particular o si conocen a alguien que pueda ser
              adecuado para tu proyecto.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta19"
              >
                ¿Puedo cambiar de tutor si no estoy satisfecho con el progreso
                de mi proyecto?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta19"
              />
            </div>
            <h3 id="respuesta19" className="text-sm hidden">
              En Code-Tutor, si no estás satisfecho con el progreso de tu
              proyecto y deseas cambiar de tutor, es posible hacerlo. Sin
              embargo, ten en cuenta que si has tenido una sesión con el tutor,
              deberás pagar únicamente por el tiempo que han estado en sesión.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta20"
              >
                ¿Cómo se maneja la confidencialidad de la información y los
                proyectos compartidos con los tutores?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta20"
              />
            </div>
            <h3 id="respuesta20" className="text-sm hidden">
              En Code-Tutor, se toma la confidencialidad de la información y los
              proyectos compartidos con los tutores de manera muy seria. Se
              implementan medidas y políticas para garantizar la protección de
              la información confidencial y mantener la privacidad de los
              usuarios.
              <br />
              Se implementan medidas de seguridad para proteger los datos y
              prevenir accesos no autorizados. Esto incluye el uso de
              encriptación, firewalls y otras técnicas de seguridad estándar de
              la industria.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta21"
              >
                ¿Existe algún tipo de contrato o acuerdo entre los usuarios y
                los tutores en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta21"
              />
            </div>
            <h3 id="respuesta21" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta22"
              >
                ¿Cuál es la política de cancelación si decido interrumpir o
                finalizar el proyecto antes de tiempo?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta22"
              />
            </div>
            <h3 id="respuesta22" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta23"
              >
                ¿Puedo solicitar una tutoría en un idioma específico, aparte del
                español?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta23"
              />
            </div>
            <h3 id="respuesta23" className="text-sm hidden">
              En Code-Tutor, los tutores tienen la opción de seleccionar los
              idiomas con los que se sienten cómodos y desean comunicarse. Al
              momento de registrarse en la plataforma, los tutores eligen los
              idiomas en los que pueden ofrecer tutorías. <br />
              Esto significa que como usuario, puedes solicitar una tutoría en
              un idioma específico aparte del español. Al buscar un tutor,
              puedes filtrar por idioma y seleccionar el idioma en el que deseas
              recibir la tutoría. La plataforma te mostrará los tutores que
              están disponibles y pueden comunicarse contigo en ese idioma.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta24"
              >
                ¿Qué sucede si tengo problemas de comunicación o dificultades
                con el tutor durante las sesiones?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta24"
              />
            </div>
            <h3 id="respuesta24" className="text-sm hidden">
              En caso de tener problemas de comunicación o dificultades con el
              tutor durante las sesiones en Code-Tutor, existen medidas que
              puedes tomar para resolver la situación:
              <br /> 1-Comunicación abierta: Lo primero que se recomienda es
              abordar el problema directamente con el tutor. Explica tus
              inquietudes o dificultades de manera clara y respetuosa. Pueden
              surgir malentendidos o diferencias de estilo de enseñanza, y es
              importante tener una comunicación abierta para tratar de resolver
              cualquier problema. <br />
              2- Solicitar aclaraciones: Si tienes dificultades para comprender
              las explicaciones o el enfoque del tutor, no dudes en pedirle que
              te brinde más ejemplos, explicaciones adicionales o que adopte un
              enfoque diferente para abordar el tema en cuestión. La
              comunicación efectiva es clave para una tutoría exitosa. <br />
              3- Cambiar de tutor: Si los problemas persisten y sientes que no
              estás obteniendo el apoyo necesario, puedes considerar cambiar de
              tutor. En Code-Tutor, puedes buscar y seleccionar a otro tutor que
              se adapte mejor a tus necesidades y expectativas. Recuerda revisar
              los perfiles y las reseñas de otros usuarios para tomar una
              decisión informada.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta25"
              >
                ¿Los tutores ofrecen apoyo y orientación adicional fuera de las
                sesiones programadas?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta25"
              />
            </div>
            <h3 id="respuesta25" className="text-sm hidden">
              Depende, en muchos casos, los tutores en Code-Tutor pueden ofrecer
              apoyo y orientación adicional fuera de las sesiones programadas.
              Sin embargo, esto puede variar según la disponibilidad y las
              preferencias individuales de cada tutor. Algunos tutores pueden
              estar dispuestos a responder preguntas breves o proporcionar
              clarificaciones adicionales por medio del chat de la plataforma
              entre las sesiones programadas.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta26"
              >
                ¿Existen restricciones o requisitos específicos para los
                proyectos de programación que se pueden solicitar?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta26"
              />
            </div>
            <h3 id="respuesta26" className="text-sm hidden">
              En Code-Tutor, no hay restricciones o requisitos específicos
              predefinidos para los proyectos de programación que se pueden
              solicitar. La plataforma está diseñada para conectar a los
              usuarios con una amplia gama de tutores de programación que pueden
              abordar diferentes áreas y niveles de experiencia.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta27"
              >
                ¿Cómo se manejan los derechos de propiedad intelectual de los
                proyectos desarrollados en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta27"
              />
            </div>
            <h3 id="respuesta27" className="text-sm hidden">
              En Code-Tutor, se respeta y valora los derechos de propiedad
              intelectual de los proyectos desarrollados por los usuarios. Cada
              proyecto y la propiedad intelectual asociada a él pertenece al
              usuario que lo ha creado. <br />
              Como plataforma de conexión entre usuarios y tutores, Code-Tutor
              no reclama ningún derecho de propiedad sobre los proyectos
              desarrollados. Los tutores brindan asesoramiento y orientación en
              el desarrollo de los proyectos, pero los derechos y la propiedad
              intelectual del proyecto siguen siendo del usuario que lo ha
              solicitado. <br />
              Es importante tener en cuenta que, al compartir información y
              proyectos con los tutores, es recomendable establecer acuerdos
              claros y comunicarse abiertamente sobre los derechos de propiedad
              intelectual y cualquier otra consideración relevante. Puedes
              discutir con el tutor cómo se manejarán los derechos de propiedad
              intelectual antes de iniciar la colaboración.
              <br />
              Si tienes inquietudes específicas sobre los derechos de propiedad
              intelectual o necesitas establecer acuerdos más detallados, te
              recomiendo consultar con un asesor legal especializado en
              propiedad intelectual. Ellos podrán brindarte orientación
              específica y ayudarte a proteger tus derechos en relación con los
              proyectos desarrollados.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta28"
              >
                ¿Puedo solicitar una muestra o demostración de habilidades antes
                de contratar a un tutor?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta28"
              />
            </div>
            <h3 id="respuesta28" className="text-sm hidden">
              Sí, es posible solicitar una muestra o demostración de habilidades
              antes de contratar a un tutor en Code-Tutor. Algunos tutores
              pueden estar dispuestos a proporcionar ejemplos de su trabajo
              previo, proyectos realizados o incluso realizar una breve
              demostración de sus habilidades.
              <br />
              Para solicitar una muestra o demostración, puedes comunicarte
              directamente con el tutor a través del chat de la plataforma.
              Expresa tu interés en ver ejemplos de su trabajo o en realizar una
              breve demostración relacionada con tu proyecto o área de interés.
              <br />
              <br />
              Es importante tener en cuenta que no todos los tutores pueden
              ofrecer muestras o demostraciones, ya que esto dependerá de su
              disponibilidad y preferencias individuales. Algunos tutores pueden
              tener una cartera de proyectos anteriores o un repositorio de
              código que puedan compartir contigo. Otros pueden estar dispuestos
              a brindar una breve sesión de demostración para mostrar sus
              habilidades y enfoque de enseñanza.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta29"
              >
                ¿Hay algún tipo de sistema de calificación o valoración de los
                tutores por parte de los usuarios?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta29"
              />
            </div>
            <h3 id="respuesta29" className="text-sm hidden">
              Sí, en Code-Tutor se utiliza un sistema de calificación y
              valoración de los tutores por parte de los usuarios. Después de
              cada sesión de tutoría, los usuarios tienen la oportunidad de
              calificar y dejar comentarios sobre la experiencia y el desempeño
              del tutor.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta30"
              >
                ¿Se ofrecen descuentos o paquetes especiales para usuarios
                frecuentes o proyectos a largo plazo?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta30"
              />
            </div>
            <h3 id="respuesta30" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta31"
              >
                ¿Cómo se manejan los conflictos o disputas entre los usuarios y
                los tutores en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta31"
              />
            </div>
            <h3 id="respuesta31" className="text-sm hidden">
              1- Comunicación directa: Se alienta a los usuarios y tutores a
              comunicarse de manera abierta y respetuosa para tratar de resolver
              cualquier problema de manera directa. Muchas veces, los
              malentendidos pueden resolverse a través de una comunicación clara
              y honesta. <br />
              2- Contactar al equipo de soporte: Si el problema persiste o no se
              puede resolver directamente, se puede contactar al equipo de
              soporte de Code-Tutor. El equipo de soporte está disponible para
              ayudar en la resolución de conflictos y proporcionar orientación
              adicional. Puedes encontrar información de contacto en la
              plataforma.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta32"
              >
                ¿La plataforma ofrece algún tipo de recurso o material educativo
                adicional para los usuarios?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta32"
              />
            </div>
            <h3 id="respuesta32" className="text-sm hidden">
              Lamentablemente, en este momento la plataforma de Code-Tutor no
              ofrece recursos o materiales educativos adicionales para los
              usuarios. Nos centramos principalmente en conectar a los usuarios
              con tutores expertos en programación y brindar un entorno de
              tutoría efectivo.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta33"
              >
                ¿Puedo solicitar tutorías en grupo o solo se ofrecen tutorías
                individuales?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta33"
              />
            </div>
            <h3 id="respuesta33" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta34"
              >
                ¿Se ofrece algún tipo de prueba gratuita o periodo de prueba
                antes de comprometerse con un tutor?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta34"
              />
            </div>
            <h3 id="respuesta34" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta35"
              >
                ¿Puedo solicitar tutorías de programación en diferentes niveles
                de dificultad?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta35"
              />
            </div>
            <h3 id="respuesta35" className="text-sm hidden">
              ¡Por supuesto! En Code-Tutor, puedes solicitar tutorías de
              programación en diferentes niveles de dificultad. Entendemos que
              cada usuario puede tener distintos conocimientos y necesidades,
              por lo que nuestros tutores están preparados para adaptarse a
              diferentes niveles de experiencia.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta36"
              >
                ¿Qué tipo de tecnologías de programación o lenguajes se cubren
                en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta36"
              />
            </div>
            <h3 id="respuesta36" className="text-sm hidden">
              En Code-Tutor, cubrimos una amplia variedad de tecnologías de
              programación y lenguajes. Nuestros tutores tienen experiencia en
              los siguientes: Angular, ASP.NET, Django, Express, HTML/CSS,
              jQuery, Laravel, Node.js, Rails, React, Redux, Vue.js, Android,
              iOS, Ionic, Kotlin, React, Native, Swift, Xcode, C++, C#, C,
              Golang, Java, JavaScript, PHP, Python, R, Ruby, TypeScript.
              Además, contamos con tutores especializados en tecnologías y áreas
              como AI (Inteligencia Artificial), Machine Learning, Matlab,
              Tableau, TensorFlow, AWS, bases de datos (Database), Docker, GCP,
              Heroku, Linux, MongoDB, MySQL, Postgres y SQL.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta37"
              >
                ¿Existe algún requisito mínimo de tiempo para contratar a un
                tutor en la plataforma?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta37"
              />
            </div>
            <h3 id="respuesta37" className="text-sm hidden">
              Sí, en Code-Tutor existe un requisito mínimo de tiempo para
              contratar a un tutor en la plataforma. El mínimo de tiempo
              establecido es de 30 minutos. Esto significa que al contratar los
              servicios de un tutor, se requiere una reserva mínima de 30
              minutos de duración para la sesión. <br />
              Este requisito mínimo de tiempo asegura que se pueda establecer
              una interacción y una dedicación adecuada durante la tutoría,
              permitiendo un tiempo suficiente para abordar tus preguntas,
              recibir explicaciones, revisar código y realizar cualquier otra
              actividad necesaria para el progreso en tu proyecto de
              programación.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta38"
              >
                ¿Puedo solicitar tutorías recurrentes o solo se ofrecen sesiones
                únicas?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta38"
              />
            </div>
            <h3 id="respuesta38" className="text-sm hidden">
              En Code-Tutor, tienes la opción de solicitar tanto tutorías
              recurrentes como sesiones únicas. Entendemos que algunos proyectos
              o necesidades de aprendizaje pueden requerir una continuidad en la
              tutoría, mientras que otros pueden ser resueltos en una única
              sesión. <br />
              Si necesitas una tutoría continua y recurrente para abordar un
              proyecto a largo plazo o para recibir apoyo regular en tu
              aprendizaje, puedes acordar con el tutor la programación de
              sesiones recurrentes en fechas y horarios específicos. Esto te
              permitirá contar con una guía constante y seguimiento continuo en
              tu progreso.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta39"
              >
                ¿Qué sucede si tengo una pregunta o duda fuera del horario de
                las sesiones programadas?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta39"
              />
            </div>
            <h3 id="respuesta39" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta40"
              >
                ¿Se ofrece algún tipo de programa de mentoría a largo plazo para
                proyectos complejos?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta40"
              />
            </div>
            <h3 id="respuesta40" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta41"
              >
                ¿Puedo cambiar de tutor en medio del proyecto si siento que
                necesito un enfoque diferente?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta41"
              />
            </div>
            <h3 id="respuesta41" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta42"
              >
                ¿Los tutores tienen experiencia específica en algún sector o
                industria en particular?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta42"
              />
            </div>
            <h3 id="respuesta42" className="text-sm hidden">
              Sí, en Code-Tutor muchos de los tutores tienen experiencia
              específica en diferentes sectores o industrias de la programación.
              Comprendemos que cada sector tiene sus propias necesidades y
              desafíos particulares, por lo que contar con un tutor que tenga
              experiencia en un sector específico puede resultar beneficioso
              para los usuarios.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta43"
              >
                ¿Qué nivel de conocimiento de programación se espera que tenga
                el usuario antes de solicitar un tutor?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta43"
              />
            </div>
            <h3 id="respuesta43" className="text-sm hidden">
              En Code-Tutor, no se requiere un nivel específico de conocimiento
              de programación antes de solicitar un tutor. La plataforma está
              diseñada para atender a usuarios de diferentes niveles, desde
              principiantes hasta usuarios con conocimientos más avanzados.
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta44"
              >
                ¿Se pueden solicitar tutorías de programación en áreas
                especializadas, como inteligencia artificial o desarrollo web?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta44"
              />
            </div>
            <h3 id="respuesta44" className="text-sm hidden">
              ¡Por supuesto! En Code-Tutor, puedes solicitar tutorías de
              programación en áreas especializadas como inteligencia artificial,
              desarrollo web y muchas otras. La plataforma cuenta con una amplia
              gama de tutores especializados en diferentes tecnologías y
              disciplinas dentro del campo de la programación.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta45"
              >
                ¿La plataforma ofrece algún tipo de certificación o
                reconocimiento a los usuarios que completan con éxito sus
                proyectos?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta45"
              />
            </div>
            <h3 id="respuesta45" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta46"
              >
                ¿Los tutores proporcionan apoyo en la resolución de problemas o
                solo ofrecen orientación general?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta46"
              />
            </div>
            <h3 id="respuesta46" className="text-sm hidden">
              En Code-Tutor, los tutores no solo ofrecen orientación general,
              sino que también brindan apoyo en la resolución de problemas
              específicos. Los tutores están capacitados y tienen experiencia en
              programación, lo que les permite ayudarte a superar obstáculos y
              resolver problemas que puedas encontrar en tus proyectos de
              programación.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta47"
              >
                ¿Se ofrecen tutorías en línea en tiempo real o también se brinda
                acceso a recursos de aprendizaje pregrabados?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta47"
              />
            </div>
            <h3 id="respuesta47" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta48"
              >
                ¿Los tutores ofrecen algún tipo de seguimiento o actualización
                sobre el progreso del proyecto?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta48"
              />
            </div>
            <h3 id="respuesta48" className="text-sm hidden">
              Sí, en Code-Tutor los tutores pueden ofrecer seguimiento y
              actualización sobre el progreso del proyecto. Durante las sesiones
              de tutoría, los tutores pueden evaluar tu proyecto, revisar el
              código que has desarrollado y brindarte retroalimentación
              específica sobre tu progreso.
            </h3>
          </div>

          {/* <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta49"
              >
                ¿Se pueden programar sesiones de tutoría fuera de los horarios
                regulares si se acuerda con el tutor?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta49"
              />
            </div>
            <h3 id="respuesta49" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div> */}

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta50"
              >
                ¿Cómo se manejan los problemas de compatibilidad tecnológica
                entre el tutor y el usuario durante las sesiones en línea?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta50"
              />
            </div>
            <h3 id="respuesta50" className="text-sm hidden">
              En Code-Tutor, se toman medidas para garantizar la compatibilidad
              tecnológica entre el tutor y el usuario durante las sesiones en
              línea. Aquí hay algunas formas en las que se manejan los problemas
              de compatibilidad tecnológica: <br />
              1- Requisitos técnicos claros: Antes de iniciar una sesión con un
              tutor, se proporcionan requisitos técnicos claros para asegurarse
              de que ambos tengan los recursos necesarios. Esto puede incluir la
              recomendación de utilizar una conexión a Internet estable,
              dispositivos compatibles, software actualizado y otras
              especificaciones técnicas relevantes.
              <br />
              2- Comunicación previa a la sesión: Antes de la sesión, se alienta
              a los usuarios y tutores a comunicarse para confirmar que cumplen
              con los requisitos técnicos y asegurarse de que no haya problemas
              de compatibilidad. Esto permite resolver cualquier problema
              potencial con anticipación y garantizar una experiencia fluida
              durante la sesión. <br />
              3- Prueba de conectividad: Es posible que se realicen pruebas de
              conectividad antes de la sesión para asegurarse de que el tutor y
              el usuario puedan comunicarse correctamente. Esto puede implicar
              una breve prueba de audio y video para confirmar que ambos pueden
              verse y escucharse claramente. <br />
              4- Uso de plataformas de comunicación estándar: Code-Tutor
              recomienda el uso de plataformas de comunicación comunes y
              confiables, como Zoom, Google Meet o Google Hangouts. Estas
              plataformas suelen ser ampliamente compatibles y ofrecen funciones
              sólidas para facilitar la comunicación y colaboración durante las
              sesiones en línea.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default FAQs;
