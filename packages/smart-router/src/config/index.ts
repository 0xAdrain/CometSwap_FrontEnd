// Smart Router Configuration 
// This module provides contract and configuration utilities for the smart router
// It references the unified configuration from @comet-swap/core-config

import {
  ContractType,
  getContractAddress,
  getChainContracts,
  type ContractAddresses,
} from '@comet-swap/core-config/contracts'

import {
  getChainTokens,
  getTokenByAddress,
  getNativeToken,
  getWrappedNativeToken,
  type TokenInfo,
} from '@comet-swap/core-config/tokens'

// Re-export for convenience within smart-router
export {
  ContractType,
  getContractAddress,
  getChainContracts,
  type ContractAddresses,
  getChainTokens,
  getTokenByAddress,
  getNativeToken,
  getWrappedNativeToken,
  type TokenInfo,
}

// Smart router specific configuration utilities
export function getRouterAddress(chainId: number): string {
  return getContractAddress(chainId as any, ContractType.SMART_ROUTER)
}

export function getQuoterAddress(chainId: number): string {
  return getContractAddress(chainId as any, ContractType.MIXED_ROUTE_QUOTER_V1)
}

export function getV3FactoryAddress(chainId: number): string {
  return getContractAddress(chainId as any, ContractType.V3_FACTORY)
}
