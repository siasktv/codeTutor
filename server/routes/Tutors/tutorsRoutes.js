const { Router } = require('express')

const {
  getAllTutorsHandler,
  getTutorByIdHandler,
  createTutorHandler,
  deleteTutorHandler,
  updateTutorHandler,
  acceptTutorHandler,
  rejectTutorHandler,
  enableTutorHandler,
  disableTutorHandler
} = require('../../Handlers/Tutors/tutorsHandlers.js')

const router = Router()

router.get('/', getAllTutorsHandler)
router.get('/:id', getTutorByIdHandler)
router.delete('/:id', deleteTutorHandler)
router.post('/', createTutorHandler)
router.put('/:id', updateTutorHandler)
router.put('/accept/:id', acceptTutorHandler)
router.put('/reject/:id', rejectTutorHandler)
router.put('/enable/:id', enableTutorHandler)
router.put('/disable/:id', disableTutorHandler)

module.exports = router
