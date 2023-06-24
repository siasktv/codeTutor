const router = require('express').Router()
//handlers
const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
  getUserByUidHandler,
  resetPasswordHandler
} = require('../../Handlers/Users/usersHandlers.js')

router.post('/', createUserHandler)
router.delete('/:id', deleteUserHandler)
router.get('/', getAllUsersHandler)
router.put('/:id', updateUserHandler)
router.get('/:uid', getUserByUidHandler)
router.post('/resetpassword', resetPasswordHandler)

module.exports = router
