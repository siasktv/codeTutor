const router = require('express').Router()
//handlers
const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
} = require('../../Handlers/Users/usersHandlers')

router.post('/', createUserHandler)
router.delete('/:id', deleteUserHandler)
router.get('/', getAllUsersHandler)
router.put('/:id', updateUserHandler)

module.exports = router
