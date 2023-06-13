const User = require('../../models/User.models')

const updateUser = async (id, { fullName, email, image, location, role }) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { fullName, email, image, location, role },
    { new: true }
  )
  return updatedUser
}

module.exports = updateUser
