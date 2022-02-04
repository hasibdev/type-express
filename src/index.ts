import http from 'http'

import { app } from 'src/config/express'
import mongoose from 'src/config/mongoose'
import env from 'src/config/env'

// Server Running
const server = http.createServer(app)

// open mongoose connection
mongoose.connect()

server.on('listening', async function () {
   console.log(`Application running on http://localhost:${env.port}`)
})
server.listen(env.port)
