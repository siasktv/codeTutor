const SearchPage = () => {
    return (
        <div className="">
            <div className="bg-white flex flex-col justify-center items-start p-20 gap-2 absolute w-1440 h-379 left-0 right-0 top-72">
                <div className=" flex flex-col items-start p-0 gap-4 w-1312 h-219">
                    <h1 className="w-830 h-84 font-inter font-semibold text-5xl leading-1.5 text-black">
                        Encuentra <span className="inline text-purple-600">programadores</span> hoy
                    </h1>
                    <h2 className="w-685 h-27 font-inter font-normal text-base leading-7 text-black">
                        Encuentra programadores listos para ayudarte con el desarrollo de tu aplicación.
                    </h2>
                    <div className="flex">
                        <form className="flex items-center">
                            <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                                <input 
                                    type="text" id="simple-search" 
                                    required=""
                                    className="p-2 pl-10 pr-10  text-sm box-border flex flex-row items-center w-full h-12 bg-white border border-gray-200 rounded-l text-black" 
                                />
                            </div>
                        </form>
                        <button className="pl-10 pr-10 flex flex-row items-center justify-center w-1/3 h-12 bg-purple-600  text-white rounded-r rounded-l-none">
                            Buscar
                        </button>
                    </div>
                </div>
                <div className="bg-gray-100 flex flex-col justify-center items-start p-20 gap-2 absolute w-1440 h-379 left-0 right-0 top-72">
                    <h2>Hola</h2>
                </div>
            </div>
        </div>
    )
  }
export default SearchPage;