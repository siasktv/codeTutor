const Reviews = require('../../models/Review.models.js');

const getReviewById = async (id) => {
  const Review = await Reviews.findById(id);
  return Review;
};

module.exports = getReviewById;
