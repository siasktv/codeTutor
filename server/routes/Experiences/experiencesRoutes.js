const router = require('express').Router()
// import handlers
const {
  createExperienceHandler,
  deleteExperienceHandler,
  getAllExperiencesHandler,
  updatedExperienceHandler,
  getExperienceByIdHandler,
} = require('../../Handlers/Experience/experienceHandlers')

router.get('/', getAllExperiencesHandler)
router.get('/:id', getExperienceByIdHandler)
router.delete('/:id', deleteExperienceHandler)
router.post('/', createExperienceHandler)
router.put('/:id', updatedExperienceHandler)
module.exports = router
