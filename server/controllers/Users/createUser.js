const User = require('../../models/User.models')

const createUser = async ({
  fullName,
  email,
  image,
  location,
  timezone,
  role,
  uid
}) => {
  const user = User.create({
    fullName,
    email,
    image,
    location,
    timezone,
    role,
    uid
  })

  return user
}

module.exports = createUser
