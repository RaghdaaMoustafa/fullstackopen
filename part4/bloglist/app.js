const express = require('express')
const morgan = require('morgan')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

app.use(morgan('dev'))

mongoose.set('strictQuery', false)
mongoose
  .connect(config.mongoUrl)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connecting to MongoDB:', error.message)
  })
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
module.exports = app
