const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
const getTokenFrom = (request) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogRouter.post('/', userExtractor, async (request, response) => {
  const payload = request.body
  console.log(payload)
  const user = request.user
  const blogUser = await User.findById(user.id)

  const blog = new Blog({
    title: payload.title,
    author: payload.author,
    url: payload.url,
    likes: payload.likes,
    user: blogUser.id,
  })
  // console.log('payload: ', payload)
  // console.log('blog: ', blog)
  // const blog = new Blog(request.body)
  const savedBlog = await blog.save()
  console.log(savedBlog)
  blogUser.blogs = blogUser.blogs.concat(savedBlog._id)
  await blogUser.save()
  response.status(201).json(savedBlog)
})
blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  console.log(blog)
  if (!(blog.user.toString() === user.id.toString())) {
    return response.status(400).json({ error: 'invalid user' })
  }

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
