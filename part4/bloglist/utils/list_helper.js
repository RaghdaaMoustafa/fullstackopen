const _ = require('lodash')
const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }

  return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {
  const max = blogs.reduce((max, element) => Math.max(max, element.likes), 0)
  return blogs.length === 0 ? 0 : blogs.find((element) => element.likes === max)
}
// const mostBlogs = (blogs) => {
//   if (blogs.length === 0) {
//     return 0
//   }
//   let authorMap = {}
//   let maxAuthor = blogs[0].author
//   let maxCount = 1
//   for (let i = 0; i < blogs.length; i++) {
//     let element = blogs[i].author
//     console.log(element)
//     if (authorMap[element] === null) {
//       authorMap[element] = 1
//     } else {
//       authorMap[element] += 1
//     }
//     if (authorMap[element] > maxCount) {
//       maxAuthor = element
//       maxCount = authorMap[element]
//       console.log(maxAuthor)
//       console.log(maxCount)
//     }
//   }
//   console.log(authorMap)
//   const maxBlog = {
//     author: maxAuthor,
//     blogs: maxCount,
//   }
//   return maxBlog
// }

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const grouped = _.groupBy(blogs, (blog) => blog.author)

  const blogSum = Object.keys(grouped).map((items) => {
    objectMax = { author: items, blogs: grouped[items].length }
    return objectMax
  })
  return _.maxBy(blogSum, 'blogs')
}
const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  }
  const grouped = _.groupBy(blogs, (blog) => blog.author)

  const authorSum = Object.keys(grouped).map((items) => {
    objectMax = { author: items, likes: _.sumBy(grouped[items], 'likes') }
    return objectMax
  })
  return _.maxBy(authorSum, 'likes')
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
