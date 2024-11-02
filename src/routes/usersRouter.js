import { Router } from 'express'
import { postUserHandler, postRecoveryKeyHandler, putNewPasswordHandler } from '../handlers/usersHandlers'

const usersRouter = Router()

usersRouter.post('/', postUserHandler)
usersRouter.post('/recovery', postRecoveryKeyHandler)
usersRouter.put('/update', putNewPasswordHandler)

export default usersRouter
