import { Router } from 'express'
import { postEmailHandler } from '../handlers/newsletterHandlers'

const newsletterRouter = Router()

newsletterRouter.post('/', postEmailHandler)

export default newsletterRouter
