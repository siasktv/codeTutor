const { Router } = require('express')
const tutorsRoutes = require('./Tutors/tutorsRoutes.js')
const projectsRoutes = require('./Projects/projectsRoutes.js')
const usersRoutes = require('./Users/usersRoutes.js')
const techsRoutes = require('./Techs/techsRoutes.js')
const skillsTechsRoutes = require('./SkillsTechs/skillsTechsRoutes.js')
const experiencesRoutes = require('./Experiences/experiencesRoutes.js')
const locationsRoutes = require('./Locations/locationsRoutes.js')
const messageRoutes = require('./Message/messageRoutes.js')
const conversationsRoutes = require('./Conversations/conversationsRoutes.js')
const reviews = require('./Reviews/reviewsRoutes.js')
const sessionRoutes = require('./Session/sessionRoutes.js')
const faqsRoutes = require('./Faqs/faqsRoutes.js')
const newsletterRoutes = require('./Newsletter/newsletterRoutes.js')

const router = Router()

router.use('/api/tutors', tutorsRoutes)
router.use('/api/projects', projectsRoutes)
router.use('/api/users', usersRoutes)
router.use('/api/tech', techsRoutes)
router.use('/api/experiences', experiencesRoutes)
router.use('/api/skillstech', skillsTechsRoutes)
router.use('/api/locations', locationsRoutes)
router.use('/api/message', messageRoutes)
router.use('/api/conversations', conversationsRoutes)
router.use('/api/reviews', reviews)
router.use('/api/session', sessionRoutes)
router.use('/api/faqs', faqsRoutes)
router.use('/api/newsletter', newsletterRoutes)

module.exports = router
