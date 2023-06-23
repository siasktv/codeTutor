import React from 'react';

const RestorePasswordForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded lg:w-12/12 md:w-12/12 w-full p-10 pt-36">
        <p
          tabIndex="0"
          className="focus:outline-none text-2xl font-bold leading-6 text-gray-800 text-left"
        >
          Ingresa una nueva contraseña
        </p>

        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <label
              id="password"
              className="text-sm font-medium leading-none text-gray-800"
            >
              <p className="text-base font-normal leading-6 text-gray-800 text-left">
                Nueva contraseña
              </p>
            </label>
            <input
              aria-labelledby="Nueva contraseña"
              type="password"
              className="bg-white border rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              name="newpassword"
              required
            />

            <label
              id="password"
              className="text-sm font-medium leading-none text-gray-800"
            >
              <p className="text-base font-normal leading-6 text-gray-800 text-left pt-4">
                Repite tu nueva contraseña
              </p>
            </label>
            <input
              aria-labelledby="Repite tu nueva contraseña"
              type="password"
              className="bg-white border rounded text-xl font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              name="repitenewpassword"
              required
            />
          </div>

          <div className="mt-8">
            <button
              role="button"
              className="hover:ring-4 hover:ring-violet-300 text-base font-semibold leading-none text-white focus:outline-none bg-codecolor border rounded-lg hover:bg-violet-600 py-6 w-full"
              type="submit"
            >
              Restablece tu contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestorePasswordForm;