import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, userName }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikes = () => {
    const likes = blog.likes++
    const newObject = { likes, ...blog }
    updateBlog(newObject)
  }

  const handleRemove = () => {
    if (window.confirm(`remove blog : ${ blog.title } by ${ blog.author }`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div style={ blogStyle }>
      { visible === false ?
        <div>
          { blog.title } { blog.author } <button onClick={ toggleVisibility }>view</button>
        </div> :
        <div>
          <p>{ blog.title } { blog.author } <button onClick={ toggleVisibility }>hide</button></p>
          <p>{ blog.url }</p>
          <div>{ blog.likes } <button onClick={ handleLikes }>like</button></div>
          <p>{ blog.user.name }</p>
          {
            userName === blog.user.name ?
              <button style={ { backgroundColor: 'blue' } } onClick={ handleRemove }>remove</button> : null
          }

        </div>
      }

    </div>
  )
}

export default Blog