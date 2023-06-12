const User = require('../../models/User.models')

const createUser = async ({ fullName, email, password }) => {
  const duplicate = await User.findOne({ email }).lean().exec()

  if (duplicate) return 'User already exits'

  const user = User.create({
    fullName,
    email,
    password,
  })

  return user
}

module.exports = createUser
