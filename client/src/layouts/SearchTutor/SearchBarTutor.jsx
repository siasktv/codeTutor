import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Lupa } from '../../assets'
import { sortedBySearch } from '../../redux/features/tutors/tutorsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const SearchBarTutor = () => {
  const dispatch = useDispatch()
  const currentSearch = useSelector(state => state.tutors.currentSearch)

  const handleSearch = e => {
    dispatch(sortedBySearch(e.target.value))
  }

  return (
    <div className='max-lg:w-full max-lg:px-3'>
      <div className='flex flex-col items-start lg:px-20 gap-4 w-full h-full lg:pb-8'>
        <h1 className='max-lg:hidden w-830 font-inter font-bold text-4xl leading-1.5 dark:text-gray-200 text-black'>
          Encuentra <span className='inline text-codecolor'>programadores</span>{' '}
          hoy
        </h1>
        <h2 className='max-lg:hidden w-685 h-8 font-inter font-normal text-base dark:text-gray-400 text-black'>
          Encuentra programadores listos para ayudarte con el desarrollo de tu
          aplicación.
        </h2>
        <h1 className='lg:hidden self-center text-sm leading-1.5 dark:text-gray-400 text-gray-800 text-center'>
          Encuentra programadores listos para ayudarte
        </h1>
        <div className='flex w-full max-lg:justify-center'>
          <form className='flex items-center w-full max-lg:justify-center'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <FontAwesomeIcon
                  icon={faSearch}
                  className='text-black dark:text-gray-200'
                />
              </div>
              <input
                type='text'
                id='simple-search'
                required=''
                placeholder='Buscar'
                onChange={handleSearch}
                value={currentSearch}
                className='p-2 pl-10 pr-10 rounded-r-none dark:bg-gray-900 dark:text-gray-200 dark:border-gray-600 dark:outline-none text-sm box-border flex flex-row items-center w-full h-10 bg-white border border-gray-200 rounded-l text-black'
              />
            </div>
          </form>
          <button
            type='button'
            className='pl-10 pr-10 flex flex-row items-center justify-center w-28 h-10 bg-codecolor text-white rounded-r rounded-l-none transition duration-1 ease-in-out transform  active:outline-none focus:outline-none'
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBarTutor
