const User = require('../../models/User.models')

const updateTutorsFavorites = async (id, tutorId) => {
  const user = await User.findById(id)

  if (user.favoritesTutor.includes(tutorId)) {
    // Tutor already in favorites, remove it
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $pull: { favoritesTutor: tutorId } },
      { new: true }
    ).populate({
      path: 'favoritesTutor',
    })

    console.log(updatedUser)
    return updatedUser
  } else {
    // Tutor not in favorites, add it
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $push: { favoritesTutor: tutorId } },
      { new: true }
    ).populate({
      path: 'favoritesTutor',
    })

    console.log(updatedUser)
    return updatedUser
  }
}

module.exports = updateTutorsFavorites
