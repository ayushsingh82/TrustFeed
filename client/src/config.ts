import { createPublicClient, createWalletClient , http, custom } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { flowTestnet , gnosisChiado} from 'viem/chains'




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

// Public client
export const publicClient = createPublicClient({
  chain: gnosisChiado,
  transport: http()
})

// Wallet client
export const walletClient = createWalletClient({
  chain: chiadoTestnet,
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

// Chain configuration for wallet connection


// JSON-RPC Account
// export const [account] = await walletClient.getAddresses()

// Local Account
export const account = privateKeyToAccount('0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e')