import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.js'
import { App } from './components/App.jsx'
import './components/index.css'
import Form from './components/form.jsx'
import Card from './components/Card.tsx'
import './components/Card.css'
import './components/App.tsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
