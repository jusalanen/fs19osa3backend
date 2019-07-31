const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

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
]

app.use(bodyParser.json())
//app.use(morgan('tiny'))

morgan.token('body', (req, res) => {
  if (req.body.name !== undefined && req.body.number !== undefined) {
    const name = JSON.stringify(req.body.name)
    const number = JSON.stringify(req.body.number)
    const body ='{"name":' + name + ',"number":' + number + '}'
    return body
  }
//  return JSON.stringify(req.body) tulostaa myös id
})

const custMorgan = morgan( (tokens, req, res) =>{
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req,res),
  ].join(' ')
})

app.use(custMorgan)

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.post('/api/persons', (req, res) =>{
  if (req.body.name === undefined || req.body.number === undefined) {
    return res.status(400),json({ error: 'content missing'})
  }
  //console.log(req.body)
  const person = req.body
  if (person.name === '' || person.number === '') {
    return res.status(400),json({ error: 'name or number missing'})
  }
  const p = persons.find(p => p.name === person.name)
  if (p) {
      return res.status(400).json({ error: 'name must be unique'})
  }
  const newId = Math.floor(Math.random() * 9999999 + 10)
  person.id = newId
  persons.concat(person)
  res.status(201).json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.get('/info', (req, res) => {
  const size = persons.length
  const now = new Date
  const text = "Phonebook has info for " + size + " people <br><br>" + now
  res.send(text)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})