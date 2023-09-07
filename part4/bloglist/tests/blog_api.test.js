const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
mongoose.set('bufferTimeoutMS', 30000)
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  // await Blog.insertMany(initialBlogs)
  const blogObjects = initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
}, 100000)
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('app returns correct amount of blog posts', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('verify that the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const id = response.body.map((blog) => blog.id)
  console.log(id)
  expect(id).toBeDefined()
})
test('a new blog post can be made', async () => {
  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  }
  console.log(newBlog)
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/Blogs')
  console.log(response.body)
  expect(response.body).toHaveLength(initialBlogs.length + 1)
})
test('default value of like property to 0', async () => {
  const newBlog = {
    title: 'raghad me',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  }
  console.log(newBlog)
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})
test('title missing', async () => {
  const newBlog = {
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 3,
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})
test('url missing', async () => {
  const newBlog = {
    title: 'raghad me',
    author: 'Robert C. Martin',
    likes: 3,
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('deleting a post', async () => {
  const response = await api.get('/api/blogs')
  const deletedBlogId = response.body[0].id
  await api.delete(`/api/blogs/${deletedBlogId}`).expect(204)
  const remainedBlogs = await api.get('/api/blogs')
  expect(remainedBlogs.body).toHaveLength(initialBlogs.length - 1)
  const titles = remainedBlogs.body.map((blog) => blog.title)
  expect(titles).not.toContain('React patterns')
})
test('updating a blog', async () => {
  const updateBlog = {
    title: 'iam arse',
  }
  const response = await api.get('/api/blogs')
  await api.put(`/api/blogs/${response.body[0].id}`).send(updateBlog)
  const updatedBlogs = await api.get('/api/blogs')
  // const titles = updatedBlogs.body.map((blog) => blog.title)
  // expect(titles).toContain('iam arse')
  expect(updatedBlogs.body[0].title).toBe('iam arse')
})

describe('when there is initially one user', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })
  test('creation succeeds with a fresh username', async () => {
    const userAtStart = await helper.usersInDb()
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const userAtEnd = await helper.usersInDb()
    expect(userAtEnd).toHaveLength(userAtStart.length + 1)
    const usernames = userAtEnd.map((user) => user.username)
    expect(usernames).toContain(newUser.username)
  })
  test('creation fails with proper statuscode and message if username already take', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails with proper statuscode and message if username not given', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain(
      'password must be at least 3 characters'
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})
