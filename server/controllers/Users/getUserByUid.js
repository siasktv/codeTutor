const User = require('../../models/User.models.js')

const getUserByUid = async uid => {
  const user = User.findOne({ uid })
    .populate({
      path: 'favoritesTutor',
      populate: {
        path: 'user'
      }
    })
    .populate({
      path: 'favoritesTutor',
      populate: {
        path: 'skills'
      }
    })
    .populate({
      path: 'favoritesTutor',
      populate: {
        path: 'experience'
      }
    })
    .populate({
      path: 'favoritesTutor',
      populate: {
        path: 'projects'
      }
    })
    .populate({
      path: 'favoritesTutor',
      populate: {
        path: 'reviews'
      }
    })
  return user
}

module.exports = getUserByUid
