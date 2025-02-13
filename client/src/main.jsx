import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { PrivyProvider } from '@privy-io/react-auth'
import Home from './components/Home'
import News from './components/News'
import Create from './components/Create'
import NewInfo from './components/NewInfo'
import Eliza from './components/Eliza'
import ConfirmNews from './components/ConfirmNews'
import './index.css'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #93c5fd;  /* Tailwind blue-300 */
  }
`;

const privyConfig = {
  appId: import.meta.env.VITE_PRIVY_APP_ID,
  loginMethods: ['wallet'],
  appearance: {
    theme: 'light',
    accentColor: '#F472B6',
    showWalletLoginFirst: true,
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivyProvider {...privyConfig}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/create" element={<Create />} />
          <Route path="/newinfo" element={<NewInfo />} />
          <Route path="/eliza" element={<Eliza />} />
          <Route path="/confirmnews" element={<ConfirmNews />} />
        </Routes>
      </BrowserRouter>
    </PrivyProvider>
  </React.StrictMode>
)
