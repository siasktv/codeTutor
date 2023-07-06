import { Link } from 'react-router-dom'

export default function NotFound () {
  return (
    <div class='grid h-screen px-4 bg-white dark:bg-gray-900 place-content-center'>
      <div class='text-center'>
        <h1 class='font-black text-gray-200 text-9xl'>404</h1>

        <p class='text-2xl font-bold tracking-tight dark:text-gray-200 text-gray-900 sm:text-4xl'>
          Oops!
        </p>

        <p class='mt-4 text-gray-500 dark:text-gray-400'>
          No pudimos encontrar la página que buscabas.
        </p>

        <Link
          to='/'
          class='inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-codecolor rounded hover:bg-codecolordark focus:outline-none'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
