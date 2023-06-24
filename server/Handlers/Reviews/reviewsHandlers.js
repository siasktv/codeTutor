const createReview = require('../../controllers/Reviews/createReview.js');
const getReviewById = require('../../controllers/Reviews/getReviewById.js');
const getAllReview= require('../../controllers/Reviews/getAllReviews.js');
const deleteReview = require('../../controllers/Reviews/deteteReview.js');
const updateReview = require('../../controllers/Reviews/updateReview.js');

const getAllReviewHandler = async (req, res) => {
  try {
    const allReview = await getAllReview();
    res.status(200).json(allReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReviewByIdHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const review = await getReviewById(id);
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReviewHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedReview = await deleteReview(id);
    res.status(200).json(deletedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createReviewHandler = async (req, res) => {
  const { tutor, user, comment, rating } = req.body;
  if (!tutor || tutor.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!user || user.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!comment || comment.length === 0) {
    return res.status(400).json({ error: 'Category is required' });
  }
  if (!rating || rating.toString().trim().length === 0) {
    return res.status(400).json({ error: 'Category is required' });
  }
  if( rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be a number between 1 and 5' });
  }
  try {
    const newReview = await createReview({
      tutor,
      user,
      comment,
      rating, 
    });
    res.status(200).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

const updateReviewHandler = async (req, res) => {
  const { id } = req.params;
  const { tutor, user, comment, rating } = req.body;
  if (!tutor || tutor.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!user || user.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (!comment || comment.length === 0) {
    return res.status(400).json({ error: 'Category is required' });
  }
  if (!rating || rating.toString().trim().length === 0) {
    return res.status(400).json({ error: 'Category is required' });
  }
  if (rating < 1 || rating > 5) {
    return res
      .status(400)
      .json({ error: 'Rating must be a number between 1 and 5' });
  }

  try {
    const updatedReview = await updateReview(id, {
      tutor,
      user,
      comment,
      rating,
    });
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllReviewHandler,
  getReviewByIdHandler,
  deleteReviewHandler,
  createReviewHandler,
  updateReviewHandler,
};
