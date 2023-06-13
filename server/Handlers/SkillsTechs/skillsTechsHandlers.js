const createSkillsTech = require('../../controllers/Skills/createSkillsTech')
const getSkillsTechById = require('../../controllers/Skills/getSkillsTechById')
const getAllSkillsTech = require('../../controllers/Skills/getAllSkillsTech')
const deleteSkillsTech = require('../../controllers/Skills/deleteSkillsTech')
const updateSkillsTech = require('../../controllers/Skills/updateSkillsTech')

const getAllSkillsTechHandler = async (req, res) => {
  try {
    const allSkillsTech = await getAllSkillsTech()
    res.status(200).json(allSkillsTech)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getSkillsTechByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const skillsTech = await getSkillsTechById(id)
    res.status(200).json(skillsTech)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteSkillsTechHandler = async (req, res) => {
  const { id } = req.params
  try {
    const deletedSkillsTech = await deleteSkillsTech(id)
    res.status(200).json(deletedSkillsTech)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createSkillsTechHandler = async (req, res) => {
  const { tutor, techName, years, description } = req.body
  if (!techName || techName.trim().length === 0) {
    return res.status(400).json({ error: 'techName is required' })
  }

  if (!years || years.toString().trim().length === 0) {
    return res.status(400).json({ error: 'Years is required' })
  }

  if (!description || description.length === 0) {
    return res.status(400).json({ error: 'Description is required' })
  }

  try {
    const newSkillsTech = await createSkillsTech({
      tutor,
      techName,
      years,
      description
    })
    res.status(200).json(newSkillsTech)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateSkillsTechHandler = async (req, res) => {
  const { id } = req.params
  const { tutor, techName, years, description } = req.body
  if (!techName || techName.trim().length === 0) {
    return res.status(400).json({ error: 'techName is required' })
  }

  if (!years || years.toString().trim().length === 0) {
    return res.status(400).json({ error: 'Years is required' })
  }

  if (!description || description.length === 0) {
    return res.status(400).json({ error: 'Description is required' })
  }

  try {
    const updatedSkillsTech = await updateSkillsTech(id, {
      tutor,
      techName,
      years,
      description
    })
    res.status(200).json(updatedSkillsTech)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllSkillsTechHandler,
  getSkillsTechByIdHandler,
  deleteSkillsTechHandler,
  createSkillsTechHandler,
  updateSkillsTechHandler
}
