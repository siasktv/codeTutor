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
require('./models/Faqs.models.js')
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
  getSessionsFromTutor,
} = require('./utils/userChatSocket.js')
const Session = require('./models/Session.models.js')
const Reviews = require('./models/Review.models.js')
const Tutors = require('./models/Tutor.models.js')

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
  const allowedOrigins = ['https://code-tutor-53cb5.web.app']
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.header('Access-Control-Allow-Origin', '*')
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
    credentials: true,
  },
  allowEIO3: true,
})

io.on('connection', (socket) => {
  socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
    const user = await getUser(receiverId)
    const sender = await getUser(senderId)

    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        message,
      })
    }
  })

  socket.on('addUser', async (userId, userInfo) => {
    await addUser(userId, socket.id, userInfo)
    io.emit(
      'online',
      users.filter((user) => user.online === true)
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

  socket.on('checkOnline', async (userId) => {
    const user = await getUser(userId)
    if (user?.online === true) {
      io.to(socket.id).emit('checkOnline', {
        online: true,
      })
    } else {
      io.to(socket.id).emit('checkOnline', {
        online: false,
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
          isInChat: true,
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
          isInChat: false,
        })
      }
    }
  })

  socket.on('checkIsInChat', async ({ conversationId, userId }) => {
    const user = await getUser(userId)
    if (user?.chatOpen === conversationId) {
      io.to(socket.id).emit('checkIsInChat', {
        isInChat: true,
      })
    } else {
      io.to(socket.id).emit('checkIsInChat', {
        isInChat: false,
      })
    }
  })

  socket.on('getNotifications', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setNotifications', {
        notifications: user.notifications,
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
            (notification) =>
              notification.type === 'message' &&
              notification.sender.id === userId &&
              notification.isRead === false
          )
        ) {
          findNotification = user.notifications.find(
            (notification) =>
              notification.type === 'message' &&
              notification.sender.id === userId &&
              notification.isRead === false
          )
          findNotification.count = findNotification.count + 1
          findNotification.message = `${findNotification.sender.fullName} te envió ${findNotification.count} mensajes`
          findNotification.alerted = false
          io.to(user.socketId).emit('setNotifications', {
            notifications: user.notifications,
          })
          const NotificationToDb = async () => {
            try {
              const userToDb = await User.findOne({ _id: receiverId }).populate(
                {
                  path: 'notifications',
                  populate: {
                    path: 'sender',
                    select: '_id',
                  },
                }
              )
              const notificationExistsTo = userToDb.notifications.filter(
                (notification) =>
                  notification.type === 'message' &&
                  String(notification.sender._id) === userId &&
                  notification.isRead === false
              )[0]
              if (notificationExistsTo) {
                await User.findOneAndUpdate(
                  {
                    _id: receiverId,
                    'notifications.isRead': false,
                    'notifications.type': 'message',
                  },
                  {
                    $inc: {
                      'notifications.$.count': 1,
                    },
                    $set: {
                      'notifications.$.message': `${
                        notification.sender.fullName
                      } te envió ${notificationExistsTo.count + 1} mensajes`,
                      'notifications.$.alerted': false,
                    },
                  }
                )
              } else {
                const notificationTo = {
                  message: `${notification.sender.fullName} te envió un mensaje`,
                  count: 1,
                  alerted: user.online ? false : true,
                  type: notification.type,
                  sender: userId,
                  receiver: receiverId,
                  id: Math.random().toString(36).substr(2, 9),
                  isRead: notification.isRead,
                  createdAt: notification.createdAt,
                  link: notification.link,
                }
                userToDb.notifications = [
                  ...userToDb.notifications,
                  notificationTo,
                ]
                await userToDb.save()
              }
            } catch (err) {
              console.log(err)
            }
          }
          NotificationToDb()
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
                alerted: user.online ? false : true,
              },
            ]
            const NotificationToDb = async () => {
              try {
                const userToDb = await User.findOne({ _id: receiverId })
                const notificationTo = {
                  message: `${notification.sender.fullName} te envió un mensaje`,
                  count: 1,
                  alerted: user.online ? false : true,
                  type: notification.type,
                  sender: userId,
                  receiver: receiverId,
                  id: notificationId,
                  isRead: notification.isRead,
                  createdAt: notification.createdAt,
                  link: notification.link,
                }
                userToDb.notifications = [
                  ...userToDb.notifications,
                  notificationTo,
                ]
                await userToDb.save()
              } catch (err) {
                console.log(err)
              }
            }
            NotificationToDb()
          } else {
            user.notifications = [
              ...user.notifications,
              {
                ...notification,
                id: notificationId,
                alerted: user.online ? false : true,
              },
            ]
            const NotificationToDb = async () => {
              try {
                const userToDb = await User.findOne({ _id: receiverId })
                const notificationTo = {
                  id: notificationId,
                  alerted: user.online ? false : true,
                  type: notification.type,
                  sender: userId,
                  receiver: receiverId,
                  isRead: notification.isRead,
                  createdAt: notification.createdAt,
                  message: notification.message,
                  link: notification.link,
                }
                userToDb.notifications = [
                  ...userToDb.notifications,
                  notificationTo,
                ]
                await userToDb.save()
              } catch (err) {
                console.log(err)
              }
            }
            NotificationToDb()
          }

          io.to(user.socketId).emit('setNotifications', {
            notifications: user.notifications,
          })
        }
      }
    }
  )

  socket.on('setAlerted', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      user.notifications = user.notifications.map((notification) => {
        notification.alerted = true
        return notification
      })
      const NotificationToDb = async () => {
        try {
          const userToDb = await User.findOne({ _id: userId })
          const userNotifications = userToDb.notifications.map(
            (notification) => {
              notification.alerted = true
              return notification
            }
          )

          await User.findOneAndUpdate(
            {
              _id: userId,
            },
            {
              $set: {
                notifications: userNotifications,
              },
            }
          )
        } catch (err) {
          console.log(err)
        }
      }
      NotificationToDb()
    }
  })

  socket.on('readAllNotifications', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      user.notifications = user.notifications.map((notification) => {
        notification.isRead = true
        return notification
      })
      io.to(user.socketId).emit('setNotifications', {
        notifications: user.notifications,
      })
      const NotificationToDb = async () => {
        try {
          const userToDb = await User.findOne({ _id: userId })
          const userNotifications = userToDb.notifications.map(
            (notification) => {
              notification.isRead = true
              return notification
            }
          )

          await User.findOneAndUpdate(
            {
              _id: userId,
            },
            {
              $set: {
                notifications: userNotifications,
              },
            }
          )
        } catch (err) {
          console.log(err)
        }
      }
      NotificationToDb()
    }
  })

  socket.on('deleteNotification', async ({ userId, notificationId }) => {
    const user = await getUser(userId)
    if (user) {
      user.notifications = user.notifications.filter(
        (notification) => notification.id !== notificationId
      )
      io.to(user.socketId).emit('setNotifications', {
        notifications: user.notifications,
      })
      const NotificationToDb = async () => {
        try {
          const userToDb = await User.findOne({ _id: userId })
          const userNotifications = userToDb.notifications.filter(
            (notification) => notification.id !== notificationId
          )

          await User.findOneAndUpdate(
            {
              _id: userId,
            },
            {
              $set: {
                notifications: userNotifications,
              },
            }
          )
        } catch (err) {
          console.log(err)
        }
      }
      NotificationToDb()
    }
  })

  //tutorsFavorite

  socket.on('getFavorites', async ({ userId }) => {
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setFavorites', {
        tutorFavorites: user.tutorFavorites,
      })
    }
  })

  socket.on('addTutorFavorite', async ({ userId, tutor }) => {
    const user = await getUser(userId)
    if (user) {
      user.tutorFavorites.push(tutor)
      io.to(user.socketId).emit('setFavorites', {
        tutorFavorites: user.tutorFavorites,
      })
    }
    const saveInDb = async () => {
      try {
        const user = await User.findOne({
          _id: userId,
        })
        const exists = user.favoritesTutor.find(
          (favorite) => favorite._id === tutor._id
        )
        if (!exists) {
          await User.updateOne(
            { _id: userId },
            { $push: { favoritesTutor: tutor._id } }
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    saveInDb()
  })

  socket.on('removeTutorFavorite', async ({ userId, tutor }) => {
    const user = await getUser(userId)
    if (user) {
      user.tutorFavorites = user.tutorFavorites.filter(
        (favorite) => favorite._id !== tutor._id
      )
      io.to(user.socketId).emit('setFavorites', {
        tutorFavorites: user.tutorFavorites,
      })
    }
    const saveInDb = async () => {
      try {
        const user = await User.findOne({
          _id: userId,
        })
        const exists = user.favoritesTutor.find(
          (favorite) => favorite._id === tutor._id
        )
        if (exists) {
          await User.updateOne(
            { _id: userId },
            { $pull: { favoritesTutor: tutor._id } }
          )
        }
      } catch (error) {
        console.log(error)
      }
    }
    saveInDb()
  })

  socket.on('createSession', async ({ session }) => {
    const createdSession = await addSession(session)
    const user = await getUser(session.clientUserId)

    if (user) {
      io.to(user.socketId).emit('createdSession', {
        ...session,
        sessionId: createdSession,
      })
    }
    const sessionToDb = async () => {
      try {
        Session.create({
          sessionId: createdSession,
          tutorUserId: session.tutorUserId,
          clientUserId: session.clientUserId,
          appointmentDate: session.appointmentDate,
          minutes: session.minutes,
          price: session.price,
          expiredDate: session.expiredDate,
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
        sessions,
      })
    }
  })

  socket.on('getSessionsFromTutor', async ({ userId }) => {
    const sessions = await getSessionsFromTutor(userId)
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setSessions', {
        sessions,
      })
    }
  })

  socket.on('getAllSessions', async ({ userId }) => {
    const sessions = await getAllSessions()
    const user = await getUser(userId)
    if (user) {
      io.to(user.socketId).emit('setAllSessions', {
        sessions,
      })
    }
  })

  socket.on('getSessionData', async ({ sessionId, userId }) => {
    const session = await getSession(sessionId)
    const user = await getUser(userId)
    if (!session) {
      io.to(user.socketId).emit('setSessionData', {
        session: null,
      })
    } else if (
      userId !== session.clientUserId &&
      userId !== session.tutorUserId
    ) {
      io.to(user.socketId).emit('setSessionData', {
        session: null,
      })
    } else if (user) {
      io.to(user.socketId).emit('setSessionData', {
        session,
      })
    }
  })

  socket.on('dismissPayment', async ({ sessionId }) => {
    const session = await getSession(sessionId)
    session.paymentAlert = true
    const updateDb = async () => {
      try {
        await Session.findOneAndUpdate(
          { sessionId: Number(sessionId) },
          {
            $set: {
              paymentAlert: true,
            },
          }
        )
      } catch (err) {
        console.log(err)
      }
    }
    updateDb()
  })

  socket.on('joinSession', async ({ sessionId, userId }) => {
    const session = await getSession(sessionId)
    const isTutor = session.tutorUserId === userId ? true : false
    const user = isTutor
      ? await getUser(session.clientUserId)
      : await getUser(session.tutorUserId)
    const tutor = isTutor
      ? await getUser(session.tutorUserId)
      : await getUser(session.clientUserId)
    isTutor ? (session.tutorHasJoined = true) : (session.clientHasJoined = true)
    if (user) {
      io.to(user.socketId).emit('setSessionData', {
        session,
      })
    }
    if (tutor) {
      io.to(tutor.socketId).emit('setSessionData', {
        session,
      })
    }
    const sessionToDb = async () => {
      try {
        await Session.findOneAndUpdate(
          { sessionId: Number(sessionId) },
          {
            tutorHasJoined: session.tutorHasJoined,
            clientHasJoined: session.clientHasJoined,
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
    async ({
      sessionId,
      startedCounterDate,
      endedCounterDate,
      expiredDate,
    }) => {
      const session = await getSession(sessionId)
      const user = await getUser(session.clientUserId)
      const tutor = await getUser(session.tutorUserId)
      session.startedCounterDate = startedCounterDate
      session.endedCounterDate = endedCounterDate
      session.expiredDate = expiredDate
      if (user) {
        io.to(user.socketId).emit('setSessionData', {
          session,
        })
      }
      if (tutor) {
        io.to(tutor.socketId).emit('setSessionData', {
          session,
        })
      }
      const sessionToDb = async () => {
        try {
          await Session.findOneAndUpdate(
            { sessionId: Number(sessionId) },
            {
              startedCounterDate: session.startedCounterDate,
              endedCounterDate: session.endedCounterDate,
              expiredDate: session.expiredDate,
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
        session,
      })
    }
    if (tutor) {
      io.to(tutor.socketId).emit('setSessionData', {
        session,
      })
    }
    const sessionToDb = async () => {
      try {
        const Review = await Reviews.create({
          tutor: session.tutorUserId,
          user: session.clientUserId,
          comment: review.comment,
          rating: review.rating,
        })
        await Session.findOneAndUpdate(
          { sessionId: Number(sessionId) },
          { isReviewed: true, reviewId: Review._id }
        )
        await Tutors.findOneAndUpdate(
          { user: session.tutorUserId },
          { $push: { reviews: Review._id } }
        )

        session.reviewId = Review._id
      } catch (error) {
        console.log(error)
      }
    }
    sessionToDb()
  })

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`)
  })

  socket.on('disconnect', async () => {
    const user = await getUserBySocketId(socket.id)
    const usersWithChatOpen = users.filter((r) => r.chatOpen === user?.chatOpen)
    if (user) {
      const setOffline = async () => {
        try {
          await User.findByIdAndUpdate(user.userId, {
            offline: true,
            chatOpen: null,
          })
        } catch (err) {
          console.log(err)
        }
      }
      setOffline()
      user.online = false
      io.emit(
        'online',
        users.filter((user) => user.online === true)
      )
    }
    usersWithChatOpen.forEach((user) => {
      io.to(user.socketId).emit('checkIsInChat', {
        isInChat: false,
      })
    })
  })
})

const getSessions = async () => {
  await Session.find({}).then((found) => {
    found.forEach((ses) => {
      sessions.push({
        id: ses.sessionId,
        tutorUserId: String(ses.tutorUserId._id),
        clientUserId: String(ses.clientUserId._id),
        appointmentDate: ses.appointmentDate,
        minutes: ses.minutes,
        price: ses.price,
        expiredDate: ses.expiredDate,
        isPaid: ses.isPaid,
        paymentDetails: ses.paymentDetails,
        clientHasJoined: ses.clientHasJoined,
        tutorHasJoined: ses.tutorHasJoined,
        startedCounterDate: ses.startedCounterDate,
        endedCounterDate: ses.endedCounterDate,
        expiredDate: ses.expiredDate,
        isCancelled: ses.isCancelled,
        isRefunded: ses.isRefunded,
        isReviewed: ses.isReviewed,
        reviewId: ses.reviewId,
        isDisputed: ses.isDisputed,
      })
    })
  })
  console.log('Sessions successfully loaded')
}

const getUsers = async () => {
  await User.find({})
    .populate({
      path: 'notifications',
      populate: {
        path: 'sender',
        select: 'fullName image',
      },
    })
    .populate({
      path: 'notifications',
      populate: {
        path: 'receiver',
        select: 'fullName image',
      },
    })
    .then((found) => {
      found.forEach((user) => {
        users.push({
          userId: String(user._id),
          socketId: null,
          userInfo: {
            id: String(user._id),
            ...user,
          },
          online: false,
          chatOpen: null,
          notifications: [...user.notifications],
          tutorFavorites: [],
        })
      })
    })
  console.log('Users successfully loaded')
}

server.use((req, res, next) => {
  req.io = io
  req.users = users
  req.sessions = sessions
  next()
})
server.use('/', routes)
connectDB()
getUsers()
getSessions()
serverhttp.listen(PORT, async () => {
  console.log(`server listening on port ${PORT}`)
})

module.exports = server
