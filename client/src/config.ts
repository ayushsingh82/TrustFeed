import { createPublicClient, createWalletClient, http, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { gnosisChiado } from 'viem/chains'

// Chain configuration for wallet connection
export const chainConfig = {
  chainId: '0x27d8', // 10200 in hex (Gnosis Chiado)
  chainName: 'Gnosis Chiado',
  nativeCurrency: {
    name: 'XDAI',
    symbol: 'XDAI',
    decimals: 18
  },
  rpcUrls: ['https://gnosis-chiado.drpc.org'],
  blockExplorerUrls: ['https://blockscout.chiadochain.net']
}

// Public client
export const publicClient = createPublicClient({
  chain: gnosisChiado,
  transport: http()
})

// Wallet client
export const walletClient = createWalletClient({
  chain: gnosisChiado,
  transport: custom(window.ethereum)
})

// Get Wallet Client function
export const getWalletClient = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return createWalletClient({
      chain: gnosisChiado,
      transport: custom(window.ethereum),
      account: window.ethereum.selectedAddress
    })
  }
  return null
}

// Local Account
export const account = privateKeyToAccount('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e')