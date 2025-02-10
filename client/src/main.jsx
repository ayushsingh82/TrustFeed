import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import Home from './components/Home'
import News from './components/News'
import './index.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #93c5fd;  /* Tailwind blue-300 */
  }
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
