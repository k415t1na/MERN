/* eslint-disable no-unused-vars */
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const jobRouter = require('./controllers/jobs')
const punchRouter = require('./controllers/punches')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('conntecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(result => {
    console.log('connected to db')
  })
  .catch(error => {
    console.log('error connecting to db')
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.tokenExtractor)
app.use(middleware.requestLogger)

app.use(userRouter)
app.use(loginRouter)
app.use(jobRouter)
app.use(punchRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app