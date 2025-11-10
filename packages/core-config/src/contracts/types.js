"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractType = void 0;
/**
 * 合约类型枚举
 */
var ContractType;
(function (ContractType) {
    ContractType["V2_FACTORY"] = "V2_FACTORY";
    ContractType["V2_ROUTER"] = "V2_ROUTER";
    ContractType["V3_FACTORY"] = "V3_FACTORY";
    ContractType["V3_POSITION_MANAGER"] = "V3_POSITION_MANAGER";
    ContractType["V3_QUOTER"] = "V3_QUOTER";
    ContractType["SMART_ROUTER"] = "SMART_ROUTER";
    ContractType["MIXED_ROUTE_QUOTER_V1"] = "MIXED_ROUTE_QUOTER_V1";
    ContractType["MULTICALL"] = "MULTICALL";
})(ContractType || (exports.ContractType = ContractType = {}));
