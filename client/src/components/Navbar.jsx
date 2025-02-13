import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ConnectButton } from './ConnectButton'

function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="w-full max-w-3xl mb-16">
      <div className="flex flex-col items-center mb-4">
        <h1 
          onClick={() => navigate('/')}
          className="text-3xl font-bold text-pink-600 cursor-pointer hover:text-pink-500 transition-colors mb-4"
        >
          PrediFlow
        </h1>
        <div className="bg-blue-500 rounded-2xl p-2">
          <ConnectButton />
        </div>
      </div>
      <div className="h-px bg-pink-800/60 w-full mt-4"></div>
    </div>
  )
}

export default Navbar 