const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
  const user = await User.find({}).populate('blogs', { url: 1, author: 1, title: 1 })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if( !username || !password )
    return response.status(400).json({
      error: 'username or password is missing'
    })
  else if( username.length < 3 )
    return response.status(400).json({
      error: 'username must be at least 3 characters long'
    })
  else if( password.length < 3 )
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })

  const existedUser = await User.findOne({ username: username })
  if( existedUser )
    return response.status(409).json({
      error: 'username must be unique'
    })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter