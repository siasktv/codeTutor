const { Router } = require('express');
// import controllers
const {
  getAllSkillsTechHandler,
  getSkillsTechByIdHandler,
  deleteSkillsTechHandler,
  createSkillsTechHandler,
  updateSkillsTechHandler,
} = require('../../Handlers/SkillsTechs/skillsTechsHandlers.js');

const router = Router();

router.get('/', getAllSkillsTechHandler);
router.get('/:id', getSkillsTechByIdHandler);
router.delete('/:id', deleteSkillsTechHandler);
router.post('/', createSkillsTechHandler);
router.put('/:id', updateSkillsTechHandler);

module.exports = router;
