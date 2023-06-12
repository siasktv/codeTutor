const { Router } = require('express')
// const tutorsRoutes = require('./Tutors/tutorsRoutes')
const projectsRoutes = require('./Projects/projectsRoutes')

const router = Router()

// router.use('/api/tutors', tutorsRoutes)
router.use('/api/projects', projectsRoutes)

module.exports = router
