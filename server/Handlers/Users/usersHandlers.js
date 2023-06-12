const createUser = require('../../controllers/Users/createUser')

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

module.exports = {
  createUserHandler,
}
