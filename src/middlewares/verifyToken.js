const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, function (err, data) {
    if (err) {
      res.status(403).json(err)
    } else {
      req.body = data
      next()
    }
  })
}

module.exports = verifyToken
