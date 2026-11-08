import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import personService from './services/persons'
import type { Person } from './services/persons'

const Filter = ({ value, onChange }: {
  value: string
  onChange: (value: string) => void
}) => (
  <div>
    <label htmlFor="name-filter">filter shown with: </label>
    <input id="name-filter" value={value} onChange={event => onChange(event.target.value)} />
  </div>
)

const PersonForm = ({ name, number, onNameChange, onNumberChange, onSubmit, saving }: {
  name: string
  number: string
  onNameChange: (value: string) => void
  onNumberChange: (value: string) => void
  saving: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) => (
  <form onSubmit={onSubmit}>
    <fieldset disabled={saving}>
    <div>
      <label htmlFor="person-name">name: </label>
      <input id="person-name" value={name} onChange={event => onNameChange(event.target.value)} required />
    </div>
    <div>
      <label htmlFor="person-number">number: </label>
      <input id="person-number" type="tel" value={number} onChange={event => onNumberChange(event.target.value)} required />
    </div>
    <button type="submit">{saving ? 'Saving…' : 'add'}</button>
    </fieldset>
  </form>
)

const Persons = ({ persons, onDelete, deletingIds }: {
  persons: Person[]
  onDelete: (person: Person) => void
  deletingIds: string[]
}) => (
  <div>
    {persons.map(person => (
      <p key={person.id}>
        {person.name} {person.number}{' '}
        <button type="button" onClick={() => onDelete(person)} disabled={deletingIds.includes(person.id)}>
          {deletingIds.includes(person.id) ? 'Deleting…' : 'delete'}
        </button>
      </p>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState<Person[]>([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [deletingIds, setDeletingIds] = useState<string[]>([])
  const [deleteError, setDeleteError] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [loadError, setLoadError] = useState('')

  useEffect(() => {
    let active = true
    personService.getAll()
      .then(initialPersons => {
        if (active) setPersons(initialPersons)
      })
      .catch(() => {
        if (active) setLoadError('Could not load contacts. Check that npm run server is running.')
      })
    return () => { active = false }
  }, [])

  const [filter, setFilter] = useState('')
  const visiblePersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const deletePerson = (person: Person) => {
    if (deletingIds.includes(person.id)) return
    if (!window.confirm(`Delete ${person.name}?`)) return

    setDeleteError('')
    setDeletingIds(currentIds => currentIds.concat(person.id))
    personService.remove(person.id)
      .then(() => {
        setPersons(currentPersons => currentPersons.filter(p => p.id !== person.id))
      })
      .catch(() => {
        setDeleteError(`Could not delete ${person.name}. Check the server and try again.`)
      })
      .finally(() => {
        setDeletingIds(currentIds => currentIds.filter(id => id !== person.id))
      })
  }

  const addPerson = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (saving || !newName.trim() || !newNumber.trim()) return

    if (persons.some(person => person.name === newName.trim())) {
      window.alert(`${newName.trim()} is already added to phonebook`)
      return
    }

    const person = { name: newName.trim(), number: newNumber.trim() }
    setSaving(true)
    setSaveError('')
    personService.create(person)
      .then(savedPerson => {
        setPersons(currentPersons => currentPersons.concat(savedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(() => {
        setSaveError('Could not save the contact. Check the server and try again.')
      })
      .finally(() => setSaving(false))
  }

  return (
    <div>
      <h1>Phonebook</h1>
      {loadError && <p role="alert">{loadError}</p>}
      <Filter value={filter} onChange={setFilter} />
      <h2>Add a new person</h2>
      {saveError && <p role="alert">{saveError}</p>}
      <PersonForm
        saving={saving}
        name={newName}
        number={newNumber}
        onNameChange={setNewName}
        onNumberChange={setNewNumber}
        onSubmit={addPerson}
      />
      <h2>Numbers</h2>
      {deleteError && <p role="alert">{deleteError}</p>}
      <Persons persons={visiblePersons} onDelete={deletePerson} deletingIds={deletingIds} />
    </div>
  )
}

export default App
