const mongoose = require('mongoose')
const supertest = require('supertest')
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
  }
]

// // Seed the database with blogs
// beforeEach(async () => {
//   await Blog.create(initialBlogs)
// })

beforeEach(async () => {
  await Blog.deleteMany({})
  const user = await User.findOne({ username: 'Tasia_bee' })
  for( let blog of initialBlogs ){
    let blogObject = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: user._id
    })
    await blogObject.save()
  }
},100000)


describe('viewing blogs', () => {
  test('all notes are returned', async () => {
    const response = await api.get('/api/blogs')
    console.log(response)
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
    const user =  {
      username: 'Tasia_bee',
      password: 'Teevan'
    }
    const loginResponse = await api
      .post('/api/login/')
      .send(user)
      .expect(200)

    const newBlog = {
      title: 'test post request',
      author: 'Ahmed Yns',
      url: 'https://ahmed-younsi.com/',
      likes: 7
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs/')
    console.log(result.body)
    expect(result.body.length).toBe(initialBlogs.length + 1 )

    const content = result.body.map(blog => blog.title)
    expect(content).toContain('test post request')

  })


  test('if the likes property is missing it will default to the value 0', async () => {
    const user =  {
      username: 'Miko_Lee',
      password: 'micko_sea'
    }
    const loginResponse = await api
      .post('/api/login/')
      .send(user)
      .expect(200)

    const newBlog = {
      title: 'test post request without likes property',
      author: 'Ahmed Yns',
      url: 'https://ahmed-younsi.com/'
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs')
    expect(result.body.length).toBe(initialBlogs.length + 1 )

    const content = result.body.filter(blog => blog.title === 'test post request without likes property')
    expect(content[0].likes).toBe(0)
  })


  test('if the title and url are missing => 400 Bad Request', async () => {
    const user =  {
      username: 'Miko_Lee',
      password: 'micko_sea'
    }
    const loginResponse = await api
      .post('/api/login/')
      .send(user)
      .expect(200)

    const newBlog = {
      author: 'Ahmed Yns',
    }

    await api
      .post('/api/blogs/')
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .send(newBlog)
      .expect(400)

    const result = await api.get('/api/blogs')
    expect(result.body.length).toBe(initialBlogs.length)
  })


  test('if the token is not provided => 401 Unauthorized', async () => {
    const newBlog = {
      title: 'test post request without token',
      author: 'Yns Ahmed',
      url: 'https://younsi-ahmed.com/'
    }

    await api
      .post('/api/blogs/')
      .send(newBlog)
      .expect(401)

    const result = await api.get('/api/blogs')
    expect(result.body.length).toBe(initialBlogs.length)
  })
})


describe.only('deletion of a blog', () => {
  test('if id is valid and the user is not authorized => 401 Unauthorized user', async () => {
    const user =  {
      username: 'Miko_Lee',
      password: 'micko_sea'
    }
    const loginResponse = await api
      .post('/api/login/')
      .send(user)
      .expect(200)

    const response = await Blog.find({})
    const blogToDelete = response[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .expect(401)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(blogToDelete.title)
  })


  test('if id is valid and the user is authorized => succeeds with 204', async () => {
    const user =  {
      username: 'Tasia_bee',
      password: 'Teevan'
    }
    const loginResponse = await api
      .post('/api/login/')
      .send(user)
      .expect(200)

    const response = await Blog.find({})
    const blogToDelete = response[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${loginResponse.body.token}`)
      .expect(204)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)
    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})


// this test is not fixed
describe('updation of a blog', () => {
  test('if id is valid => succeeds with 200', async () => {
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