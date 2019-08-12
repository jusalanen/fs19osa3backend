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

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(person => person.toJSON()))
  }).catch( err => {
    console.log(err.message)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then( person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch( err => {
    console.log(err.message)
    res.status(400).send({ error: 'malformatted id' })
  })  
})

app.post('/api/persons', (req, res) => {
  if (req.body.name === undefined || req.body.number === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  if (req.body.name === '' || req.body.number === '') {
    return res.status(400).json({ error: 'name or number missing' })
  }
/*  const p = persons.find(p => p.name === req.body.name)
  if (p) {
    return res.status(400).json({ error: 'name must be unique' })
  }*/
  
  //Jos laittaa person = req.body ja lisää sitten personille id:n
  //tulee id mukaan logatessa req.body (ilm. person-olio viittaa req.body-olioon).
  //Sen sijaan tällä tavalla logaus toimii halutusti

  const person = new Person({
    name : req.body.name,
    number: req.body.number
  })
  person.save().then( savedPerson => {
    res.status(201).json(savedPerson.toJSON())
  })
})  

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id).then( result => {
    if (result) {
      console.log(result)
      res.status(204).end()
    } else {
      res.status(404).json({ error: 'person already removed from server' })
    }    
  }).catch( err => {
    console.log(err.message)
    res.status(400).json({ error: 'bad id' })
  })
})

app.get('/info', (req, res) => {
  Person.find({}).then(persons => {
    const size = persons.length
    const now = new Date
    const text = "Phonebook has info for " + size + " people <br><br>" + now
    res.send(text)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})