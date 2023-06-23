const User = require('../../models/User.models.js')

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
