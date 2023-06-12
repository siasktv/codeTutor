const { Router } = require('express');

// import controllers
const {
  getAllTechHandler,
  getTechByIdHandler,
  deleteTechHandler,
  createTechHandler,
  updateTechHandler,
} = require('../../Handlers/Techs/techsHandlers')

const router = Router();

router.get('/', getAllTechHandler);
router.get('/:id', getTechByIdHandler);
router.delete('/:id', deleteTechHandler);
router.post('/', createTechHandler);
router.put('/:id', updateTechHandler);

module.exports = router;
