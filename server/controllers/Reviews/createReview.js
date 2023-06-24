const Reviews = require('../../models/Review.models.js')
const Tutors = require('../../models/Tutor.models.js')

const createReview = async ({ tutor, user, comment, rating }) => {
  const newReview = await Reviews.create({
    tutor,
    user,
    comment,
    rating
  })

  // Because this newReview object will contain the new id
  // We should populate the tutor reviews field with the added ID
  const result = await Tutors.findOneAndUpdate(
    { _id: tutor },
    { $push: { reviews: newReview._id } }
  )

  return newReview
}

module.exports = createReview
