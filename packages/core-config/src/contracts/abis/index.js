"use strict";
// ABI export - Migrated from old project ABIs
// All packages should import ABIs from @comet-swap/core-config/contracts
Object.defineProperty(exports, "__esModule", { value: true });
exports.V3_POOL_ABI = exports.V3_FACTORY_ABI = exports.SMART_ROUTER_ABI = exports.V2_ROUTER_ABI = exports.MIXED_ROUTE_QUOTER_V1_ABI = void 0;
exports.MIXED_ROUTE_QUOTER_V1_ABI = [
    {
        inputs: [
            { internalType: 'address', name: '_deployer', type: 'address' },
            { internalType: 'address', name: '_factory', type: 'address' },
            { internalType: 'address', name: '_factoryV2', type: 'address' },
            { internalType: 'address', name: '_factoryStable', type: 'address' },
            { internalType: 'address', name: '_WETH9', type: 'address' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [
            { internalType: 'bytes', name: 'path', type: 'bytes' },
            { internalType: 'uint256[]', name: 'flag', type: 'uint256[]' },
            { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
        ],
        name: 'quoteExactInput',
        outputs: [
            { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
            { internalType: 'uint160[]', name: 'v3SqrtPriceX96AfterList', type: 'uint160[]' },
            { internalType: 'uint32[]', name: 'v3InitializedTicksCrossedList', type: 'uint32[]' },
            { internalType: 'uint256', name: 'v3SwapGasEstimate', type: 'uint256' },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    { internalType: 'address', name: 'tokenIn', type: 'address' },
                    { internalType: 'address', name: 'tokenOut', type: 'address' },
                    { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
                    { internalType: 'uint24', name: 'fee', type: 'uint24' },
                    { internalType: 'uint160', name: 'sqrtPriceLimitX96', type: 'uint160' },
                ],
                internalType: 'struct IMixedRouteQuoterV1.QuoteExactInputSingleV3Params',
                name: 'params',
                type: 'tuple',
            },
        ],
        name: 'quoteExactInputSingleV3',
        outputs: [
            { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
            { internalType: 'uint160', name: 'sqrtPriceX96After', type: 'uint160' },
            { internalType: 'uint32', name: 'initializedTicksCrossed', type: 'uint32' },
            { internalType: 'uint256', name: 'gasEstimate', type: 'uint256' },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            {
                components: [
                    { internalType: 'address', name: 'tokenIn', type: 'address' },
                    { internalType: 'address', name: 'tokenOut', type: 'address' },
                    { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
                ],
                internalType: 'struct IMixedRouteQuoterV1.QuoteExactInputSingleV2Params',
                name: 'params',
                type: 'tuple',
            },
        ],
        name: 'quoteExactInputSingleV2',
        outputs: [
            { internalType: 'uint256', name: 'amountOut', type: 'uint256' },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
// V2 Router ABI - Basic swap functions
exports.V2_ROUTER_ABI = [
    {
        inputs: [
            { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
            { internalType: 'address[]', name: 'path', type: 'address[]' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        name: 'swapExactETHForTokens',
        outputs: [
            { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
            { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
            { internalType: 'address[]', name: 'path', type: 'address[]' },
            { internalType: 'address', name: 'to', type: 'address' },
            { internalType: 'uint256', name: 'deadline', type: 'uint256' },
        ],
        name: 'swapExactTokensForTokens',
        outputs: [
            { internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' },
        ],
        stateMutability: 'nonpayable',
        type: 'function',
    },
];
// Smart Router ABI - Advanced routing functions
exports.SMART_ROUTER_ABI = [
    {
        inputs: [
            { internalType: 'bytes', name: 'commands', type: 'bytes' },
            { internalType: 'bytes[]', name: 'inputs', type: 'bytes[]' },
        ],
        name: 'execute',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bytes[]', name: 'data', type: 'bytes[]' },
        ],
        name: 'multicall',
        outputs: [
            { internalType: 'bytes[]', name: 'results', type: 'bytes[]' },
        ],
        stateMutability: 'payable',
        type: 'function',
    },
];
// V3 Factory ABI - Pool creation and management
exports.V3_FACTORY_ABI = [
    {
        inputs: [
            { internalType: 'address', name: 'tokenA', type: 'address' },
            { internalType: 'address', name: 'tokenB', type: 'address' },
            { internalType: 'uint24', name: 'fee', type: 'uint24' },
        ],
        name: 'getPool',
        outputs: [
            { internalType: 'address', name: 'pool', type: 'address' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
// V3 Pool ABI - Pool interaction functions
exports.V3_POOL_ABI = [
    {
        inputs: [],
        name: 'slot0',
        outputs: [
            { internalType: 'uint160', name: 'sqrtPriceX96', type: 'uint160' },
            { internalType: 'int24', name: 'tick', type: 'int24' },
            { internalType: 'uint16', name: 'observationIndex', type: 'uint16' },
            { internalType: 'uint16', name: 'observationCardinality', type: 'uint16' },
            { internalType: 'uint16', name: 'observationCardinalityNext', type: 'uint16' },
            { internalType: 'uint8', name: 'feeProtocol', type: 'uint8' },
            { internalType: 'bool', name: 'unlocked', type: 'bool' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
];
