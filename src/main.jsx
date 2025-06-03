<<<<<<< HEAD
import { StrictMode } from 'react'
import { createRoot} from 'react-dom/client'
=======
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.js'
import { App } from './components/App.jsx'
import './components/index.css'
import Form from './components/form.jsx'
import Card from './components/Card.tsx'
import './components/Card.css'
import './components/App.tsx'
import './components/animation.jsx'
import './components/animation.css'
>>>>>>> d4f14ca (git commit -m "Code-lab-web")

import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
  