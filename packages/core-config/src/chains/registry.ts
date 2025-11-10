import type { ChainInfo, ChainRegistry } from './types'
import { ChainId } from './types'
import { XLAYER_MAINNET, XLAYER_TESTNET } from './xlayer'

/**
 * 链注册表 - 统一管理所有支持的链
 */
export const CHAIN_REGISTRY: ChainRegistry = {
  [ChainId.XLAYER]: XLAYER_MAINNET,
  [ChainId.XLAYER_TESTNET]: XLAYER_TESTNET,
} as const

/**
 * 获取链信息
 */
export function getChainInfo(chainId: ChainId): ChainInfo {
  const chainInfo = CHAIN_REGISTRY[chainId]
  if (!chainInfo) {
    throw new Error(`Unsupported chain ID: ${chainId}`)
  }
  return chainInfo
}

/**
 * 获取所有支持的链ID
 */
export function getSupportedChainIds(): ChainId[] {
  return Object.keys(CHAIN_REGISTRY).map(Number) as ChainId[]
}

/**
 * 检查链ID是否支持
 */
export function isSupportedChain(chainId: number): chainId is ChainId {
  return chainId in CHAIN_REGISTRY
}

/**
 * 获取主网链
 */
export function getMainnetChains(): ChainInfo[] {
  return Object.values(CHAIN_REGISTRY).filter(chain => !chain.testnet)
}

/**
 * 获取测试网链
 */
export function getTestnetChains(): ChainInfo[] {
  return Object.values(CHAIN_REGISTRY).filter(chain => chain.testnet)
}
