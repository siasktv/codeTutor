const User = require('../../models/User.models')

const deleteUser = async ({ id }) => {
  const user = await findByIdAndDelete(id)
  return user
}

module.exports = deleteUser
