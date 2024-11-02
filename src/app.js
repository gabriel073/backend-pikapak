import express, { json } from 'express'
import cors from 'cors'
import routes from './routes'
import cookieParser from 'cookie-parser'

const server = express()

server.use(json())
server.use(
  cors({
    origin: "https://pikapak.vercel.app",
    credentials: true,
  })
)
server.use(cookieParser())

server.use(routes)

export default server
