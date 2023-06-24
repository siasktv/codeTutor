const User = require('../../models/User.models')

const createUser = async ({
  fullName,
  email,
  image,
  location,
  timezone,
  role,
  uid,
  favoritesTutor,
}) => {
  const user = User.create({
    fullName,
    email,
    image,
    location,
    timezone,
    role,
    uid,
    favoritesTutor,
  })

  return user
}

module.exports = createUser
