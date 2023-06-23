let users = []

const addUser = (userId, socketId) => {
  const findUser = users.find(user => user.userId === userId)
  if (findUser) {
    findUser.socketId = socketId
    findUser.online = true
  } else {
    users.push({ userId, socketId, online: true, chatOpen: null })
    console.log(users)
  }
}

const getUser = userId => {
  return users.find(user => user.userId === userId)
}

const getUserBySocketId = socketId => {
  return users.find(user => user.socketId === socketId)
}

module.exports = {
  addUser,
  getUser,
  getUserBySocketId,
  users
}
