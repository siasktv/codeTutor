const ReviewsTutorTotal = props => {
  return (
    <div>
      <h2 className='font-semibold text-gray-600'>
        {/* {props.reviews.length} reviews */}
      </h2>
      {/* {props.reviews.map((review) => (
        <div key={review._id}>
          <p>Comment: {review.comment}</p>
          <p>Rating: {review.rating}</p>
          <p>Created At: {review.createdAt}</p>
          <p>Updated At: {review.updatedAt}</p>
          <p>User: {review.user}</p>
          <hr />
        </div>
      ))} */}
    </div>
  )
}
export default ReviewsTutorTotal
