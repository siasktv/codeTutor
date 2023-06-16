import { Lupa } from '../../assets'
import { sortedBySearch } from '../../redux/features/tutors/tutorsSlice'
import { useDispatch, useSelector } from 'react-redux'

const SearchBarTutor = () => {
  const dispatch = useDispatch()
  const currentSearch = useSelector(state => state.tutors.currentSearch)

  const handleSearch = e => {
    dispatch(sortedBySearch(e.target.value))
  }

  return (
    <div>
      <div className='flex flex-col items-start p-0 gap-4 w-1312 h-219'>
        <h1 className='w-830 h-84 font-inter font-bold text-5xl leading-1.5 text-black'>
          Encuentra <span className='inline text-codecolor'>programadores</span>{' '}
          hoy
        </h1>
        <h2 className='w-685 h-27 font-inter font-normal text-base leading-7 text-black'>
          Encuentra programadores listos para ayudarte con el desarrollo de tu
          aplicación.
        </h2>
        <div className='flex w-full'>
          <form className='flex items-center w-full'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <img src={Lupa} />
              </div>
              <input
                type='text'
                id='simple-search'
                required=''
                onChange={handleSearch}
                value={currentSearch}
                className='p-2 pl-10 pr-10  text-sm box-border flex flex-row items-center w-full h-12 bg-white border border-gray-200 rounded-l text-black'
              />
            </div>
          </form>
          <button
            type='button'
            className='pl-10 pr-10 flex flex-row items-center justify-center w-50 h-12 bg-codecolor text-white rounded-r rounded-l-none transition duration-1 ease-in-out transform  active:outline-none focus:outline-none'
          >
            Buscar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchBarTutor
