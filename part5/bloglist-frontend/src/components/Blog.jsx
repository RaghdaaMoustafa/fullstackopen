import { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, increaseLikes, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <>
      <div style={blogStyle}>
        <button
          onClick={() => {
            setShowDetails(!showDetails)
          }}
        >
          {showDetails ? 'hide' : 'view'}
        </button>
        {showDetails ? (
          <>
            <div>{blog.title}</div>
            <div>{blog.url}</div>
            <div>
              {blog.likes}
              <button onClick={increaseLikes}>like</button>
            </div>
            <div>{blog.author}</div>
            <button
              style={{ background: 'red', borderRadius: 8, border: 'none' }}
              onClick={removeBlog}
            >
              remove
            </button>
          </>
        ) : (
          <div>
            {blog.title} {blog.author}
          </div>
        )}
      </div>
    </>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  increaseLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
