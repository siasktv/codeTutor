import { useEffect, useState } from 'react';
import NavUserNotifications from "../components/NavUserNotifications";
import useUser from "../hooks/useUser";
import moment from 'moment';
import MeetingReviews from '../layouts/MeetingReviews/MeetingReviews';


const Meeting = () => {
  const user = useUser();
  const durationInMinutes = 2;
  const timeAlertInMinutes = 1;
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeLeft, setTimeLeft] = useState({});
  const [running, setRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertClosed, setAlertClosed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (running) {
      const calculateTimeLeft = () => {
        const difference = +new Date(endDate) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
          timeLeft = {
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
        return timeLeft;
      };

      const updateTimer = () => {
        setTimeLeft(calculateTimeLeft());
      };

      const startTimer = () => {
        updateTimer();
        setTimeout(startTimer, 1000);
      };

      const endDate = moment()
        .add(durationInMinutes, 'minutes')
        .format('YYYY-MM-DD HH:mm:ss');
      setEndDate(endDate);
      startTimer();
    }
  }, [running, durationInMinutes]);

  useEffect(() => {
    if (timeLeft.minutes === 0 && !alertClosed) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        setAlertClosed(true);
      }, 3000);
    }
    if (timeLeft.minutes === 0 && timeLeft.seconds === 0 && !showModal) {
      setShowModal(true);
    }
  }, [timeLeft, alertClosed, showAlert, showModal]);

  const handleCloseModal = () => {
    setShowModal(false);
  };



  return (
    <>
      <NavUserNotifications user={user} />
      <div className="bg-gray-100 py-10 w-full h-full">
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
              <div className="relative">
                {showAlert && (
                  <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
                    <div className="bg-purple-700 rounded p-20 ">
                      <p className="text-white text-2xl">
                        Falta {timeAlertInMinutes} minuto para Finalizar!
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="flex items-center justify-between space-x-14"
                id="tiempo"
              >
                <h3 className="text-gray-800 font-semibold text-2xl text-center">
                  {timeLeft.minutes
                    ? timeLeft.minutes.toString().padStart(2, '0')
                    : '00'}{' '}
                  {/* Minutos */}
                </h3>
                <div className="h-full border"></div>
                <h3 className="text-gray-800 font-semibold text-2xl text-center">
                  {timeLeft.seconds
                    ? timeLeft.seconds.toString().padStart(2, '0')
                    : '00'}{' '}
                  {/* Segundos */}
                </h3>
              </div>
              {/* Botones */}
              <div className="flex items-center justify-between space-x-11 px-4">
                <button
                  className="text-white bg-green-600 font-semibold text-center rounded px-4 py-2 active:scale-90 transition duration-150"
                  onClick={() => {
                    setRunning(true);
                  }}
                >
                  Empezar
                </button>
                <button
                  className="text-white bg-red-600 font-semibold text-center rounded px-4 py-2 active:scale-90 transition duration-150"
                  onClick={() => {
                    // Lógica para terminar el cronómetro
                  }}
                >
                  Terminar
                </button>
              </div>
            </div>
            {/* Renderiza el componente StarRating y pasa la función handleCloseModal como prop */}
            {showModal && (
              <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
                <div className="bg-white rounded-lg p-8 mx-4 sm:mx-auto max-w-md">
                  <MeetingReviews onCloseModal={handleCloseModal} />
                </div>
              </div>
            )}
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
              <div className="flex flex-col w-full px-4 border-r">
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

              <div className="flex flex-col w-full px-4">
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
                      <br />
                      2- Copia el enlace permanente y envíalo a tu
                      tutor/cliente. <br />
                      3- ¡Haz clic en "Cancelar" y espera a que la otra parte se
                      una a la llamada!
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
        </div>
      </div>
    </>
  );
};

export default Meeting;
