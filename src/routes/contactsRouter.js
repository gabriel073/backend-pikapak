import { Router } from 'express'
import { postContactHandler } from '../handlers/contactsHandlers'

const loginRouter = Router()

loginRouter.post('/', postContactHandler)

export default loginRouter
