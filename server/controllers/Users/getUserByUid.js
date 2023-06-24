const User = require('../../models/User.models')

const getUserByUid = async (uid) => {
  const user = User.findOne({ uid }).populate({
    path: 'favoritesTutor',
  })
  return user
}

module.exports = getUserByUid
