const Reviews = require('../../models/Review.models.js');

const getAllReview = async () => {
  const allReview = await Reviews.find();
  return allReview;
};

module.exports = getAllReview;
