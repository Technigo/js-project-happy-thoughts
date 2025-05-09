import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.jsx'
import './components/index.css'
// Removed invalid import of App.tsx
import './components/Card.css';
import Card from './components/Card.tsx'
import Form from './components/form.jsx'
import './components/form.css'
// Removed unused import of indexJson
import Main from './components/main.tsx'
import './components/App.css'
// Removed invalid and duplicate import of App.js
// Removed invalid and duplicate imports




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
