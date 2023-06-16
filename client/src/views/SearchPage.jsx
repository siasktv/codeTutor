/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  tutorsFetch,
  sortedByRate,
  sortedByLanguages
} from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'
import { techesFetch } from '../redux/features/teches/techesSlice'
import { tutorFetchById } from '../redux/features/tutors/tutorsSlice'
import { sortedByTech } from '../redux/features/tutors/tutorsSlice'
import { Star, MensajeTexto } from '../assets'

import { CardTutor, SearchBarTutor, FilterTutor } from '../layouts'
import { ButtonDropdownLocation } from '../components'
import Dropdown from '../components/Buttons/Dropdown'
import { Loader } from '../components'
import { Link } from 'react-router-dom'

const SearchPage = () => {
  const tutors = useSelector(state => state.tutors.tutors)
  const users = useSelector(state => state.users.users)
  const teches = useSelector(state => state.teches.teches)
  const categories = useSelector(state => state.teches.categories)
  const selectedTech = useSelector(state => state.tutors.selectedTech)
  const [isLoading, setIsLoading] = useState(true)
  // console.log('tutors', tutors)
  // console.log('users', users)
  // console.log('locations', locations)
  // console.log('teches', teches)
  // console.log('categories', categories)
  // console.log('selectedTech', selectedTech)
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
    }
  }, [tutors])

  // const handleLocationChange = () => {
  //   dispatch(sortedByLocation('Argentina'))
  // }

  // useEffect(() => {
  //   const button = document.getElementById('dropdown-menu-button')
  //   const menu = document.querySelector('.origin-top-right')

  //   const handleClick = () => {
  //     menu.classList.toggle('hidden')
  //   }

  //   button.addEventListener('click', handleClick)

  //   return () => {
  //     button.removeEventListener('click', handleClick)
  //   }
  // }, [])

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
      <div className='bg-white flex flex-col justify-center items-start p-20 gap-2 absolute w-1440 h-379 left-0 right-0'>
        <SearchBarTutor />
        <div className='bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0 top-72'>
          <FilterTutor sortedByLanguages={sortedByLanguages} />
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
                    {tutors.length} Programadores
                  </h2>
                  <div className='pb-5 relative inline-block text-left'>
                    <div>
                      <ButtonDropdownLocation />
                    </div>
                  </div>
                </div>
                {tutors.map(tutor => (
                  <Link to={`/tutor/${tutor._id}`} key={tutor._id}>
                    <CardTutor key={tutor._id} tutor={tutor} />
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
