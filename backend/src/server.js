import express from 'express'
import ws, {WebSocket} from 'ws'
import cors from 'cors'
import logger from 'loglevel'

export async function startServer({port = process.env.PORT} = {}) {
  const app = express()

  const wsServer = new ws.Server({noServer: true})

  wsServer.on('connection', socket => {
    socket.rooms = []
    socket.send(
      JSON.stringify({
        message: `A new user just joined ${socket.upgradeReq.url}!`,
        system: true,
        date: new Date(),
      }),
    )

    socket.on('message', message => {
      logger.info(message)
      wsServer.clients.forEach(client => {
        if (client.upgradeReq.url === socket.upgradeReq.url) {
          if (client.readyState === ws.OPEN) {
            client.send(JSON.stringify({...JSON.parse(message), system: false}))
          }
        }
      })
    })
  })

  app.use(
    cors({
      origin:
        process.env.NODE_ENV === 'production' ? [] : ['http://localhost:3000'],
      optionsSuccessStatus: 200,
    }),
  )

  app.use('/', (req, res) => {
    res.json({message: 'Welcome to the chat!'})
  })

  const server = app.listen({port: port}, () => {
    logger.info(`Listening on port ${port}`)
  })

  server.on('upgrade', (request, socket, head) => {
    wsServer.handleUpgrade(request, socket, head, socket => {
      socket.upgradeReq = request
      wsServer.emit('connection', socket, request)
    })
  })
}
