const morgan = require('morgan')
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import routes from '../routes/api'

import swaggerUi from 'swagger-ui-express'
import { swaggerSpecs } from './swagger'

import env from './env'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan(env.logs))
app.use(helmet())
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use('/api', routes)

export { app }
