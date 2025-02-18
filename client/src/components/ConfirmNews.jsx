import React, { useState } from 'react'
// import { ConnectButton } from './ConnectButton'
import { FaChartLine, FaPlus, FaUser, FaShoppingCart, FaNewspaper } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { publicClient, walletClient, chainConfig } from '../config'
import { wagmiAbi } from '../abi'
import { usePrivy } from '@privy-io/react-auth'
import { createPublicClient , http } from 'viem'
import { createWalletClient ,custom } from 'viem'
import Navbar from './Navbar'

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


function ConfirmNews() {
  const navigate = useNavigate()
  const { user } = usePrivy()

  const [amount, setAmount] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
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

      if (!amount) {
        throw new Error('Please enter an amount')
      }

      // Convert amount to BigInt (1 XDAI = 1e18 wei)
      const amountInWei = BigInt(Math.floor(Number(amount) * 1e18))

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
        address: '0xE9061F92bA9A3D9ef3f4eb8456ac9E552B3Ff5C8',
        abi: wagmiAbi,
        functionName: 'depositFunds',
        args: [amountInWei],
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

      setSuccess('Funds deposited successfully!')
      setTimeout(() => navigate('/newinfo'), 2000)

    } catch (err) {
      console.error('Error depositing funds:', err)
      setError(err.message || 'Failed to deposit funds. Please try again.')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-pink-200 flex flex-col items-center justify-center p-8">
      <Navbar />

      {/* Purchase Form */}
      <div className="w-full max-w-xl mb-16">
        <div className="bg-pink-300 rounded-2xl p-8 border-2 border-pink-500">
          <div className="flex items-center justify-center gap-3 mb-8">
            <FaShoppingCart className="text-pink-400 text-3xl" />
            <h2 className="text-2xl font-bold text-white text-center">VERIFY NEWS </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
            {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
            
            {/* Amount Input */}
            <div className="bg-pink-200 p-5 rounded-xl border border-pink-400">
              <label className="block text-black text-sm font-semibold mb-2">
                Amount (XDAI)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white border-2 border-pink-400 text-black placeholder-gray-500 focus:outline-none focus:border-pink-500 transition-colors"
                placeholder="Enter amount..."
                min="0"
                step="0.1"
              />
            </div>

            {/* Options */}
            <div className="bg-pink-200 p-5 rounded-xl border border-pink-400">
              <label className="block text-black text-sm font-semibold mb-3">
                Choose Option
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedOption('yes')}
                  className={`px-4 py-3 rounded-xl border-2 transition-all transform ${
                    selectedOption === 'yes'
                      ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white border-pink-500 scale-105'
                      : 'bg-white text-black border-pink-400 hover:border-pink-500'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOption('no')}
                  className={`px-4 py-3 rounded-xl border-2 transition-all transform ${
                    selectedOption === 'no'
                      ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white border-pink-500 scale-105'
                      : 'bg-white text-black border-pink-400 hover:border-pink-500'
                  }`}
                >
                  No
                </button>
              </div>
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
              {loading ? 'Processing...' : 'Purchase Shares'}
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

export default ConfirmNews