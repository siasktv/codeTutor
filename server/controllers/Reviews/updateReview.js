const Reviews = require('../../models/Review.models.js');

const updateReview = async (id, { tutor, user, comment, rating }) => {
  const updatedReview = await Reviews.findByIdAndUpdate(
    id,
    { tutor, user, comment, rating },
    { new: true }
  );
  return updatedReview;
};

module.exports = updateReview;
