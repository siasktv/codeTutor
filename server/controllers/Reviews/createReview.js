const Reviews = require('../../models/Review.models.js');

const createReview = async ({ tutor, user, comment, rating }) => {
  const newReview = await Reviews.create({
    // tutor,
    user,
    comment,
    rating,
    
  });

  return newReview;
};

module.exports = createReview;
