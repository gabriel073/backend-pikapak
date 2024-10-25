const { Router } = require('express')
const { postEmailHandler } = require('../handlers/newsletterHandlers')

const newsletterRouter = Router()

newsletterRouter.post('/', postEmailHandler)

module.exports = newsletterRouter
