const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
  const blog = await Blog.find({})
  response.json(blog)
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if(!body.likes) body.likes = 0

  if( !body.title && !body.url )
    response.status(400).end()
  else{
    const blog = new Blog(body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const { likes } = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter