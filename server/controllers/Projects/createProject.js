const Project = require('../../models/Project.models.js')
const Tutors = require('../../models/Tutor.models.js')

const createProject = async ({ tutor, name, link, description, techName }) => {
  const newProject = await Project.create({
    tutor,
    name,
    link,
    description,
    techName
  })

  const result = await Tutors.findOneAndUpdate(
    { _id: tutor },
    { $push: { projects: newProject._id } }
  )

  const newProjectPopulate = await Project.findById(newProject._id).populate({
    path: 'techName',
    select: 'name'
  })

  return newProjectPopulate
}

module.exports = createProject
