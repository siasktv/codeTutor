import NavUserNotifications from "../components/NavUserNotifications";

const Meeting = () => {
  return (
    <>
      <NavUserNotifications />
      <div className="bg-gray-900 py-10 w-full h-full">
        {/* --------------------------Fila 1--------------------------- */}

        <div className="flex w-full h-full space-x-8 px-10">
          {/* Contenedor de 3 los pasos */}
          <div className="flex flex-col justify-center bg-codecolor w-full h-full rounded px-10 py-8">
            <h1 className="text-white font-semibold text-lg text-start">
              Como empezar
            </h1>
            <div className="flex justify-between space-x-4 pt-2 pb-4">
              <div className="flex space-x-2 items-center">
                <h2 className="text-white text-5xl font-semibold">1</h2>
                <h2 className="text-white text-sm font-semibold">
                  Prepara audio y video. Recomendamos usar Zoom.
                </h2>
              </div>
              <div className="flex space-x-2 items-center">
                <h2 className="text-white text-5xl font-semibold">2</h2>
                <h2 className="text-white text-sm font-semibold">
                  Prepara lo que necesites comunicarle a tu tutor.
                </h2>
              </div>
              <div className="flex space-x-2 items-center">
                <h2 className="text-white text-5xl font-semibold">3</h2>
                <h2 className="text-white text-sm font-semibold">
                  Inicia la sesión y monitorea el tiempo de sesión.
                </h2>
              </div>
            </div>
          </div>

          <div>
            {/* Contenedor con el cronómetro */}
            <div className="flex flex-col items-center justify-center bg-white w-auto h-full rounded space-y-3">
              <h2 className="text-codecolor font-semibold text-lg text-center">
                Tiempo de Sesión
              </h2>
              {/* Tiempo */}
              <div className="flex items-center  justify-between space-x-14">
                <h3 className="text-gray-800 font-semibold text-2xl text-center">
                  00
                </h3>
                <div className="h-full border"></div>
                <h3 className="text-gray-800 font-semibold text-2xl text-center">
                  00
                </h3>
              </div>
              {/* Botones */}
              <div className="flex items-center justify-between space-x-11 px-4">
                <button className="text-white bg-green-600 font-semibold text-center rounded px-4 py-2 active:scale-90 transition duration-150">
                  Empezar
                </button>
                <button className="text-white bg-red-600 font-semibold text-center rounded px-4 py-2 active:scale-90 transition duration-150">
                  Terminar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --------------------------Fila 2--------------------------- */}

        <div className="flex w-full space-x-8 px-10 py-8">
          {/* Plataformas videollamada+Otras  */}
          <div className="flex flex-col justify-center bg-white w-full h-full rounded">
            {/* Barra de Opciones */}
            <div className="flex w-full justify-between px-10 py-5 border-b">
              <a href="https://vscode.dev/" target="_blank">
                <button className="text-black font-semibold text-center active:scale-90 transition duration-150">
                  Editor de código
                </button>
              </a>
              {/* <h2 className="text-black font-semibold text-center">
                Audio/Vídeo
              </h2> */}
              <button className="text-black font-semibold text-center active:scale-90 transition duration-150">
                FAQs
              </button>
            </div>

            {/* Plataformas */}
            <div className="flex justify-center bg-white w-full h-full py-6 px-5 rounded-b border-b">
              {/* Zoom */}
              <div className="flex flex-col w-full px-4">
                <div className="flex justify-between items-center space-x-4">
                  <h2 className="text-black font-semibold text-start">Zoom</h2>
                  <h2 className="bg-blue-100 text-blue-600 px-2 py-1 text-xs rounded">
                    RECOMENDADO
                  </h2>
                </div>
                <h2 className="text-start mt-2">
                  Admite videollamadas, uso compartido de pantalla y control
                  remoto.
                </h2>
                <h2 className="text-start text-sm mt-4">
                  Si no tienes Zoom instalado, sigue los siguientes pasos:
                </h2>
                <h2 className="text-gray-600 text-start text-sm">
                  1 - Haz clic en el botón que se encuentra debajo para ir al
                  sitio web de Zoom y descargarlo.
                  <br />
                  2 - Sigue las instrucciones para instalar Zoom.
                  <br />3 -Te unirás automáticamente a la sala de reuniones
                  después de que se complete la instalación.
                </h2>
                <h2 className="text-start text-sm mt-4">
                  Si Zoom ya está instalado:
                </h2>
                <h2 className="text-gray-600 text-start text-sm">
                  1 - Haz clic en el botón que se encuentra debajo para ir al
                  sitio web de Zoom.
                  <br />
                  2- Haz clic en "Abrir zoom.us" para iniciar la aplicación de
                  Zoom y unirte a la sala de reuniones.
                </h2>
                <div>
                  {/* Botón Zoom */}
                  <a href="https://zoom.us/es/download" target="_blank">
                    <button className="border border-blue-600 rounded px-10 py-1 text-blue-600 mt-6 active:scale-90 transition duration-150">
                      Zoom
                    </button>
                  </a>
                </div>
              </div>

              <div className="flex flex-col w-full px-4 border-r">
                {/* Google Meet */}
                <div className="flex  bg-white w-full h-full">
                  {/* Info Google Meet */}
                  <div>
                    <h2 className="text-black font-semibold text-start">
                      Google Meet
                    </h2>
                    <h2 className="text-start mt-2">
                      Admite videollamadas y uso compartido de pantalla.
                    </h2>
                    <h2 className="text-start text-sm mt-4">
                      No requiere de instalación:
                    </h2>
                    <h2 className="text-gray-600 text-start text-sm">
                      1 - Haz clic en el botón que se encuentra debajo para ir
                      al sitio web de Meet.
                      <br />
                      2- Haz clic en "Reunión nueva" para iniciar una nueva
                      reunión.
                      <br />
                      3- Invita al otro usuario a la reunión.
                    </h2>
                  </div>
                </div>
                <div>
                  {/* Botón Meet */}
                  <a href="https://meet.google.com/" target="_blank">
                    <button className="border border-green-600 rounded px-10 py-1 text-green-600 mt-6 active:scale-90 transition duration-150">
                      Meet
                    </button>
                  </a>
                </div>
              </div>

              <div className="flex flex-col w-full border-l px-4">
                {/* Google Hangouts */}
                <div className="flex  bg-white w-full h-full">
                  {/* Info Google Hangouts */}
                  <div>
                    <h2 className="text-black font-semibold text-start">
                      Google Hangouts
                    </h2>
                    <h2 className="text-start mt-2">
                      Admite videollamadas y uso compartido de pantalla.
                    </h2>
                    <h2 className="text-start text-sm mt-4">
                      No requiere de instalación:
                    </h2>
                    <h2 className="text-gray-600 text-start text-sm">
                      1- Haz clic en el botón INICIAR GOOGLE HANGOUTS a
                      continuación para ir a Google.
                      <br/>
                      2- Copia el enlace permanente
                      y envíalo a tu tutor/cliente. <br/>
                      3- ¡Haz clic en "Cancelar" y
                      espera a que la otra parte se una a la llamada!
                    </h2>
                  </div>
                </div>
                <div>
                  {/* Botón Hangouts */}
                  <a href="https://hangouts.google.com/" target="_blank">
                    <button className="border border-green-700 rounded px-8 py-1 text-green-700 mt-6 active:scale-90 transition duration-150">
                      Hangouts
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CHAT
          <div>
            <div className="flex flex-col bg-white w-80 h-[647px] rounded ">
              Barra superior chat
              <div className="flex justify-between items-center bg-white w-full border rounded-t p-3">
                <img
                  src={user ? user.image : Default}
                  src="https://user-images.githubusercontent.com/1561955/106762302-fda9de00-6635-11eb-99be-3ef744e60c0e.png"
                  alt="avatar"
                  className="w-10 h-10 bg-black rounded-full border-none cursor-pointer"
                  onClick={handleShowProfile}
                ></img>
                <h2 className="text-gray-900 text-start font-semibold text-sm">
                  MiduDEV
                </h2>
                <h2 className="font-semibold text-sm text-green-500">
                  ◉ Online
                </h2>
              </div>

              Contenedor de mensajes
              <div className="w-full h-full p-3 space-y-3 overflow-y-auto">
                <div className="bg-blue-200 border rounded-b-lg rounded-r-lg px-2 py-1">
                  <h2 className="text-sm text-start text-purple-800">
                    Hola soy MiduDEV, felicidades pudiste centrar un div.
                  </h2>
                </div>
                <div className="bg-blue-300 border rounded-t-lg rounded-r-lg px-2 py-1">
                  <h2 className="text-sm text-start text-gray-900">
                    Graciass, solo me tomo 4 años pero al fin lo tengo.
                  </h2>
                </div>
                <div className="bg-blue-200 border rounded-b-lg rounded-r-lg px-2 py-1">
                  <h2 className="text-sm text-start text-purple-800">
                    😳 uh...
                  </h2>
                </div>
              </div>

              Botones de chat
              <div className="flex justify-between w-full py-3 px-3 border border-t rounded-b space-x-3">
                <input
                  type="text"
                  placeholder="Escribir mensaje..."
                  className="text-sm w-full border border-gray-500 rounded-t rounded-r px-2"
                ></input>
                <button className="border border-gray-500 rounded px-1">
                  ➤
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Meeting;
