import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Toggleable from './components/Toggleable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [blogChanges, setBlogChanges] = useState(null)

  const noteFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogs )
    })
  }, [blogChanges])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const login = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
    } catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setBlogs([])
  }

  const addBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.create(newBlog)
      noteFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(createdBlog))
      setSuccessMessage(`a new blog ( ${createdBlog.title} ) by ${user.name} added`)
      setBlogChanges(1)
      setTimeout(() => {
        setSuccessMessage(null)
        setBlogChanges(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog)
      setBlogChanges(1)
      setBlogs(blogs.map(blog => {
        if(blog.id === updatedBlog.id)
          return updatedBlog
        return blog
      }))
      setTimeout(() => {
        setBlogChanges(null)
      }, 2000)
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async id => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(n => n.id !== id))
    } catch (error) {
      setErrorMessage(error)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <>
      { user === null ?
        <LoginForm login={login} errorMessage={ errorMessage }/> :
        <div>
          <h2>Blogs</h2>
          <Notification message={successMessage} color='green'/>
          <span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
          <Toggleable buttonLabel='new blog' ref={noteFormRef}>
            <BlogForm addBlog={addBlog}/>
          </Toggleable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} userName={user.name}/>
          )}
        </div>
      }
    </>
  )
}

export default App
