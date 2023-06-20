import {contrate,help,revision} from '../assets/index'

const UserDashboardContent = () => {
    return(
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
            <h1 className=' text-left pb-10 text-2xl font-semibold'>¿Cómo funciona la plataforma?</h1>
        <div className="grid w-full grid-cols-1 gap-12 mx-auto lg:grid-cols-3">
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5">
            <img src={help}/>
            </div>
            <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">Obtén ayuda en vivo.</h1>
            <p className="mx-auto text-base leading-relaxed text-gray-500">Supera tus desafíos de programación con nuestra ayuda experta y nuestras mentorías 1:1</p>
          </div>
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5">
              <img src={contrate}/>
            </div>
            <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">Contrata un freelance.</h1>
            <p className="mx-auto text-base leading-relaxed text-gray-500">Profesionales capacitados para llevar a cabo tu proyecto.</p>
          </div>
          <div className="p-6 border rounded-xl bg-white shadow-sm">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto mb-5">
            <img src={revision}/>
            </div>
            <h1 className="mx-auto mb-8 text-xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-xl">Revision de tú codigo.</h1>
            <p className="mx-auto text-base leading-relaxed text-gray-500">Mejora tu desarrollo con nuestra revisión especializada.</p>
          </div>
        </div>
      </div>

        
    );
};
export default UserDashboardContent;