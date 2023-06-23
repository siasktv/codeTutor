const { Router } = require('express')

const {
  getAllTutorsHandler,
  getTutorByIdHandler,
  createTutorHandler,
  deleteTutorHandler,
  updateTutorHandler
} = require('../../Handlers/Tutors/tutorsHandlers.js')

const router = Router()

router.get('/', getAllTutorsHandler)
router.get('/:id', getTutorByIdHandler)
router.delete('/:id', deleteTutorHandler)
router.post('/', createTutorHandler)
router.put('/:id', updateTutorHandler)

module.exports = router
