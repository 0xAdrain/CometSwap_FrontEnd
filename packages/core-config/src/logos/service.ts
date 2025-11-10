import type { TokenLogoRequest, LogoServiceOptions } from './types'
import { 
  DEFAULT_LOGO_FALLBACK,
  COMMON_TOKEN_SYMBOLS,
  getPancakeSymbolLogoUrl,
  getTrustWalletLogoUrl,
  getCustomCdnLogoUrl,
  getTokenListLogoUrl,
  getCoinGeckoLogoUrl,
} from './config'
import { LogoProvider } from './types'

/**
 * Logo cache for memoization (similar to PancakeSwap's approach)
 */
const logoCache = new Map<string, string[]>()

/**
 * Generate cache key for logo request
 */
function getCacheKey(request: TokenLogoRequest, options?: LogoServiceOptions): string {
  return `${request.chainId}#${request.address}#${request.symbol}#${JSON.stringify(options || {})}`
}

/**
 * Check if symbol is a common token with reliable logo
 */
function isCommonTokenSymbol(symbol?: string): boolean {
  return symbol ? COMMON_TOKEN_SYMBOLS.includes(symbol as any) : false
}

/**
 * Generate logo URLs based on provider type
 */
function generateLogoUrl(provider: LogoProvider, request: TokenLogoRequest): string | null {
  const { chainId, address, symbol } = request

  switch (provider) {
    case LogoProvider.CUSTOM_CDN:
      return address ? getCustomCdnLogoUrl(chainId, address) : null

    case LogoProvider.PANCAKE_SYMBOL:
      return symbol && isCommonTokenSymbol(symbol) ? getPancakeSymbolLogoUrl(symbol) : null

    case LogoProvider.TRUST_WALLET:
      return address ? getTrustWalletLogoUrl(chainId, address) : null

    case LogoProvider.TOKEN_LIST:
      return address ? getTokenListLogoUrl(chainId, address) : null

    case LogoProvider.COINGECKO:
      return symbol ? getCoinGeckoLogoUrl(symbol) : null

    default:
      return null
  }
}

/**
 * Get token logo URLs with fallback strategy (inspired by PancakeSwap)
 * Returns array of URLs in priority order
 */
export function getTokenLogoUrls(
  request: TokenLogoRequest,
  options: LogoServiceOptions = {}
): string[] {
  const {
    useTrustWallet = true,
    usePancakeSymbol = true,
    useTokenList = true,
    customFallbacks = [],
  } = options

  // Check cache first
  const cacheKey = getCacheKey(request, options)
  if (logoCache.has(cacheKey)) {
    return logoCache.get(cacheKey)!
  }

  const urls: string[] = []

  // Add custom fallbacks first (highest priority)
  urls.push(...customFallbacks.filter(Boolean))

  // Generate URLs based on enabled providers
  for (const provider of DEFAULT_LOGO_FALLBACK.providers) {
    let shouldInclude = true

    // Apply options filtering
    switch (provider) {
      case LogoProvider.TRUST_WALLET:
        shouldInclude = useTrustWallet
        break
      case LogoProvider.PANCAKE_SYMBOL:
        shouldInclude = usePancakeSymbol
        break
      case LogoProvider.TOKEN_LIST:
        shouldInclude = useTokenList
        break
    }

    if (shouldInclude) {
      const url = generateLogoUrl(provider, request)
      if (url) urls.push(url)
    }
  }

  // Remove duplicates while preserving order
  const uniqueUrls = Array.from(new Set(urls))

  // Cache the result
  if (DEFAULT_LOGO_FALLBACK.enableCache) {
    logoCache.set(cacheKey, uniqueUrls)
  }

  return uniqueUrls
}

/**
 * Get single logo URL (returns first available)
 */
export function getTokenLogoUrl(
  request: TokenLogoRequest,
  options?: LogoServiceOptions
): string | null {
  const urls = getTokenLogoUrls(request, options)
  return urls.length > 0 ? urls[0] : null
}

/**
 * Get logo URL by address (convenience function)
 */
export function getLogoUrlByAddress(
  chainId: number,
  address: string,
  options?: LogoServiceOptions
): string | null {
  return getTokenLogoUrl({ chainId: chainId as any, address: address as any }, options)
}

/**
 * Get logo URL by symbol (convenience function)  
 */
export function getLogoUrlBySymbol(
  symbol: string,
  chainId?: number,
  options?: LogoServiceOptions
): string | null {
  return getTokenLogoUrl({ 
    chainId: chainId as any || 196, // Default to X Layer
    symbol 
  }, options)
}

/**
 * Clear logo cache
 */
export function clearLogoCache(): void {
  logoCache.clear()
}

/**
 * Preload common token logos (optimization)
 */
export function preloadCommonLogos(): Promise<void[]> {
  const preloadPromises = COMMON_TOKEN_SYMBOLS.map(symbol => {
    const url = getPancakeSymbolLogoUrl(symbol)
    return new Promise<void>((resolve) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = () => resolve() // Continue even if load fails
      img.src = url
    })
  })

  return Promise.all(preloadPromises)
}
