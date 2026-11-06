import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CourseInformation from './App.tsx'
import Unicafe from './unicafe/App.tsx'

// Keep both exercises available without overwriting Course Information.
const App = new URLSearchParams(window.location.search).get('app') === 'unicafe'
  ? Unicafe
  : CourseInformation

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <nav aria-label="Exercises">
      <a href="?app=courseinfo">Course Information (1.1–1.5)</a>
      {' | '}
      <a href="?app=unicafe">Unicafe (1.6–1.11)</a>
    </nav>
    <App />
  </StrictMode>,
)
