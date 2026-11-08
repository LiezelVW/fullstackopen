import axios from 'axios'

export type Person = { id: string; name: string; number: string }
type NewPerson = Omit<Person, 'id'>

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>
  axios.get<Person[]>(baseUrl).then(response => response.data)

const create = (person: NewPerson) =>
  axios.post<Person>(baseUrl, person).then(response => response.data)

export default { getAll, create }
