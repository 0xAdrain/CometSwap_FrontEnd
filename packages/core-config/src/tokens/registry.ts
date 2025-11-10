import type { TokenInfo, ChainTokenRegistry } from './types'
import { ChainId } from '../chains/types'
import { TokenType } from './types'
import { getTokenLogoUrls as getLogoUrlsFromService } from '../logos/service'

/**
 * Helper function to create token with dynamic logo
 */
function createToken(
  chainId: ChainId,
  address: string,
  name: string,
  symbol: string,
  decimals: number,
  tags?: string[],
  fallbackLogoURI?: string
): TokenInfo {
  // Get dynamic logo URLs with fallback
  const logoUrls = getLogoUrlsFromService({ chainId, address: address as any, symbol })
  const dynamicLogoURI = logoUrls.length > 0 ? logoUrls[0] : fallbackLogoURI
  
  return {
    chainId,
    address: address as any,
    name,
    symbol,
    decimals,
    logoURI: dynamicLogoURI,
    tags,
  }
}

/**
 * X Layer mainnet tokens
 */
const XLAYER_TOKENS: TokenInfo[] = [
  createToken(
    ChainId.XLAYER,
    '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    'OKB',
    'OKB',
    18,
    ['native'],
    'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png' // Fallback for native token
  ),
  createToken(
    ChainId.XLAYER,
    '0x74b7F16337b8972027F6196A17a631aC6dE26d22',
    'Wrapped OKB',
    'WOKB',
    18,
    ['wrapped'],
    'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png' // Fallback
  ),
  createToken(
    ChainId.XLAYER,
    '0x74b7F16337b8972027F6196A17a631aC6dE26d22',
    'USD Coin',
    'USDC',
    6,
    ['stablecoin']
    // No fallback needed - USDC is common token with good logo coverage
  ),
  createToken(
    ChainId.XLAYER,
    '0x1E4a5963aBFD975d8c9021ce480b42188849D41d',
    'Tether USD',
    'USDT',
    6,
    ['stablecoin']
    // No fallback needed - USDT is common token with good logo coverage  
  ),
]

/**
 * X Layer testnet tokens (基于老前端配置)
 */
const XLAYER_TESTNET_TOKENS: TokenInfo[] = [
  // Native OKB
  createToken(
    ChainId.XLAYER_TESTNET,
    '0x0000000000000000000000000000000000000000',
    'OKB (Native)',
    'OKB',
    18,
    ['native'],
    'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png'
  ),
  // Wrapped OKB
  createToken(
    ChainId.XLAYER_TESTNET,
    '0xFCF165C4C8925682aE5facEC596D474eB36CE825',
    'Mock Wrapped OKB',
    'mWOKB',
    18,
    ['wrapped'],
    'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png'
  ),
  // Stable coins
  createToken(
    ChainId.XLAYER_TESTNET,
    '0xE196aaADEbAcCE2354Aa414D202E0AB1C907d8B5',
    'Mock USDT',
    'mUSDT',
    6,
    ['stablecoin', 'testnet']
  ),
  createToken(
    ChainId.XLAYER_TESTNET,
    '0x70b759Ba2ca756fAD20B232De07F583AA5E676FC',
    'Mock USDC',
    'mUSDC',
    6,
    ['stablecoin', 'testnet']
  ),
  createToken(
    ChainId.XLAYER_TESTNET,
    '0x4Ec24e2da05F7C6fC54C3234137E07d0A8826610',
    'Mock DAI',
    'mDAI',
    18,
    ['stablecoin', 'testnet']
  ),
  // Major tokens
  createToken(
    ChainId.XLAYER_TESTNET,
    '0x3f806e22414060286632d5f5C67B6afbD4B1D7b9',
    'Mock WBTC',
    'mWBTC',
    8,
    ['bitcoin', 'testnet']
  ),
  createToken(
    ChainId.XLAYER_TESTNET,
    '0xb16637fA04A286C0EE2874935970cdA0b595e16a',
    'Mock ETH',
    'mETH',
    18,
    ['ethereum', 'testnet']
  ),
  // Additional test tokens
  createToken(
    ChainId.XLAYER_TESTNET,
    '0x29d24eb5e1b25f3dbaa1eeb6c5c8fa6d0ed7ce1e',
    'Mock MEME',
    'mMEME',
    18,
    ['meme', 'testnet']
  ),
  createToken(
    ChainId.XLAYER_TESTNET,
    '0x8a2A143c8F8b4c73EEA44c9165303a41b44a4c1b',
    'Mock LINK',
    'mLINK',
    18,
    ['oracle', 'testnet']
  ),
  createToken(
    ChainId.XLAYER_TESTNET,
    '0x1F4B5b8a1F6D5f5f1a8E3e0a1b2c3d4e5f6a7b8c',
    'Mock UNI',
    'mUNI',
    18,
    ['defi', 'testnet']
  ),
]

/**
 * Token registry by chain
 */
export const TOKEN_REGISTRY: ChainTokenRegistry = {
  [ChainId.XLAYER]: XLAYER_TOKENS,
  [ChainId.XLAYER_TESTNET]: XLAYER_TESTNET_TOKENS,
}

/**
 * Get tokens for a specific chain
 */
export function getChainTokens(chainId: ChainId): TokenInfo[] {
  return TOKEN_REGISTRY[chainId] || []
}

/**
 * Get token by address and chain
 */
export function getTokenByAddress(chainId: ChainId, address: string): TokenInfo | undefined {
  const tokens = getChainTokens(chainId)
  return tokens.find(token => 
    token.address.toLowerCase() === address.toLowerCase()
  )
}

/**
 * Get native token for a chain
 */
export function getNativeToken(chainId: ChainId): TokenInfo | undefined {
  const tokens = getChainTokens(chainId)
  return tokens.find(token => token.tags?.includes('native'))
}

/**
 * Get wrapped native token for a chain
 */
export function getWrappedNativeToken(chainId: ChainId): TokenInfo | undefined {
  const tokens = getChainTokens(chainId)
  return tokens.find(token => token.tags?.includes('wrapped'))
}

/**
 * Refresh token logo for a specific token
 * Useful when logos are updated or new logo sources become available
 */
export function refreshTokenLogo(chainId: ChainId, address: string): TokenInfo | undefined {
  const token = getTokenByAddress(chainId, address)
  if (!token) return undefined

  // Generate fresh logo URLs
  const logoUrls = getLogoUrlsFromService({ chainId, address: address as any, symbol: token.symbol })
  const newLogoURI = logoUrls.length > 0 ? logoUrls[0] : token.logoURI

  // Return updated token
  return {
    ...token,
    logoURI: newLogoURI,
  }
}

/**
 * Get all available logo URLs for a token (for UI fallback handling)
 */
export function getTokenLogoUrlsFromRegistry(chainId: ChainId, address: string): string[] {
  const token = getTokenByAddress(chainId, address)
  if (!token) return []

  return getLogoUrlsFromService({ chainId, address: address as any, symbol: token.symbol })
}
