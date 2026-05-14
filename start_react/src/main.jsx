import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootEl = document.getElementById('root')
const appRoot = createRoot(rootEl)

appRoot.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
