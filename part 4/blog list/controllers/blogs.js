const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blog)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if(!body.likes) body.likes = 0

  if( !body.title && !body.url )
    return response.status(400).end()

  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user : user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor,async (request, response) => {
  const id = request.params.id

  const blog = await Blog.findById(id)
  const user = request.user

  if ( blog.user.toString() === user.id.toString() ){
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  }
  else
    response.status(401).json({ error: 'Unauthorized user' })

})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter