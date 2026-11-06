import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CourseInformation from './App.tsx'
import Unicafe from './unicafe/App.tsx'
import Anecdotes from './anecdotes/App.tsx'

// Keep all exercise apps available from the navigation.
const selectedApp = new URLSearchParams(window.location.search).get('app')
const App = selectedApp === 'anecdotes'
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
    </nav>
    <App />
  </StrictMode>,
)
