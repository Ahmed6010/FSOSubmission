const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  for( let blog of initialBlogs ){
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
},60000)


describe('viewing blogs', () => {
  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
  })

  test('the unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(typeof response.body[0].id).toBe('string')
  })
})


describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'test post request',
      author: 'Ahmed Yns',
      url: 'https://ahmed-younsi.com/',
      likes: 7
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs')
    expect(result.body.length).toBe(initialBlogs.length + 1 )

    const content = result.body.map(blog => blog.title)
    expect(content).toContain('test post request')

  })

  test('if the likes property is missing it will default to the value 0', async () => {
    const newBlog = {
      title: 'test post request without likes property',
      author: 'Ahmed Yns',
      url: 'https://ahmed-younsi.com/'
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs')
    expect(result.body.length).toBe(initialBlogs.length + 1 )

    const content = result.body.filter(blog => blog.title === 'test post request without likes property')
    expect(content[0].likes).toBe(0)
  })

  test('if the title and url are missing => 400 Bad Request', async () => {
    const newBlog = {
      author: 'Ahmed Yns',
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(400)

    const result = await api.get('/api/blogs')
    expect(result.body.length).toBe(initialBlogs.length)
  })
})


describe('deletion of a blog', () => {
  test('if id is valid => succeeds with 204', async () => {
    const response = await Blog.find({})
    const blogToDelete = response[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})


describe('updation of a blog', () => {
  test.only('if id is valid => succeeds with 200', async () => {
    const response = await Blog.find({})
    const blogToUpdate = response[0]
    const newBlog = {
      likes: 15,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    const updatedBlog = blogsAtEnd[0]
    expect(updatedBlog.likes).toBe(15)
  })
})



afterAll(() => {
  mongoose.connection.close()
})