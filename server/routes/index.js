const { Router } = require('express')
// const tutorsRoutes = require('./Tutors/tutorsRoutes')

const projectsRoutes = require('./Projects/projectsRoutes')
const usersRoutes = require('./Users/usersRoutes')
const techsRoutes = require('./Techs/techsRoutes')
// const skillsTechsRoutes = require('./SkillsTechs/skillsTechsRoutes')

const router = Router()

// router.use('/api/tutors', tutorsRoutes)
router.use('/api/projects', projectsRoutes)
router.use('/api/users', usersRoutes)
router.use('/api/tech', techsRoutes)
// router.use('/api/skillstech', skillsTechsRoutes);

module.exports = router
