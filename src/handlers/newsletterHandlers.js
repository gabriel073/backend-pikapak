const { postEmail } = require('../controllers/newsletterController').default

const postEmailHandler = async (req, res) => {
  const { email } = req.body
  try {
    await postEmail(email)
    res.status(200).json({ message: 'Email added' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { postEmailHandler }
