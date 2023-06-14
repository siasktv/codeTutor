const User = require('../../models/User.models')

const updateUser = async (
  id,
  { fullName, email, image, location, timezone, role }
) => {
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { fullName, email, image, location, timezone, role },
    { new: true }
  )
  return updatedUser
}

module.exports = updateUser
