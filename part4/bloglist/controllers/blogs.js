const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post('/', async (request, response) => {
  const payload = request.body
  const blog = new Blog({
    title: payload.title,
    author: payload.author,
    url: payload.url,
    likes: payload.likes,
    
  })
  // console.log('payload: ', payload)
  // console.log('blog: ', blog)
  // const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})
blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
blogRouter.put('/:id', async (request, response) => {
  const payload = request.body
  const blog = {
    title: payload.title,
    author: payload.author,
    url: payload.url,
    likes: payload.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})
module.exports = blogRouter
