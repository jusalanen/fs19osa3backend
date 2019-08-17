require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
/*
let persons =  [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
   "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]*/

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

const customMorgan = morgan( (tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req, res),
  ].join(' ')
})

app.use(customMorgan)

app.get('/api/persons', (req, res, next) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  }).catch( err => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then( person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch( err => next(err))  
})

app.post('/api/persons', (req, res, next) => {
  if (req.body.name === undefined || req.body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  if (req.body.name === '' || req.body.number === '') {
    return res.status(400).json({ error: 'name or number missing' })
  }

  //Jos laittaa person = req.body ja lisää sitten personille id:n
  //tulee id mukaan logatessa req.body (ilm. person-olio viittaa req.body-olioon).
  //Sen sijaan tällä tavalla logaus toimii halutusti

  const person = new Person({
    name : req.body.name,
    number: req.body.number
  })
  person.save().then( savedPerson => {
    if (savedPerson) {
      res.status(201).json(savedPerson.toJSON())
    }
  }).catch( err => next(err))
})  

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id).then( result => {
    console.log(result)   
    res.status(204).end()   
  }).catch( err => {
    console.log(err)
    next(err)
  })
})

app.put('/api/persons/:id', (req, res, next) => {
  
  const inputPerson = {
    name: req.body.name,
    number: req.body.number,
  }

  Person.findByIdAndUpdate(req.params.id, inputPerson).then( updPers => {
    if (updPers) {
      res.json(updPers.toJSON())
    } else {
      const newPerson = new Person(inputPerson)
      newPerson.save().then( savedPerson => {
        res.json(savedPerson.toJSON())
      })
    }  
  }).catch(error => {
    console.log(error)
    next(error)
  })
})

app.get('/info', (req, res, next) => {
  Person.find({}).then(persons => {
    const size = persons.length
    const now = new Date
    const text = "Phonebook has info for " + size + " people <br><br>" + now
    res.send(text)
  }).catch( err => next(err))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
<<<<<<< Updated upstream
    return response.status(400).json({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
=======
    console.log(error)
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'MongoError' && error.code === 11000) {
    console.log(error)
    return response.status(400).json({ error: 'name must be unique' })
>>>>>>> Stashed changes
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})