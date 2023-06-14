const TutorProfile = () => {
  return (
    <div className="bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0">
      {/* Tabla de información izquierda */}
      <div className="box-border border w-2/6 h-max pt-10 pb-10 bg-white border-gray-200 shadow-md rounded-lg">
        <div className="flex flex-col items-center pt-5 pl-10 pr-10 pb-5">
          {/* Foto Perfil */}
          <div className="w-40 h-40 rounded-full overflow-hidden transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none">
            <img 
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_oFhoPdG_gvarQsjy33Dwov47ETNFjw3Sg&usqp=CAU'
              alt="Imagen de perfil Tutor" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Estado de conexion */}
          <div className="pt-10">
            <h2 className="font-semibold text-l text-green-500">◉ Online</h2>
          </div>
        </div>
        
        {/* Valoraciones */}
        <div className="flex justify-center items-center space-x-6">
          <div className='flex items-center space-x-2'>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.57283 1.57795C10.1706 0.140682 12.2067 0.140687 12.8045 1.57795L14.8206 6.42537C14.8566 6.51193 14.938 6.57107 15.0315 6.57856L20.2647 6.9981C21.8163 7.1225 22.4455 9.05889 21.2633 10.0716L17.2761 13.487C17.2049 13.548 17.1738 13.6437 17.1956 13.7348L18.4137 18.8416C18.7749 20.3557 17.1277 21.5524 15.7993 20.7411L11.319 18.0045C11.239 17.9556 11.1383 17.9556 11.0583 18.0045L6.57798 20.7411C5.24956 21.5525 3.60237 20.3557 3.96355 18.8416L5.18169 13.7348C5.20344 13.6437 5.17234 13.548 5.10115 13.487L1.114 10.0716C-0.068189 9.05888 0.560988 7.1225 2.11263 6.9981L7.34583 6.57856C7.43927 6.57107 7.52068 6.51193 7.55668 6.42537L9.57283 1.57795ZM11.4195 2.15399C11.3341 1.94867 11.0432 1.94867 10.9578 2.15399L8.94166 7.00141C8.68965 7.60732 8.11983 8.02132 7.4657 8.07376L2.2325 8.4933C2.01083 8.51108 1.92096 8.7877 2.08984 8.93237L6.07698 12.3478C6.57536 12.7747 6.79301 13.4446 6.64075 14.0829L5.42261 19.1896C5.37101 19.4059 5.60633 19.5769 5.7961 19.461L10.2764 16.7244C10.8365 16.3823 11.5408 16.3823 12.1008 16.7244L16.5812 19.4609C16.771 19.5769 17.0063 19.4059 16.9547 19.1896L15.7365 14.0829C15.5843 13.4446 15.8019 12.7747 16.3003 12.3478L20.2874 8.93237C20.4563 8.7877 20.3665 8.51107 20.1448 8.4933L14.9116 8.07376C14.2575 8.02132 13.6876 7.60732 13.4356 7.00141L11.4195 2.15399Z" fill="#7F56D9"/>
              </svg>
              <h2 className="font-semibold text-sm text-codecolor">5.0</h2>
          </div>
          <h2 className="font-semibold text-sm text-gray-600">2000 reviews</h2>
        </div>

        {/* Apellido y nombre del tutor */}
        <div className="pt-6 pl-4 pr-4">
          <h2 className="text-2xl font-medium">Barrios Lautaro Gabriel</h2>
        </div>

        {/* Redes(GitHub y Linkedin) */}
        <div className="flex justify-center items-center pt-6 pb-6 space-x-6">
          <a href="https://github.com/ " target="_blank" className="transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
            <svg width="33" height="31" viewBox="0 0 33 31" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.4992 4.22109e-07C8.40755 -0.00100104 1.50982 5.65328 0.214297 13.3492C-1.08123 21.0451 3.60799 28.5103 11.2851 30.9737C12.1119 31.1171 12.4079 30.6279 12.4079 30.2073C12.4079 29.8296 12.3947 28.829 12.3898 27.4985C7.80076 28.4545 6.8317 25.3666 6.8317 25.3666C6.5296 24.4057 5.88013 23.5809 5.00107 23.0418C3.51275 22.0555 5.11517 22.0778 5.11517 22.0778C6.17465 22.2178 7.10712 22.8227 7.64036 23.7158C8.0917 24.5066 8.85211 25.0908 9.75262 25.3389C10.6531 25.5869 11.6192 25.4781 12.4361 25.0367C12.5128 24.2305 12.8851 23.477 13.4861 22.9112C9.82488 22.5112 5.97509 21.1473 5.97509 15.0558C5.95477 13.4803 6.56198 11.9572 7.67178 10.7999C7.16963 9.42851 7.22877 7.92427 7.83714 6.5934C7.83714 6.5934 9.22128 6.16478 12.3716 8.22024C15.0734 7.50641 17.9249 7.50641 20.6268 8.22024C23.7787 6.16319 25.1612 6.5934 25.1612 6.5934C25.7724 7.92364 25.8316 9.42893 25.3266 10.7999C26.4404 11.9571 27.0471 13.4842 27.0199 15.0622C27.0199 21.1696 23.1668 22.5112 19.4923 22.9048C20.285 23.6857 20.6915 24.7568 20.6086 25.8462C20.6086 27.9717 20.5887 29.6862 20.5887 30.2073C20.5887 30.6327 20.8831 31.1266 21.7248 30.9705C29.3987 28.5029 34.0829 21.0373 32.7847 13.3434C31.4865 5.64956 24.5891 -0.00178327 16.4992 4.22109e-07Z" fill="#98A2B3"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com" target="_blank" className="transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27.7793 0H2.21484C0.990234 0 0 0.966797 0 2.16211V27.832C0 29.0273 0.990234 30 2.21484 30H27.7793C29.0039 30 30 29.0273 30 27.8379V2.16211C30 0.966797 29.0039 0 27.7793 0ZM8.90039 25.5645H4.44727V11.2441H8.90039V25.5645ZM6.67383 9.29297C5.24414 9.29297 4.08984 8.13867 4.08984 6.71484C4.08984 5.29102 5.24414 4.13672 6.67383 4.13672C8.09766 4.13672 9.25195 5.29102 9.25195 6.71484C9.25195 8.13281 8.09766 9.29297 6.67383 9.29297ZM25.5645 25.5645H21.1172V18.6035C21.1172 16.9453 21.0879 14.8066 18.8027 14.8066C16.4883 14.8066 16.1367 16.6172 16.1367 18.4863V25.5645H11.6953V11.2441H15.9609V13.2012H16.0195C16.6113 12.0762 18.0645 10.8867 20.2266 10.8867C24.7324 10.8867 25.5645 13.8516 25.5645 17.707V25.5645Z" fill="#98A2B3"/>
            </svg>
          </a>
        </div>

        {/* Costos y sesiones */}
        <div className="border-t border-b flex justify-evenly items-center pt-6 pb-6 pl-4 pr-4 space-x-6">
          <div>
            <h2 className="font-semibold text-codecolor">US$80.00</h2>
            <h2 className="font-semibold text-sm text-gray-700">la hora</h2>
          </div>
          <div>
            <h2 className="font-semibold text-codecolor">500</h2>
            <h2 className="font-semibold text-sm text-gray-700">sesiones</h2>
          </div>
        </div>

        {/* Boton para Contactar */}
        <div className="flex flex-col items-center pt-6">
          <button 
              type="button"
              className="flex flex-row items-center justify-center w-36 h-14 bg-codecolor text-white rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
              Contactar
          </button>
        </div>
      </div>

      {/* Tabla de Información Derecha */}
      <div className='w-full pl-9 flex flex-col relative z-0'>
        <div className="p-9 bg-white border border-gray-200 shadow-md rounded-lg">
          {/* Aréa del Developer */}
          <div>
            <h2 className="text-left text-3xl font-bold">Fullstack Software Engineer</h2>
          </div>

          {/* Contenedor de País,Tarifa e Idiomas */}
          <div className="pt-6 pb-6 flex justify-start items-center">
            {/* Los svg y span contienen iconos */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 14.5C3 14.2239 3.22386 14 3.5 14H12.5C12.7761 14 13 14.2239 13 14.5C13 14.7761 12.7761 15 12.5 15H3.5C3.22386 15 3 14.7761 3 14.5Z" fill="#141414" fillOpacity="0.7"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8 5C7.17157 5 6.5 5.67157 6.5 6.5C6.5 7.32843 7.17157 8 8 8C8.82843 8 9.5 7.32843 9.5 6.5C9.5 5.67157 8.82843 5 8 5ZM5.5 6.5C5.5 5.11929 6.61929 4 8 4C9.38071 4 10.5 5.11929 10.5 6.5C10.5 7.88071 9.38071 9 8 9C6.61929 9 5.5 7.88071 5.5 6.5Z" fill="#141414" fillOpacity="0.7"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M8 2C6.80653 2 5.66193 2.47411 4.81802 3.31802C3.97411 4.16193 3.5 5.30653 3.5 6.5C3.5 8.56997 4.65592 10.4548 5.8773 11.8594C6.48189 12.5547 7.08775 13.1152 7.54257 13.5018C7.72245 13.6547 7.87812 13.7799 8 13.875C8.12188 13.7799 8.27755 13.6547 8.45743 13.5018C8.91225 13.1152 9.51812 12.5547 10.1227 11.8594C11.3441 10.4548 12.5 8.56997 12.5 6.5C12.5 5.30653 12.0259 4.16193 11.182 3.31802C10.3381 2.47411 9.19347 2 8 2ZM8 14.5C7.71327 14.9096 7.71313 14.9095 7.71297 14.9094L7.71256 14.9091L7.71139 14.9083L7.70769 14.9057L7.69498 14.8966C7.68417 14.8889 7.66876 14.8778 7.64904 14.8634C7.60962 14.8347 7.55296 14.7927 7.48154 14.7381C7.33874 14.6289 7.13661 14.4692 6.89493 14.2638C6.41225 13.8535 5.76811 13.2578 5.1227 12.5156C3.84408 11.0452 2.5 8.93003 2.5 6.5C2.5 5.04131 3.07946 3.64236 4.11091 2.61091C5.14236 1.57946 6.54131 1 8 1C9.45869 1 10.8576 1.57946 11.8891 2.61091C12.9205 3.64236 13.5 5.04131 13.5 6.5C13.5 8.93003 12.1559 11.0452 10.8773 12.5156C10.2319 13.2578 9.58775 13.8535 9.10507 14.2638C8.86339 14.4692 8.66126 14.6289 8.51846 14.7381C8.44704 14.7927 8.39038 14.8347 8.35096 14.8634C8.33124 14.8778 8.31583 14.8889 8.30502 14.8966L8.29231 14.9057L8.28861 14.9083L8.28744 14.9091L8.28703 14.9094C8.28687 14.9095 8.28673 14.9096 8 14.5ZM8 14.5L8.28673 14.9096C8.11457 15.0301 7.88543 15.0301 7.71327 14.9096L8 14.5Z" fill="#141414" fillOpacity="0.7"/>
            </svg>
            {/* País */}
            <h2 className="font-semibold text-sm text-gray-600">Argentina</h2>

            <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M8 1C8.27614 1 8.5 1.22386 8.5 1.5V14.5C8.5 14.7761 8.27614 15 8 15C7.72386 15 7.5 14.7761 7.5 14.5V1.5C7.5 1.22386 7.72386 1 8 1Z" fill="#141414" fillOpacity="0.7"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M4.62868 3.37868C5.19129 2.81607 5.95435 2.5 6.75 2.5H9C9.39397 2.5 9.78407 2.5776 10.1481 2.72836C10.512 2.87913 10.8427 3.1001 11.1213 3.37868C11.3999 3.65726 11.6209 3.98797 11.7716 4.35195C11.9224 4.71593 12 5.10603 12 5.5C12 5.77614 11.7761 6 11.5 6C11.2239 6 11 5.77614 11 5.5C11 5.23736 10.9483 4.97728 10.8478 4.73463C10.7473 4.49198 10.5999 4.2715 10.4142 4.08579C10.2285 3.90007 10.008 3.75275 9.76537 3.65224C9.52272 3.55173 9.26264 3.5 9 3.5H6.75C6.21957 3.5 5.71086 3.71071 5.33579 4.08579C4.96071 4.46086 4.75 4.96957 4.75 5.5C4.75 6.03043 4.96071 6.53914 5.33579 6.91421C5.71086 7.28929 6.21957 7.5 6.75 7.5H9.5C10.2956 7.5 11.0587 7.81607 11.6213 8.37868C12.1839 8.94129 12.5 9.70435 12.5 10.5C12.5 11.2956 12.1839 12.0587 11.6213 12.6213C11.0587 13.1839 10.2956 13.5 9.5 13.5H6.5C5.70435 13.5 4.94129 13.1839 4.37868 12.6213C3.81607 12.0587 3.5 11.2956 3.5 10.5C3.5 10.2239 3.72386 10 4 10C4.27614 10 4.5 10.2239 4.5 10.5C4.5 11.0304 4.71071 11.5391 5.08579 11.9142C5.46086 12.2893 5.96957 12.5 6.5 12.5H9.5C10.0304 12.5 10.5391 12.2893 10.9142 11.9142C11.2893 11.5391 11.5 11.0304 11.5 10.5C11.5 9.96957 11.2893 9.46086 10.9142 9.08579C10.5391 8.71071 10.0304 8.5 9.5 8.5H6.75C5.95435 8.5 5.19129 8.18393 4.62868 7.62132C4.06607 7.05871 3.75 6.29565 3.75 5.5C3.75 4.70435 4.06607 3.94129 4.62868 3.37868Z" fill="#141414" fillOpacity="0.7"/>
            </svg>
            {/* Tarifa */}
            <h2 className="font-semibold text-sm text-gray-600">8000-H</h2>

            <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3ZM13 3H3V13H13V3Z" fill="#141414" fillOpacity="0.7"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11 1C11.2761 1 11.5 1.22386 11.5 1.5V3.5C11.5 3.77614 11.2761 4 11 4C10.7239 4 10.5 3.77614 10.5 3.5V1.5C10.5 1.22386 10.7239 1 11 1Z" fill="#141414" fillOpacity="0.7"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M5 1C5.27614 1 5.5 1.22386 5.5 1.5V3.5C5.5 3.77614 5.27614 4 5 4C4.72386 4 4.5 3.77614 4.5 3.5V1.5C4.5 1.22386 4.72386 1 5 1Z" fill="#141414" fillOpacity="0.7"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2 5.5C2 5.22386 2.22386 5 2.5 5H13.5C13.7761 5 14 5.22386 14 5.5C14 5.77614 13.7761 6 13.5 6H2.5C2.22386 6 2 5.77614 2 5.5Z" fill="#141414" fillOpacity="0.7"/>
            </svg>
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
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M9.57283 1.57795C10.1706 0.140682 12.2067 0.140687 12.8045 1.57795L14.8206 6.42537C14.8566 6.51193 14.938 6.57107 15.0315 6.57856L20.2647 6.9981C21.8163 7.1225 22.4455 9.05889 21.2633 10.0716L17.2761 13.487C17.2049 13.548 17.1738 13.6437 17.1956 13.7348L18.4137 18.8416C18.7749 20.3557 17.1277 21.5524 15.7993 20.7411L11.319 18.0045C11.239 17.9556 11.1383 17.9556 11.0583 18.0045L6.57798 20.7411C5.24956 21.5525 3.60237 20.3557 3.96355 18.8416L5.18169 13.7348C5.20344 13.6437 5.17234 13.548 5.10115 13.487L1.114 10.0716C-0.068189 9.05888 0.560988 7.1225 2.11263 6.9981L7.34583 6.57856C7.43927 6.57107 7.52068 6.51193 7.55668 6.42537L9.57283 1.57795ZM11.4195 2.15399C11.3341 1.94867 11.0432 1.94867 10.9578 2.15399L8.94166 7.00141C8.68965 7.60732 8.11983 8.02132 7.4657 8.07376L2.2325 8.4933C2.01083 8.51108 1.92096 8.7877 2.08984 8.93237L6.07698 12.3478C6.57536 12.7747 6.79301 13.4446 6.64075 14.0829L5.42261 19.1896C5.37101 19.4059 5.60633 19.5769 5.7961 19.461L10.2764 16.7244C10.8365 16.3823 11.5408 16.3823 12.1008 16.7244L16.5812 19.4609C16.771 19.5769 17.0063 19.4059 16.9547 19.1896L15.7365 14.0829C15.5843 13.4446 15.8019 12.7747 16.3003 12.3478L20.2874 8.93237C20.4563 8.7877 20.3665 8.51107 20.1448 8.4933L14.9116 8.07376C14.2575 8.02132 13.6876 7.60732 13.4356 7.00141L11.4195 2.15399Z" fill="#7F56D9"/>
                </svg>
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
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3 14.5C3 14.2239 3.22386 14 3.5 14H12.5C12.7761 14 13 14.2239 13 14.5C13 14.7761 12.7761 15 12.5 15H3.5C3.22386 15 3 14.7761 3 14.5Z" fill="#141414" fillOpacity="0.7"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 5C7.17157 5 6.5 5.67157 6.5 6.5C6.5 7.32843 7.17157 8 8 8C8.82843 8 9.5 7.32843 9.5 6.5C9.5 5.67157 8.82843 5 8 5ZM5.5 6.5C5.5 5.11929 6.61929 4 8 4C9.38071 4 10.5 5.11929 10.5 6.5C10.5 7.88071 9.38071 9 8 9C6.61929 9 5.5 7.88071 5.5 6.5Z" fill="#141414" fillOpacity="0.7"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M8 2C6.80653 2 5.66193 2.47411 4.81802 3.31802C3.97411 4.16193 3.5 5.30653 3.5 6.5C3.5 8.56997 4.65592 10.4548 5.8773 11.8594C6.48189 12.5547 7.08775 13.1152 7.54257 13.5018C7.72245 13.6547 7.87812 13.7799 8 13.875C8.12188 13.7799 8.27755 13.6547 8.45743 13.5018C8.91225 13.1152 9.51812 12.5547 10.1227 11.8594C11.3441 10.4548 12.5 8.56997 12.5 6.5C12.5 5.30653 12.0259 4.16193 11.182 3.31802C10.3381 2.47411 9.19347 2 8 2ZM8 14.5C7.71327 14.9096 7.71313 14.9095 7.71297 14.9094L7.71256 14.9091L7.71139 14.9083L7.70769 14.9057L7.69498 14.8966C7.68417 14.8889 7.66876 14.8778 7.64904 14.8634C7.60962 14.8347 7.55296 14.7927 7.48154 14.7381C7.33874 14.6289 7.13661 14.4692 6.89493 14.2638C6.41225 13.8535 5.76811 13.2578 5.1227 12.5156C3.84408 11.0452 2.5 8.93003 2.5 6.5C2.5 5.04131 3.07946 3.64236 4.11091 2.61091C5.14236 1.57946 6.54131 1 8 1C9.45869 1 10.8576 1.57946 11.8891 2.61091C12.9205 3.64236 13.5 5.04131 13.5 6.5C13.5 8.93003 12.1559 11.0452 10.8773 12.5156C10.2319 13.2578 9.58775 13.8535 9.10507 14.2638C8.86339 14.4692 8.66126 14.6289 8.51846 14.7381C8.44704 14.7927 8.39038 14.8347 8.35096 14.8634C8.33124 14.8778 8.31583 14.8889 8.30502 14.8966L8.29231 14.9057L8.28861 14.9083L8.28744 14.9091L8.28703 14.9094C8.28687 14.9095 8.28673 14.9096 8 14.5ZM8 14.5L8.28673 14.9096C8.11457 15.0301 7.88543 15.0301 7.71327 14.9096L8 14.5Z" fill="#141414" fillOpacity="0.7"/>
                </svg>
                {/* País */}
                <h2 className="font-semibold text-sm text-gray-600">Argentina</h2>

                <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3ZM13 3H3V13H13V3Z" fill="#141414" fill-opacity="0.7"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11 1C11.2761 1 11.5 1.22386 11.5 1.5V3.5C11.5 3.77614 11.2761 4 11 4C10.7239 4 10.5 3.77614 10.5 3.5V1.5C10.5 1.22386 10.7239 1 11 1Z" fill="#141414" fill-opacity="0.7"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M5 1C5.27614 1 5.5 1.22386 5.5 1.5V3.5C5.5 3.77614 5.27614 4 5 4C4.72386 4 4.5 3.77614 4.5 3.5V1.5C4.5 1.22386 4.72386 1 5 1Z" fill="#141414" fill-opacity="0.7"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M2 5.5C2 5.22386 2.22386 5 2.5 5H13.5C13.7761 5 14 5.22386 14 5.5C14 5.77614 13.7761 6 13.5 6H2.5C2.22386 6 2 5.77614 2 5.5Z" fill="#141414" fill-opacity="0.7"/>
                </svg>
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
    </div>
  )
}
export default TutorProfile;