const nodemailer = require('nodemailer')

const sendEmail = async (email) => {
  console.log(email)

  let transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 587,
    auth: {
      user: 'support@codetutor.live',
      pass: 'Dante2804',
    },
  })

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <support@codetutor.live>', // sender address
    to: email, // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>', // html body
  })

  console.log('Message sent: %s', info.messageId)
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = sendEmail
