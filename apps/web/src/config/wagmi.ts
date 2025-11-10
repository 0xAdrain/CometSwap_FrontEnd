import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'
import { defineChain } from 'viem'

// 定义X Layer链配置
const xLayerMainnet = defineChain({
  id: 196,
  name: 'X Layer Mainnet',
  nativeCurrency: {
    name: 'OKB',
    symbol: 'OKB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://rpc.xlayer.tech',
        'https://xlayerrpc.okx.com', // 备用RPC
      ],
    },
    public: {
      http: [
        'https://rpc.xlayer.tech',
        'https://xlayerrpc.okx.com', // 备用RPC
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'OKLink',
      url: 'https://www.oklink.com/xlayer',
    },
  },
})

const xLayerTestnet = defineChain({
  id: 195,
  name: 'X Layer Testnet',
  nativeCurrency: {
    name: 'OKB',
    symbol: 'OKB',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [
        'https://testrpc.xlayer.tech',
        'https://xlayertestrpc.okx.com', // 备用RPC
      ],
    },
    public: {
      http: [
        'https://testrpc.xlayer.tech',
        'https://xlayertestrpc.okx.com', // 备用RPC
      ],
    },
  },
  blockExplorers: {
    default: {
      name: 'OKLink',
      url: 'https://www.oklink.com/xlayer-test',
    },
  },
  testnet: true,
})

// 钱包连接器配置 - 只使用 injected connector
const connectors = [
  injected(),
]

// 支持的链
const chains = [
  xLayerTestnet,
  xLayerMainnet,
  mainnet,
  sepolia,
] as const

// 传输配置 - 启用重试和fallback
const transports = {
  [xLayerTestnet.id]: http(undefined, {
    retryCount: 3,
    retryDelay: 1000,
  }),
  [xLayerMainnet.id]: http(undefined, {
    retryCount: 3,
    retryDelay: 1000,
  }),
  [mainnet.id]: http(undefined, {
    retryCount: 3,
    retryDelay: 1000,
  }),
  [sepolia.id]: http(undefined, {
    retryCount: 3,
    retryDelay: 1000,
  }),
}

// Wagmi 配置
export const wagmiConfig = createConfig({
  chains,
  connectors,
  transports,
})

export { chains }
