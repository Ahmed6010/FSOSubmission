const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(cors())
morgan.token('logPostReq', (req, res) => JSON.stringify(req.body) );

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :logPostReq'))

let persons = [
  {
    "id": 1,
    "name": "Ahmed sba",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lwahrani",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  }, 
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const totalPersons = persons.length;
  const date = new Date();
  response.send('<p>Phonebook has info for '+totalPersons+' people </p> <p>'+date+'</p>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number)
    return response.status(400).json({ 
      error: 'content missing' 
    })

  if(persons.find(person => person.name === body.name))
    return response.status(400).json({ 
      error: 'name must be unique' 
    })

  const newPerson = {
    id : Math.floor(Math.random() * 500) + 5,
    name : body.name,
    number : body.number
  }
  
  persons = persons.concat(newPerson);
  //console.log(newPerson)

  response.json(newPerson)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})