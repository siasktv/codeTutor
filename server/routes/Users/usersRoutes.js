const router = require('express').Router()
//handlers
const createUser = require('../../Handlers/Users/usersHandlers')
const deleteUser = require('../../Handlers/Users/usersHandlers')

router.post('/', createUser)
router.delete('/:id', deleteUser)
module.exports = router
