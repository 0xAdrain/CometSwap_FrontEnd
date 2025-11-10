import type { Address } from 'viem'
import type { ChainId } from '../chains/types'

/**
 * Token information interface
 */
export interface TokenInfo {
  chainId: ChainId
  address: Address
  name: string
  symbol: string
  decimals: number
  logoURI?: string
  tags?: string[]
}

/**
 * Token list by chain
 */
export type ChainTokenRegistry = Record<ChainId, TokenInfo[]>

/**
 * Common token types
 */
export enum TokenType {
  NATIVE = 'NATIVE',
  WRAPPED = 'WRAPPED',
  STABLE = 'STABLE',
  BRIDGE = 'BRIDGE',
}

/**
 * Token metadata
 */
export interface TokenMetadata {
  type: TokenType
  isVerified?: boolean
  priority?: number
  description?: string
}
