import { useState } from 'react'
import { Star2 } from '../../assets'
const formatDate = dateString => {
  const date = new Date(dateString)
  const options = { month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('es-ES', options)
  return formattedDate.replace('de', '').trim()
}
const CardReviewUser = props => {
  const { reviews } = props

  const [displayedReviews, setDisplayedReviews] = useState(3)

  const handleShowMoreReviews = () => {
    setDisplayedReviews(displayedReviews + 3)
  }
  // sort reviews by date
  const newReviews = [...reviews]
  const sortedReviews = newReviews.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  return (
    <div>
      {sortedReviews.slice(0, displayedReviews).map(review => (
        <div key={review._id}>
          {/* Card opinion */}
          <div className='pb-4 flex w-full'>
            {/* Imagen de Perfil */}
            <img
              src={review.user.image}
              referrerPolicy='no-referrer'
              alt='Imagen de perfil Usuario de review'
              className='w-10 h-10 rounded-full object-cover transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none'
            />
            {/* Nombre y opinión */}
            <div className='pl-2 flex flex-col w-full'>
              <div className='pl-2 flex-grow flex items-center justify-between w-full'>
                <div className='flex justify-center items-center'>
                  <h2 className='text-left font-semibold break-all mr-2 dark:text-gray-200'>
                    {review.user.fullName}
                  </h2>
                  <div className='flex justify-center items-center space-x-1'>
                    {Array.from({ length: Math.round(review.rating) }).map(
                      (_, index) => (
                        <img key={index} src={Star2} />
                      )
                    )}
                  </div>
                </div>
                <div className='pl-2 flex'>
                  {/* Fecha */}
                  <p className='text-sm text-[#98A2B3] dark:text-gray-400'>
                    {formatDate(review.createdAt)}
                  </p>
                </div>
              </div>
              <div>
                <h2 className='pl-2 text-sm break-all text-[#141414B2] text-justify dark:text-gray-200'>
                  {review.comment}
                </h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      {displayedReviews < reviews.length && (
        <div className='flex flex-col items-center pt-6'>
          <button
            onClick={handleShowMoreReviews}
            className='flex flex-row items-center justify-center w-40 h-11 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none dark:bg-codecolor dark:text-white dark:font-semibold'
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  )
}
export default CardReviewUser
