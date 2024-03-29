import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    addBlog(newBlog)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <>
      <h2>creat new</h2>
      <form onSubmit={ handleCreate }>
        <div>
          title:
          <input
            value={ newBlogTitle }
            placeholder='title'
            id='title'
            onChange={ ({  target  }) => setNewBlogTitle(target.value) }
          />
        </div>
        <div>
          author:
          <input
            value={ newBlogAuthor }
            placeholder='author'
            id='author'
            onChange={ ({  target  }) => setNewBlogAuthor(target.value) }
          />
        </div>
        <div>
          url:
          <input
            value={ newBlogUrl }
            placeholder='url'
            id='url'
            onChange={ ({  target  }) => setNewBlogUrl(target.value) }
          />
        </div>
        <button id='create' type='submit'>create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm