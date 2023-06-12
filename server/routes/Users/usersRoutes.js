const router = require('express').Router()
//handlers

const createUser = require('../../Handlers/Users/usersHandlers')

router.post('/', createUser)
module.exports = router
