"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_REGISTRY = void 0;
exports.getChainTokens = getChainTokens;
exports.getTokenByAddress = getTokenByAddress;
exports.getNativeToken = getNativeToken;
exports.getWrappedNativeToken = getWrappedNativeToken;
exports.refreshTokenLogo = refreshTokenLogo;
exports.getTokenLogoUrlsFromRegistry = getTokenLogoUrlsFromRegistry;
var types_1 = require("../chains/types");
var service_1 = require("../logos/service");
/**
 * Helper function to create token with dynamic logo
 */
function createToken(chainId, address, name, symbol, decimals, tags, fallbackLogoURI) {
    // Get dynamic logo URLs with fallback
    var logoUrls = (0, service_1.getTokenLogoUrls)({ chainId: chainId, address: address, symbol: symbol });
    var dynamicLogoURI = logoUrls.length > 0 ? logoUrls[0] : fallbackLogoURI;
    return {
        chainId: chainId,
        address: address,
        name: name,
        symbol: symbol,
        decimals: decimals,
        logoURI: dynamicLogoURI,
        tags: tags,
    };
}
/**
 * X Layer mainnet tokens
 */
var XLAYER_TOKENS = [
    createToken(types_1.ChainId.XLAYER, '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', 'OKB', 'OKB', 18, ['native'], 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png' // Fallback for native token
    ),
    createToken(types_1.ChainId.XLAYER, '0x74b7F16337b8972027F6196A17a631aC6dE26d22', 'Wrapped OKB', 'WOKB', 18, ['wrapped'], 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png' // Fallback
    ),
    createToken(types_1.ChainId.XLAYER, '0x74b7F16337b8972027F6196A17a631aC6dE26d22', 'USD Coin', 'USDC', 6, ['stablecoin']
    // No fallback needed - USDC is common token with good logo coverage
    ),
    createToken(types_1.ChainId.XLAYER, '0x1E4a5963aBFD975d8c9021ce480b42188849D41d', 'Tether USD', 'USDT', 6, ['stablecoin']
    // No fallback needed - USDT is common token with good logo coverage  
    ),
];
/**
 * X Layer testnet tokens (基于老前端配置)
 */
var XLAYER_TESTNET_TOKENS = [
    // Native OKB
    createToken(types_1.ChainId.XLAYER_TESTNET, '0x0000000000000000000000000000000000000000', 'OKB (Native)', 'OKB', 18, ['native'], 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png'),
    // Wrapped OKB
    createToken(types_1.ChainId.XLAYER_TESTNET, '0xFCF165C4C8925682aE5facEC596D474eB36CE825', 'Mock Wrapped OKB', 'mWOKB', 18, ['wrapped'], 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png'),
    // Stable coins
    createToken(types_1.ChainId.XLAYER_TESTNET, '0xE196aaADEbAcCE2354Aa414D202E0AB1C907d8B5', 'Mock USDT', 'mUSDT', 6, ['stablecoin', 'testnet']),
    createToken(types_1.ChainId.XLAYER_TESTNET, '0x70b759Ba2ca756fAD20B232De07F583AA5E676FC', 'Mock USDC', 'mUSDC', 6, ['stablecoin', 'testnet']),
    createToken(types_1.ChainId.XLAYER_TESTNET, '0x4Ec24e2da05F7C6fC54C3234137E07d0A8826610', 'Mock DAI', 'mDAI', 18, ['stablecoin', 'testnet']),
    // Major tokens
    createToken(types_1.ChainId.XLAYER_TESTNET, '0x3f806e22414060286632d5f5C67B6afbD4B1D7b9', 'Mock WBTC', 'mWBTC', 8, ['bitcoin', 'testnet']),
    createToken(types_1.ChainId.XLAYER_TESTNET, '0xb16637fA04A286C0EE2874935970cdA0b595e16a', 'Mock ETH', 'mETH', 18, ['ethereum', 'testnet']),
    // Additional test tokens
    createToken(types_1.ChainId.XLAYER_TESTNET, '0x29d24eb5e1b25f3dbaa1eeb6c5c8fa6d0ed7ce1e', 'Mock MEME', 'mMEME', 18, ['meme', 'testnet']),
    createToken(types_1.ChainId.XLAYER_TESTNET, '0x8a2A143c8F8b4c73EEA44c9165303a41b44a4c1b', 'Mock LINK', 'mLINK', 18, ['oracle', 'testnet']),
    createToken(types_1.ChainId.XLAYER_TESTNET, '0x1F4B5b8a1F6D5f5f1a8E3e0a1b2c3d4e5f6a7b8c', 'Mock UNI', 'mUNI', 18, ['defi', 'testnet']),
];
/**
 * Token registry by chain
 */
exports.TOKEN_REGISTRY = (_a = {},
    _a[types_1.ChainId.XLAYER] = XLAYER_TOKENS,
    _a[types_1.ChainId.XLAYER_TESTNET] = XLAYER_TESTNET_TOKENS,
    _a);
/**
 * Get tokens for a specific chain
 */
function getChainTokens(chainId) {
    return exports.TOKEN_REGISTRY[chainId] || [];
}
/**
 * Get token by address and chain
 */
function getTokenByAddress(chainId, address) {
    var tokens = getChainTokens(chainId);
    return tokens.find(function (token) {
        return token.address.toLowerCase() === address.toLowerCase();
    });
}
/**
 * Get native token for a chain
 */
function getNativeToken(chainId) {
    var tokens = getChainTokens(chainId);
    return tokens.find(function (token) { var _a; return (_a = token.tags) === null || _a === void 0 ? void 0 : _a.includes('native'); });
}
/**
 * Get wrapped native token for a chain
 */
function getWrappedNativeToken(chainId) {
    var tokens = getChainTokens(chainId);
    return tokens.find(function (token) { var _a; return (_a = token.tags) === null || _a === void 0 ? void 0 : _a.includes('wrapped'); });
}
/**
 * Refresh token logo for a specific token
 * Useful when logos are updated or new logo sources become available
 */
function refreshTokenLogo(chainId, address) {
    var token = getTokenByAddress(chainId, address);
    if (!token)
        return undefined;
    // Generate fresh logo URLs
    var logoUrls = (0, service_1.getTokenLogoUrls)({ chainId: chainId, address: address, symbol: token.symbol });
    var newLogoURI = logoUrls.length > 0 ? logoUrls[0] : token.logoURI;
    // Return updated token
    return __assign(__assign({}, token), { logoURI: newLogoURI });
}
/**
 * Get all available logo URLs for a token (for UI fallback handling)
 */
function getTokenLogoUrlsFromRegistry(chainId, address) {
    var token = getTokenByAddress(chainId, address);
    if (!token)
        return [];
    return (0, service_1.getTokenLogoUrls)({ chainId: chainId, address: address, symbol: token.symbol });
}
