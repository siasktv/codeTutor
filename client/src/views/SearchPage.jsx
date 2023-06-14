import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tutorsFetch } from '../redux/features/tutors/tutorsSlice'
import { usersFetch } from '../redux/features/users/usersSlice'

const SearchPage = () => {
  const tutors = useSelector(state => state.tutors.tutors)
  const users = useSelector(state => state.users.users)
  console.log('tutors', tutors)
  console.log('users', users)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(tutorsFetch())
    dispatch(usersFetch())
  }, [])

  const [rating, setRating] = useState(0)

  const handleInputChange = e => {
    setRating(e.target.value)
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
      <div className='bg-white flex flex-col justify-center items-start p-20 gap-2 absolute w-1440 h-379 left-0 right-0'>
        <div className='flex flex-col items-start p-0 gap-4 w-1312 h-219'>
          <h1 className='w-830 h-84 font-inter font-semibold text-5xl leading-1.5 text-black'>
            Encuentra{' '}
            <span className='inline text-codecolor'>programadores</span> hoy
          </h1>
          <h2 className='w-685 h-27 font-inter font-normal text-base leading-7 text-black'>
            Encuentra programadores listos para ayudarte con el desarrollo de tu
            aplicación.
          </h2>
          <div className='flex w-full'>
            <form className='flex items-center w-full'>
              <div className='relative w-full'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5 text-gray-500 dark:text-gray-400'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  type='text'
                  id='simple-search'
                  required=''
                  className='p-2 pl-10 pr-10  text-sm box-border flex flex-row items-center w-full h-12 bg-white border border-gray-200 rounded-l text-black'
                />
              </div>
            </form>
            <button
              type='button'
              className='pl-10 pr-10 flex flex-row items-center justify-center w-50 h-12 bg-codecolor text-white rounded-r rounded-l-none transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
            >
              Buscar
            </button>
          </div>
        </div>
        <div className='bg-gray-100 flex items-start p-20 gap-2 absolute w-full h-max left-0 right-0 top-72'>
          <div className='box-border border w-64 h-max left-79 top-516 pb-10 bg-white border-1 border-gray-100 shadow-md'>
            <div className='flex flex-col items-start pt-10 pl-10 pr-10 gap-30'>
              <h2 className='w-62 h-30 font-inter font-bold leading-150 text-xl text-black'>
                Filtros
              </h2>
              <h2 className='w-62 h-30 font-inter font-semibold leading-150 text-black pt-6'>
                Tarifa por hora
              </h2>
            </div>
            <div className='flex flex-col items-center pl-10 pr-10 gap-30'>
              <input
                type='range'
                name='rating'
                min='0'
                max='80'
                step='1'
                className='box-border flex flex-row p-0 w-full h-12 border-0.5 accent-codecolor'
                style={{ '--thumb-color': 'transparent' }}
                value={rating}
                onChange={handleInputChange}
              />
              <label
                className='aling-center'
                htmlFor='range'
              >{`$${rating}-$80`}</label>
            </div>
            <div className='flex flex-col items-start pt-2 pl-10 pr-10 gap-30'>
              <h2 className='w-62 h-30 font-inter font-semibold leading-150 text-black pt-6'>
                Nivel
              </h2>
              <ul className='w-48 text-sm font-medium text-black'>
                <li className='w-full'>
                  <div className='flex items-center'>
                    <input
                      id='junior'
                      type='radio'
                      value=''
                      name='list-level'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                    />
                    <label
                      htmlFor='junior'
                      className='py-3 ml-2 text-sm font-medium text-black'
                    >
                      Junior
                    </label>
                  </div>
                </li>
                <li className='w-full'>
                  <div className='flex items-center'>
                    <input
                      id='semiSenior'
                      type='radio'
                      value=''
                      name='list-level'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                    />
                    <label
                      htmlFor='semiSenior'
                      className='py-3 ml-2 text-sm font-medium text-black'
                    >
                      Semi-Senior
                    </label>
                  </div>
                </li>
                <li className='w-full'>
                  <div className='flex items-center'>
                    <input
                      id='senior'
                      type='radio'
                      value=''
                      name='list-level'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                    />
                    <label
                      htmlFor='senior'
                      className='py-3 ml-2 text-sm font-medium text-black'
                    >
                      Senior
                    </label>
                  </div>
                </li>
                <li className='w-full'>
                  <div className='flex items-center'>
                    <input
                      id='senior+'
                      type='radio'
                      value=''
                      name='list-level'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                    />
                    <label
                      htmlFor='senior+'
                      className='py-3 ml-2 text-sm font-medium text-black'
                    >
                      Senior+
                    </label>
                  </div>
                </li>
              </ul>
            </div>
            <div className='flex flex-col items-start pt-2 pl-10 pr-10 gap-30'>
              <h2 className='w-62 h-30 font-inter font-semibold leading-150 text-black pt-6'>
                Review
              </h2>
              <ul className='w-48 text-sm font-medium text-black'>
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
                      id='espanol'
                      type='radio'
                      value=''
                      name='list-language'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
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
                      value=''
                      name='list-language'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
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
                      value=''
                      name='list-language'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
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
                      id='aleman'
                      type='radio'
                      value=''
                      name='list-language'
                      className='w-4 h-4 text-codecolor bg-gray-100 border-gray-300 focus:ring-purple-500'
                    />
                    <label
                      htmlFor='aleman'
                      className='py-3 ml-2 text-sm font-medium text-black'
                    >
                      Alemán
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full p-9 flex flex-col relative z-0'>
            <div className='flex items-center justify-between'>
              <h2 className='pb-10 h-30 font-inter font-bold leading-150 text-2xl text-black text-left'>
                10 Programadores
              </h2>
              <div className='pb-5 relative inline-block text-left'>
                <div>
                  <button
                    type='button'
                    id='dropdown-menu-button'
                    aria-haspopup='true'
                    aria-expanded='false'
                    className='inline-flex justify-center items-center pb-4 pt-4 pr-2 w-full rounded border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-codecolor'
                  >
                    <svg
                      className='-ml-1 mr-2 h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 25'
                      fill='none'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M5.25 12.5C5.25 12.0858 5.58579 11.75 6 11.75H18C18.4142 11.75 18.75 12.0858 18.75 12.5C18.75 12.9142 18.4142 13.25 18 13.25H6C5.58579 13.25 5.25 12.9142 5.25 12.5Z'
                        fill='#141414'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M1.5 8C1.5 7.58579 1.83579 7.25 2.25 7.25H21.75C22.1642 7.25 22.5 7.58579 22.5 8C22.5 8.41421 22.1642 8.75 21.75 8.75H2.25C1.83579 8.75 1.5 8.41421 1.5 8Z'
                        fill='#141414'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M9 17C9 16.5858 9.33579 16.25 9.75 16.25H14.25C14.6642 16.25 15 16.5858 15 17C15 17.4142 14.6642 17.75 14.25 17.75H9.75C9.33579 17.75 9 17.4142 9 17Z'
                        fill='#141414'
                      />
                    </svg>
                    <span className='pr-5'>Filtrar por país</span>
                    <svg
                      className='-mr-1 ml-2 h-5 w-5'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M10 12a1 1 0 0 1-.707-.293l-4-4a1 1 0 1 1 1.414-1.414L10 9.586l3.293-3.293a1 1 0 0 1 1.414 1.414l-4 4A1 1 0 0 1 10 12z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </button>
                </div>
                <div
                  className='origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden z-10'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='dropdown-menu-button'
                  tabIndex='-1'
                >
                  <div className='py-1' role='none'>
                    <button
                      role='menuitem'
                      tabIndex='-1'
                      id='dropdown-menu-item-1'
                      className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor'
                    >
                      Argentina
                    </button>

                    <button
                      role='menuitem'
                      tabIndex='-1'
                      id='dropdown-menu-item-2'
                      className='block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-codecolor'
                    >
                      Colombia
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='pb-5'>
              <div className='flex p-9 justify-between bg-white border border-gray-200 shadow-md rounded-lg'>
                {/* Imagen de perfil */}
                <div className='w-20 h-20 rounded-full overflow-hidden'>
                  <img
                    src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF_oFhoPdG_gvarQsjy33Dwov47ETNFjw3Sg&usqp=CAU'
                    alt='Imagen de perfil Tutor'
                    className='w-full h-full object-cover'
                  />
                </div>
                {/* Información del tutor */}
                <div className='p-2 w-3/4 h-1/2'>
                  <div className='flex justify-between items-center'>
                    <h2 className='font-semibold'>Barrios Lautaro Gabriel</h2>
                    <h2 className='font-semibold text-sm text-green-500'>
                      ◉ Online
                    </h2>
                  </div>

                  <div className='pt-2 pb-2 flex justify-between items-center'>
                    <h2 className='text-2xl font-medium'>
                      Fullstack Software Engineer
                    </h2>
                    <div className='flex items-center space-x-2'>
                      <svg
                        width='22'
                        height='22'
                        viewBox='0 0 22 22'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M9.57283 1.57795C10.1706 0.140682 12.2067 0.140687 12.8045 1.57795L14.8206 6.42537C14.8566 6.51193 14.938 6.57107 15.0315 6.57856L20.2647 6.9981C21.8163 7.1225 22.4455 9.05889 21.2633 10.0716L17.2761 13.487C17.2049 13.548 17.1738 13.6437 17.1956 13.7348L18.4137 18.8416C18.7749 20.3557 17.1277 21.5524 15.7993 20.7411L11.319 18.0045C11.239 17.9556 11.1383 17.9556 11.0583 18.0045L6.57798 20.7411C5.24956 21.5525 3.60237 20.3557 3.96355 18.8416L5.18169 13.7348C5.20344 13.6437 5.17234 13.548 5.10115 13.487L1.114 10.0716C-0.068189 9.05888 0.560988 7.1225 2.11263 6.9981L7.34583 6.57856C7.43927 6.57107 7.52068 6.51193 7.55668 6.42537L9.57283 1.57795ZM11.4195 2.15399C11.3341 1.94867 11.0432 1.94867 10.9578 2.15399L8.94166 7.00141C8.68965 7.60732 8.11983 8.02132 7.4657 8.07376L2.2325 8.4933C2.01083 8.51108 1.92096 8.7877 2.08984 8.93237L6.07698 12.3478C6.57536 12.7747 6.79301 13.4446 6.64075 14.0829L5.42261 19.1896C5.37101 19.4059 5.60633 19.5769 5.7961 19.461L10.2764 16.7244C10.8365 16.3823 11.5408 16.3823 12.1008 16.7244L16.5812 19.4609C16.771 19.5769 17.0063 19.4059 16.9547 19.1896L15.7365 14.0829C15.5843 13.4446 15.8019 12.7747 16.3003 12.3478L20.2874 8.93237C20.4563 8.7877 20.3665 8.51107 20.1448 8.4933L14.9116 8.07376C14.2575 8.02132 13.6876 7.60732 13.4356 7.00141L11.4195 2.15399Z'
                          fill='#7F56D9'
                        />
                      </svg>
                      <h2 className='font-semibold text-sm text-codecolor'>
                        5.0
                      </h2>
                    </div>
                    <h2 className='font-semibold text-sm text-gray-500'>
                      200 reviews
                    </h2>
                  </div>

                  <div className='flex justify-start items-center'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M3 14.5C3 14.2239 3.22386 14 3.5 14H12.5C12.7761 14 13 14.2239 13 14.5C13 14.7761 12.7761 15 12.5 15H3.5C3.22386 15 3 14.7761 3 14.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8 5C7.17157 5 6.5 5.67157 6.5 6.5C6.5 7.32843 7.17157 8 8 8C8.82843 8 9.5 7.32843 9.5 6.5C9.5 5.67157 8.82843 5 8 5ZM5.5 6.5C5.5 5.11929 6.61929 4 8 4C9.38071 4 10.5 5.11929 10.5 6.5C10.5 7.88071 9.38071 9 8 9C6.61929 9 5.5 7.88071 5.5 6.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8 2C6.80653 2 5.66193 2.47411 4.81802 3.31802C3.97411 4.16193 3.5 5.30653 3.5 6.5C3.5 8.56997 4.65592 10.4548 5.8773 11.8594C6.48189 12.5547 7.08775 13.1152 7.54257 13.5018C7.72245 13.6547 7.87812 13.7799 8 13.875C8.12188 13.7799 8.27755 13.6547 8.45743 13.5018C8.91225 13.1152 9.51812 12.5547 10.1227 11.8594C11.3441 10.4548 12.5 8.56997 12.5 6.5C12.5 5.30653 12.0259 4.16193 11.182 3.31802C10.3381 2.47411 9.19347 2 8 2ZM8 14.5C7.71327 14.9096 7.71313 14.9095 7.71297 14.9094L7.71256 14.9091L7.71139 14.9083L7.70769 14.9057L7.69498 14.8966C7.68417 14.8889 7.66876 14.8778 7.64904 14.8634C7.60962 14.8347 7.55296 14.7927 7.48154 14.7381C7.33874 14.6289 7.13661 14.4692 6.89493 14.2638C6.41225 13.8535 5.76811 13.2578 5.1227 12.5156C3.84408 11.0452 2.5 8.93003 2.5 6.5C2.5 5.04131 3.07946 3.64236 4.11091 2.61091C5.14236 1.57946 6.54131 1 8 1C9.45869 1 10.8576 1.57946 11.8891 2.61091C12.9205 3.64236 13.5 5.04131 13.5 6.5C13.5 8.93003 12.1559 11.0452 10.8773 12.5156C10.2319 13.2578 9.58775 13.8535 9.10507 14.2638C8.86339 14.4692 8.66126 14.6289 8.51846 14.7381C8.44704 14.7927 8.39038 14.8347 8.35096 14.8634C8.33124 14.8778 8.31583 14.8889 8.30502 14.8966L8.29231 14.9057L8.28861 14.9083L8.28744 14.9091L8.28703 14.9094C8.28687 14.9095 8.28673 14.9096 8 14.5ZM8 14.5L8.28673 14.9096C8.11457 15.0301 7.88543 15.0301 7.71327 14.9096L8 14.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                    </svg>
                    <h2 className='font-semibold text-sm text-gray-600'>
                      Argentina
                    </h2>

                    <span className='pl-4 pr-4 font-semibold text-sm text-gray-600'>
                      ◦
                    </span>

                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8 1C8.27614 1 8.5 1.22386 8.5 1.5V14.5C8.5 14.7761 8.27614 15 8 15C7.72386 15 7.5 14.7761 7.5 14.5V1.5C7.5 1.22386 7.72386 1 8 1Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4.62868 3.37868C5.19129 2.81607 5.95435 2.5 6.75 2.5H9C9.39397 2.5 9.78407 2.5776 10.1481 2.72836C10.512 2.87913 10.8427 3.1001 11.1213 3.37868C11.3999 3.65726 11.6209 3.98797 11.7716 4.35195C11.9224 4.71593 12 5.10603 12 5.5C12 5.77614 11.7761 6 11.5 6C11.2239 6 11 5.77614 11 5.5C11 5.23736 10.9483 4.97728 10.8478 4.73463C10.7473 4.49198 10.5999 4.2715 10.4142 4.08579C10.2285 3.90007 10.008 3.75275 9.76537 3.65224C9.52272 3.55173 9.26264 3.5 9 3.5H6.75C6.21957 3.5 5.71086 3.71071 5.33579 4.08579C4.96071 4.46086 4.75 4.96957 4.75 5.5C4.75 6.03043 4.96071 6.53914 5.33579 6.91421C5.71086 7.28929 6.21957 7.5 6.75 7.5H9.5C10.2956 7.5 11.0587 7.81607 11.6213 8.37868C12.1839 8.94129 12.5 9.70435 12.5 10.5C12.5 11.2956 12.1839 12.0587 11.6213 12.6213C11.0587 13.1839 10.2956 13.5 9.5 13.5H6.5C5.70435 13.5 4.94129 13.1839 4.37868 12.6213C3.81607 12.0587 3.5 11.2956 3.5 10.5C3.5 10.2239 3.72386 10 4 10C4.27614 10 4.5 10.2239 4.5 10.5C4.5 11.0304 4.71071 11.5391 5.08579 11.9142C5.46086 12.2893 5.96957 12.5 6.5 12.5H9.5C10.0304 12.5 10.5391 12.2893 10.9142 11.9142C11.2893 11.5391 11.5 11.0304 11.5 10.5C11.5 9.96957 11.2893 9.46086 10.9142 9.08579C10.5391 8.71071 10.0304 8.5 9.5 8.5H6.75C5.95435 8.5 5.19129 8.18393 4.62868 7.62132C4.06607 7.05871 3.75 6.29565 3.75 5.5C3.75 4.70435 4.06607 3.94129 4.62868 3.37868Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                    </svg>

                    <h2 className='font-semibold text-sm text-gray-600'>
                      80-H
                    </h2>

                    <span className='pl-4 pr-4 font-semibold text-sm text-gray-600'>
                      ◦
                    </span>

                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3ZM13 3H3V13H13V3Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M11 1C11.2761 1 11.5 1.22386 11.5 1.5V3.5C11.5 3.77614 11.2761 4 11 4C10.7239 4 10.5 3.77614 10.5 3.5V1.5C10.5 1.22386 10.7239 1 11 1Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M5 1C5.27614 1 5.5 1.22386 5.5 1.5V3.5C5.5 3.77614 5.27614 4 5 4C4.72386 4 4.5 3.77614 4.5 3.5V1.5C4.5 1.22386 4.72386 1 5 1Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2 5.5C2 5.22386 2.22386 5 2.5 5H13.5C13.7761 5 14 5.22386 14 5.5C14 5.77614 13.7761 6 13.5 6H2.5C2.22386 6 2 5.77614 2 5.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                    </svg>
                    <h2 className='font-semibold text-sm text-gray-600'>
                      Español, Portugues
                    </h2>
                  </div>
                  <div className='pt-2 pb-2'>
                    <h2 className='font-semibold text-sm text-left'>
                      Mollit in laborum tempor Lorem incididunt irure. Aute eu
                      ex ad sunt. Pariatur sint culpa do incididunt eiusmod
                      eiusmod culpa. laborum tempor Lorem incididunt.
                    </h2>
                  </div>
                  <div className='pt-2 pb-2'>
                    <div className='grid grid-cols-4 gap-3'>
                      <span className='flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'>
                        Javascript
                      </span>
                      <span className='flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'>
                        Machine Learning
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button Mensage */}
                <button
                  className='flex justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
                  type='button'
                  title='Contactar'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M1.75 6.5C1.75 3.87665 3.87665 1.75 6.5 1.75H17.5C20.1234 1.75 22.25 3.87665 22.25 6.5V12C22.25 14.6234 20.1234 16.75 17.5 16.75H13.7663L7.42786 21.9C6.43412 22.7074 5.01331 21.6761 5.47294 20.4811L6.90798 16.75H6.5C3.87665 16.75 1.75 14.6234 1.75 12V6.5ZM6.5 3.25C4.70507 3.25 3.25 4.70507 3.25 6.5V12C3.25 13.7949 4.70507 15.25 6.5 15.25H7.27199C8.14921 15.25 8.75357 16.13 8.43867 16.9487L7.20943 20.1447L12.8893 15.5299C13.1121 15.3488 13.3904 15.25 13.6775 15.25H17.5C19.2949 15.25 20.75 13.7949 20.75 12V6.5C20.75 4.70507 19.2949 3.25 17.5 3.25H6.5Z'
                      fill='white'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.75 11.3574C6.75 10.9432 7.08579 10.6074 7.5 10.6074H16.5C16.9142 10.6074 17.25 10.9432 17.25 11.3574C17.25 11.7716 16.9142 12.1074 16.5 12.1074H7.5C7.08579 12.1074 6.75 11.7716 6.75 11.3574Z'
                      fill='white'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.75 8C6.75 7.58579 7.08579 7.25 7.5 7.25H12C12.4142 7.25 12.75 7.58579 12.75 8C12.75 8.41421 12.4142 8.75 12 8.75H7.5C7.08579 8.75 6.75 8.41421 6.75 8Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Card repetida */}
            <div className='pb-5'>
              <div className='flex p-9 justify-between bg-white border border-gray-200 shadow-md rounded-lg'>
                {/* Imagen de perfil */}
                <div className='w-20 h-20 rounded-full overflow-hidden'>
                  <img
                    src='https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/02/henry-cavill-2624275.jpg?tf=3840x'
                    alt='Imagen de perfil Tutor'
                    className='w-full h-full object-cover'
                  />
                </div>
                {/* Información del tutor */}
                <div className='p-2 w-3/4 h-1/2'>
                  <div className='flex justify-between items-center'>
                    <h2 className='font-semibold'>Cavill Henry</h2>
                    <h2 className='font-semibold text-sm text-red-500'>
                      ◉ Offline
                    </h2>
                  </div>

                  <div className='pt-2 pb-2 flex justify-between items-center'>
                    <h2 className='text-2xl font-medium'>Backend Developer</h2>
                    <div className='flex items-center space-x-2'>
                      <svg
                        width='22'
                        height='22'
                        viewBox='0 0 22 22'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          fillRule='evenodd'
                          clipRule='evenodd'
                          d='M9.57283 1.57795C10.1706 0.140682 12.2067 0.140687 12.8045 1.57795L14.8206 6.42537C14.8566 6.51193 14.938 6.57107 15.0315 6.57856L20.2647 6.9981C21.8163 7.1225 22.4455 9.05889 21.2633 10.0716L17.2761 13.487C17.2049 13.548 17.1738 13.6437 17.1956 13.7348L18.4137 18.8416C18.7749 20.3557 17.1277 21.5524 15.7993 20.7411L11.319 18.0045C11.239 17.9556 11.1383 17.9556 11.0583 18.0045L6.57798 20.7411C5.24956 21.5525 3.60237 20.3557 3.96355 18.8416L5.18169 13.7348C5.20344 13.6437 5.17234 13.548 5.10115 13.487L1.114 10.0716C-0.068189 9.05888 0.560988 7.1225 2.11263 6.9981L7.34583 6.57856C7.43927 6.57107 7.52068 6.51193 7.55668 6.42537L9.57283 1.57795ZM11.4195 2.15399C11.3341 1.94867 11.0432 1.94867 10.9578 2.15399L8.94166 7.00141C8.68965 7.60732 8.11983 8.02132 7.4657 8.07376L2.2325 8.4933C2.01083 8.51108 1.92096 8.7877 2.08984 8.93237L6.07698 12.3478C6.57536 12.7747 6.79301 13.4446 6.64075 14.0829L5.42261 19.1896C5.37101 19.4059 5.60633 19.5769 5.7961 19.461L10.2764 16.7244C10.8365 16.3823 11.5408 16.3823 12.1008 16.7244L16.5812 19.4609C16.771 19.5769 17.0063 19.4059 16.9547 19.1896L15.7365 14.0829C15.5843 13.4446 15.8019 12.7747 16.3003 12.3478L20.2874 8.93237C20.4563 8.7877 20.3665 8.51107 20.1448 8.4933L14.9116 8.07376C14.2575 8.02132 13.6876 7.60732 13.4356 7.00141L11.4195 2.15399Z'
                          fill='#7F56D9'
                        />
                      </svg>
                      <h2 className='font-semibold text-sm text-codecolor'>
                        4.5
                      </h2>
                    </div>
                    <h2 className='font-semibold text-sm text-gray-500'>
                      19200 reviews
                    </h2>
                  </div>

                  <div className='flex justify-start items-center'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M3 14.5C3 14.2239 3.22386 14 3.5 14H12.5C12.7761 14 13 14.2239 13 14.5C13 14.7761 12.7761 15 12.5 15H3.5C3.22386 15 3 14.7761 3 14.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8 5C7.17157 5 6.5 5.67157 6.5 6.5C6.5 7.32843 7.17157 8 8 8C8.82843 8 9.5 7.32843 9.5 6.5C9.5 5.67157 8.82843 5 8 5ZM5.5 6.5C5.5 5.11929 6.61929 4 8 4C9.38071 4 10.5 5.11929 10.5 6.5C10.5 7.88071 9.38071 9 8 9C6.61929 9 5.5 7.88071 5.5 6.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8 2C6.80653 2 5.66193 2.47411 4.81802 3.31802C3.97411 4.16193 3.5 5.30653 3.5 6.5C3.5 8.56997 4.65592 10.4548 5.8773 11.8594C6.48189 12.5547 7.08775 13.1152 7.54257 13.5018C7.72245 13.6547 7.87812 13.7799 8 13.875C8.12188 13.7799 8.27755 13.6547 8.45743 13.5018C8.91225 13.1152 9.51812 12.5547 10.1227 11.8594C11.3441 10.4548 12.5 8.56997 12.5 6.5C12.5 5.30653 12.0259 4.16193 11.182 3.31802C10.3381 2.47411 9.19347 2 8 2ZM8 14.5C7.71327 14.9096 7.71313 14.9095 7.71297 14.9094L7.71256 14.9091L7.71139 14.9083L7.70769 14.9057L7.69498 14.8966C7.68417 14.8889 7.66876 14.8778 7.64904 14.8634C7.60962 14.8347 7.55296 14.7927 7.48154 14.7381C7.33874 14.6289 7.13661 14.4692 6.89493 14.2638C6.41225 13.8535 5.76811 13.2578 5.1227 12.5156C3.84408 11.0452 2.5 8.93003 2.5 6.5C2.5 5.04131 3.07946 3.64236 4.11091 2.61091C5.14236 1.57946 6.54131 1 8 1C9.45869 1 10.8576 1.57946 11.8891 2.61091C12.9205 3.64236 13.5 5.04131 13.5 6.5C13.5 8.93003 12.1559 11.0452 10.8773 12.5156C10.2319 13.2578 9.58775 13.8535 9.10507 14.2638C8.86339 14.4692 8.66126 14.6289 8.51846 14.7381C8.44704 14.7927 8.39038 14.8347 8.35096 14.8634C8.33124 14.8778 8.31583 14.8889 8.30502 14.8966L8.29231 14.9057L8.28861 14.9083L8.28744 14.9091L8.28703 14.9094C8.28687 14.9095 8.28673 14.9096 8 14.5ZM8 14.5L8.28673 14.9096C8.11457 15.0301 7.88543 15.0301 7.71327 14.9096L8 14.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                    </svg>
                    <h2 className='font-semibold text-sm text-gray-600'>
                      Argentina
                    </h2>

                    <span className='pl-4 pr-4 font-semibold text-sm text-gray-600'>
                      ◦
                    </span>

                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M8 1C8.27614 1 8.5 1.22386 8.5 1.5V14.5C8.5 14.7761 8.27614 15 8 15C7.72386 15 7.5 14.7761 7.5 14.5V1.5C7.5 1.22386 7.72386 1 8 1Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M4.62868 3.37868C5.19129 2.81607 5.95435 2.5 6.75 2.5H9C9.39397 2.5 9.78407 2.5776 10.1481 2.72836C10.512 2.87913 10.8427 3.1001 11.1213 3.37868C11.3999 3.65726 11.6209 3.98797 11.7716 4.35195C11.9224 4.71593 12 5.10603 12 5.5C12 5.77614 11.7761 6 11.5 6C11.2239 6 11 5.77614 11 5.5C11 5.23736 10.9483 4.97728 10.8478 4.73463C10.7473 4.49198 10.5999 4.2715 10.4142 4.08579C10.2285 3.90007 10.008 3.75275 9.76537 3.65224C9.52272 3.55173 9.26264 3.5 9 3.5H6.75C6.21957 3.5 5.71086 3.71071 5.33579 4.08579C4.96071 4.46086 4.75 4.96957 4.75 5.5C4.75 6.03043 4.96071 6.53914 5.33579 6.91421C5.71086 7.28929 6.21957 7.5 6.75 7.5H9.5C10.2956 7.5 11.0587 7.81607 11.6213 8.37868C12.1839 8.94129 12.5 9.70435 12.5 10.5C12.5 11.2956 12.1839 12.0587 11.6213 12.6213C11.0587 13.1839 10.2956 13.5 9.5 13.5H6.5C5.70435 13.5 4.94129 13.1839 4.37868 12.6213C3.81607 12.0587 3.5 11.2956 3.5 10.5C3.5 10.2239 3.72386 10 4 10C4.27614 10 4.5 10.2239 4.5 10.5C4.5 11.0304 4.71071 11.5391 5.08579 11.9142C5.46086 12.2893 5.96957 12.5 6.5 12.5H9.5C10.0304 12.5 10.5391 12.2893 10.9142 11.9142C11.2893 11.5391 11.5 11.0304 11.5 10.5C11.5 9.96957 11.2893 9.46086 10.9142 9.08579C10.5391 8.71071 10.0304 8.5 9.5 8.5H6.75C5.95435 8.5 5.19129 8.18393 4.62868 7.62132C4.06607 7.05871 3.75 6.29565 3.75 5.5C3.75 4.70435 4.06607 3.94129 4.62868 3.37868Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                    </svg>

                    <h2 className='font-semibold text-sm text-gray-600'>
                      8000-H
                    </h2>

                    <span className='pl-4 pr-4 font-semibold text-sm text-gray-600'>
                      ◦
                    </span>

                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 16 16'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2 3C2 2.44772 2.44772 2 3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3ZM13 3H3V13H13V3Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M11 1C11.2761 1 11.5 1.22386 11.5 1.5V3.5C11.5 3.77614 11.2761 4 11 4C10.7239 4 10.5 3.77614 10.5 3.5V1.5C10.5 1.22386 10.7239 1 11 1Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M5 1C5.27614 1 5.5 1.22386 5.5 1.5V3.5C5.5 3.77614 5.27614 4 5 4C4.72386 4 4.5 3.77614 4.5 3.5V1.5C4.5 1.22386 4.72386 1 5 1Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M2 5.5C2 5.22386 2.22386 5 2.5 5H13.5C13.7761 5 14 5.22386 14 5.5C14 5.77614 13.7761 6 13.5 6H2.5C2.22386 6 2 5.77614 2 5.5Z'
                        fill='#141414'
                        fillOpacity='0.7'
                      />
                    </svg>
                    <h2 className='font-semibold text-sm text-gray-600'>
                      Ingles, Español, Portugues
                    </h2>
                  </div>
                  <div className='pt-2 pb-2'>
                    <h2 className='font-semibold text-sm text-left'>
                      Deje el mundo del espectaculo para dedicarme a mi otra
                      pasión...el skate. Ah y también a programar.
                    </h2>
                  </div>
                  <div className='pt-2 pb-2'>
                    <div className='grid grid-cols-4 gap-3'>
                      <span className='flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'>
                        Javascript
                      </span>
                      <span className='flex pt-1 pb-1 h-9 justify-center items-center font-bold text-sm text-codecolor bg-purple-200 rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'>
                        Machine Learning
                      </span>
                    </div>
                  </div>
                </div>

                {/* Button Mensage */}
                <button
                  className='flex justify-center items-center w-16 h-16 bg-codecolor shadow-xl rounded-2xl transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none'
                  type='button'
                  title='Contactar'
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M1.75 6.5C1.75 3.87665 3.87665 1.75 6.5 1.75H17.5C20.1234 1.75 22.25 3.87665 22.25 6.5V12C22.25 14.6234 20.1234 16.75 17.5 16.75H13.7663L7.42786 21.9C6.43412 22.7074 5.01331 21.6761 5.47294 20.4811L6.90798 16.75H6.5C3.87665 16.75 1.75 14.6234 1.75 12V6.5ZM6.5 3.25C4.70507 3.25 3.25 4.70507 3.25 6.5V12C3.25 13.7949 4.70507 15.25 6.5 15.25H7.27199C8.14921 15.25 8.75357 16.13 8.43867 16.9487L7.20943 20.1447L12.8893 15.5299C13.1121 15.3488 13.3904 15.25 13.6775 15.25H17.5C19.2949 15.25 20.75 13.7949 20.75 12V6.5C20.75 4.70507 19.2949 3.25 17.5 3.25H6.5Z'
                      fill='white'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.75 11.3574C6.75 10.9432 7.08579 10.6074 7.5 10.6074H16.5C16.9142 10.6074 17.25 10.9432 17.25 11.3574C17.25 11.7716 16.9142 12.1074 16.5 12.1074H7.5C7.08579 12.1074 6.75 11.7716 6.75 11.3574Z'
                      fill='white'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M6.75 8C6.75 7.58579 7.08579 7.25 7.5 7.25H12C12.4142 7.25 12.75 7.58579 12.75 8C12.75 8.41421 12.4142 8.75 12 8.75H7.5C7.08579 8.75 6.75 8.41421 6.75 8Z'
                      fill='white'
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
