import { useDispatch, useSelector } from 'react-redux'
import { FlechaFiltro, LineasFiltro } from '../../assets'
import { sortedByLocation } from '../../redux/features/tutors/tutorsSlice'

import { useEffect } from 'react'

const ButtonDropdownLocation = () => {
<<<<<<< HEAD
  const locations = useSelector((state) => state.tutors.locations)
=======
  const locations = useSelector(state => state.tutors.locations)
  const selectedLocation = useSelector(state => state.tutors.location)
>>>>>>> 7fbb65612b2834324d6185290062ab970902d5ef
  const dispatch = useDispatch()

  const menu = document.querySelector('.origin-top-right')

  const handleFilterByLocation = (location) => {
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
        type="button"
        id="dropdown-menu-button"
        aria-haspopup="true"
        aria-expanded="false"
        className="inline-flex justify-center items-center pb-4 pt-4 pr-2 w-full rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor"
      >
        <img src={LineasFiltro} />
<<<<<<< HEAD
        <span className="pr-5">Filtrar por país</span>
=======
        <span className='pr-5 ml-2'>
          {selectedLocation === ''
            ? 'Filtrar por país'
            : selectedLocation.charAt(0).toUpperCase() +
              selectedLocation.slice(1)}
        </span>
>>>>>>> 7fbb65612b2834324d6185290062ab970902d5ef
        <img src={FlechaFiltro} />
      </button>

      <div
        className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden z-10"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          {/*Inicio map */}
          <button
            role="menuitem"
            tabIndex="-1"
            onClick={() => handleFilterByLocation('Todos')}
            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor"
          >
            Todos
          </button>
          {locations.map((location) => (
            <button
              role="menuitem"
              tabIndex="-1"
              key={location}
              onClick={() => handleFilterByLocation(location)}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor"
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
