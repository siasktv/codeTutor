let users = []
let sessions = []

const addUser = (userId, socketId, userInfo) => {
  const findUser = users.find(user => user.userId === userId)
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
      tutorFavorites: []
    })
  }
}

const getUser = userId => {
  return users.find(user => user.userId === userId)
}

const getUserBySocketId = socketId => {
  return users.find(user => user.socketId === socketId)
}

const addSession = (session, meetLink) => {
  // generate random id
  const sessionId = Math.floor(Math.random() * 1000000000)
  // check if session id already exists
  const findSession = sessions.find(session => session.id === sessionId)
  if (findSession) {
    // if session id already exists, generate new id
    return addSession(session)
  }
  // if session id does not exist, add session to sessions array
  sessions.push({ ...session, id: sessionId, paymentAlert: false, meetLink })

  return sessionId
}

const getSession = sessionId => {
  return sessions.find(session => session.id === sessionId)
}

const getSessionsFromClient = userId => {
  return sessions.filter(session => session.clientUserId === userId)
}

const getSessionsFromTutor = userId => {
  return sessions.filter(session => session.tutorUserId === userId)
}

const getAllSessions = () => {
  return sessions
}

module.exports = {
  addUser,
  getUser,
  getUserBySocketId,
  users,
  sessions,
  addSession,
  getSession,
  getSessionsFromClient,
  getSessionsFromTutor,
  getAllSessions
}
