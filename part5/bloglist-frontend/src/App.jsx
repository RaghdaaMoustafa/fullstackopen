import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }
  return <div className={className}>{message}</div>
}
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [className, setClassname] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setClassname('fail')
      setNotification('wrong password or username')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }
  if (user === null) {
    return (
      <>
        <h1>Login to application</h1>
        <Notification message={notification} className={className} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }
  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(returnedBlog))

    setClassname('fail')
    setNotification(`a new blog ${blogObject.title}! by ${blogObject.author}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }
  const handleNewBlog = () => {
    return (
      <Togglable buttonLabel="new Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const increaseLikesOf = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const changedBlog = { ...blogs, likes: blog.likes + 1 }

    const response = await blogService.update(id, changedBlog)
    setBlogs(blogs.map((blog) => (blog.id !== id ? blog : response)))
  }
  const deleteBlogOf = async (id) => {
    const blog = blogs.find((blog) => blog.id === id)
    const updatedBlogs = blogs.filter((blog) => blog.id !== id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(id)
      setBlogs(updatedBlogs)
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} className={className} />
      {user && (
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
      <h2>create new</h2>
      {handleNewBlog()}

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            increaseLikes={() => increaseLikesOf(blog.id)}
            removeBlog={() => deleteBlogOf(blog.id)}
          />
        ))}
    </div>
  )
}

export default App
