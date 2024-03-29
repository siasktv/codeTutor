import { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { tutorsFetch } from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import useUser from '../hooks/useUser'
import { CardTutor } from '../layouts'
import { Loader } from '../components'
import classNames from 'classnames'
import { SocketContext, socket } from '../socket/context'

const Tab = ({ active, children, ...props }) => (
  <button
    {...props}
    className={classNames(
      'lg:w-40 w-[46%] lg:h-12 h-10 relative lg:left-2 lg:mt-8 mt-4 rounded-md rounded-b-none font-semibold bg-[#EDEBFA] dark:bg-gray-700 dark:text-gray-200 hover:bg-codecolor hover:text-white text-codecolor',
      {
        'bg-codecolor dark:bg-[#7F56D9!important] text-white': active,
        'text-gray-600 hover:text-gray-600 hover:bg-gray-200 bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-200':
          props.disabled
      }
    )}
  >
    {children}
  </button>
)

const UserDashboardCards = ({
  userMongo,
  handleShowMessage,
  setSelectedViewTutors
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const tutors = useSelector(state => state.tutors.tutors)
  const user = useUser()

  const [view, setView] = useState('featured')

  const [tutorFavorites, setTutorFavorites] = useState([])

  useEffect(() => {
    if (user) {
      socket.on('setFavorites', data => {
        setTutorFavorites(data.tutorFavorites)
      })
      socket.emit('getFavorites', { userId: user.id })
    }
  }, [user])

  const setFeatured = () => setView('featured')
  const setFavorites = () => setView('favorites')
  const filterByFavs = tutor => {
    if (view !== 'favorites') return true
    return userMongo.favoritesTutor.find(({ _id }) => tutor._id === _id)
  }

  useEffect(() => {
    if (view === 'favorites' && userMongo.favoritesTutor.length === 0)
      setView('featured')
  }, [userMongo])

  const tutorsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)
  const [currentFavoritesPage, setCurrentFavoritesPage] = useState(1)
  const indexOfLastTutor = tutorsPerPage * currentPage
  const indexOfLastFavoriteTutor = tutorsPerPage * currentFavoritesPage
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage
  const indexOfFirstFavoriteTutor = indexOfLastFavoriteTutor - tutorsPerPage
  const currentTutors = [...tutors.slice(indexOfFirstTutor, indexOfLastTutor)]
  const currentFavoriteTutors = [
    ...tutorFavorites.slice(indexOfFirstFavoriteTutor, indexOfLastFavoriteTutor)
  ]

  useEffect(() => {
    if (view === 'featured') {
      setSelectedViewTutors('featured')
    } else {
      setSelectedViewTutors('favorites')
    }
  }, [view])

  useEffect(() => {
    //scroll to top on route change
    window.scrollTo(0, 0)
  }, [currentPage, currentFavoritesPage])

  const pageNumbers = []
  const pageNumbersFavorites = []
  for (let i = 1; i <= Math.ceil(tutors.length / tutorsPerPage); i++) {
    pageNumbers.push(i)
  }
  for (let i = 1; i <= Math.ceil(tutorFavorites.length / tutorsPerPage); i++) {
    pageNumbersFavorites.push(i)
  }
  const handlePreviusPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const handlePreviusFavoritesPage = () => {
    if (currentFavoritesPage > 1) {
      setCurrentFavoritesPage(currentFavoritesPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleNextFavoritesPage = () => {
    if (currentFavoritesPage < pageNumbersFavorites.length) {
      setCurrentFavoritesPage(currentFavoritesPage + 1)
    }
  }

  const handlePage = number => {
    setCurrentPage(number)
  }

  const handleFavoritesPage = number => {
    setCurrentFavoritesPage(number)
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
  const getPagesCutFavorites = (
    pageNumbersFavorites,
    pagesCutCount,
    currentFavoritesPage
  ) => {
    const ceiling = Math.ceil(pagesCutCount / 2)
    const floor = Math.floor(pagesCutCount / 2)
    if (pageNumbersFavorites.length < pagesCutCount) {
      return { start: 1, end: pageNumbersFavorites.length + 1 }
    } else if (currentFavoritesPage >= 1 && currentFavoritesPage <= ceiling) {
      return { start: 1, end: pagesCutCount + 1 }
    } else if (currentFavoritesPage + floor >= pageNumbersFavorites.length) {
      return {
        start: pageNumbersFavorites.length - pagesCutCount + 1,
        end: pageNumbersFavorites.length + 1
      }
    } else {
      return {
        start: currentFavoritesPage - ceiling + 1,
        end: currentFavoritesPage + floor + 1
      }
    }
  }

  const pagesCutted = getPagesCut(pageNumbers, pagesCutCount, currentPage)
  const pagesCuttedFavorites = getPagesCutFavorites(
    pageNumbersFavorites,
    pagesCutCount,
    currentFavoritesPage
  )
  const pages = pageNumbers.slice(pagesCutted.start - 1, pagesCutted.end - 1)
  const pagesFavorites = pageNumbersFavorites.slice(
    pagesCuttedFavorites.start - 1,
    pagesCuttedFavorites.end - 1
  )

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

  useEffect(() => {
    if (view === 'favorites' && !tutorFavorites.length) {
      setView('featured')
    }
  })

  return (
    <>
      {!isLoading && (
        <div className='relative items-center w-full lg:px-8 lg:pb-8 p-2'>
          <>
            <div className=' w-full gap-2 rounded-b-none rounded-xl flex justify-start max-lg:justify-center'>
              <Tab onClick={setFeatured} active={view === 'featured'}>
                Destacados
              </Tab>
              <Tab
                onClick={setFavorites}
                disabled={!tutorFavorites.length}
                active={view === 'favorites'}
              >
                Favoritos
              </Tab>
            </div>
            {tutors.length === 0 && view === 'featured' && (
              <div className='flex justify-center items-center mt-40'>
                <h1 className='lg:text-2xl dark:text-gray-200 text-xl font-semibold'>
                  No se encontraron programadores.
                </h1>
              </div>
            )}
            {view === 'featured' && (
              <>
                {currentTutors.map(tutor => (
                  <CardTutor
                    setFavorites={setFavorites}
                    key={tutor._id}
                    tutor={tutor}
                    handleShowMessage={handleShowMessage}
                    user={user}
                    tutorFavorites={tutorFavorites}
                  />
                ))}
              </>
            )}
            {view === 'favorites' && (
              <>
                {currentFavoriteTutors.map(tutor => (
                  <CardTutor
                    setFavorites={setFavorites}
                    key={tutor._id}
                    tutor={tutor}
                    handleShowMessage={handleShowMessage}
                    user={user}
                    tutorFavorites={tutorFavorites}
                  />
                ))}
              </>
            )}

            {view === 'featured' && tutors.length > currentTutors.length && (
              <>
                <div className='flex justify-center items-center'>
                  <div className='flex justify-center items-center'>
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

                    {pages.map(number => (
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
                <p className='text-codecolor max-lg:text-sm max-lg:mt-2 font-bold text-md mt-3'>
                  {pageNumbers.length} páginas en total
                </p>
              </>
            )}
            {view === 'favorites' &&
              tutorFavorites.length > currentFavoriteTutors.length && (
                <>
                  <div className='flex justify-center items-center'>
                    <div className='flex justify-center items-center'>
                      <button
                        onClick={handlePreviusFavoritesPage}
                        className={
                          currentFavoritesPage === 1
                            ? 'rounded-l bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default max-lg:my-1 max-lg:px-2 max-lg:py-1'
                            : 'rounded-l bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer max-lg:my-1 max-lg:px-2 max-lg:py-1'
                        }
                      >
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </button>

                      {pagesFavorites.map(number => (
                        <button
                          key={number}
                          onClick={() => handleFavoritesPage(number)}
                          className={
                            currentFavoritesPage === number
                              ? 'bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
                              : 'bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
                          }
                        >
                          {number}
                        </button>
                      ))}
                      <>
                        <button
                          onClick={handleNextFavoritesPage}
                          className={
                            currentFavoritesPage === pageNumbersFavorites.length
                              ? 'rounded-r bg-codecolordark border border-codecolordark text-white font-bold py-2 px-4 cursor-default ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
                              : 'rounded-r bg-codecolor border border-codecolor text-white font-bold py-2 px-4 hover:bg-codecolordark hover:border-codecolordark transition-all duration-300 cursor-pointer ml-1 max-lg:my-1 max-lg:px-2 max-lg:py-1'
                          }
                        >
                          <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                      </>
                    </div>
                  </div>
                  <p className='text-codecolor max-lg:text-sm max-lg:mt-2 font-bold text-md mt-3'>
                    {pageNumbersFavorites.length} páginas en total
                  </p>
                </>
              )}
          </>
        </div>
      )}
      {isLoading && (
        <div className='flex justify-center items-center mt-40'>
          <Loader />
        </div>
      )}
    </>
  )
}
export default UserDashboardCards
