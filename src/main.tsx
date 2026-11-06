import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CourseInformation from './App.tsx'
import Unicafe from './unicafe/App.tsx'
import Anecdotes from './anecdotes/App.tsx'
import PartTwoCourse from './part2/courseinfo/App.tsx'
import Phonebook from './part2/phonebook/App.tsx'

// Keep all exercise apps available from the navigation.
const selectedApp = new URLSearchParams(window.location.search).get('app')
const App = selectedApp === 'phonebook'
  ? Phonebook
  : selectedApp === 'courseinfo2'
  ? PartTwoCourse
  : selectedApp === 'anecdotes'
  ? Anecdotes
  : selectedApp === 'unicafe'
    ? Unicafe
    : CourseInformation

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <nav aria-label="Exercises">
      <a href="?app=courseinfo">Course Information (1.1–1.5)</a>
      {' | '}
      <a href="?app=unicafe">Unicafe (1.6–1.11)</a>
      {' | '}
      <a href="?app=anecdotes">Anecdotes (1.12–1.14)</a>
      {' | '}
      <a href="?app=courseinfo2">Course Information (2.1–2.5)</a>
      {' | '}
      <a href="?app=phonebook">Phonebook (2.6)</a>
    </nav>
    <App />
  </StrictMode>,
)
