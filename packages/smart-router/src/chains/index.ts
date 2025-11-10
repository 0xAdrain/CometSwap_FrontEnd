// Smart Router Chain Configuration
// This module provides chain-specific utilities for the smart router
// It references the unified configuration from @comet-swap/core-config

import {
  ChainId,
  ChainInfo,
  getChainInfo,
  getSupportedChainIds,
  isSupportedChain,
  getMainnetChains,
  getTestnetChains,
} from '@comet-swap/core-config/chains'

// Re-export for convenience within smart-router
export {
  ChainId,
  type ChainInfo,
  getChainInfo,
  getSupportedChainIds,
  isSupportedChain,
  getMainnetChains,
  getTestnetChains,
}

// Smart router specific chain utilities
export function getDefaultChainId(): ChainId {
  return ChainId.XLAYER
}

export function isMainnet(chainId: ChainId): boolean {
  const chainInfo = getChainInfo(chainId)
  return !chainInfo.testnet
}

export function getChainRpcUrl(chainId: ChainId): string {
  const chainInfo = getChainInfo(chainId)
  return chainInfo.rpcUrls.http[0]
}
