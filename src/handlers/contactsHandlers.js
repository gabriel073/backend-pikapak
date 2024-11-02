const { postContact } = require('../controllers/contactsController').default

const postContactHandler = async (req, res) => {
  const contact = req.body
  await postContact(contact)
  try {
    res.status(200).json({ message: 'Contact query sent' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = { postContactHandler }
