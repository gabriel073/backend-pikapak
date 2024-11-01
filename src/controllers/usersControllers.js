const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')
const nodeMailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const prisma = new PrismaClient()

const getUserbyEmail = async (email) => {
  const user = await prisma.user.findUnique({ where: { email } })
  return user
}

const postUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 5)

  const createdUser = await prisma.user.create({
    data: { ...user, password: hashedPassword },
  })
  return createdUser
}

const postRecoveryKey = async (email) => {
  const user = await getUserbyEmail(email)
  user.recoveryKey = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h',
  })
  await prisma.user.update({ where: { email }, data: user })
  await prisma.$disconnect()

  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.RECOVERY_SENDER_EMAIL,
      pass: process.env.RECOVERY_SENDER_PASS,
    },
  })

  const recoveryUrl = process.env.RECOVERY_URL;

  const mail = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: `Recuperación de Contraseña Pikapak`,
    html: `
      <h2>Hola ${user.name}</h2>
      <h2>Se solicitó la recuperación de contraseña en la página de Pikapak para la cuenta asociada a esta dirección de correo electrónico</h2>
      <h2>Si no fuiste vos por favor ignorá este mail</h2>
      <h2>Si necesitás recuperar tu contraseña podés hacer click en el siguiente <a href="${recoveryUrl}/?key=${user.recoveryKey}">enlace</a></h2>
    `,
  }

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      throw Error(error)
    } else {
      return info
    }
  })
}

const putNewPassword = async (email, key, newPassword) => {
  const user = await getUserbyEmail(email)
  if (user.recoveryKey === key) {
    const hashedPassword = await bcrypt.hash(newPassword, 5)
    user.password = hashedPassword
    user.recoveryKey = ''
    await prisma.user.update({ where: { email }, data: user })
    return 'Password updated'
  } else {
    return 'Invalid key'
  }
}

module.exports = { getUserbyEmail, postUser, postRecoveryKey, putNewPassword }
