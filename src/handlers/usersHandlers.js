const {
  postUser,
  postRecoveryKey,
  putNewPassword,
} = require('../controllers/usersControllers').default

const jwt = require('jsonwebtoken')

const postUserHandler = async (req, res) => {
  const user = req.body
  try {
    if (
      user.name &&
      user.surname &&
      user.whatsapp &&
      user.email &&
      user.password
    ) {
      await postUser(user)
      res.status(200).json({ message: 'User created' })
    } else {
      res.status(400).json({ message: 'Missing information' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const postRecoveryKeyHandler = async (req, res) => {
  const { email } = req.body

  try {
    await postRecoveryKey(email)
    res.status(200).json({ message: 'Recovery email sent' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const putNewPasswordHandler = async (req, res) => {
  const { key, newPassword } = req.body
  try {
    if (!key) {
      return res.status(401).json({ message: 'Missing key' })
    }
    jwt.verify(key, process.env.JWT_SECRET_KEY, async function (err, data) {
      if (err) {
        res.status(403).json(err)
      } else {
        const message = await putNewPassword(data.email, key, newPassword)
        res.status(200).json({ message })
      }
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  postUserHandler,
  postRecoveryKeyHandler,
  putNewPasswordHandler,
}
