import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { sortedByRate } from '../../redux/features/tutors/tutorsSlice'

const RangeBar = () => {
  const [rating, setRating] = useState(150)
  const dispatch = useDispatch()

  const handleInputChange = (event) => {
    const newRating = event.target.value
    setRating(newRating)
    dispatch(sortedByRate(newRating))
  }

  return (
    <div>
      <div className="flex flex-col items-center pl-4 pr-4">
        <input
          type="range"
          name="rating"
          min="8"
          max="150"
          step="1"
          className="box-border flex flex-row p-0 w-full h-12 border-0.5 accent-codecolor"
          style={{ '--thumb-color': 'transparent' }}
          value={rating}
          onChange={handleInputChange}
        />
        <label
          className="aling-center text-sm font-medium dark:text-gray-200 text-black"
          htmlFor="range"
        >
          {rating === '8' ? '$8' : `$8 - $${rating}`}
        </label>
      </div>
    </div>
  )
}

export default RangeBar
