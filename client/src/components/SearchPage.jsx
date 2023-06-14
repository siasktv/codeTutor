import { useState, useEffect } from 'react';

const SearchPage = () => {
    const [rating, setRating] = useState(0);

    const handleInputChange = (e) => {
        setRating(e.target.value);
    };

    useEffect(() => {
        const button = document.getElementById('dropdown-menu-button');
        const menu = document.querySelector('.origin-top-right');

        const handleClick = () => {
        menu.classList.toggle('hidden');
        };

        button.addEventListener('click', handleClick);

        return () => {
        button.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <div>
            <div className="bg-white flex flex-col justify-center items-start p-20 gap-2 absolute w-1440 h-379 left-0 right-0">
                <div className="flex flex-col items-start p-0 gap-4 w-1312 h-219">
                    <h1 className="w-830 h-84 font-inter font-semibold text-5xl leading-1.5 text-black">
                        Encuentra <span className="inline text-codecolor">programadores</span> hoy
                    </h1>
                    <h2 className="w-685 h-27 font-inter font-normal text-base leading-7 text-black">
                        Encuentra programadores listos para ayudarte con el desarrollo de tu aplicación.
                    </h2>
                    <div className="flex w-full">
                        <form className="flex items-center w-full">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <img src="./src/assets/Lupa.svg"/>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    required=""
                                    className="p-2 pl-10 pr-10  text-sm box-border flex flex-row items-center w-full h-12 bg-white border border-gray-200 rounded-l text-black"
                                />
                            </div>
                        </form>
                        <button 
                            type="button"
                            className="pl-10 pr-10 flex flex-row items-center justify-center w-50 h-12 bg-codecolor text-white rounded-r rounded-l-none transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0 top-72">
                    <div className="box-border border w-60 h-max left-79 top-516 pb-10 bg-white border-1 border-gray-100 shadow-md">
                        <div className="flex flex-col items-start pt-10 pl-10 pr-10 gap-30">
                            <h2 className="w-62 h-30 font-inter font-bold leading-150 text-xl text-black">
                                Filtros
                            </h2>
                            <h2 className="w-62 h-30 font-inter font-semibold leading-150 text-black pt-6">
                                Tarifa por hora
                            </h2>
                        </div>
                        <div className="flex flex-col items-center pl-10 pr-10 gap-30">
                            <input
                                type="range"
                                name="rating"
                                min="0"
                                max="80"
                                step="1"
                                className="box-border flex flex-row p-0 w-full h-12 border-0.5 accent-codecolor"
                                style={{ "--thumb-color": "transparent" }}
                                value={rating}
                                onChange={handleInputChange}
                            />
                            <label className="aling-center" htmlFor="range">{`$${rating}-$80`}</label>
                        </div>
                        <div className="flex flex-col items-start pt-2 pl-10 pr-10 gap-30">
                            <h2 className="w-62 h-30 font-inter font-semibold leading-150 text-black pt-6">
                                Nivel
                            </h2>
                            <ul className="w-48 text-sm font-medium text-black">
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="junior" type="radio" value="" name="list-level" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="junior" className="py-3 ml-2 text-sm font-medium text-black">Junior</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="semiSenior" type="radio" value="" name="list-level" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="semiSenior" className="py-3 ml-2 text-sm font-medium text-black">Semi-Senior</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="senior" type="radio" value="" name="list-level" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="senior" className="py-3 ml-2 text-sm font-medium text-black">Senior</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="senior+" type="radio" value="" name="list-level" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="senior+" className="py-3 ml-2 text-sm font-medium text-black">Senior+</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-start pt-2 pl-10 pr-10 gap-30">
                            <h2 className="w-62 h-30 font-inter font-semibold leading-150 text-black pt-6">
                                Review
                            </h2>
                            <ul className="w-48 text-sm font-medium text-black">
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star5" type="radio" value="" name="list-review" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star5" className="py-3 ml-2 text-sm font-medium text-black">5 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star4" type="radio" value="" name="list-review" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star4" className="py-3 ml-2 text-sm font-medium text-black">4 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star3" type="radio" value="" name="list-review" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star3" className="py-3 ml-2 text-sm font-medium text-black">3 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star2" type="radio" value="" name="list-review" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star2" className="py-3 ml-2 text-sm font-medium text-black">2 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star1" type="radio" value="" name="list-review" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star1" className="py-3 ml-2 text-sm font-medium text-black">1 estrellas</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex flex-col items-start pt-2 pl-10 pr-10 gap-30">
                            <h2 className="w-62 h-30 font-inter font-semibold leading-150 text-black pt-6">
                                Idioma
                            </h2>
                            <ul className="w-48 text-sm font-medium text-black">
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="espanol" type="radio" value="" name="list-language" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="espanol" className="py-3 ml-2 text-sm font-medium text-black">Español</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="ingles" type="radio" value="" name="list-language" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="ingles" className="py-3 ml-2 text-sm font-medium text-black">Inglés</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="portugues" type="radio" value="" name="list-language" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="portugues" className="py-3 ml-2 text-sm font-medium text-black">Portugués</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="aleman" type="radio" value="" name="list-language" className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="aleman" className="py-3 ml-2 text-sm font-medium text-black">Alemán</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='w-full p-9 flex flex-col relative z-0'>
                        <div className="flex items-center justify-between">
                            <h2 className="pb-10 h-30 font-inter font-bold leading-150 text-2xl text-black text-left">
                                10 Programadores
                            </h2>
                            <div className="pb-5 relative inline-block text-left">
                                <div>
                                    <button type="button" id="dropdown-menu-button" aria-haspopup="true" aria-expanded="false" className="inline-flex justify-center items-center pb-4 pt-4 pr-2 w-full rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor">
                                        <img src="./src/assets/LineasFiltro.svg"/>
                                        <span className='pr-5'>
                                            Filtrar por país
                                        </span>
                                        <img src="./src/assets/FlechaFiltro.svg"/>
                                    </button>
                                </div>
                                <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden z-10" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-menu-button" tabIndex="-1">
                                    <div className="py-1" role="none">
                                        <button role="menuitem" tabIndex="-1" id="dropdown-menu-item-1"
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor" 
                                        >Argentina</button>

                                        <button role="menuitem" tabIndex="-1" id="dropdown-menu-item-2"
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor" 
                                        >Colombia</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='pb-5'>
                            <div className="flex p-9 justify-between bg-white border border-gray-200 shadow-md rounded-lg">
                                {/* Imagen de perfil */}
                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                    <img 
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_oFhoPdG_gvarQsjy33Dwov47ETNFjw3Sg&usqp=CAU'
                                        alt="Imagen de perfil Tutor" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Información del tutor */}
                                <div className='p-2 w-3/4 h-1/2'>
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-semibold">Barrios Lautaro Gabriel</h2>
                                        <h2 className="font-semibold text-sm text-green-500">◉ Online</h2>
                                    </div>
                                    
                                    <div className="pt-2 pb-2 flex justify-between items-center">
                                        <h2 className="text-2xl font-medium">Fullstack Software Engineer</h2>
                                        <div className='flex items-center space-x-2'>
                                            <img src="./src/assets/Star.svg"/>
                                            <h2 className="font-semibold text-sm text-codecolor">5.0</h2>
                                        </div>
                                        <h2 className="font-semibold text-sm text-gray-500">200 reviews</h2>
                                    </div>
                                    
                                    <div className="flex justify-start items-center">
                                        <img src="./src/assets/Pais.svg"/>
                                        <h2 className="font-semibold text-sm text-gray-600">Argentina</h2>

                                        <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>
                                            <img src="./src/assets/Moneda.svg"/>
                                        <h2 className="font-semibold text-sm text-gray-600">80-H</h2>

                                        <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

                                        <img src="./src/assets/Calendario.svg"/>
                                        <h2 className="font-semibold text-sm text-gray-600">Español, Portugues</h2>
                                    </div>
                                    <div className="pt-2 pb-2">
                                        <h2 className="font-semibold text-sm text-left">Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt.</h2>
                                    </div>
                                    <div className="pt-2 pb-2">
                                        <div className="grid grid-cols-4 gap-3">
                                            <span className="flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Javascript</span>
                                            <span className="flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Machine Learning</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Button Mensage */}
                                <button className="flex justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none" 
                                    type="button"
                                    title='Contactar'
                                >
                                    <img src="./src/assets/MensajeTexto.svg"/>
                                </button>
                            </div>
                        </div>


                        {/* Card repetida */}
                        <div className='pb-5'>
                            <div className="flex p-9 justify-between bg-white border border-gray-200 shadow-md rounded-lg">
                                {/* Imagen de perfil */}
                                <div className="w-20 h-20 rounded-full overflow-hidden">
                                    <img 
                                        src='https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/02/henry-cavill-2624275.jpg?tf=3840x'
                                        alt="Imagen de perfil Tutor" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                {/* Información del tutor */}
                                <div className='p-2 w-3/4 h-1/2'>
                                    <div className="flex justify-between items-center">
                                        <h2 className="font-semibold">Cavill Henry</h2>
                                        <h2 className="font-semibold text-sm text-red-500">◉ Offline</h2>
                                    </div>
                                    
                                    <div className="pt-2 pb-2 flex justify-between items-center">
                                        <h2 className="text-2xl font-medium">Backend Developer</h2>
                                        <div className='flex items-center space-x-2'>
                                            <img src="./src/assets/Star.svg"/>
                                            <h2 className="font-semibold text-sm text-codecolor">4.5</h2>
                                        </div>
                                        <h2 className="font-semibold text-sm text-gray-500">19200 reviews</h2>
                                    </div>
                                    
                                    <div className="flex justify-start items-center">
                                        <img src="./src/assets/Pais.svg"/>
                                        <h2 className="font-semibold text-sm text-gray-600">Argentina</h2>

                                        <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>
                                            <img src="./src/assets/Moneda.svg"/>
                                        <h2 className="font-semibold text-sm text-gray-600">8000-H</h2>

                                        <span className="pl-4 pr-4 font-semibold text-sm text-gray-600">◦</span>

                                        <img src="./src/assets/Calendario.svg"/>
                                        <h2 className="font-semibold text-sm text-gray-600">Ingles, Español, Portugues</h2>
                                    </div>
                                    <div className="pt-2 pb-2">
                                        <h2 className="font-semibold text-sm text-left">Deje el mundo del espectaculo para dedicarme a mi otra pasión...el skate. Ah y también a programar.</h2>
                                    </div>
                                    <div className="pt-2 pb-2">
                                        <div className="grid grid-cols-4 gap-3">
                                            <span className="flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Javascript</span>
                                            <span className="flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none">Machine Learning</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Button Mensage */}
                                <button className="flex justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none" 
                                    type="button"
                                    title='Contactar'
                                >
                                    <img src="./src/assets/MensajeTexto.svg"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    );
};

export default SearchPage;
