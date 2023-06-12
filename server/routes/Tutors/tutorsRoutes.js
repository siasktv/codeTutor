const express = require('express')
const router = express.Router()
const {
  getAllTutors,
  getTutorById,
  createTutor,
  deleteTutor,
  editTutor
} = require('../../controllers/Tutors/tutorsControllers.js')

router.get('/', getAllTutors)
router.get('/:id', getTutorById)
router.delete('/:id', deleteTutor)
router.post('/createProduct', createTutor)
router.put('/:id', editTutor)
module.exports = router
