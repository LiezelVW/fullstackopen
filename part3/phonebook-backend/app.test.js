const { test } = require('node:test')
const assert = require('node:assert/strict')
const request = require('supertest')
const createApp = require('./app')

test('list, single entry, missing entry and info', async () => {
  const app = createApp({ write() {} })
  const list = await request(app).get('/api/persons').expect(200).expect('Content-Type', /json/)
  assert.equal(list.body.length, 4)
  const person = await request(app).get('/api/persons/2').expect(200)
  assert.equal(person.body.name, 'Ada Lovelace')
  await request(app).get('/api/persons/999').expect(404)
  const info = await request(app).get('/info').expect(200)
  assert.match(info.text, /4 people/)
  assert.match(info.text, /GMT/)
})

test('create, log POST data, reject duplicate, delete and update count', async () => {
  const logs = []
  const app = createApp({ write: line => logs.push(line) })
  const added = await request(app).post('/api/persons').send({ name: 'Test Person', number: '123-456', id: '1' }).expect(201)
  assert.equal(typeof added.body.id, 'string')
  assert.notEqual(added.body.id, '1')
  await request(app).get(`/api/persons/${added.body.id}`).expect(200)
  assert(logs.some(line => line.includes('POST /api/persons 201') && line.includes('Test Person')))
  const duplicate = await request(app).post('/api/persons').send({ name: 'Test Person', number: '999' }).expect(400)
  assert.equal(duplicate.body.error, 'name must be unique')
  await request(app).delete(`/api/persons/${added.body.id}`).expect(204)
  await request(app).get(`/api/persons/${added.body.id}`).expect(404)
  await request(app).delete(`/api/persons/${added.body.id}`).expect(204)
  const info = await request(app).get('/info')
  assert.match(info.text, /4 people/)
})

test('bad input and malformed JSON do not change the list', async () => {
  const app = createApp({ write() {} })
  for (const body of [{}, { name: 'X' }, { number: '1' }, { name: ' ', number: '1' }, { name: 'X', number: 123 }]) {
    await request(app).post('/api/persons').send(body).expect(400)
  }
  await request(app).post('/api/persons').expect(400)
  await request(app).post('/api/persons').set('Content-Type', 'application/json').send('{broken').expect(400)
  await request(app).get('/missing').expect(404)
  const list = await request(app).get('/api/persons')
  assert.equal(list.body.length, 4)
})
