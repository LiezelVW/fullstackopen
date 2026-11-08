import axios from 'axios'

export type Person = { id: string; name: string; number: string }
type NewPerson = Omit<Person, 'id'>

const baseUrl = 'http://localhost:3001/persons'

const getAll = () =>
  axios.get<Person[]>(baseUrl).then(response => response.data)

const create = (person: NewPerson) =>
  axios.post<Person>(baseUrl, person).then(response => response.data)

const remove = (id: string) =>
  axios.delete(`${baseUrl}/${id}`).then(response => response.data)

const update = (id: string, person: NewPerson) =>
  axios.put<Person>(`${baseUrl}/${id}`, person).then(response => response.data)

export default { getAll, create, remove, update }
