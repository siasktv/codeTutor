import React, { useState } from 'react'
import { Star, StarVacia } from '../../assets'

const MeetingReviews = ({
  onCloseModal,
  setReviewComment,
  setReviewRating,
  handleReviewSession
}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [charCount, setCharCount] = useState(0)

  const handleRatingChange = index => {
    setReviewRating(index)
    setRating(index)
  }

  const handleCommentChange = e => {
    const { value } = e.target
    const trimmed = value.trim()
    if (trimmed.length <= 500) {
      setReviewComment(value)
      setComment(value)
      setCharCount(trimmed.length)
    } else {
      setCharCount(500)
    }
  }

  const handleSubmit = () => {
    handleReviewSession()
    onCloseModal()
  }

  return (
    <div>
      <div className='star-rating m-3 '>
        {[...Array(5)].map((_, index) => {
          const starIndex = index + 1
          return (
            <button
              type='button'
              key={starIndex}
              className={`${
                starIndex <= rating ? 'on' : 'off'
              } m-1 hover:transition-all hover:scale-y-150 hover:scale-x-150 hover:ease-in-out hover:duration-200`}
              onClick={() => handleRatingChange(starIndex)}
            >
              <img
                src={starIndex <= rating ? Star : StarVacia}
                alt='star'
                className='star-image'
              />
            </button>
          )
        })}
      </div>
      <div className='flex-col pb-2 pt-4 justify-center'>
        <div className='justify-center justify-items-center mb-4'>
          <textarea
            type='text'
            value={comment}
            onChange={e => handleCommentChange(e)}
            placeholder='Déjanos tu opinión del tutor'
            className='m-px w-96 h-36 py-4 border border-gray-300 rounded px-4 text-lg resize-none '
          />
          <div className='flex justify-end'>
            <p className='text-gray-400'>{charCount}/500</p>
          </div>
        </div>
        <div>
          <button
            type='button'
            onClick={handleSubmit}
            className='mt-6 inline-flex w-full justify-center rounded-lg bg-codecolor px-10 py-3 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-codecolordark transition-all ease-in-out duration-200 sm:mt-0 sm:w-auto'
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeetingReviews
