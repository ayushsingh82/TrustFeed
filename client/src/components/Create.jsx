import React, { useState } from 'react'
// import { ConnectButton } from './ConnectButton'
import { FaChartLine, FaPlus, FaUser, FaQuestionCircle, FaNewspaper } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { publicClient, getWalletClient, chainConfig } from '../config'
import { wagmiAbi } from '../abi'
import { usePrivy } from '@privy-io/react-auth'
import { createWalletClient ,custom } from 'viem'
// import { flowTestnet } from 'viem/chains'
import { parseGwei } from 'viem'
import { createPublicClient , http } from 'viem'


const chiadoTestnet = {
  id: 10200,
  name: 'Gnosis Chiado',
  network: 'chiado',
  nativeCurrency: {
    decimals: 18,
    name: 'XDAI',
    symbol: 'XDAI',
  },
  rpcUrls: {
    default: {
      http: ['https://gnosis-chiado.drpc.org']
    },
    public: {
      http: ['https://gnosis-chiado.drpc.org']
    }
  }
}




function Create() {
  const navigate = useNavigate()
  const { user } = usePrivy()
  
  const [question, setQuestion] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      if (!window.ethereum) {
        throw new Error('No ethereum provider found')
      }

      // Create public client
      const publicClient = createPublicClient({
        chain: chiadoTestnet,
        transport: http()
      })

      // Create wallet client
      const walletClient = createWalletClient({
        chain: chiadoTestnet,
        transport: custom(window.ethereum)
      })

      // Switch to Gnosis Chiado Testnet
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x27d8' }]
        })
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x27d8',
              chainName: 'Gnosis Chiado',
              nativeCurrency: {
                name: 'XDAI',
                symbol: 'XDAI',
                decimals: 18
              },
              rpcUrls: ['https://gnosis-chiado.drpc.org'],
              blockExplorerUrls: ['https://blockscout.chiadochain.net']
            }]
          })
        }
      }

      // Get current chain ID to verify
      const chainId = await walletClient.getChainId()
      if (chainId !== 10200) {
        throw new Error('Please switch to Gnosis Chiado Testnet')
      }

      // Prepare the contract write
      const { request } = await publicClient.simulateContract({
        account: user.wallet.address,
        address: '0x5a8E771b5D0B3d2e4d218478CB7C9029d00c4e5a',
        abi: wagmiAbi,
        functionName: 'submitQuestion',
        args: [question],
        value: 0n,
      })

      // Execute the contract write
      const hash = await walletClient.writeContract({
        ...request,
        account: user.wallet.address,
      })

      setSuccess('Waiting for transaction confirmation...')
      const receipt = await publicClient.waitForTransactionReceipt({ hash })
      console.log('Transaction receipt:', receipt)

      setSuccess('Prediction created successfully!')
      setTimeout(() => navigate('/live-bets'), 2000)

    } catch (err) {
      console.error('Error creating prediction:', err)
      setError(err.message || 'Failed to create prediction. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center p-8">
      {/* Header with Wallet Connection */}
      <div className="w-full max-w-3xl mb-16">
        <div className="flex flex-col items-center mb-4">
          <h1 
            onClick={() => navigate('/')}
            className="text-3xl font-bold text-pink-600 cursor-pointer hover:text-pink-500 transition-colors mb-4"
          >
            Fileverse
          </h1>
          <div className="bg-blue-500 rounded-2xl p-2">
           Connect
          </div>
        </div>
        <div className="h-px bg-pink-800/60 w-full mt-4"></div>
      </div>

      {/* Create Form */}
      <div className="w-full max-w-xl mb-16">
        <div className="bg-pink-300 rounded-2xl p-8 border-2 border-pink-500">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaQuestionCircle className="text-pink-400 text-3xl" />
            <h2 className="text-2xl font-bold text-white text-center">Add news's onchain</h2>
          </div>
          
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div className="bg-pink-200 p-5 rounded-xl border border-pink-400">
              <label className="block text-black text-sm font-semibold mb-2">
                News Title
              </label>
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-pink-400 text-black placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="E.g., SpaceX Successfully Launches Starship for Mars Mission"
                required
              />
            </div>

            {/* Description Input */}
            <div className="bg-pink-200 p-5 rounded-xl border border-pink-400">
              <label className="block text-black text-sm font-semibold mb-2">
                News Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-pink-400 text-black placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Enter detailed news description..."
                rows="4"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 
                text-white font-bold py-3.5 px-6 rounded-xl border-2 border-pink-500/50 transition-all 
                transform hover:scale-[1.02] active:scale-[0.98] shadow-lg
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Adding News...' : 'Add News'}
            </button>
          </form>
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="w-full max-w-3xl mx-auto px-4 mb-8">
        <div className="bg-pink-300 rounded-2xl p-6 border-2 border-pink-500 flex justify-between items-center px-16">
          <button 
            onClick={() => navigate('/newinfo')}
            className="flex flex-col items-center gap-2 text-black"
          >
            <FaNewspaper size={32} />
            <span className="text-sm">News</span>
          </button>
          <button 
            onClick={() => navigate('/create')}
            className="bg-pink-600 hover:bg-pink-500 text-white p-5 rounded-full transition-colors border-2 border-pink-500"
          >
            <FaPlus size={36} />
          </button>
          <button 
            onClick={() => navigate('/news')}
            className="flex flex-col items-center gap-2 text-black"
          >
            <FaUser size={32} />
            <span className="text-sm">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Create