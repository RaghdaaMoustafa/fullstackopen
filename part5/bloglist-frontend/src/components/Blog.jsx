import { useState } from 'react'
const Blog = ({ blog }) => {
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
              <button>like</button>
            </div>
            <div>{blog.author}</div>
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

export default Blog
