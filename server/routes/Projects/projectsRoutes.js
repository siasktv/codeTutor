const { Router } = require('express')
// import controllers
const {
  getAllProjectsHandler,
  deleteProjectHandler,
  createProjectHandler,
  updateProjectHandler
} = require('../../Handlers/Projects/projectsHandlers.js')

const router = Router()

router.get('/', getAllProjectsHandler)
router.delete('/:id', deleteProjectHandler)
router.post('/', createProjectHandler)
router.put('/:id', updateProjectHandler)
module.exports = router
