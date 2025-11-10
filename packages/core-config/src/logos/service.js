"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenLogoUrls = getTokenLogoUrls;
exports.getTokenLogoUrl = getTokenLogoUrl;
exports.getLogoUrlByAddress = getLogoUrlByAddress;
exports.getLogoUrlBySymbol = getLogoUrlBySymbol;
exports.clearLogoCache = clearLogoCache;
exports.preloadCommonLogos = preloadCommonLogos;
var config_1 = require("./config");
var types_1 = require("./types");
/**
 * Logo cache for memoization (similar to PancakeSwap's approach)
 */
var logoCache = new Map();
/**
 * Generate cache key for logo request
 */
function getCacheKey(request, options) {
    return "".concat(request.chainId, "#").concat(request.address, "#").concat(request.symbol, "#").concat(JSON.stringify(options || {}));
}
/**
 * Check if symbol is a common token with reliable logo
 */
function isCommonTokenSymbol(symbol) {
    return symbol ? config_1.COMMON_TOKEN_SYMBOLS.includes(symbol) : false;
}
/**
 * Generate logo URLs based on provider type
 */
function generateLogoUrl(provider, request) {
    var chainId = request.chainId, address = request.address, symbol = request.symbol;
    switch (provider) {
        case types_1.LogoProvider.CUSTOM_CDN:
            return address ? (0, config_1.getCustomCdnLogoUrl)(chainId, address) : null;
        case types_1.LogoProvider.PANCAKE_SYMBOL:
            return symbol && isCommonTokenSymbol(symbol) ? (0, config_1.getPancakeSymbolLogoUrl)(symbol) : null;
        case types_1.LogoProvider.TRUST_WALLET:
            return address ? (0, config_1.getTrustWalletLogoUrl)(chainId, address) : null;
        case types_1.LogoProvider.TOKEN_LIST:
            return address ? (0, config_1.getTokenListLogoUrl)(chainId, address) : null;
        case types_1.LogoProvider.COINGECKO:
            return symbol ? (0, config_1.getCoinGeckoLogoUrl)(symbol) : null;
        default:
            return null;
    }
}
/**
 * Get token logo URLs with fallback strategy (inspired by PancakeSwap)
 * Returns array of URLs in priority order
 */
function getTokenLogoUrls(request, options) {
    if (options === void 0) { options = {}; }
    var _a = options.useTrustWallet, useTrustWallet = _a === void 0 ? true : _a, _b = options.usePancakeSymbol, usePancakeSymbol = _b === void 0 ? true : _b, _c = options.useTokenList, useTokenList = _c === void 0 ? true : _c, _d = options.customFallbacks, customFallbacks = _d === void 0 ? [] : _d;
    // Check cache first
    var cacheKey = getCacheKey(request, options);
    if (logoCache.has(cacheKey)) {
        return logoCache.get(cacheKey);
    }
    var urls = [];
    // Add custom fallbacks first (highest priority)
    urls.push.apply(urls, customFallbacks.filter(Boolean));
    // Generate URLs based on enabled providers
    for (var _i = 0, _e = config_1.DEFAULT_LOGO_FALLBACK.providers; _i < _e.length; _i++) {
        var provider = _e[_i];
        var shouldInclude = true;
        // Apply options filtering
        switch (provider) {
            case types_1.LogoProvider.TRUST_WALLET:
                shouldInclude = useTrustWallet;
                break;
            case types_1.LogoProvider.PANCAKE_SYMBOL:
                shouldInclude = usePancakeSymbol;
                break;
            case types_1.LogoProvider.TOKEN_LIST:
                shouldInclude = useTokenList;
                break;
        }
        if (shouldInclude) {
            var url = generateLogoUrl(provider, request);
            if (url)
                urls.push(url);
        }
    }
    // Remove duplicates while preserving order
    var uniqueUrls = Array.from(new Set(urls));
    // Cache the result
    if (config_1.DEFAULT_LOGO_FALLBACK.enableCache) {
        logoCache.set(cacheKey, uniqueUrls);
    }
    return uniqueUrls;
}
/**
 * Get single logo URL (returns first available)
 */
function getTokenLogoUrl(request, options) {
    var urls = getTokenLogoUrls(request, options);
    return urls.length > 0 ? urls[0] : null;
}
/**
 * Get logo URL by address (convenience function)
 */
function getLogoUrlByAddress(chainId, address, options) {
    return getTokenLogoUrl({ chainId: chainId, address: address }, options);
}
/**
 * Get logo URL by symbol (convenience function)
 */
function getLogoUrlBySymbol(symbol, chainId, options) {
    return getTokenLogoUrl({
        chainId: chainId || 196, // Default to X Layer
        symbol: symbol
    }, options);
}
/**
 * Clear logo cache
 */
function clearLogoCache() {
    logoCache.clear();
}
/**
 * Preload common token logos (optimization)
 */
function preloadCommonLogos() {
    var preloadPromises = config_1.COMMON_TOKEN_SYMBOLS.map(function (symbol) {
        var url = (0, config_1.getPancakeSymbolLogoUrl)(symbol);
        return new Promise(function (resolve) {
            var img = new Image();
            img.onload = function () { return resolve(); };
            img.onerror = function () { return resolve(); }; // Continue even if load fails
            img.src = url;
        });
    });
    return Promise.all(preloadPromises);
}
