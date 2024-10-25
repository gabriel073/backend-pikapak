const bcrypt = require('bcryptjs')

const passChecker = (loginPassword, dbPassword) => {
  return bcrypt.compare(loginPassword, dbPassword)
}

module.exports = passChecker
