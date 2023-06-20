import { Link } from 'react-router-dom';
import { signOut } from '../../firebase/client'

import {calendar,
        creditcard,
        dashboard,
        exit,
        faqs,
        history,
        settings} from '../../assets/index'



const UserDashboardLayout = () => {
    return(
<div className="flex  overflow-hidden bg-white rounded-lg">
    <div className="hidden md:flex md:flex-shrink-0 overflow-hidden">
        <div className="flex flex-col w-80 h-screen">
            <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
                <div className='flex  mb-10 pt-4 ml-12 h-10'>
                  <Link to='/' >
                    <span className='inline-block h-10 w-52'>
                      <div className='flex'>
                        <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                        <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply'></div>
                        <h1 className='font-bold text-2xl ml-1'>Code-Tutor.</h1>
                      </div>
                    </span>
                  </Link>
                </div>
                <div className="flex flex-col flex-grow px-4 mt-5">
                    <nav className="flex-1 space-y-1 bg-white">
                        <ul>
                            <li>
                            
                                <a className="inline-flex items-center w-full px-4 py-4 mt-1 text-lg font-semibold  text-white transition duration-500 ease-in-out transform bg-codecolor rounded-lg shadow-lg" white=""  href="#">
                                    <img src={dashboard} className="ml-4 w-6 h-6" fill="none">    
                                    </img>
                                    <span className=" pl-10">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a className="inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white" href="#">
                                    <img src={calendar} className="w-6 h-6" fill="none">    
                                    </img>
                                    <span className="ml-4">Calendario</span>
                                </a>
                            </li>
                            <li>
                                <a className="inline-flex items-center w-full px-4 py-4 mt-1 pl-8 text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white" href="#">
                                <img src={creditcard} className="w-6 h-6" fill="none">    
                                    </img>
                                    <span className="ml-4">Método de pago</span>
                                </a>
                            </li>
                            <li>
                                <a className="inline-flex items-center w-full px-4 py-4 mt-1 pl-8  text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white" href="#">
                                <img src={history} className="w-6 h-6" fill="none">    
                                    </img>
                                    <span className="ml-4">Historial</span></a>
                            </li>
                       
                            <li>
                                <a className="inline-flex items-center w-full px-4 py-4 mt-1 pl-8  text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white" white="" href="#">
                                <img src={settings} className="w-6 h-6" fill="none">    
                                    </img>
                                    <span className="ml-4">Ajustes</span>
                                </a>
                            </li>
                            <li>
                                <a className="inline-flex items-center w-full px-4 py-4 mt-1 pl-8  text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white" white=""  href="#">
                                <img src={faqs} className="w-6 h-6" fill="none">    
                                    </img>
                                    <span className="ml-4">FAQs</span>
                                </a>
                            </li>
                            <li>
                                <a className="inline-flex items-center w-full px-4 py-4 mt-1 pl-8  text-base text-gray-700 transition duration-500 ease-in-out transform border-indigo-800 rounded-lg hover:border-indigo-800 focus:shadow-outline hover:bg-white cursor-pointer" white=""  onClick={signOut}>
                                <img src={exit} className="w-6 h-6" fill="none">    
                                    </img>
                                    <span className="ml-4">Salir</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</div>

        
    );
};
export default UserDashboardLayout;