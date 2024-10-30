const { Router } = require('express')
const {
  postUserHandler,
  postRecoveryKeyHandler,
  putNewPasswordHandler,
} = require('../handlers/usersHandlers')

const usersRouter = Router()

usersRouter.post('/', postUserHandler)
usersRouter.post('/recovery', postRecoveryKeyHandler)
usersRouter.put('/update', putNewPasswordHandler)
usersRouter.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

module.exports = usersRouter
