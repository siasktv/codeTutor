const createUser = require('../../controllers/Users/createUser')
const deleteUser = require('../../controllers/Users/deleteUser')
const getAllUsers = require('../../controllers/Users/getAllUsers')
const updateUser = require('../../controllers/Users/updateUser')

const getAllUsersHandler = async (req, res) => {
  try {
    const allUsers = await getAllUsers()
    res.status(200).json(allUsers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createUserHandler = async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: 'Please fill in the required information' })

  try {
    const newUser = await createUser({
      name,
      email,
      password,
    })
    res.status(200).json(newUser)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deleteUserHandler = async (req, res) => {
  const { userId } = req.params

  try {
    const deletedUser = await deleteUser(userId)
    res.status(200).json(deletedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const updateUserHandler = async (req, res) => {
  const { userId } = req.params
  const { fullName, email, password } = req.body
  try {
    const updatedUser = await updateUser(userId, {
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
