require('dotenv').config()
const express = require('express')
const server = express()
const connectDB = require('./db.js')
require('./models/Tutor.models.js')
require('./models/Project.models.js')
require('./models/BankAccount.models.js')
require('./models/Experience.models.js')
require('./models/Rates.models.js')
require('./models/SkillsTech.models.js')
require('./models/User.models.js')
const User = require('./models/User.models')
const {
  addUser,
  getUser,
  getUserBySocketId,
  users,
  sessions,
  addSession,
  getSession,
  getAllSessions,
  getSessionsFromClient,
  getSessionsFromTutor
} = require('./utils/userChatSocket.js')
const Session = require('./models/Session.models.js')
const Review = require('./models/Review.models.js')

const { Server: SocketServer } = require('socket.io')
const http = require('http')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')
const { log } = require('console')
const { find } = require('./models/Tutor.models.js')
const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'
//test
server.use(cors())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', FRONTEND_URL)
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
server.use(express.json())
server.use(morgan('dev'))

const serverhttp = http.createServer(server)
const io = new SocketServer(serverhttp, {
  cors: {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST'],
    transports: ['websocket', 'polling'],
    credentials: true
  },
  allowEIO3: true
})

io.on('connection', socket => {
  socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
    const user = await getUser(receiverId)
    const sender = await getUser(senderId)

    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        message
      })
    }
  })

  socket.on('addUser', async (userId, userInfo) => {
    await addUser(userId, socket.id, userInfo)
    io.emit(
      'online',
      users.filter(user => user.online === true)
    )
    const setOnline = async () => {
      try {
        await User.findByIdAndUpdate(userId, { offline: false })
      } catch (err) {
        console.log(err)
      }
    }

    setOnline()
  })

  socket.on('checkOnline', async userId => {
    const user = await getUser(userId)
    if (user?.online === true) {
      io.to(socket.id).emit('checkOnline', {
        online: true
      })
    } else {
      io.to(socket.id).emit('checkOnline', {
        online: false
      })
    }
  })

  socket.on('openChat', async ({ conversationId, userId, receiverId }) => {
    const user = await getUser(userId)
    const receiver = await getUser(receiverId)
    if (user) {
      user.chatOpen = conversationId
      if (receiver) {
        io.to(receiver?.socketId).emit('checkIsInChat', {
          isInChat: true
        })
      }
    }
  })

  socket.on('closeChat', async ({ userId, receiverId }) => {
    const user = await getUser(userId)
    const receiver = await getUser(receiverId)

    if (user) {
      user.chatOpen = null
      if (receiver) {
        io.to(receiver?.socketId).emit('checkIsInChat', {
          isInChat: false
        })
      }
    }
  })

  socket.on('checkIsInChat', async ({ conversationId, userId }) => {
    const user = await getUser(userId)
    if (user?.chatOpen === conversationId) {
      io.to(socket.id).emit('checkIsInChat', {
        isInChat: true
      })
    } else {
      io.to(socket.id).emit('checkIsInChat', {
        isInChat: false
      })
    }
  })

  socket.on('getNotifications', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setNotifications', {
        notifications: user.notifications
      })
    }
  })

  socket.on(
    'sendNotification',
    async ({ userId, receiverId, notification }) => {
      const user = await getUser(receiverId)
      // generate a unique id for each notification
      if (user) {
        if (
          notification.type === 'message' &&
          user.notifications.find(
            notification =>
              notification.type === 'message' &&
              notification.sender.id === userId &&
              notification.isRead === false
          )
        ) {
          findNotification = user.notifications.find(
            notification =>
              notification.type === 'message' &&
              notification.sender.id === userId &&
              notification.isRead === false
          )
          findNotification.count = findNotification.count + 1
          findNotification.message = `${findNotification.sender.fullName} te envió ${findNotification.count} mensajes`
          findNotification.alerted = false
          io.to(user.socketId).emit('setNotifications', {
            notifications: user.notifications
          })
        } else {
          notificationId = Math.random().toString(36).substr(2, 9)
          if (notification.type === 'message') {
            user.notifications = [
              ...user.notifications,
              {
                ...notification,
                message: `${notification.sender.fullName} te envió un mensaje`,
                id: notificationId,
                count: 1,
                alerted: user.online ? false : true
              }
            ]
          }
          io.to(user.socketId).emit('setNotifications', {
            notifications: user.notifications
          })
        }
      }
    }
  )

  socket.on('setAlerted', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      user.notifications = user.notifications.map(notification => {
        notification.alerted = true
        return notification
      })
    }
  })

  socket.on('readAllNotifications', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      user.notifications = user.notifications.map(notification => {
        notification.isRead = true
        return notification
      })
      io.to(user.socketId).emit('setNotifications', {
        notifications: user.notifications
      })
    }
  })

  socket.on('deleteNotification', async ({ userId, notificationId }) => {
    const user = await getUser(userId)
    if (user) {
      user.notifications = user.notifications.filter(
        notification => notification.id !== notificationId
      )
      io.to(user.socketId).emit('setNotifications', {
        notifications: user.notifications
      })
    }
  })

  //tutorsFavorite

  socket.on('getFavorites', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setFavorites', {
        tutorFavorites: user.tutorFavorites
      })
    }
  })

  socket.on('addTutorFavorite', async ({ userId, tutor }) => {
    const user = await getUser(userId)
    if (user) {
      user.tutorFavorites.push(tutor)
      io.to(user.socketId).emit('setFavorites', {
        tutorFavorites: user.tutorFavorites
      })
    }
  })

  socket.on('removeTutorFavorite', async ({ userId, tutor }) => {
    const user = await getUser(userId)
    if (user) {
      user.tutorFavorites = user.tutorFavorites.filter(
        favorite => favorite._id !== tutor._id
      )
      io.to(user.socketId).emit('setFavorites', {
        tutorFavorites: user.tutorFavorites
      })
    }
  })

  socket.on('createSession', async ({ session }) => {
    await addSession(session)
    const user = await getUser(session.clientUserId)
    const findSession = await getSessionId(session)

    if (user) {
      io.to(user.socketId).emit('createdSession', {
        session
      })
    }
    const sessionToDb = async () => {
      try {
        Session.create({
          sessionId: findSession.sessionId,
          tutorUserId: session.tutorUserId,
          clientUserId: session.clientUserId,
          appointmentDate: session.appointmentDate,
          minutes: session.minutes,
          price: session.price,
          expiredDate: session.expiredDate
        })
      } catch (error) {
        console.log(error)
      }
    }
    sessionToDb()
  })

  socket.on('getSessionsFromClient', async ({ userId }) => {
    const sessions = await getSessionsFromClient(userId)
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setSessions', {
        sessions
      })
    }
  })

  socket.on('getSessionsFromTutor', async ({ userId }) => {
    const sessions = await getSessionsFromTutor(userId)
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setSessions', {
        sessions
      })
    }
  })

  socket.on('getAllSessions', async ({ userId }) => {
    const sessions = await getAllSessions()
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setAllSessions', {
        sessions
      })
    }
  })

  socket.on('getSessionData', async ({ sessionId, userId }) => {
    const session = await getSession(sessionId)
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setSessionData', {
        session
      })
    }
  })

  socket.on('paySession', async ({ sessionId, paymentDetails }) => {
    const session = await getSession(sessionId)
    const user = await getUser(session.clientUserId)
    const tutor = await getUser(session.tutorUserId)
    session.paymentDetails = paymentDetails
    session.isPaid = true
    if (user) {
      io.to(user.socketId).emit('setSessionData', {
        session
      })
    }
    if (tutor) {
      io.to(tutor.socketId).emit('setSessionData', {
        session
      })
    }

    const sessionToDb = async () => {
      try {
        await Session.findAndUpdate(
          { sessionId: session.sessionId },
          { isPaid: true, paymentDetails: paymentDetails }
        )
      } catch (error) {
        console.log(error)
      }
    }
    sessionToDb()
  })

  socket.on('joinSession', async ({ sessionId, userId }) => {
    const session = await getSession(sessionId)
    const user = await getUser(userId)
    const tutor = await getUser(session.tutorUserId)
    const isTutor = session.tutorUserId === userId ? true : false
    isTutor ? (session.tutorHasJoined = true) : (session.clientHasJoined = true)
    if (user) {
      io.to(user.socketId).emit('setSessionData', {
        session
      })
    }
    if (tutor) {
      io.to(tutor.socketId).emit('setSessionData', {
        session
      })
    }
    const sessionToDb = async () => {
      try {
        await Session.findAndUpdate(
          { sessionId: session.sessionId },
          {
            tutorHasJoined: session.tutorHasJoined,
            clientHasJoined: session.clientHasJoined
          }
        )
      } catch (error) {
        console.log(error)
      }
    }
    sessionToDb()
  })

  socket.on(
    'startCounter',
    async ({ sessionId, startedCounterDate, endedCounterDate }) => {
      const session = await getSession(sessionId)
      const user = await getUser(session.clientUserId)
      const tutor = await getUser(session.tutorUserId)
      session.startedCounterDate = startedCounterDate
      session.endedCounterDate = endedCounterDate
      if (user) {
        io.to(user.socketId).emit('setSessionData', {
          session
        })
      }
      if (tutor) {
        io.to(tutor.socketId).emit('setSessionData', {
          session
        })
      }
      const sessionToDb = async () => {
        try {
          await Session.findAndUpdate(
            { sessionId: session.sessionId },
            {
              startedCounterDate: session.startedCounterDate,
              endedCounterDate: session.endedCounterDate
            }
          )
        } catch (error) {
          console.log(error)
        }
      }
      sessionToDb()
    }
  )

  socket.on('reviewSession', async ({ sessionId, review }) => {
    const session = await getSession(sessionId)
    const user = await getUser(session.clientUserId)
    const tutor = await getUser(session.tutorUserId)
    session.isReviewed = true
    if (user) {
      io.to(user.socketId).emit('setSessionData', {
        session
      })
    }
    if (tutor) {
      io.to(tutor.socketId).emit('setSessionData', {
        session
      })
    }
    const sessionToDb = async () => {
      try {
        const Review = await Review.create({
          tutor: session.tutorUserId,
          user: session.clientUserId,
          comment: review.comment,
          rating: review.rating
        })
        await Session.findAndUpdate(
          { sessionId: session.sessionId },
          { isReviewed: true, reviewId: Review._id }
        )
        session.reviewId = Review._id
      } catch (error) {
        console.log(error)
      }
    }
    sessionToDb()
  })

  socket.on('disconnect', async () => {
    const user = await getUserBySocketId(socket.id)
    const usersWithChatOpen = users.filter(r => r.chatOpen === user?.chatOpen)
    if (user) {
      const setOffline = async () => {
        try {
          await User.findByIdAndUpdate(user.userId, {
            offline: true,
            chatOpen: null,
            favoritesTutor: user.tutorFavorites
          })
        } catch (err) {
          console.log(err)
        }
      }
      setOffline()
      user.online = false
      io.emit(
        'online',
        users.filter(user => user.online === true)
      )
    }
    usersWithChatOpen.forEach(user => {
      io.to(user.socketId).emit('checkIsInChat', {
        isInChat: false
      })
    })
  })
})

connectDB()
server.use('/', routes)

serverhttp.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})

module.exports = server
