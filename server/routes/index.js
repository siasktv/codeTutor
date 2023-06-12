const { Router } = require('express')
// const tutorsRoutes = require('./Tutors/tutorsRoutes')

const projectsRoutes = require('./Projects/projectsRoutes')
const usersRoutes = require('./Users/usersRoutes')

const router = Router()

// router.use('/api/tutors', tutorsRoutes)
router.use('/api/projects', projectsRoutes)
router.use('/api/users', usersRoutes)

module.exports = router
