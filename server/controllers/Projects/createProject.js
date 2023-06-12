const Project = require('../../models/Project.models.js')

const createProject = async ({ tutor, name, link, description, techName }) => {
  const newProject = await Project.create({
    tutor,
    name,
    link,
    description,
    techName
  })
  return newProject
}

module.exports = createProject
