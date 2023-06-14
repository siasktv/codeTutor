const Location = require('../../models/Location.models')

const getAllLocation = async () => {
  const allLocation = await Location.find().sort({ name: 1 })
  return allLocation
}

module.exports = getAllLocation
