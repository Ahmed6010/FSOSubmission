const express = require('express')
const app = express()
require('dotenv').config()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('build'))
app.use(cors())

morgan.token('logPostReq', (req, res) => JSON.stringify(req.body) );
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :logPostReq'))


app.get('/api/persons', (request, response) => {
  Person.find({}).then( persons => response.json(persons) )
})

app.get('/api/info', (request, response) => {
  const date = new Date();
  Person.countDocuments({}, function (err, count) {
    if (err){
        console.log(err)
    }else{
      response.send('<p>Phonebook has info for '+count+' people </p> <p>'+date+'</p>')
    }
  });
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if(person)
        response.json(person)
      else
        response.status(404).end()  
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(body.name === undefined || body.number === undefined)
    return response.status(400).json({ error: 'content missing' })
 
  const newPerson = new Person({
    name : body.name,
    number : body.number
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)




const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})