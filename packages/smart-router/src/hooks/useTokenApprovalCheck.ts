import { useState, useCallback, useMemo } from 'react'
import { Address, formatUnits, parseUnits } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { TokenInfo } from '@comet-swap/core-config/tokens'
import { ChainId, getContractAddress, ContractType } from '@comet-swap/core-config/chains'

// ERC20 ABI for allowance and approve
const ERC20_ABI = [
  {
    constant: true,
    inputs: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' }
    ],
    name: 'allowance',
    outputs: [{ name: '', type: 'uint256' }],
    type: 'function'
  },
  {
    constant: false,
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' }
    ],
    name: 'approve',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function'
  }
] as const

export interface TokenApprovalInfo {
  token: TokenInfo
  spender: Address
  currentAllowance: bigint
  requiredAmount: bigint
  needsApproval: boolean
  allowanceFormatted: string
  requiredFormatted: string
  isLoading: boolean
}

export interface UseTokenApprovalCheckResult {
  approvalInfo: TokenApprovalInfo | null
  checkApproval: (token: TokenInfo, amount: string, spender?: Address) => Promise<void>
  isChecking: boolean
  error: string | null
}

/**
 * 🔐 Token Approval Check Hook
 * 检查代币授权状态，参考 PancakeSwap 实现
 */
export function useTokenApprovalCheck(): UseTokenApprovalCheckResult {
  const { address: userAddress } = useAccount()
  const smartRouterAddress = getContractAddress(ChainId.XLAYER_TESTNET, ContractType.SMART_ROUTER)
  
  const [approvalInfo, setApprovalInfo] = useState<TokenApprovalInfo | null>(null)
  const [isChecking, setIsChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 简化版本：只返回状态，实际检查由调用方使用 useTokenAllowance 完成
  const checkApproval = useCallback(async (
    token: TokenInfo, 
    amount: string, 
    spender?: Address
  ) => {
    console.log(`🔍 Approval check initiated for ${token.symbol}`)
    console.log(`  Use useTokenAllowance hook for real-time checking`)
  }, [])

  return {
    approvalInfo,
    checkApproval,
    isChecking,
    error,
  }
}

/**
 * 🔐 Token Allowance Hook (Real-time)
 * 实时监控代币授权状态
 */
export function useTokenAllowance(
  tokenAddress: Address | undefined,
  spenderAddress: Address | undefined,
  enabled: boolean = true
) {
  const { address: userAddress } = useAccount()

  const { data: allowance, isLoading, refetch } = useReadContract({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: userAddress && spenderAddress ? [userAddress, spenderAddress] : undefined,
    query: {
      enabled: enabled && !!userAddress && !!tokenAddress && !!spenderAddress,
      refetchInterval: 10000, // 每10秒刷新一次
    }
  })

  const needsApproval = useCallback((amount: string, decimals: number): boolean => {
    if (!allowance || !amount) return true
    
    try {
      const requiredAmount = parseUnits(amount, decimals)
      return (allowance as bigint) < requiredAmount
    } catch {
      return true
    }
  }, [allowance])

  const formatAllowance = useCallback((decimals: number): string => {
    if (!allowance) return '0'
    return formatUnits(allowance as bigint, decimals)
  }, [allowance])

  return {
    allowance: allowance as bigint | undefined,
    isLoading,
    refetch,
    needsApproval,
    formatAllowance,
  }
}

