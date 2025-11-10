import type { Address } from 'viem'

/**
 * 支持的链ID枚举
 */
export enum ChainId {
  XLAYER = 196,
  XLAYER_TESTNET = 195,
}

/**
 * 原生代币信息
 */
export interface NativeCurrency {
  name: string
  symbol: string
  decimals: number
  address: Address
}

/**
 * 区块浏览器信息
 */
export interface BlockExplorer {
  name: string
  url: string
  apiUrl?: string
}

/**
 * RPC配置
 */
export interface RpcConfig {
  http: string[]
  webSocket?: string[]
}

/**
 * 链信息接口
 */
export interface ChainInfo {
  id: ChainId
  name: string
  network: string
  nativeCurrency: NativeCurrency
  rpcUrls: RpcConfig
  blockExplorers: BlockExplorer[]
  testnet?: boolean
  iconUrl?: string
}

/**
 * 链注册表类型
 */
export type ChainRegistry = Record<ChainId, ChainInfo>
