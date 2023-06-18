/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux'
import { RangeBar } from '../../components'

const FilterTutor = ({ sortedByLanguages }) => {
  const dispatch = useDispatch()
  const handleLanguageChange = event => {
    dispatch(sortedByLanguages(event.target.value))
  }
  return (
    <div>
      <div className='box-border border w-64 h-max left-79 top-516 pb-10 bg-white border-1 border-gray-100 shadow-md'>
        <div className='flex flex-col items-start pt-10 pl-10 pr-10 gap-30'>
          <h2 className='w-62 h-30 font-inter font-bold leading-150 text-xl text-black'>
            Filtros
          </h2>
          <h2 className='w-62 h-30 font-inter font-semibold leading-150 text-black pt-6'>
            Tarifa por hora
          </h2>
        </div>
        <RangeBar />
        <div className='flex flex-col items-start pt-2 pl-10 pr-10 gap-30'>
          <h2 className='w-62 h-30 font-inter font-semibold leading-150 text-black pt-6'>
            Review
          </h2>
          <ul className='w-48 text-sm font-medium text-black'>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='todosreviews'
                  type='radio'
                  value='Todos'
                  name='list-review'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                />
                <label
                  htmlFor='todosreviews'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  Todos
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='star5'
                  type='radio'
                  value=''
                  name='list-review'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                />
                <label
                  htmlFor='star5'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  5 estrellas
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='star4'
                  type='radio'
                  value=''
                  name='list-review'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                />
                <label
                  htmlFor='star4'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  4 estrellas
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='star3'
                  type='radio'
                  value=''
                  name='list-review'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                />
                <label
                  htmlFor='star3'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  3 estrellas
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='star2'
                  type='radio'
                  value=''
                  name='list-review'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                />
                <label
                  htmlFor='star2'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  2 estrellas
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='star1'
                  type='radio'
                  value=''
                  name='list-review'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                />
                <label
                  htmlFor='star1'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  1 estrellas
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div className='flex flex-col items-start pt-2 pl-10 pr-10 gap-30'>
          <h2 className='w-62 h-30 font-inter font-semibold leading-150 text-black pt-6'>
            Idioma
          </h2>
          <ul className='w-48 text-sm font-medium text-black'>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='todoslangs'
                  type='radio'
                  value='Todos'
                  name='list-language'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor='todoslangs'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  Todos
                </label>
              </div>
            </li>

            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='espanol'
                  type='radio'
                  value='Español'
                  name='list-language'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor='espanol'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  Español
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='ingles'
                  type='radio'
                  value='Ingles'
                  name='list-language'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor='ingles'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  Inglés
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='portugues'
                  type='radio'
                  value='Portugues'
                  name='list-language'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor='portugues'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  Portugués
                </label>
              </div>
            </li>
            <li className='w-full'>
              <div className='flex items-center'>
                <input
                  id='frances'
                  type='radio'
                  value='Frances'
                  name='list-language'
                  className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                  onChange={handleLanguageChange}
                />
                <label
                  htmlFor='frances'
                  className='py-3 ml-2 text-sm font-medium text-black'
                >
                  Francés
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default FilterTutor
