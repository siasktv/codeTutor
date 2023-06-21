const Reviews = require('../../models/Review.models.js');

const deleteReview = async (id) => {
  const deletedReview = await Reviews.findByIdAndDelete(id);
  return deletedReview;
};

module.exports = deleteReview;
