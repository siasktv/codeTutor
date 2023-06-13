const User = require('../../models/User.models')
const createUser = require('../../controllers/Users/createUser')
const deleteUser = require('../../controllers/Users/deleteUser')
const getAllUsers = require('../../controllers/Users/getAllUsers')
const updateUser = require('../../controllers/Users/updateUser')
const sendEmail = require('../../utils/nodemailer')

const getAllUsersHandler = async (req, res) => {
  try {
    const allUsers = await getAllUsers()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createUserHandler = async (req, res) => {
  const { fullName, email, password } = req.body

  if (!fullName || !email || !password)
    return res
      .status(400)
      .json({ error: 'Please fill in the required information' })

  const duplicate = await User.findOne({ email }).lean().exec()

  if (duplicate) return res.status(500).json({ error: 'User already exits' })

  try {
    const user = await createUser({
      fullName,
      email,
      password,
    })

    sendEmail(user)

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
  const { fullName, email, password } = req.body
  try {
    const updatedUser = await updateUser(id, {
      fullName,
      email,
      password,
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
}
