/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  tutorsFetch,
  sortedByRate,
  sortedByLanguages,
  sortedByReview
} from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'
import { tutorFetchById } from '../redux/features/tutors/tutorsSlice'
import { sortedByTech } from '../redux/features/tutors/tutorsSlice'
import { Star, MensajeTexto } from '../assets'

import { CardTutor, SearchBarTutor, FilterTutor } from '../layouts'
import { ButtonDropdownLocation } from '../components'
import Dropdown from '../components/Buttons/Dropdown'
import { Loader, MessageContainer, MessageMinimized } from '../components'
import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import useUser from '../hooks/useUser'
import NavUserSearch from '../components/NavUserSearch'

const SearchPage = () => {
  const tutors = useSelector(state => state.tutors.tutors)
  const users = useSelector(state => state.users.users)
  const teches = useSelector(state => state.teches.teches)
  const categories = useSelector(state => state.teches.categories)
  const selectedTech = useSelector(state => state.tutors.selectedTech)
  const [isLoading, setIsLoading] = useState(true)

  const user = useUser()
  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)

  const handleShowMessage = (e, tutor) => {
    e.preventDefault()
    if (selectedTutor === null) {
      setSelectedTutor(tutor)
      setShowMessage(true)
    } else {
      if (selectedTutor._id === tutor._id) {
        setShowMessage(true)
      } else {
        setSelectedTutor(tutor)
        setShowMessage(true)
      }
    }
  }

  const handleMinimizeMessage = e => {
    e.preventDefault()
    setShowMessage(false)
  }

  const handleMaximizeMessage = e => {
    e.preventDefault()
    setShowMessage(true)
  }

  const handleCloseMessage = e => {
    e.preventDefault()
    setShowMessage(false)
    setSelectedTutor(null)
  }

  const tutorsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastTutor = tutorsPerPage * currentPage
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor)
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(tutors.length / tutorsPerPage); i++) {
    pageNumbers.push(i)
  }
  const handlePreviusPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePage = number => {
    setCurrentPage(number)
  }

  const pagesCutCount = 21

  const getPagesCut = (pageNumbers, pagesCutCount, currentPage) => {
    const ceiling = Math.ceil(pagesCutCount / 2)
    const floor = Math.floor(pagesCutCount / 2)
    if (pageNumbers.length < pagesCutCount) {
      return { start: 1, end: pageNumbers.length + 1 }
    } else if (currentPage >= 1 && currentPage <= ceiling) {
      return { start: 1, end: pagesCutCount + 1 }
    } else if (currentPage + floor >= pageNumbers.length) {
      return {
        start: pageNumbers.length - pagesCutCount + 1,
        end: pageNumbers.length + 1
      }
    } else {
      return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 }
    }
  }
  const pagesCutted = getPagesCut(pageNumbers, pagesCutCount, currentPage)
  const pages = pageNumbers.slice(pagesCutted.start - 1, pagesCutted.end - 1)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!tutors[0]?.bio?.specialty) {
      dispatch(tutorsFetch())
    }
    dispatch(usersFetch())
    dispatch(techesFetch())
  }, [dispatch])

  useEffect(() => {
    if (tutors[0]?.bio?.specialty) {
      setIsLoading(false)
      if (currentPage > pageNumbers.length) {
        setCurrentPage(pageNumbers.length)
      }
    }
  }, [tutors])

  return (
    <div>
      <div>
        <NavUserSearch user={user} />
      </div>

      <div className='bg-transparent flex flex-col justify-center items-start pt-1 gap-2 w-full h-full left-0 right-0'>
        <SearchBarTutor />
        <div className='bg-gray-100 flex items-start px-20 py-10  w-full h-max left-0 right-0'>
          <FilterTutor
            sortedByLanguages={sortedByLanguages}
            sortedByReview={sortedByReview}
          />
          <div className='w-full p-9 flex flex-col relative z-0'>
            {isLoading && (
              <div className='flex justify-center items-center'>
                <Loader />
              </div>
            )}
            {!isLoading && (
              <>
                <div className='flex items-center justify-between'>
                  <h2 className='pb-10 h-30 font-inter font-bold leading-150 text-2xl text-black text-left'>
                    {tutors.length === 0
                      ? ''
                      : tutors.length === 1
                      ? '1 programador encontrado'
                      : `${tutors.length} programadores encontrados`}
                  </h2>
                  <div className='pb-5 relative inline-block text-left'>
                    <div>
                      <ButtonDropdownLocation />
                    </div>
                  </div>
                </div>
                {tutors.length === 0 && (
                  <div className='flex justify-center items-center mt-40'>
                    <h1 className='text-2xl font-semibold'>
                      No se encontraron programadores.
                    </h1>
                  </div>
                )}
                {currentTutors.map(tutor => (
                  <Link to={`/tutor/${tutor._id}`} key={tutor._id}>
                    <CardTutor
                      key={tutor._id}
                      tutor={tutor}
                      handleShowMessage={handleShowMessage}
                      user={user}
                    />
                  </Link>
                ))}
                {tutors.length > currentTutors.length && (
                  <>
                    <div className='flex justify-center items-center'>
                      <div className='flex justify-center items-center'>
                        <button
                          onClick={handlePreviusPage}
                          className={
                            currentPage === 1
                              ? 'bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default'
                              : 'bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer'
                          }
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                        {pages.map(number => (
                          <button
                            key={number}
                            onClick={() => handlePage(number)}
                            className={
                              currentPage === number
                                ? 'bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1'
                                : 'bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1'
                            }
                          >
                            {number}
                          </button>
                        ))}
                        <>
                          <button
                            onClick={handleNextPage}
                            className={
                              currentPage === pageNumbers.length
                                ? 'bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1'
                                : 'bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1'
                            }
                          >
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </>
                      </div>
                    </div>
                    <p className='text-codecolor font-bold text-md mt-3'>
                      {pageNumbers.length} páginas en total
                    </p>
                  </>
                )}
                {showMessage && selectedTutor !== null && (
                  <MessageContainer
                    tutor={selectedTutor}
                    handleMinimizeMessage={handleMinimizeMessage}
                    user={user}
                  />
                )}
                {user && selectedTutor !== null && !showMessage && (
                  <MessageMinimized
                    tutor={selectedTutor}
                    handleCloseMessage={handleCloseMessage}
                    handleMinimizeMessage={handleMinimizeMessage}
                    handleMaximizeMessage={handleMaximizeMessage}
                    user={user}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage

// Modo oscuro

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   tutorsFetch,
//   sortedByRate,
//   sortedByLanguages,
// } from "../redux/features/tutors/tutorsSlice";
// import { usersFetch } from "../redux/features/users/usersSlice";
// import { techesFetch } from "../redux/features/teches/techesSlice";
// import { tutorFetchById } from "../redux/features/tutors/tutorsSlice";
// import { sortedByTech } from "../redux/features/tutors/tutorsSlice";
// import { Star, MensajeTexto } from "../assets";

// import { CardTutor, SearchBarTutor, FilterTutor } from "../layouts";
// import { ButtonDropdownLocation } from "../components";
// import Dropdown from "../components/Buttons/Dropdown";
// import { Loader, MessageContainer, MessageMinimized } from "../components";
// import { Link } from "react-router-dom";
// import ReactDOM from "react-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// import useUser from "../hooks/useUser";
// import NavUserSearch from "../components/NavUserSearch";

// const SearchPage = () => {
//   const tutors = useSelector((state) => state.tutors.tutors);
//   const users = useSelector((state) => state.users.users);
//   const teches = useSelector((state) => state.teches.teches);
//   const categories = useSelector((state) => state.teches.categories);
//   const selectedTech = useSelector((state) => state.tutors.selectedTech);
//   const [isLoading, setIsLoading] = useState(true);

//   const user = useUser();
//   const [showMessage, setShowMessage] = useState(false);
//   const [selectedTutor, setSelectedTutor] = useState(null);

//   // Agregamos el estado para el modo oscuro
//   const [darkMode, setDarkMode] = useState(false);

//   const handleShowMessage = (e, tutor) => {
//     e.preventDefault();
//     if (selectedTutor === null) {
//       setSelectedTutor(tutor);
//       setShowMessage(true);
//     } else {
//       if (selectedTutor._id === tutor._id) {
//         setShowMessage(true);
//       } else {
//         setSelectedTutor(tutor);
//         setShowMessage(true);
//       }
//     }
//   };

//   const handleMinimizeMessage = (e) => {
//     e.preventDefault();
//     setShowMessage(false);
//   };

//   const handleMaximizeMessage = (e) => {
//     e.preventDefault();
//     setShowMessage(true);
//   };

//   const handleCloseMessage = (e) => {
//     e.preventDefault();
//     setShowMessage(false);
//     setSelectedTutor(null);
//   };

//   const tutorsPerPage = 5;
//   const [currentPage, setCurrentPage] = useState(1);
//   const indexOfLastTutor = tutorsPerPage * currentPage;
//   const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
//   const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(tutors.length / tutorsPerPage); i++) {
//     pageNumbers.push(i);
//   }
//   const handlePreviusPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };
//   const handleNextPage = () => {
//     if (currentPage < pageNumbers.length) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePage = (number) => {
//     setCurrentPage(number);
//   };

//   const pagesCutCount = 21;

//   const getPagesCut = (pageNumbers, pagesCutCount, currentPage) => {
//     const ceiling = Math.ceil(pagesCutCount / 2);
//     const floor = Math.floor(pagesCutCount / 2);
//     if (pageNumbers.length < pagesCutCount) {
//       return { start: 1, end: pageNumbers.length + 1 };
//     } else if (currentPage >= 1 && currentPage <= ceiling) {
//       return { start: 1, end: pagesCutCount + 1 };
//     } else if (currentPage + floor >= pageNumbers.length) {
//       return {
//         start: pageNumbers.length - pagesCutCount + 1,
//         end: pageNumbers.length + 1,
//       };
//     } else {
//       return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 };
//     }
//   };
//   const pagesCutted = getPagesCut(pageNumbers, pagesCutCount, currentPage);
//   const pages = pageNumbers.slice(pagesCutted.start - 1, pagesCutted.end - 1);

//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (!tutors[0]?.bio?.specialty) {
//       dispatch(tutorsFetch());
//     }
//     dispatch(usersFetch());
//     dispatch(techesFetch());
//   }, [dispatch]);

//   useEffect(() => {
//     if (tutors[0]?.bio?.specialty) {
//       setIsLoading(false);
//       if (currentPage > pageNumbers.length) {
//         setCurrentPage(pageNumbers.length);
//       }
//     }
//   }, [tutors]);

//   const handleSortByTech = (tech) => {
//     dispatch(sortedByTech(tech));
//   };

//   // Función para cambiar al modo oscuro
//   const handleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   return (
//     // <div className={darkMode ? "bg-black" : ""}>
//     <div>
//       {/* Botón para cambiar al modo oscuro */}

//       <div
//         className={`bg-transparent flex flex-col justify-center items-start px-20 pt-1 gap-2 w-full h-full left-0 right-0 ${
//           darkMode ? "text-white bg-gray-900" : "text-black"
//         }`}
//       >
//         <NavUserSearch />
//       </div>

//       <div
//         className={`bg-transparent flex flex-col justify-center items-start px-20 pt-1 gap-2 w-full h-full left-0 right-0 ${
//           darkMode ? "bg-gray-800" : "bg-gray-100"
//         }`}
//       >
//         <SearchBarTutor />
//         <div
//           className={`bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0 top-72 ${
//             darkMode ? "bg-gray-800" : "bg-gray-100"
//           }`}
//         >
//           <FilterTutor sortedByLanguages={sortedByLanguages} />
//           <div className="w-full p-9 flex flex-col relative z-0">
//             {isLoading && (
//               <div className="flex justify-center items-center">
//                 <Loader />
//               </div>
//             )}
//             {!isLoading && (
//               <>
//                 <div
//                   className={`flex items-center justify-between ${
//                     darkMode ? "text-white" : "bg-gray-100"
//                   }`}
//                 >
//                   <h2 className="pb-10 h-30 font-inter font-bold leading-150 text-2xl text-left">
//                     {tutors.length === 0
//                       ? ""
//                       : tutors.length === 1
//                       ? "1 programador encontrado"
//                       : `${tutors.length} programadores encontrados`}
//                   </h2>
//                   <div className="pb-5 relative inline-block text-left">
//                     <button
//                       onClick={handleDarkMode}
//                       className={`items-center pb-4 pt-4 pr-2 w-full rounded border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor" ${
//                         darkMode ? "bg-gray-600 text-white" : "bg-white"
//                       }`}
//                     >
//                       {darkMode ? "Light" : "Dark"}
//                     </button>
//                     <div>
//                       <ButtonDropdownLocation />
//                     </div>
//                   </div>
//                 </div>
//                 {tutors.length === 0 && (
//                   <div className="flex justify-center items-center mt-40">
//                     <h1 className="text-2xl font-semibold">
//                       No se encontraron programadores.
//                     </h1>
//                   </div>
//                 )}
//                 {currentTutors.map((tutor) => (
//                   <Link to={`/tutor/${tutor._id}`} key={tutor._id}>
//                     <CardTutor
//                       key={tutor._id}
//                       tutor={tutor}
//                       handleShowMessage={handleShowMessage}
//                       user={user}
//                     />
//                   </Link>
//                 ))}
//                 {tutors.length > currentTutors.length && (
//                   <>
//                     <div className="flex justify-center items-center">
//                       <div className="flex justify-center items-center">
//                         <button
//                           onClick={handlePreviusPage}
//                           className={
//                             currentPage === 1
//                               ? "bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default"
//                               : "bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer"
//                           }
//                         >
//                           <FontAwesomeIcon icon={faArrowLeft} />
//                         </button>

//                         {pages.map((number) => (
//                           <button
//                             key={number}
//                             onClick={() => handlePage(number)}
//                             className={
//                               currentPage === number
//                                 ? "bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1"
//                                 : "bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1"
//                             }
//                           >
//                             {number}
//                           </button>
//                         ))}
//                         <>
//                           <button
//                             onClick={handleNextPage}
//                             className={
//                               currentPage === pageNumbers.length
//                                 ? "bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1"
//                                 : "bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1"
//                             }
//                           >
//                             <FontAwesomeIcon icon={faArrowRight} />
//                           </button>
//                         </>
//                       </div>
//                     </div>
//                     <p className="text-codecolor font-bold text-md mt-3">
//                       {pageNumbers.length} páginas en total
//                     </p>
//                   </>
//                 )}
//                 {showMessage && selectedTutor !== null && (
//                   <MessageContainer
//                     tutor={selectedTutor}
//                     handleMinimizeMessage={handleMinimizeMessage}
//                     user={user}
//                   />
//                 )}
//                 {user && selectedTutor !== null && !showMessage && (
//                   <MessageMinimized
//                     tutor={selectedTutor}
//                     handleCloseMessage={handleCloseMessage}
//                     handleMinimizeMessage={handleMinimizeMessage}
//                     handleMaximizeMessage={handleMaximizeMessage}
//                     user={user}
//                   />
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;
