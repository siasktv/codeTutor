import React, { useState } from 'react';

const SearchPage = () => {
    const [rating, setRating] = useState(0);

    const handleInputChange = (e) => {
        setRating(e.target.value);
    };

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
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    required=""
                                    className="p-2 pl-10 pr-10  text-sm box-border flex flex-row items-center w-full h-12 bg-white border border-gray-200 rounded-l text-black"
                                />
                            </div>
                        </form>
                        <button className="pl-10 pr-10 flex flex-row items-center justify-center w-50 h-12 bg-codecolor  text-white rounded-r rounded-l-none">
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0 top-72">
                    <div className="box-border border w-1/5 h-max left-79 top-516 pb-10 bg-white border-1 border-gray-100 shadow-md">
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
                                        <input id="junior" type="radio" value="" name="list-level" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="junior" className="py-3 ml-2 text-sm font-medium text-black">Junior</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="semiSenior" type="radio" value="" name="list-level" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="semiSenior" className="py-3 ml-2 text-sm font-medium text-black">Semi-Senior</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="senior" type="radio" value="" name="list-level" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="senior" className="py-3 ml-2 text-sm font-medium text-black">Senior</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="senior+" type="radio" value="" name="list-level" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
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
                                        <input id="star5" type="radio" value="" name="list-review" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star5" className="py-3 ml-2 text-sm font-medium text-black">5 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star4" type="radio" value="" name="list-review" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star4" className="py-3 ml-2 text-sm font-medium text-black">4 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star3" type="radio" value="" name="list-review" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star3" className="py-3 ml-2 text-sm font-medium text-black">3 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star2" type="radio" value="" name="list-review" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="star2" className="py-3 ml-2 text-sm font-medium text-black">2 estrellas</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="star1" type="radio" value="" name="list-review" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
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
                                        <input id="espanol" type="radio" value="" name="list-language" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="espanol" className="py-3 ml-2 text-sm font-medium text-black">Español</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="ingles" type="radio" value="" name="list-language" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="ingles" className="py-3 ml-2 text-sm font-medium text-black">Inglés</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="portugues" type="radio" value="" name="list-language" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="portugues" className="py-3 ml-2 text-sm font-medium text-black">Portugués</label>
                                    </div>
                                </li>
                                <li className="w-full">
                                    <div className="flex items-center">
                                        <input id="aleman" type="radio" value="" name="list-language" className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500"/>
                                        <label htmlFor="aleman" className="py-3 ml-2 text-sm font-medium text-black">Alemán</label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className=' w-full p-9'>
                        <h2 className="w-62 pb-7 h-30 font-inter font-bold leading-150 text-2xl text-black text-left">
                            10 Programadores
                        </h2>
                        <div class="p-9 w-100 bg-white border border-gray-200 shadow-md rounded-lg">
                            <h2 className="border w-62 h-30 font-inter font-bold leading-150 text-2xl text-black">Aca va la card</h2>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default SearchPage;
