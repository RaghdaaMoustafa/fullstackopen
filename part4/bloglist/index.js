const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl =
  'mongodb+srv://raghdamustafa:asfor7abibalbomo@cluster0.bintyzv.mongodb.net/bloglistApp?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  //   const payload = request.body
  //   const blog = new Blog({
  //     title: payload.title,
  //     author: payload.author,
  //     url: payload.url,
  //     likes: payload.likes,
  //   })
  //   console.log('payload: ', payload)
  //   console.log('blog: ', blog)
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
