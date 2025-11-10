"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.COMMON_TOKEN_SYMBOLS = exports.DEFAULT_LOGO_FALLBACK = exports.CHAIN_LOGO_CONFIGS = void 0;
exports.getPancakeSymbolLogoUrl = getPancakeSymbolLogoUrl;
exports.getTrustWalletLogoUrl = getTrustWalletLogoUrl;
exports.getCustomCdnLogoUrl = getCustomCdnLogoUrl;
exports.getTokenListLogoUrl = getTokenListLogoUrl;
exports.getCoinGeckoLogoUrl = getCoinGeckoLogoUrl;
var types_1 = require("../chains/types");
var types_2 = require("./types");
/**
 * Chain-specific logo configuration mapping
 */
exports.CHAIN_LOGO_CONFIGS = (_a = {},
    _a[types_1.ChainId.XLAYER] = {
        chainId: types_1.ChainId.XLAYER,
        trustWalletName: 'xlayer', // TrustWallet blockchain name
        tokenListPath: 'xlayer', // Token list path
        customCdnUrl: 'https://assets.comet-swap.com/tokens/xlayer', // Our custom CDN
    },
    _a[types_1.ChainId.XLAYER_TESTNET] = {
        chainId: types_1.ChainId.XLAYER_TESTNET,
        trustWalletName: 'xlayer-testnet',
        tokenListPath: 'xlayer-testnet',
        customCdnUrl: 'https://assets.comet-swap.com/tokens/xlayer-testnet',
    },
    _a);
/**
 * Default logo fallback strategy
 * Priority order: Custom CDN -> PancakeSwap Symbol -> TrustWallet -> Token List
 */
exports.DEFAULT_LOGO_FALLBACK = {
    providers: [
        types_2.LogoProvider.CUSTOM_CDN,
        types_2.LogoProvider.PANCAKE_SYMBOL,
        types_2.LogoProvider.TRUST_WALLET,
        types_2.LogoProvider.TOKEN_LIST,
        types_2.LogoProvider.COINGECKO,
    ],
    enableCache: true,
    maxRetries: 3,
};
/**
 * Common token symbol logo URLs (from PancakeSwap)
 * These are well-known tokens with reliable logos
 */
exports.COMMON_TOKEN_SYMBOLS = [
    'BTC', 'WBTC',
    'ETH', 'WETH',
    'USDC', 'USDT', 'DAI', 'BUSD',
    'BNB', 'WBNB',
    'OKB', 'WOKB',
    'CAKE',
];
/**
 * Get PancakeSwap symbol logo URL
 */
function getPancakeSymbolLogoUrl(symbol) {
    return "https://tokens.pancakeswap.finance/images/symbol/".concat(symbol.toLowerCase(), ".png");
}
/**
 * Get TrustWallet logo URL
 */
function getTrustWalletLogoUrl(chainId, address) {
    var config = exports.CHAIN_LOGO_CONFIGS[chainId];
    if (!config.trustWalletName)
        return null;
    return "https://assets-cdn.trustwallet.com/blockchains/".concat(config.trustWalletName, "/assets/").concat(address, "/logo.png");
}
/**
 * Get custom CDN logo URL
 */
function getCustomCdnLogoUrl(chainId, address) {
    var config = exports.CHAIN_LOGO_CONFIGS[chainId];
    if (!config.customCdnUrl)
        return null;
    return "".concat(config.customCdnUrl, "/").concat(address, ".png");
}
/**
 * Get token list logo URL
 */
function getTokenListLogoUrl(chainId, address) {
    var config = exports.CHAIN_LOGO_CONFIGS[chainId];
    if (!config.tokenListPath)
        return null;
    // Follow PancakeSwap pattern
    return "https://tokens.pancakeswap.finance/images/".concat(config.tokenListPath, "/").concat(address, ".png");
}
/**
 * Get CoinGecko logo URL
 */
function getCoinGeckoLogoUrl(symbol) {
    return "https://assets.coingecko.com/coins/images/logos/".concat(symbol.toLowerCase(), ".png");
}
