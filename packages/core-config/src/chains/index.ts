// 导出所有链相关类型和配置
export * from './types'
export * from './registry'
export * from './xlayer'

// 导出合约相关类型（方便一起导入）
export { ContractType } from '../contracts/types'
export { getContractAddress } from '../contracts/addresses'
