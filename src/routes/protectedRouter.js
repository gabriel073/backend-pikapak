const { Router } = require('express')
const { getProtectedHandler } = require('../handlers/protectedHandlers')
const verifyToken = require('../middlewares/verifyToken')

const protectedRouter = Router()

protectedRouter.use(verifyToken)

protectedRouter.get('/', getProtectedHandler)

module.exports = protectedRouter
