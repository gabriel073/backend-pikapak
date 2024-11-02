import { Router } from 'express'
import { postLoginHandler } from '../handlers/loginHandlers'

const loginRouter = Router()

loginRouter.post('/', postLoginHandler)

export default loginRouter
