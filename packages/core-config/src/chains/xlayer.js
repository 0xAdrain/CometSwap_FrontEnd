"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XLAYER_TESTNET = exports.XLAYER_MAINNET = void 0;
var types_1 = require("./types");
/**
 * X Layer 主网配置
 */
exports.XLAYER_MAINNET = {
    id: types_1.ChainId.XLAYER,
    name: 'X Layer Mainnet',
    network: 'xlayer',
    nativeCurrency: {
        name: 'OKB',
        symbol: 'OKB',
        decimals: 18,
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    },
    rpcUrls: {
        http: [
            'https://rpc.xlayer.tech',
            'https://xlayerrpc.okx.com',
        ],
        webSocket: [
            'wss://ws.xlayer.tech',
        ],
    },
    blockExplorers: [
        {
            name: 'X Layer Explorer',
            url: 'https://www.oklink.com/xlayer',
            apiUrl: 'https://www.oklink.com/api/v5/explorer/xlayer',
        },
    ],
    testnet: false,
    iconUrl: 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png',
};
/**
 * X Layer 测试网配置
 */
exports.XLAYER_TESTNET = {
    id: types_1.ChainId.XLAYER_TESTNET,
    name: 'X Layer Testnet',
    network: 'xlayer-testnet',
    nativeCurrency: {
        name: 'OKB',
        symbol: 'OKB',
        decimals: 18,
        address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    },
    rpcUrls: {
        http: [
            'https://testrpc.xlayer.tech',
            'https://xlayertestrpc.okx.com',
        ],
    },
    blockExplorers: [
        {
            name: 'X Layer Testnet Explorer',
            url: 'https://www.oklink.com/xlayer-test',
        },
    ],
    testnet: true,
    iconUrl: 'https://static.okx.com/cdn/assets/imgs/247/58E63FEA47A2B7D7.png',
};
