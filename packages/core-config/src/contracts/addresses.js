"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONTRACT_ADDRESSES = void 0;
exports.getContractAddress = getContractAddress;
exports.getChainContracts = getChainContracts;
var types_1 = require("../chains/types");
var types_2 = require("./types");
/**
 * X Layer 主网合约地址
 */
var XLAYER_CONTRACTS = (_a = {},
    _a[types_2.ContractType.V2_FACTORY] = '0x3E84D913803b02A4a7f027165E8cA42C14C0FdE7',
    _a[types_2.ContractType.V2_ROUTER] = '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
    _a[types_2.ContractType.V3_FACTORY] = '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
    _a[types_2.ContractType.V3_POSITION_MANAGER] = '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    _a[types_2.ContractType.V3_QUOTER] = '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    _a[types_2.ContractType.SMART_ROUTER] = '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
    _a[types_2.ContractType.MIXED_ROUTE_QUOTER_V1] = '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    _a[types_2.ContractType.MULTICALL] = '0xcA11bde05977b3631167028862bE2a173976CA11',
    _a);
/**
 * X Layer 测试网合约地址
 */
var XLAYER_TESTNET_CONTRACTS = (_b = {},
    _b[types_2.ContractType.V2_FACTORY] = '0x3E84D913803b02A4a7f027165E8cA42C14C0FdE7',
    _b[types_2.ContractType.V2_ROUTER] = '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
    _b[types_2.ContractType.V3_FACTORY] = '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
    _b[types_2.ContractType.V3_POSITION_MANAGER] = '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
    _b[types_2.ContractType.V3_QUOTER] = '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    _b[types_2.ContractType.SMART_ROUTER] = '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
    _b[types_2.ContractType.MIXED_ROUTE_QUOTER_V1] = '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
    _b[types_2.ContractType.MULTICALL] = '0xcA11bde05977b3631167028862bE2a173976CA11',
    _b);
/**
 * 合约地址注册表
 */
exports.CONTRACT_ADDRESSES = (_c = {},
    _c[types_1.ChainId.XLAYER] = XLAYER_CONTRACTS,
    _c[types_1.ChainId.XLAYER_TESTNET] = XLAYER_TESTNET_CONTRACTS,
    _c);
/**
 * 获取指定链和合约类型的地址
 */
function getContractAddress(chainId, contractType) {
    var chainContracts = exports.CONTRACT_ADDRESSES[chainId];
    if (!chainContracts) {
        throw new Error("No contracts found for chain ".concat(chainId));
    }
    var address = chainContracts[contractType];
    if (!address) {
        throw new Error("Contract ".concat(contractType, " not found on chain ").concat(chainId));
    }
    return address;
}
/**
 * 获取指定链的所有合约地址
 */
function getChainContracts(chainId) {
    var contracts = exports.CONTRACT_ADDRESSES[chainId];
    if (!contracts) {
        throw new Error("No contracts found for chain ".concat(chainId));
    }
    return contracts;
}
