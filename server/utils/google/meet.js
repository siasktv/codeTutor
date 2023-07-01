// const passport = require('passport')
// const GoogleStrategy = require('passport-google-oauth20').Strategy
// const { Router } = require('express')
// const app = Router()
// const Meeting = require('google-meet-api').meet
// clientID =
//   '596530698301-9po1h4lldcs2152dgomgbpnc49i1p2te.apps.googleusercontent.com'
// clientSecret = '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'

// // passport.use(
// //   new GoogleStrategy(
// //     {
// //       clientID: clientID,
// //       clientSecret: clientSecret,
// //       callbackURL:
// //         'https://fdbe-181-24-146-45.ngrok-free.app/meet/auth/callback'
// //     },
// //     function (accessToken, refreshToken, profile, cb) {
// //       console.log('refreshToken : ', refreshToken)
// //       return cb()
// //     }
// //   )
// // )

// // app.get(
// //   '/auth/callback',
// //   passport.authenticate('google', { failureRedirect: '/' })
// // )

// // app.get(
// //   '/auth',
// //   passport.authenticate('google', {
// //     scope: ['profile', 'https://www.googleapis.com/auth/calendar'],
// //     accessType: 'offline',
// //     prompt: 'consent'
// //   })
// // )

// app.get('/', function (req, res) {

//   res.send('done')
// })

// module.exports = app
