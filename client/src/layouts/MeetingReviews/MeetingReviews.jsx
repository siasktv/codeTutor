import React, { useState, useEffect } from 'react'
import { Star, StarVacia } from '../../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

const MeetingReviews = ({
  onCloseModal,
  setReviewComment,
  setReviewRating,
  handleReviewSession
}) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [isDisabled, setIsDisabled] = useState(true)
  const [success, setSuccess] = useState(false)

  const handleRatingChange = index => {
    setReviewRating(index)
    setRating(index)
  }

  useEffect(() => {
    if (rating > 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [rating])

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
    setSuccess(true)
    setIsDisabled(true)
    setTimeout(() => {
      handleReviewSession()
      onCloseModal()
    }, 500)
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
              } m-1 hover:transition-all hover:ease-in-out hover:duration-200 text-2xl hover:scale-125`}
              onClick={() => handleRatingChange(starIndex)}
            >
              <FontAwesomeIcon
                icon={faStar}
                className={
                  starIndex <= rating ? 'text-codecolor' : 'text-gray-400'
                }
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
            disabled={isDisabled}
            className={
              !success
                ? isDisabled
                  ? 'mt-6 inline-flex h-12 justify-center rounded-lg bg-gray-300 text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300  sm:mt-0'
                  : 'mt-6 inline-flex h-12 justify-center rounded-lg bg-codecolor text-md font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-codecolordark transition-all ease-in-out duration-200 sm:mt-0'
                : 'mt-6 inline-flex h-12 justify-center rounded-lg bg-codecolor text-md font-semibold text-white shadow-sm cursor-default sm:mt-0'
            }
          >
            {success ? (
              <FontAwesomeIcon
                icon={faCheckCircle}
                className='text-md self-center px-14'
              />
            ) : (
              <span className='self-center px-[42px]'> Enviar </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MeetingReviews
