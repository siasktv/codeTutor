const nodemailer = require('nodemailer')

const sendEmailNewsletter = async email => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.titan.email',
    port: 587,
    auth: {
      user: 'support@codetutor.live',
      pass: 'Dante2804'
    }
  })

  let info = await transporter.sendMail({
    from: 'Code Tutor <support@codetutor.live>', // sender address
    to: email, // list of receivers
    subject: `¡Bienvenid@ a las Newsletters de Code Tutor!`, // Subject line
    text: `¡Bienvenid@ a las Newsletter de Code Tutor!`, // plain text body
    html: `
        <h1>¡Bienvenid@ a las Newsletter de Code Tutor!</h1>
        <p>¡Gracias por suscribirte a las Newsletter de Code Tutor!</p>
        <p>¡Esperamos que disfrutes de nuestros contenidos!</p>
        <p>¡Un saludo!</p>
        <p>Code Tutor</p>
        ` // html body
  })
}

module.exports = sendEmailNewsletter
