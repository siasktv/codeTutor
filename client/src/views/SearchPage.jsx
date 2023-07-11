/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  tutorsFetch,
  sortedByRate,
  sortedByLanguages,
  sortedByReview,
} from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'

import { CardTutor, SearchBarTutor, FilterTutor } from '../layouts'
import { ButtonDropdownLocation } from '../components'

import { Loader, MessageContainer, MessageMinimized } from '../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import useUser from '../hooks/useUser'
import NavUserSearch from '../components/NavUserSearch'
import { SocketContext } from '../socket/context'

const SearchPage = () => {
  const tutors = useSelector((state) => state.tutors.tutors)

  const [isLoading, setIsLoading] = useState(true)
  const [tutorFavorites, setTutorFavorites] = useState([])
  const socket = useContext(SocketContext)
  const user = useUser()

  useEffect(() => {
    if (user) {
      socket.on('setFavorites', (data) => {
        setTutorFavorites(data.tutorFavorites)
      })
      socket.emit('getFavorites', { userId: user.id })
    }
  }, [user])

  const [showMessage, setShowMessage] = useState(false)
  const [selectedTutor, setSelectedTutor] = useState(null)

  const handleShowMessage = (e, tutor) => {
    e.preventDefault()
    if (selectedTutor === null) {
      setSelectedTutor(tutor?.user ? tutor : { _id: tutor._id, user: tutor })
      setShowMessage(true)
    } else {
      if (selectedTutor._id === tutor._id) {
        setShowMessage(true)
      } else {
        setSelectedTutor(tutor?.user ? tutor : { _id: tutor._id, user: tutor })
        setShowMessage(true)
      }
    }
  }

  const handleMinimizeMessage = (e) => {
    e.preventDefault()
    setShowMessage(false)
    socket.emit('closeChat', {
      userId: user.id,
      receiverId: selectedTutor.user._id,
    })
  }

  const handleMaximizeMessage = (e) => {
    e.preventDefault()
    setShowMessage(true)
  }

  const handleCloseMessage = (e) => {
    e.preventDefault()
    setShowMessage(false)
    setSelectedTutor(null)
    socket.emit('closeChat', {
      userId: user.id,
      receiverId: selectedTutor.user._id,
    })
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

  const handlePage = (number) => {
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
        end: pageNumbers.length + 1,
      }
    } else {
      return { start: currentPage - ceiling + 1, end: currentPage + floor + 1 }
    }
  }
  const pagesCutted = getPagesCut(pageNumbers, pagesCutCount, currentPage)
  const pages = pageNumbers.slice(pagesCutted.start - 1, pagesCutted.end - 1)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!tutors.length) {
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

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <div className="max-lg:w-full dark:bg-gray-900">
      <div className="sticky top-0 z-[100]">
        <NavUserSearch
          user={user}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          handleShowMessage={handleShowMessage}
        />
      </div>

      <div className="bg-transparent max-lg:px-3 mt-2 lg:mt-16 flex flex-col max-lg:items-center items-start pt-1 gap-2 w-full h-full left-0 right-0 dark:bg-gray-900 min-h-screen">
        <SearchBarTutor />
        <div className="bg-gray-50 dark:bg-gray-900 flex items-start lg:px-20 lg:py-10  w-full h-max left-0 right-0">
          <FilterTutor
            sortedByLanguages={sortedByLanguages}
            sortedByReview={sortedByReview}
          />
          <div className="w-full lg:ml-12 flex flex-col relative z-0">
            {isLoading && (
              <div className="flex justify-center items-center">
                <Loader />
              </div>
            )}
            {!isLoading && (
              <>
                <div className="flex items-center lg:justify-between justify-end">
                  <h2 className=" font-inter font-bold leading-150 lg:text-xl text-black dark:text-codecolor text-left max-lg:hidden">
                    {tutors.length === 0
                      ? ''
                      : tutors.length === 1
                      ? '1 programador encontrado'
                      : `${tutors.length} programadores encontrados`}
                  </h2>
                  <div className="pb-5 relative inline-block text-left">
                    <div>
                      <ButtonDropdownLocation />
                    </div>
                  </div>
                </div>
                {tutors.length === 0 && (
                  <div className="flex justify-center items-center mt-40">
                    <h1 className="text-xl dark:text-gray-200 font-semibold">
                      No se encontraron programadores.
                    </h1>
                  </div>
                )}

                {currentTutors.map((tutor) => (
                  <CardTutor
                    key={tutor._id}
                    tutor={tutor}
                    handleShowMessage={handleShowMessage}
                    user={user}
                    tutorFavorites={tutorFavorites}
                  />
                ))}

                {tutors.length > currentTutors.length && (
                  <>
                    <div className="flex justify-center items-center">
                      <div className="flex justify-center items-center max-lg:flex-wrap">
                        <button
                          onClick={handlePreviusPage}
                          className={
                            currentPage === 1
                              ? 'rounded-l bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default max-lg:my-1 max-lg:px-2 max-lg:py-1'
                              : 'rounded-l bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer max-lg:my-1 max-lg:px-2 max-lg:py-1'
                          }
                        >
                          <FontAwesomeIcon icon={faArrowLeft} />
                        </button>

                        {pages.map((number) => (
                          <button
                            key={number}
                            onClick={() => handlePage(number)}
                            className={
                              currentPage === number
                                ? 'bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
                                : 'bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
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
                                ? 'rounded-r bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
                                : 'rounded-r bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
                            }
                          >
                            <FontAwesomeIcon icon={faArrowRight} />
                          </button>
                        </>
                      </div>
                    </div>
                    <p className="text-codecolor font-bold max-lg:text-sm text-md mt-3">
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
