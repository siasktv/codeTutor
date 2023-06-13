const User = require('../../models/User.models')

const updateUser = async (id, { fullName, password, email }) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { fullName, password, email },
    { new: true }
  )
  return updatedUser
}

module.exports = updateUser
