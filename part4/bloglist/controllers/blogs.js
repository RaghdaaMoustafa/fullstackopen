const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const payload = request.body
  console.log(payload)
  const user = await User.findById(payload.userId)
  console.log(user)
  const blog = new Blog({
    title: payload.title,
    author: payload.author,
    url: payload.url,
    likes: payload.likes,
    user: user.id,
  })
  // console.log('payload: ', payload)
  // console.log('blog: ', blog)
  // const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  console.log(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
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
