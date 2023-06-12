const createProject = require('../../controllers/Projects/createProject.js')
const getProjectById = require('../../controllers/Projects/getProjectById.js')
const getAllProjects = require('../../controllers/Projects/getAllProjects.js')
const deleteProject = require('../../controllers/Projects/deleteProject.js')
const updateProject = require('../../controllers/Projects/updateProject.js')

const getAllProjectsHandler = async (req, res) => {
  try {
    const allProjects = await getAllProjects()
    res.status(200).json(allProjects)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getProjectByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const project = await getProjectById(id)
    res.status(200).json(project)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteProjectHandler = async (req, res) => {
  const { id } = req.params
  try {
    const deletedProject = await deleteProject(id)
    res.status(200).json(deletedProject)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createProjectHandler = async (req, res) => {
  const { tutor, name, link, description, techName } = req.body
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' })
  }
  if (!link || link.trim().length === 0) {
    return res.status(400).json({ error: 'Link is required' })
  }
  if (!description || description.length === 0) {
    return res.status(400).json({ error: 'Description is required' })
  }
  try {
    const newProject = await createProject({
      tutor,
      name,
      link,
      description,
      techName
    })
    res.status(200).json(newProject)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateProjectHandler = async (req, res) => {
  const { id } = req.params
  const { tutor, name, link, description, techName } = req.body
  if (!name || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' })
  }
  if (!link || link.trim().length === 0) {
    return res.status(400).json({ error: 'Link is required' })
  }
  if (!description || description.length === 0) {
    return res.status(400).json({ error: 'Description is required' })
  }
  try {
    const updatedProject = await updateProject(id, {
      tutor,
      name,
      link,
      description,
      techName
    })
    res.status(200).json(updatedProject)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllProjectsHandler,
  getProjectByIdHandler,
  deleteProjectHandler,
  createProjectHandler,
  updateProjectHandler
}
