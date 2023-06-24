let users = []

const addUser = (userId, socketId, userInfo) => {
  const findUser = users.find((user) => user.userId === userId)
  if (findUser) {
    findUser.userInfo = userInfo
    findUser.socketId = socketId
    findUser.online = true
  } else {
    users.push({
      userId,
      socketId,
      userInfo,
      online: true,
      chatOpen: null,
      notifications: [],
      tutorFavorites: [],
    })
  }
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

const getUserBySocketId = (socketId) => {
  return users.find((user) => user.socketId === socketId)
}

module.exports = {
  addUser,
  getUser,
  getUserBySocketId,
  users,
}
