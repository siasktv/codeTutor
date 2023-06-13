const nodemailer = require('nodemailer')
//import the user model?

const sendEmail = (user) => {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'codetutorlatam@gmail.com',
      pass: 'Codetutorlatam',
    },
  })

  let details = {
    from: 'codetutorlatam@gmail.com',
    to: user.email,
    subject: 'Testing',
    text: 'Testing our mail',
  }

  mailTransporter.sendMail(details, (err) => {
    if (err) {
      console.log('it has an error', err)
    } else {
      console.log('email sent')
    }
  })
}

module.exports = sendEmail
