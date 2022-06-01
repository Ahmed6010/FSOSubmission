const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
// const mongoose = require("mongoose")
const Person = require('./models/person')


const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POSTdata'))


morgan.token('POSTdata', (req, res) => {
  return JSON.stringify(req.body)
})

// const generateId  = () => {
//   // const maxId = persons.length > 0
//   //   ? Math.max(...persons.map(pr => pr.id))
//   //   : 0
//   // return maxId + 1

//   return Math.floor(Math.random() * 5000);
// }

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})


app.get('/info', (req, res, next) => {
  const date = new Date()

  Person.find({})
    .then(persons => {
      res.send(`<div>
                <p>Phonebook has info for ${persons.length} people</p>
                <p>${date}</p>
              </div>`)
    })
    .catch(error => next(error))
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person)
      else
        res.status(404).end()
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
  const body = req.body

  Person.find({ name: body.name }).then(person => {
    if (Object.keys(person).length === 0){
      const person = new Person({
        name : body.name,
        number : body.number
      })

      person
        .save()
        .then(savedPerson => {
          res.json(savedPerson)
        })
        .catch(error => next(error))
    }
    else {
      const updateDoc = {
        $set: { number: body.number }
      }

      Person.updateOne({ name: body.name }, updateDoc)
        .then(updatedPerson => {
          res.json(updatedPerson)
        })
        .catch(error => next(error))
      // return res.status(409).json({
      //   error : 'name must be unique'
      // })
    }
  })
})


app.put('/api/persons/:id', (req, res, next) => {
  const { number } = req.body

  Person.findByIdAndUpdate(req.params.id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}




app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})