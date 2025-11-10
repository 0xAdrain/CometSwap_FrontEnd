"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHAIN_REGISTRY = void 0;
exports.getChainInfo = getChainInfo;
exports.getSupportedChainIds = getSupportedChainIds;
exports.isSupportedChain = isSupportedChain;
exports.getMainnetChains = getMainnetChains;
exports.getTestnetChains = getTestnetChains;
var types_1 = require("./types");
var xlayer_1 = require("./xlayer");
/**
 * 链注册表 - 统一管理所有支持的链
 */
exports.CHAIN_REGISTRY = (_a = {},
    _a[types_1.ChainId.XLAYER] = xlayer_1.XLAYER_MAINNET,
    _a[types_1.ChainId.XLAYER_TESTNET] = xlayer_1.XLAYER_TESTNET,
    _a);
/**
 * 获取链信息
 */
function getChainInfo(chainId) {
    var chainInfo = exports.CHAIN_REGISTRY[chainId];
    if (!chainInfo) {
        throw new Error("Unsupported chain ID: ".concat(chainId));
    }
    return chainInfo;
}
/**
 * 获取所有支持的链ID
 */
function getSupportedChainIds() {
    return Object.keys(exports.CHAIN_REGISTRY).map(Number);
}
/**
 * 检查链ID是否支持
 */
function isSupportedChain(chainId) {
    return chainId in exports.CHAIN_REGISTRY;
}
/**
 * 获取主网链
 */
function getMainnetChains() {
    return Object.values(exports.CHAIN_REGISTRY).filter(function (chain) { return !chain.testnet; });
}
/**
 * 获取测试网链
 */
function getTestnetChains() {
    return Object.values(exports.CHAIN_REGISTRY).filter(function (chain) { return chain.testnet; });
}
