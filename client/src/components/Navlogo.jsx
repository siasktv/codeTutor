import { Link } from 'react-router-dom'
const Navlogo = () => {
  return (
    <header className=''>
      <div className='mx-auto p-4'>
        <div className='flex items-center justify-between gap-4 lg:gap-10'>
          <div className='flex lg:w-0 lg:flex-1'>
            <Link to='/'>
              <span className='inline-block h-10 w-52'>
                <div className='flex'>
                  <div className='border-codecolor border-8 rounded-full w-8 h-8'></div>
                  <div className='border-gray-200 border-8 rounded-full w-8 h-8 -ml-5 mix-blend-multiply'></div>
                  <h1 className='font-bold text-2xl ml-1'>Code-Tutor.</h1>
                </div>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navlogo
