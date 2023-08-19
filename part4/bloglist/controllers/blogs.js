const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', (request, response) => {
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
module.exports = blogRouter
