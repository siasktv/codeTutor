import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {tutorsFetch} from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import useUser from '../hooks/useUser'
import { CardTutor} from '../layouts'
import {MessageContainer, MessageMinimized } from '../components'

const UserDashboardCards = () => {
const [isLoading, setIsLoading] = useState(true)
const tutors = useSelector(state => state.tutors.tutors)
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


    return(
        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
        <>
                <div className='bg-white w-full h-20 rounded-b-none rounded-xl border border-b-0 flex justify-start '>
                <button className='w-40 h-12 bg-[#EDEBFA] relative left-20 mt-8 rounded-md rounded-b-none hover:bg-codecolor hover:text-white text-codecolor font-semibold'>
                
                    Destacados
                
                </button>
                <button className='w-40 h-12 bg-[#EDEBFA] relative left-28 mt-8 rounded-md rounded-b-none hover:bg-codecolor hover:text-white text-codecolor font-semibold '>
                Favoritos
                </button>
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
        </div>

        
    );
};
export default UserDashboardCards;