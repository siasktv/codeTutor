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

const { Server: SocketServer } = require('socket.io')
const http = require('http')
// const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')
const { log } = require('console')
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
// server.use(morgan('dev'))

const serverhttp = http.createServer(server)
const io = new SocketServer(serverhttp, {
  cors: {
    origin: FRONTEND_URL
  }
})

let users = []

const addUser = (userId, socketId) => {
  const findUser = users.find(user => user.userId === userId)
  if (findUser) {
    findUser.socketId = socketId
    findUser.online = true
  } else {
    users.push({ userId, socketId, online: true })
  }
}

// const removeUser = socketId => {
//   users = users.filter(user => user.socketId !== socketId)
// }

const getUser = userId => {
  return users.find(user => user.userId === userId)
}

const getUserBySocketId = socketId => {
  return users.find(user => user.socketId === socketId)
}

io.on('connection', socket => {
  socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
    const user = await getUser(receiverId)
    if (user) {
      io.to(user.socketId).emit('getMessage', {
        senderId,
        message
      })
    }
  })

  socket.on('addUser', async userId => {
    await addUser(userId, socket.id)
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
    if (user.online) {
      io.to(user.socketId).emit('checkOnline', {
        online: true
      })
    } else {
      io.to(socket.id).emit('checkOnline', {
        online: false
      })
    }
  })

  socket.on('disconnect', async () => {
    const user = await getUserBySocketId(socket.id)
    if (user) {
      const setOffline = async () => {
        try {
          await User.findByIdAndUpdate(user.userId, { offline: true })
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
  })
})

// const paths = {
//   tutors: '/tutors',
//   reviews: '/reviews',
//   users: '/users',
//   orders: '/orders',
// }

// server.use(paths.tutors, require('./routes/tutorsRoutes'))
// server.use(paths.reviews, require('./routes/reviewsRoutes'))
// server.use(paths.users, require('./routes/usersRoutes'))
// server.use(paths.orders, require('./routes/orders'))

connectDB()
server.use('/', routes)

if (process.env.NODE_ENV === 'production') PORT = process.env.PORT
serverhttp.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})

module.exports = server
