const Reviews = require('../../models/Review.models.js')

const getAllReview = async () => {
  const allReview = await Reviews.find().populate('user', 'fullName image')
  return allReview
}

module.exports = getAllReview
