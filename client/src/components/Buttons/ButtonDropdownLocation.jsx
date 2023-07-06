import { useDispatch, useSelector } from 'react-redux'
import { FlechaFiltro, LineasFiltro } from '../../assets'
import { sortedByLocation } from '../../redux/features/tutors/tutorsSlice.js'

import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faGlobe } from '@fortawesome/free-solid-svg-icons'

const ButtonDropdownLocation = () => {
  const locations = useSelector(state => state.tutors.locations)
  const selectedLocation = useSelector(state => state.tutors.location)
  const dispatch = useDispatch()
  const menu = document.querySelector('.origin-top-right')

  const handleFilterByLocation = location => {
    dispatch(sortedByLocation(location))
    menu.classList.toggle('hidden')
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
      <button
        type='button'
        id='dropdown-menu-button'
        aria-haspopup='true'
        aria-expanded='false'
        className='inline-flex justify-center items-center lg:pb-4 lg:pt-4 pr-2 w-full rounded border border-gray-300 shadow-sm px-2 lg:px-4 py-3 lg:py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none dark:bg-gray-800 dark:text-gray-200 dark:border-none dark:hover:bg-gray-700 '
      >
        <FontAwesomeIcon
          icon={faGlobe}
          className='text-black dark:text-gray-200'
        />
        <span className='lg:pr-5 pr-1 ml-2'>
          {selectedLocation === ''
            ? 'Filtrar por país'
            : selectedLocation.charAt(0).toUpperCase() +
              selectedLocation.slice(1)}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className='text-black dark:text-gray-200'
        />
      </button>

      <div
        className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg dark:bg-gray-800 bg-white ring-1 ring-black ring-opacity-5 hidden z-10'
        role='menu'
        aria-orientation='vertical'
        aria-labelledby='dropdown-menu-button'
        tabIndex='-1'
      >
        <div className='py-1 max-h-96 overflow-auto' role='none'>
          {/*Inicio map */}
          <button
            role='menuitem'
            tabIndex='-1'
            onClick={() => handleFilterByLocation('Todos')}
            className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          >
            Todos
          </button>
          {locations.map(location => (
            <button
              role='menuitem'
              tabIndex='-1'
              key={location}
              onClick={() => handleFilterByLocation(location)}
              className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
            >
              {location}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ButtonDropdownLocation
