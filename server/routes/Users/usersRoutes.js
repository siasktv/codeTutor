const router = require('express').Router()
//handlers
const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
  getUserByUidHandler,
  updateTutorsFavoritesHandler,
  resetPasswordHandler
} = require('../../Handlers/Users/usersHandlers.js')

router.post('/', createUserHandler)
router.delete('/:id', deleteUserHandler)
router.get('/', getAllUsersHandler)
router.put('/:id', updateUserHandler)
router.put('/:id/:tutorId', updateTutorsFavoritesHandler)
router.get('/:uid', getUserByUidHandler)
router.post('/resetpassword', resetPasswordHandler)

module.exports = router
