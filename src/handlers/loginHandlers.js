const { getUserbyEmail } = require('../controllers/usersControllers')
const passChecker = require('../utils/passChecker')
const jwt = require('jsonwebtoken')

const postLoginHandler = async (req, res) => {
  const { email, password } = req.body
  try {
    if (email && password) {
      const user = await getUserbyEmail(email)
      const auth = await passChecker(password, user.password)
      if (auth) {
        const token = jwt.sign(user, process.env.JWT_SECRET_KEY, {
          expiresIn: '1h',
        })
        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'Strict',
        })
        res.status(200).json({ message: 'Authorized' })
      } else {
        res.status(401).json({ message: 'Unauthorized' })
      }
    } else {
      res.status(400).json({ message: 'Email and password needed' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { postLoginHandler }
