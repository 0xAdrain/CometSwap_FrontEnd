import type { ChainLogoConfig, LogoFallbackConfig } from './types'
import { ChainId } from '../chains/types'
import { LogoProvider } from './types'

/**
 * Chain-specific logo configuration mapping
 */
export const CHAIN_LOGO_CONFIGS: Record<ChainId, ChainLogoConfig> = {
  [ChainId.XLAYER]: {
    chainId: ChainId.XLAYER,
    trustWalletName: 'xlayer', // TrustWallet blockchain name
    tokenListPath: 'xlayer',   // Token list path
    customCdnUrl: 'https://assets.comet-swap.com/tokens/xlayer', // Our custom CDN
  },
  [ChainId.XLAYER_TESTNET]: {
    chainId: ChainId.XLAYER_TESTNET,
    trustWalletName: 'xlayer-testnet',
    tokenListPath: 'xlayer-testnet', 
    customCdnUrl: 'https://assets.comet-swap.com/tokens/xlayer-testnet',
  },
}

/**
 * Default logo fallback strategy
 * Priority order: Custom CDN -> PancakeSwap Symbol -> TrustWallet -> Token List
 */
export const DEFAULT_LOGO_FALLBACK: LogoFallbackConfig = {
  providers: [
    LogoProvider.CUSTOM_CDN,
    LogoProvider.PANCAKE_SYMBOL,
    LogoProvider.TRUST_WALLET,
    LogoProvider.TOKEN_LIST,
    LogoProvider.COINGECKO,
  ],
  enableCache: true,
  maxRetries: 3,
}

/**
 * Common token symbol logo URLs (from PancakeSwap)
 * These are well-known tokens with reliable logos
 */
export const COMMON_TOKEN_SYMBOLS = [
  'BTC', 'WBTC', 
  'ETH', 'WETH',
  'USDC', 'USDT', 'DAI', 'BUSD',
  'BNB', 'WBNB',
  'OKB', 'WOKB',
  'CAKE',
] as const

/**
 * Get PancakeSwap symbol logo URL
 */
export function getPancakeSymbolLogoUrl(symbol: string): string {
  return `https://tokens.pancakeswap.finance/images/symbol/${symbol.toLowerCase()}.png`
}

/**
 * Get TrustWallet logo URL  
 */
export function getTrustWalletLogoUrl(chainId: ChainId, address: string): string | null {
  const config = CHAIN_LOGO_CONFIGS[chainId]
  if (!config.trustWalletName) return null
  
  return `https://assets-cdn.trustwallet.com/blockchains/${config.trustWalletName}/assets/${address}/logo.png`
}

/**
 * Get custom CDN logo URL
 */
export function getCustomCdnLogoUrl(chainId: ChainId, address: string): string | null {
  const config = CHAIN_LOGO_CONFIGS[chainId]
  if (!config.customCdnUrl) return null
  
  return `${config.customCdnUrl}/${address}.png`
}

/**
 * Get token list logo URL
 */
export function getTokenListLogoUrl(chainId: ChainId, address: string): string | null {
  const config = CHAIN_LOGO_CONFIGS[chainId]
  if (!config.tokenListPath) return null
  
  // Follow PancakeSwap pattern
  return `https://tokens.pancakeswap.finance/images/${config.tokenListPath}/${address}.png`
}

/**
 * Get CoinGecko logo URL
 */
export function getCoinGeckoLogoUrl(symbol: string): string {
  return `https://assets.coingecko.com/coins/images/logos/${symbol.toLowerCase()}.png`
}
