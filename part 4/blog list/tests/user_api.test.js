const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


const initialUsers = [
  {
    username: 'Miko_Lee',
    name: 'Michael Lee',
    password: 'micko_sea',
  },
  {
    username: 'Tasia_bee',
    name: 'Bethânia Tasia',
    password: 'Teevan',
  }
]

beforeEach( async () => {
  await User.deleteMany({})
  for( let user of initialUsers ){
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(user.password, saltRounds)

    let userObject = new User({
      username: user.username,
      name: user.name,
      passwordHash,
    })
    await userObject.save()
  }
},60000)

describe('viewing users', () => {
  test.only('all users are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(initialUsers.length)
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
  })
})

describe('creating users', () => {
  test('create a user', async () => {
    const newUser = {
      username: 'Ahmed_Yns',
      name: 'Ahmed Younsi',
      password: 'yns-bgn'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/users')
    expect(result.body.length).toBe(initialUsers.length + 1 )

    const content = result.body.map(user => user.name)
    expect(content).toContain('Ahmed Younsi')
  })

  /*-*/
  test('if the username or password is missing => 400 Bad Request', async () => {
    const newUser = {
      username: 'Ahmed_Yns',
      name: 'Ahmed Younsi',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const result = await api.get('/api/users')
    expect(result.body.length).toBe(initialUsers.length)
  })

  /*-*/
  test('if the username is already existe => 409 Conflict', async () => {
    const newUser = {
      username: 'Tasia_bee',
      name: 'Tasia Bethânia',
      password: 'Teevan',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(409)

    const result = await api.get('/api/users')
    expect(result.body.length).toBe(initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})