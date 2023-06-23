const User = require('../../models/User.models.js')

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id)
  return user
}

module.exports = deleteUser
