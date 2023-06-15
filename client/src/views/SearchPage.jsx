/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  tutorsFetch,
  // sortedByLocation,
  // sortedByRate,
  // sortedByLanguages,
} from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'
import { tutorFetchById } from '../redux/features/tutors/tutorsSlice'
import { sortedByTech } from '../redux/features/tutors/tutorsSlice'
import { Star, MensajeTexto } from '../assets'
import CardTutor from '../layouts/SearchTutor/CardTutor'

const SearchPage = () => {
  const tutors = useSelector((state) => state.tutors.tutors)
  const users = useSelector((state) => state.users.users)
  const locations = useSelector((state) => state.tutors.locations)
  const teches = useSelector((state) => state.teches.teches)
  const categories = useSelector((state) => state.teches.categories)
  const selectedTech = useSelector((state) => state.tutors.selectedTech)
  // console.log('tutors', tutors)
  // console.log('users', users)
  // console.log('locations', locations)
  // console.log('teches', teches)
  // console.log('categories', categories)
  // console.log('selectedTech', selectedTech)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(tutorsFetch())
    dispatch(usersFetch())
    dispatch(techesFetch())
  }, [dispatch])

  // const handleLocationChange = () => {
  //   dispatch(sortedByLocation('Argentina'))
  // }

  // const handleRateChange = () => {
  //   dispatch(sortedByRate(1000)) // Example rate value: 5
  // }

  // const handleLanguageChange = () => {
  //   dispatch(sortedByLanguages('Chino'))
  // }

  const [rating, setRating] = useState(0)

  const handleInputChange = (e) => {
    setRating(e.target.value)
  }

  useEffect(() => {
    const button = document.getElementById('dropdown-menu-button')
    const menu = document.querySelector('.origin-top-right')

    const handleClick = () => {
      menu.classList.toggle('hidden')
    }

    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div>
      {/* {categories.map(category => (
        <button
          key={category}
          type='button'
          role='menuitem'
          className='p-4 text-codecolor font-bold cursor-default'
        >
          {category}
          {teches
            .filter(tech => tech.category === category)
            .map(tech => (
              <div
                key={tech._id}
                className='text-codecolor font-normal hover:underline cursor-pointer'
                onClick={() => dispatch(sortedByTech(tech.name))}
              >
                <h1>{tech.name}</h1>
              </div>
            ))}
        </button>
      ))} */}
      <div className="bg-white flex flex-col justify-center items-start p-20 gap-2 absolute w-1440 h-379 left-0 right-0">
        <div className="flex flex-col items-start p-0 gap-4 w-1312 h-219">
          <h1 className="w-830 h-84 font-inter font-semibold text-5xl leading-1.5 text-black">
            Encuentra{' '}
            <span className="inline text-codecolor">programadores</span> hoy
          </h1>
          <h2 className="w-685 h-27 font-inter font-normal text-base leading-7 text-black">
            Encuentra programadores listos para ayudarte con el desarrollo de tu
            aplicación.
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
            <button
              type="button"
              className="pl-10 pr-10 flex flex-row items-center justify-center w-50 h-12 bg-codecolor text-white rounded-r rounded-l-none transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none"
            >
              Buscar
            </button>
          </div>
        </div>
        <div className="bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0 top-72">
          <div className="box-border border w-64 h-max left-79 top-516 pb-10 bg-white border-1 border-gray-100 shadow-md">
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
                style={{ '--thumb-color': 'transparent' }}
                value={rating}
                onChange={handleInputChange}
              />
              <label
                className="aling-center"
                htmlFor="range"
              >{`$${rating}-$80`}</label>
            </div>
            <div className="flex flex-col items-start pt-2 pl-10 pr-10 gap-30">
              <h2 className="w-62 h-30 font-inter font-semibold leading-150 text-black pt-6">
                Review
              </h2>
              <ul className="w-48 text-sm font-medium text-black">
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="star5"
                      type="radio"
                      value=""
                      name="list-review"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="star5"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      5 estrellas
                    </label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="star4"
                      type="radio"
                      value=""
                      name="list-review"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="star4"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      4 estrellas
                    </label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="star3"
                      type="radio"
                      value=""
                      name="list-review"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="star3"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      3 estrellas
                    </label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="star2"
                      type="radio"
                      value=""
                      name="list-review"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="star2"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      2 estrellas
                    </label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="star1"
                      type="radio"
                      value=""
                      name="list-review"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="star1"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      1 estrellas
                    </label>
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
                    <input
                      id="espanol"
                      type="radio"
                      value=""
                      name="list-language"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="espanol"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      Español
                    </label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="ingles"
                      type="radio"
                      value=""
                      name="list-language"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="ingles"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      Inglés
                    </label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="portugues"
                      type="radio"
                      value=""
                      name="list-language"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="portugues"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      Portugués
                    </label>
                  </div>
                </li>
                <li className="w-full">
                  <div className="flex items-center">
                    <input
                      id="aleman"
                      type="radio"
                      value=""
                      name="list-language"
                      className="w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="aleman"
                      className="py-3 ml-2 text-sm font-medium text-black"
                    >
                      Alemán
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-9 flex flex-col relative z-0">
            <div className="flex items-center justify-between">
              <h2 className="pb-10 h-30 font-inter font-bold leading-150 text-2xl text-black text-left">
                {tutors.length} Programadores
              </h2>
              <div className="pb-5 relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    id="dropdown-menu-button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    className="inline-flex justify-center items-center pb-4 pt-4 pr-2 w-full rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor"
                  >
                    <svg
                      className="-ml-1 mr-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.25 12.5C5.25 12.0858 5.58579 11.75 6 11.75H18C18.4142 11.75 18.75 12.0858 18.75 12.5C18.75 12.9142 18.4142 13.25 18 13.25H6C5.58579 13.25 5.25 12.9142 5.25 12.5Z"
                        fill="#141414"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M1.5 8C1.5 7.58579 1.83579 7.25 2.25 7.25H21.75C22.1642 7.25 22.5 7.58579 22.5 8C22.5 8.41421 22.1642 8.75 21.75 8.75H2.25C1.83579 8.75 1.5 8.41421 1.5 8Z"
                        fill="#141414"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 17C9 16.5858 9.33579 16.25 9.75 16.25H14.25C14.6642 16.25 15 16.5858 15 17C15 17.4142 14.6642 17.75 14.25 17.75H9.75C9.33579 17.75 9 17.4142 9 17Z"
                        fill="#141414"
                      />
                    </svg>
                    <span className="pr-5">Filtrar por país</span>
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden z-10"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <button
                      role="menuitem"
                      tabIndex="-1"
                      id="dropdown-menu-item-1"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor"
                    >
                      Argentina
                    </button>

                    <button
                      role="menuitem"
                      tabIndex="-1"
                      id="dropdown-menu-item-2"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor"
                    >
                      Colombia
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {tutors.map((tutor) => (
              <CardTutor key={tutor._id} tutor={tutor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
