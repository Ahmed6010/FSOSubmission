// const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}


const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  },0)
}


const favoriteBlog = (blogs) => {
  if( blogs.length === 0 ) return 0

  const likesArray = blogs.map(blog => {
    return blog.likes
  })

  const index = likesArray.indexOf(Math.max(...likesArray))
  const { title, author, likes } = blogs[index]

  return { title, author, likes }
}

/* with lodash : const duplicates = _.countBy(authors, 'author') */
const mostBlogs = (blogs) => {
  if( blogs.length === 0 ) return 0

  const authors = blogs.map(blog => blog.author)

  const data = []
  let dup
  authors.forEach(el => {
    if( data.includes(el) ) return

    dup = authors.filter(author => author === el)
    data.push( el, dup.length )
  })

  let idx = data[1]
  for(let i=1; i<data.length; i+=2){
    if( data[i] > idx) idx = data[i]
  }
  return {
    author : data[data.indexOf(idx)-1],
    blogs : data[data.indexOf(idx)]
  }
}

const mostLikes = (blogs) => {
  if( blogs.length === 0 ) return 0

  const likes = blogs.map(blog => blog.likes)
  const mostLiked = likes.indexOf(Math.max(...likes))

  return {
    author : blogs[mostLiked].author,
    likes : blogs[mostLiked].likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}