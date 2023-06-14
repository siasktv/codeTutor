const User = require('../../models/User.models')

const allUsers = async () => {
  const users = await User.find()
  return users
}

module.exports = allUsers
