import type { Address } from 'viem'
import type { ChainId } from '../chains/types'

/**
 * 合约类型枚举
 */
export enum ContractType {
  V2_FACTORY = 'V2_FACTORY',
  V2_ROUTER = 'V2_ROUTER', 
  V3_FACTORY = 'V3_FACTORY',
  V3_POSITION_MANAGER = 'V3_POSITION_MANAGER',
  V3_QUOTER = 'V3_QUOTER',
  SMART_ROUTER = 'SMART_ROUTER',
  MIXED_ROUTE_QUOTER_V1 = 'MIXED_ROUTE_QUOTER_V1',
  MULTICALL = 'MULTICALL',
}

/**
 * 合约地址映射
 */
export type ContractAddresses = {
  [K in ContractType]?: Address
}

/**
 * 链合约地址注册表
 */
export type ChainContractRegistry = Record<ChainId, ContractAddresses>

/**
 * 合约信息
 */
export interface ContractInfo {
  address: Address
  type: ContractType
  chainId: ChainId
  name: string
  version?: string
}
