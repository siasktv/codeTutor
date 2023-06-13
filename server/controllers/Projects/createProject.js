const Project = require('../../models/Project.models.js')

const createProject = async ({ tutor, name, link, description, techName }) => {
  const newProject = await Project.create({
    tutor,
    name,
    link,
    description,
    techName
  })

  const newProjectPopulate = newProject.populate({
    path: 'techName',
    select: 'name'
  })

  return newProjectPopulate
}

module.exports = createProject
