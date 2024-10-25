const { Router } = require('express')
const { postLoginHandler } = require('../handlers/loginHandlers')

const loginRouter = Router()

loginRouter.post('/', postLoginHandler)

module.exports = loginRouter
