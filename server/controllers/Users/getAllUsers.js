const User = require('../../models/User.models')

const allUsers = async () => {
  const users = await User.find().select('-password')
  return users
}

module.exports = allUsers
