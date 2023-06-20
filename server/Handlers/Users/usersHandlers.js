const User = require('../../models/User.models')
const createUser = require('../../controllers/Users/createUser')
const deleteUser = require('../../controllers/Users/deleteUser')
const getAllUsers = require('../../controllers/Users/getAllUsers')
const updateUser = require('../../controllers/Users/updateUser')
const getUserByUid = require('../../controllers/Users/getUserByUid')
const sendEmail = require('../../utils/nodemailer')
const Tutor = require('../../models/Tutor.models')

const getAllUsersHandler = async (req, res) => {
  try {
    const allUsers = await getAllUsers()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getUserByUidHandler = async (req, res) => {
  const { uid } = req.params
  try {
    const user = await getUserByUid(uid)
    const tutor = await Tutor.findOne({ user: user._id })
    res.status(200).json({
      ...user._doc,
      tutor
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createUserHandler = async (req, res) => {
  const { fullName, email, image, location, timezone, role, uid } = req.body

  if (!fullName || !email || !uid)
    return res
      .status(400)
      .json({ error: 'Please fill in the required information' })

  const duplicate = await User.findOne({ email }).lean().exec()

  if (duplicate) return res.status(500).json({ error: 'User already exits' })

  try {
    const user = await createUser({
      fullName,
      email,
      image,
      location,
      timezone,
      role,
      uid
    })

    const userToMail = {
      fullName,
      email,
      image
    }

    await sendEmail(userToMail)

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteUserHandler = async (req, res) => {
  const { id } = req.params

  try {
    const deletedUser = await deleteUser(id)
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateUserHandler = async (req, res) => {
  const { id } = req.params
  const { fullName, email, image, location, timezone, role } = req.body
  try {
    const updatedUser = await updateUser(id, {
      fullName,
      email,
      image,
      location,
      timezone,
      role
    })
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  updateUserHandler,
  getUserByUidHandler
}
