// import {
//   PictureUserReviewTutor,
//   NameUserReviewTutor,
//   DescriptionUserReviewTutor,
//   DateUserReviewTutor,
// } from '../../components'
import { useState } from 'react'
const formatDate = (dateString) => {
  const date = new Date(dateString)
  const options = { month: 'long', year: 'numeric' }
  const formattedDate = date.toLocaleDateString('es-ES', options)
  return formattedDate.replace('de', '').trim()
}
const CardReviewUser = (props) => {
  const { reviews } = props

  const [displayedReviews, setDisplayedReviews] = useState(3)

  const handleShowMoreReviews = () => {
    setDisplayedReviews(displayedReviews + 3)
  }

  return (
    <div>
      {reviews.slice(0, displayedReviews).map((review) => (
        <div key={review._id}>
          {/* Card opinion */}
          <div className="pb-4 flex">
            {/* Imagen de Perfil */}
            <img
              src={review.user.image}
              alt="Imagen de perfil Tutor"
              className="w-10 h-10 rounded-full object-cover transition duration-1 ease-in-out transform active:scale-150 active:outline-none focus:outline-none"
            />
            {/* Nombre y opinión */}
            <div className="pl-4 flex-grow">
              <div>
                <h2 className="text-left font-semibold">
                  {review.user.fullName}
                </h2>
                <h2 className="text-sm  text-[#141414B2] text-justify">
                  {review.comment}
                </h2>
              </div>
            </div>
            {/* Fecha */}
            <div className="pl-4 flex">
              <p className="text-sm text-[#98A2B3] ">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
      {displayedReviews < reviews.length && (
        <div className="flex flex-col items-center pt-6">
          <button
            onClick={handleShowMoreReviews}
            className="flex flex-row items-center justify-center w-40 h-11 border border-codecolor text-codecolor rounded transition duration-1 ease-in-out transform active:scale-95 active:outline-none focus:outline-none"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  )
}
export default CardReviewUser
