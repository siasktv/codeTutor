const router = require('express').Router()
//handlers
const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
  getUserByUidHandler
} = require('../../Handlers/Users/usersHandlers')

router.post('/', createUserHandler)
router.delete('/:id', deleteUserHandler)
router.get('/', getAllUsersHandler)
router.put('/:id', updateUserHandler)
router.get('/:uid', getUserByUidHandler)

module.exports = router
