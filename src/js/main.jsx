import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Routing } from './components/routing.jsx'
import '../sass/main.scss'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <HashRouter>
      <Routing />
    </HashRouter>
  </StrictMode>
)
