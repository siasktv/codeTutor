require('dotenv').config()
const express = require('express')
const server = express()
const connectDB = require('./db.js')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/index.js')
let PORT = 3001

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
server.use(morgan('dev'))

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
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})

module.exports = server
