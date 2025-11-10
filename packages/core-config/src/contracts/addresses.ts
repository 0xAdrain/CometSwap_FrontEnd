import type { ChainContractRegistry, ContractAddresses } from './types'
import { ChainId } from '../chains/types'
import { ContractType } from './types'

/**
 * X Layer 主网合约地址
 */
const XLAYER_CONTRACTS: ContractAddresses = {
  [ContractType.V2_FACTORY]: '0x3E84D913803b02A4a7f027165E8cA42C14C0FdE7',
  [ContractType.V2_ROUTER]: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
  [ContractType.V3_FACTORY]: '0x0BFbCF9fa4f9C56B0F40a671Ad40E0805A091865',
  [ContractType.V3_POSITION_MANAGER]: '0x46A15B0b27311cedF172AB29E4f4766fbE7F4364',
  [ContractType.V3_QUOTER]: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
  [ContractType.SMART_ROUTER]: '0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb',
  [ContractType.MIXED_ROUTE_QUOTER_V1]: '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a',
  [ContractType.MULTICALL]: '0xcA11bde05977b3631167028862bE2a173976CA11',
}

/**
 * X Layer 测试网合约地址 (2025-11-06 更新 - 从老前端迁移)
 */
const XLAYER_TESTNET_CONTRACTS: ContractAddresses = {
  [ContractType.V2_FACTORY]: '0x10F49e14f4f974221f39f0118D4f77b040112289',  // ✅ Comet Factory
  [ContractType.V2_ROUTER]: '0xC9553bccDBA8eA2d2b77782CBA20898e63855bed',    // ✅ Comet Router V2
  [ContractType.V3_FACTORY]: '0xb612B7b2D6aB7AdE6ebEbb422B75C05fE6268ebE',  // ✅ Comet V3 Factory
  [ContractType.V3_POSITION_MANAGER]: '0xF9df8Fce74325c5A546d45f0C646E02830582d31',  // ✅ NFT Position Manager
  [ContractType.V3_QUOTER]: '0x3eC5A8b15f543B642b1853792eAA917cc42004F1',  // ✅ Mixed Route Quoter
  [ContractType.SMART_ROUTER]: '0x2d132dcAF7990B56F4F252E14a58FeA1aA162fB2',  // ✅ Smart Router (V2/V3混合)
  [ContractType.MIXED_ROUTE_QUOTER_V1]: '0x3eC5A8b15f543B642b1853792eAA917cc42004F1',  // ✅ Mixed Route Quoter
  [ContractType.MULTICALL]: '0xcA11bde05977b3631167028862bE2a173976CA11',  // ✅ Standard Multicall3
}

/**
 * 合约地址注册表
 */
export const CONTRACT_ADDRESSES: ChainContractRegistry = {
  [ChainId.XLAYER]: XLAYER_CONTRACTS,
  [ChainId.XLAYER_TESTNET]: XLAYER_TESTNET_CONTRACTS,
}

/**
 * 获取指定链和合约类型的地址
 */
export function getContractAddress(
  chainId: ChainId,
  contractType: ContractType
): string {
  const chainContracts = CONTRACT_ADDRESSES[chainId]
  if (!chainContracts) {
    throw new Error(`No contracts found for chain ${chainId}`)
  }

  const address = chainContracts[contractType]
  if (!address) {
    throw new Error(`Contract ${contractType} not found on chain ${chainId}`)
  }

  return address
}

/**
 * 获取指定链的所有合约地址
 */
export function getChainContracts(chainId: ChainId): ContractAddresses {
  const contracts = CONTRACT_ADDRESSES[chainId]
  if (!contracts) {
    throw new Error(`No contracts found for chain ${chainId}`)
  }
  return contracts
}
