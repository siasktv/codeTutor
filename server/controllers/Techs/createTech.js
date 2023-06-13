const Tech = require('../../models/Tech.models.js')

const createTech = async ({ name, category }) => {
  const newTech = await Tech.create({
    name,
    category
  })

  return newTech
}

module.exports = createTech
