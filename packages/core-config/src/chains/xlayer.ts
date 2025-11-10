import type { ChainInfo } from './types'
import { ChainId } from './types'

/**
 * X Layer 主网配置
 */
export const XLAYER_MAINNET: ChainInfo = {
  id: ChainId.XLAYER,
  name: 'X Layer Mainnet',
  network: 'xlayer',
  nativeCurrency: {
    name: 'OKB',
    symbol: 'OKB',
    decimals: 18,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as const,
  },
  rpcUrls: {
    http: [
      'https://rpc.xlayer.tech',
      'https://xlayerrpc.okx.com',
    ],
    webSocket: [
      'wss://ws.xlayer.tech',
    ],
  },
  blockExplorers: [
    {
      name: 'X Layer Explorer',
      url: 'https://www.oklink.com/xlayer',
      apiUrl: 'https://www.oklink.com/api/v5/explorer/xlayer',
    },
  ],
  testnet: false,
  iconUrl: 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png',
}

/**
 * X Layer 测试网配置
 */
export const XLAYER_TESTNET: ChainInfo = {
  id: ChainId.XLAYER_TESTNET,
  name: 'X Layer Testnet',
  network: 'xlayer-testnet',
  nativeCurrency: {
    name: 'OKB',
    symbol: 'OKB',
    decimals: 18,
    address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE' as const,
  },
  rpcUrls: {
    http: [
      'https://testrpc.xlayer.tech',
      'https://xlayertestrpc.okx.com',
    ],
  },
  blockExplorers: [
    {
      name: 'X Layer Testnet Explorer',
      url: 'https://www.oklink.com/xlayer-test',
    },
  ],
  testnet: true,
  iconUrl: 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png',
}
