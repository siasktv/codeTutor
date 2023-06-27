const { Router } = require('express');
// import controllers
const {
  getAllFaqsHandler,
  getFaqsByIdHandler,
  deleteFaqsHandler,
  createFaqsHandler,
  updateFaqsHandler,
} = require('../../Handlers/Faqs/faqsHandlers.js');

const router = Router();

router.get('/', getAllFaqsHandler);
router.get('/:id', getFaqsByIdHandler);
router.delete('/:id', deleteFaqsHandler);
router.post('/', createFaqsHandler);
router.put('/:id', updateFaqsHandler);

module.exports = router;
