const User = require('../../models/User.models')

const createUser = async ({ fullName, email, password }) => {
  const user = User.create({
    fullName,
    email,
    password,
  })

  return user
}

module.exports = createUser
