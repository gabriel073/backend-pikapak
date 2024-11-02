import { Router } from 'express'
import usersRouter from './usersRouter'
import contactsRouter from './contactsRouter'
import loginRouter from './loginRouter'
import protectedRouter from './protectedRouter'
import newsletterRouter from './newsletterRouter'

const routes = Router()

routes.use('/users', usersRouter)
routes.use('/contacts', contactsRouter)
routes.use('/login', loginRouter)
routes.use('/protected', protectedRouter)
routes.use('/newsletter', newsletterRouter)

export default routes
