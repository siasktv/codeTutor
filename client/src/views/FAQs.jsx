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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

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
              Agregar respuesta luego
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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

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
              Agregar respuesta luego
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
              Agregar respuesta luego
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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta48"
              >
                ¿Cuál es el tiempo de respuesta esperado para recibir asistencia
                o respuestas a preguntas durante las sesiones de tutoría?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta48"
              />
            </div>
            <h3 id="respuesta48" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
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
          </div>

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
              Agregar respuesta luego
            </h3>
          </div>

          <div className="space-y-1 px-3 py-2 bg-gray-100 border border-gray-300 shadow-md rounded">
            <div className="flex justify-between cursor-pointer">
              <h2
                className="text-gray-800 font-semibold"
                onClick={toggleAnswer}
                data-respuesta-id="respuesta51"
              >
                ¿Los tutores ofrecen algún tipo de seguimiento o actualización
                sobre el progreso del proyecto?
              </h2>
              <img
                src={FlechaFiltro}
                onClick={toggleAnswer}
                data-respuesta-id="respuesta51"
              />
            </div>
            <h3 id="respuesta51" className="text-sm hidden">
              Agregar respuesta luego
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
export default FAQs;
