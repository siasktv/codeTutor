const createFaqs = require('../../controllers/Faqs/createFaqs.js')
const getAllFaqs = require('../../controllers/Faqs/getAllFaqs.js')
const getFaqsById = require('../../controllers/Faqs/getFaqsById.js')
const deleteFaqs = require('../../controllers/Faqs/deleteFaqs.js')
const updateFaqs = require('../../controllers/Faqs/updateFaqs.js')

const getAllFaqsHandler = async (req, res) => {
  try {
    const faqs = await getAllFaqs()
    res.status(200).json(faqs)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getFaqsByIdHandler = async (req, res) => {
  const { id } = req.params
  try {
    const faqs = await getFaqsById(id)
    res.status(200).json(faqs)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createFaqsHandler = async (req, res) => {
  const { user, question, sugessted } = req.body
  if (!question || question.trim().length === 0) {
    return res.status(400).json({ error: 'question is required' })
  }

  try {
    const newFaqs = await createFaqs({
      user,
      question,
      sugessted
    })
    res.status(200).json(newFaqs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateFaqsHandler = async (req, res) => {
  const { id } = req.params
  const { user, question, sugessted } = req.body
  if (!question || question.trim().length === 0) {
    return res.status(400).json({ error: 'question is required' })
  }

  try {
    const updatedFaqs = await updateFaqs(id, {
      user,
      question,
      sugessted
    })
    res.status(200).json(updatedFaqs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const deleteFaqsHandler = async (req, res) => {
  const { id } = req.params
  try {
    const deletedFaqs = await deleteFaqs(id)
    res.status(200).json(deletedFaqs)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllFaqsHandler,
  getFaqsByIdHandler,
  createFaqsHandler,
  updateFaqsHandler,
  deleteFaqsHandler
}
