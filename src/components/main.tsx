import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from '../App.tsx'
import Card from './Card.tsx';
import './Card.css';
// Removed conflicting import of App
import { Form } from './form';
import Main from './main.tsx';
import indexData from './index.json';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
export default App