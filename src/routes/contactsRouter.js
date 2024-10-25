const { Router } = require('express')
const { postContactHandler } = require('../handlers/contactsHandlers')

const loginRouter = Router()

loginRouter.post('/', postContactHandler)

module.exports = loginRouter
