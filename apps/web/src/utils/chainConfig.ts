// 临时链配置工具，后续会整合 @comet-swap/core-config
// TODO: 重构为使用 core-config 包

export interface ChainConfig {
  id: number
  name: string
  symbol: string
  testnet: boolean
  iconUrl?: string
}

// 基于core-config中XLAYER的配置
export const SUPPORTED_CHAINS: ChainConfig[] = [
  {
    id: 196,
    name: 'XLAYER',
    symbol: 'OKB',
    testnet: false,
    iconUrl: undefined // TODO: 添加XLAYER图标
  },
  {
    id: 195,
    name: 'XLAYER Testnet',
    symbol: 'OKB', 
    testnet: true,
    iconUrl: undefined // TODO: 添加XLAYER测试网图标
  }
]

export const getChainById = (chainId: number): ChainConfig | undefined => {
  return SUPPORTED_CHAINS.find(chain => chain.id === chainId)
}

export const getMainnetChains = (): ChainConfig[] => {
  return SUPPORTED_CHAINS.filter(chain => !chain.testnet)
}

export const getTestnetChains = (): ChainConfig[] => {
  return SUPPORTED_CHAINS.filter(chain => chain.testnet)
}
