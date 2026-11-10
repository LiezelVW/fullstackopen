const express = require('express')
const morgan = require('morgan')

// Exercise 3.8: add the POST body to Morgan's tiny-format fields.
morgan.token('post-body', request =>
  request.method === 'POST' ? JSON.stringify(request.body) : ''
)

const createApp = (logStream) => {
  const app = express()
  // Each server start resets this in-memory list. MongoDB comes later.
  let persons = [
    { id: '1', name: 'Arto Hellas', number: '040-123456' },
    { id: '2', name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: '3', name: 'Dan Abramov', number: '12-43-234345' },
    { id: '4', name: 'Mary Poppendieck', number: '39-23-6423122' },
  ]

  app.use(express.json())
  // 3.7 uses morgan('tiny'); 3.8 extends the same format with our token.
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body',
    logStream ? { stream: logStream } : {}))

  app.get('/', (request, response) => {
    response.send('<h1>Phonebook backend</h1><p>Visit /api/persons or /info.</p>')
  })

  // 3.1: return all entries as JSON.
  app.get('/api/persons', (request, response) => response.json(persons))

  // 3.2: calculate the count and time for this request.
  app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${new Date().toString()}</p>`)
  })

  // 3.3: route parameters are strings, as are our stored IDs.
  app.get('/api/persons/:id', (request, response) => {
    const person = persons.find(person => person.id === request.params.id)
    if (!person) return response.status(404).json({ error: 'person not found' })
    response.json(person)
  })

  // 3.4: filter creates a new array without this ID.
  app.delete('/api/persons/:id', (request, response) => {
    persons = persons.filter(person => person.id !== request.params.id)
    response.status(204).end()
  })

  // 3.5: random ID with an additional collision check.
  const generateId = () => {
    let id
    do {
      id = String(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
    } while (persons.some(person => person.id === id))
    return id
  }

  app.post('/api/persons', (request, response) => {
    const { name, number } = request.body || {}
    // 3.6: return immediately on invalid input, before adding anything.
    if (typeof name !== 'string' || !name.trim()) {
      return response.status(400).json({ error: 'name is required' })
    }
    if (typeof number !== 'string' || !number.trim()) {
      return response.status(400).json({ error: 'number is required' })
    }
    if (persons.some(person => person.name === name.trim())) {
      return response.status(400).json({ error: 'name must be unique' })
    }
    const person = { id: generateId(), name: name.trim(), number: number.trim() }
    persons = persons.concat(person)
    response.status(201).json(person)
  })

  app.use((request, response) => {
    response.status(404).json({ error: 'unknown endpoint' })
  })
  app.use((error, request, response, next) => {
    if (error.type === 'entity.parse.failed') {
      return response.status(400).json({ error: 'invalid JSON' })
    }
    next(error)
  })
  return app
}

module.exports = createApp
