const TutorInfoI = () => {
    return (
      <div className='w-full pl-9 flex flex-col relative z-0'>
        <div className="p-9 bg-white border border-gray-200 shadow-md rounded-lg">
          {/* Aréa del Developer */}
          <div>
            <h2 className="text-left text-3xl font-bold">Fullstack Software Engineer</h2>
          </div>

          {/* Contenedor de País,Tarifa e Idiomas */}
          <div className="pt-6 pb-6 flex justify-start items-center">
            {/* Los svg y span contienen iconos */}
            <img src="./src/assets/Pais.svg"/>
            {/* País */}
            <h2 className="font-semibold text-sm text-gray-600">Argentina</h2>

            <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

            <img src="./src/assets/Moneda.svg"/>
            {/* Tarifa */}
            <h2 className="font-semibold text-sm text-gray-600">8000-H</h2>

            <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

            <img src="./src/assets/Mensaje.svg"/>
            {/* Idiomas */}
            <h2 className="font-semibold text-sm text-gray-600">Ingles, Español, Portugues</h2>
          </div>

          {/* Descripción del tutor */}
          <div className="pt-2 pb-6 border-b">
            <h2 className="font-semibold text-sm text-left">Deje el mundo del espectaculo para dedicarme a mi otra pasión...el skate. Ah y también a programar. Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.</h2>
          </div>
          
          {/* Cuadro de Habilidades Técnicas */}
          <div className="pt-6 pb-6">
            <h2 className="text-left text-2xl font-medium">Habilidades Técnicas</h2>
          </div>
          <div className="pb-6 border-b">
            <div className="grid grid-cols-4 gap-3">
              <span className="flex pt-1 pb-1 h-14 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Javascript</span>
              <span className="flex pt-1 pb-1 h-14 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Machine Learning</span>
              <span className="flex pt-1 pb-1 h-14 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Machine Learning</span>
              <span className="flex pt-1 pb-1 h-14 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Another Item</span>
            </div>
          </div>

          {/* Valoraciones */}
          <div className="pb-6 border-b">
            <div className="pt-6">
              <h2 className="text-left text-2xl font-medium">Reviews</h2>
            </div>
            <div className="pt-6 pb-6 flex justify-between items-center space-x-6">
              <div className='flex items-center space-x-2'>
                <img src="./src/assets/Star.svg"/>
                {/* Puntuación */}
                <h2 className="font-semibold text-codecolor">5.0</h2>
              </div>
              {/* Reviews */}
              <h2 className="font-semibold  text-gray-600">(2000 reviews)</h2>
            </div>

            {/* Contenedor de opiniones */}
            <div>
              {/* Card opinion */}
              <div className="pb-4 flex">
                {/* Imagen de Perfil */}
                <img 
                  src='https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/02/henry-cavill-2624275.jpg?tf=3840x'
                  alt="Imagen de perfil Tutor" 
                  className="w-20 h-20 rounded-full object-cover transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none"
                />
                {/* Nombre y opinión */}
                <div className="pl-4 flex-grow">
                  <div>
                    <h2 className="text-left font-semibold">Cavill Henry</h2>
                    <h2 className="font-semibold text-sm text-justify">
                      Deje el mundo del espectáculo para dedicarme a mi otra pasión...dormir. 
                      Ah y también a programar. Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt. Deje el mundo del espectaculo para dedicarme a mi otra pasión...el skate. Ah y también a programar. Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.
                    </h2>
                  </div>
                </div>
                {/* Fecha */}
                <div className="pl-4 flex">
                  <h2 className="font-semibold text-sm text-gray-600 w-16">Mayo, 15</h2>
                </div>
              </div>
            </div>

            {/* Boton ver más opiniones */}
            <div className="flex flex-col items-center pt-6">
              <button 
                type="button"
                className="flex flex-row items-center justify-center w-48 h-12 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
                Ver más
              </button>
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div className="pb-6 border-b">
            {/* Título */}
            <div className="pt-6">
              <h2 className="text-left text-2xl font-medium">Experiencia Laboral</h2>
            </div>

            {/* Card Experiencias */}
            <div>
              {/* Experiencias */}
              <div className="pt-6 pb-6 flex justify-between items-center space-x-6">
                <div className='flex items-cent'>
                  <h2 className="font-semibold">Frontend Engineer</h2>
                </div>
              </div>

              {/* País y Empresa */}
              <div className=" pb-6 flex justify-start items-center">
                {/* Los svg y span contienen iconos */}
                <img src="./src/assets/Pais.svg"/>
                {/* País */}
                <h2 className="font-semibold text-sm text-gray-600">Argentina</h2>

                <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

                <img src="./src/assets/Calendario.svg"/>
                {/* Empresa */}
                <h2 className="font-semibold text-sm text-gray-600">Google</h2>
              </div>

              {/* Habilidades técnicas trabajadas en el trabajo */}
              <div className="grid grid-cols-4 gap-3">
                <span className="flex pt-1 pb-1 h-12 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Javascript</span>
                <span className="flex pt-1 pb-1 h-12 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Machine Learning</span>
                <span className="flex pt-1 pb-1 h-12 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">C++</span>
              </div>

              {/* Descripción del tutor */}
              <div className="pt-6 pb-6">
                <h2 className="font-semibold text-sm text-left">
                  Trabaje en el mundo del espectaculo para dedicarme a mi otra pasión...el skate. Ah y también a programar. Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.
                </h2>
              </div>

              {/* Boton ver más Experiencias laborales */}
              <div className="flex flex-col items-center pt-6">
                <button 
                  type="button"
                  className="flex flex-row items-center justify-center w-48 h-12 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
                  Ver más
                </button>
              </div>
            </div>
          </div>

          {/* Experiencia en Proyectos */}
          <div className="pb-6">
            {/* Título */}
            <div className="pt-6">
              <h2 className="text-left text-2xl font-medium">Proyectos</h2>
            </div>

            {/* Card Experiencias */}
            <div>
              {/* Experiencias */}
              <div className="pt-6 pb-6 flex justify-between items-center space-x-6">
                <div className="flex items-center">
                  <a href="#" className="font-semibold text-blue-500 hover:text-blue-700 border-b border-blue-500 hover:border-blue-700">Ecommerce</a>
                </div>
              </div>

              {/* Habilidades técnicas trabajadas en el proyecto */}
              <div className="grid grid-cols-4 gap-3">
                <span className="flex pt-1 pb-1 h-12 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Javascript</span>
                <span className="flex pt-1 pb-1 h-12 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Machine Learning</span>
                <span className="flex pt-1 pb-1 h-12 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">C++</span>
              </div>

              {/* Descripción del Proyecto */}
              <div className="pt-6 pb-6">
                <h2 className="font-semibold text-sm text-left">
                  Trabaje en el mundo del espectaculo para dedicarme a mi otra pasión...el skate. Ah y también a programar. Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.
                </h2>
              </div>

              {/* Boton ver más Proyectos */}
              <div className="flex flex-col items-center pt-6">
                <button 
                  type="button"
                  className="flex flex-row items-center justify-center w-48 h-12 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
                  Ver más
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  export default TutorInfoI;