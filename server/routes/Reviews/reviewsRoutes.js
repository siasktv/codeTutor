const { Router } = require('express');

// import controllers
const {
  getAllReviewHandler,
  getReviewByIdHandler,
  deleteReviewHandler,
  createReviewHandler,
  updateReviewHandler,
} = require('../../Handlers/Reviews/reviewsHandlers')

const router = Router();

router.get('/', getAllReviewHandler);
router.get('/:id', getReviewByIdHandler);
router.delete('/:id', deleteReviewHandler);
router.post('/', createReviewHandler);
router.put('/:id', updateReviewHandler);

module.exports = router;
