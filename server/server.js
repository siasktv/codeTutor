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
  addUser, removeUser, getUser, getUserBySocketId, users
} = require('./utils/userChatSocket.js')

const { Server: SocketServer } = require('socket.io')
const http = require('http')
// const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')
const { log } = require('console')
let PORT = 3001
//test
server.use(cors())
server.use((req, res, next) => {
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
// server.use(morgan('dev'))

const serverhttp = http.createServer(server)
const io = new SocketServer(serverhttp, {
  cors: {
    origin: 'http://localhost:5173'
  }
})


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
    io.emit('getUsers', users)
    const setOnline = async () => {
      try {
        await User.findByIdAndUpdate(userId, { offline: false })
      } catch (err) {
        console.log(err)
      }
    }

    setOnline()
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
      removeUser(socket.id)
      io.emit('getUsers', users)
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
