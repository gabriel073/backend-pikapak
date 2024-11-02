import { Router } from 'express'
import { getProtectedHandler } from '../handlers/protectedHandlers'
import verifyToken from '../middlewares/verifyToken'

const protectedRouter = Router()

protectedRouter.use(verifyToken)

protectedRouter.get('/', getProtectedHandler)

export default protectedRouter
