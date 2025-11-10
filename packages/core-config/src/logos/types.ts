import type { Address } from 'viem'
import type { ChainId } from '../chains/types'
import type { TokenInfo } from '../tokens/types'

/**
 * Logo service provider types
 */
export enum LogoProvider {
  TRUST_WALLET = 'TRUST_WALLET',
  COINGECKO = 'COINGECKO', 
  TOKEN_LIST = 'TOKEN_LIST',
  PANCAKE_SYMBOL = 'PANCAKE_SYMBOL',
  CUSTOM_CDN = 'CUSTOM_CDN',
}

/**
 * Logo service configuration for each chain
 */
export interface ChainLogoConfig {
  chainId: ChainId
  trustWalletName?: string  // For TrustWallet CDN mapping
  tokenListPath?: string    // For token list path mapping
  customCdnUrl?: string     // Custom CDN base URL
}

/**
 * Logo fallback strategy configuration
 */
export interface LogoFallbackConfig {
  providers: LogoProvider[]
  enableCache?: boolean
  maxRetries?: number
}

/**
 * Logo service options
 */
export interface LogoServiceOptions {
  useTrustWallet?: boolean
  usePancakeSymbol?: boolean
  useTokenList?: boolean
  customFallbacks?: string[]
}

/**
 * Token logo request parameters
 */
export interface TokenLogoRequest {
  chainId: ChainId
  address?: Address
  symbol?: string
  name?: string
}
