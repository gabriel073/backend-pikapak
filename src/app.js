const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const cookieParser = require('cookie-parser')

const server = express()

server.use(express.json())
server.use(
  cors({
    origin: "*",
    credentials: true,
  })
)
server.use(cookieParser())

server.use(routes)

module.exports = server
