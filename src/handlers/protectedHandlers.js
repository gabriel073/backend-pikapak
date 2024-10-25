const getProtectedHandler = async (req, res) => {
  res.status(200).json({ message: 'Protected Route, successfull access' })
}

module.exports = { getProtectedHandler }
