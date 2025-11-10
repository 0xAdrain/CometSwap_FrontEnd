// @ts-nocheck - 临时禁用类型检查，viem v2 API兼容性问题
import { useState, useCallback, useMemo } from 'react'
import { Address, encodePacked } from 'viem'
import { usePublicClient } from 'wagmi'
import { ChainId, getContractAddress, ContractType } from '@comet-swap/core-config/chains'
import { TokenInfo } from '@comet-swap/core-config/tokens'
import { MIXED_ROUTE_QUOTER_V1_ABI } from '@comet-swap/core-config/contracts'

// ABIs for on-chain discovery
const V3_FACTORY_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      { internalType: 'address', name: 'tokenB', type: 'address' },
      { internalType: 'uint24', name: 'fee', type: 'uint24' },
    ],
    name: 'getPool',
    outputs: [{ internalType: 'address', name: 'pool', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const V2_FACTORY_ABI = [
  {
    inputs: [
      { internalType: 'address', name: 'tokenA', type: 'address' },
      { internalType: 'address', name: 'tokenB', type: 'address' },
    ],
    name: 'getPair',
    outputs: [{ internalType: 'address', name: 'pair', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
] as const

const V3_POOL_ABI = [
    {
        "inputs": [],
        "name": "liquidity",
        "outputs": [
            {
                "internalType": "uint128",
                "name": "",
                "type": "uint128"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const

const V2_PAIR_ABI = [
    {
        "inputs": [],
        "name": "getReserves",
        "outputs": [
            { "internalType": "uint112", "name": "reserve0", "type": "uint112" },
            { "internalType": "uint112", "name": "reserve1", "type": "uint112" },
            { "internalType": "uint32", "name": "blockTimestampLast", "type": "uint32" }
        ],
        "stateMutability": "view",
        "type": "function"
    }
] as const


// Constants
const V3_FEE_TIERS = [100, 500, 2500, 10000] // 0.01%, 0.05%, 0.25%, 1%
const BRIDGE_TOKENS_ADDRESSES: { [key in ChainId]?: Address[] } = {
  [ChainId.XLAYER_TESTNET]: [
    '0xFCF165C4C8925682aE5facEC596D474eB36CE825', // mWOKB
    '0xE196aaADEbAcCE2354Aa414D202E0AB1C907d8B5', // mUSDT
    '0x70b759Ba2ca756fAD20B232De07F583AA5E676FC', // mUSDC
  ],
}

// Interfaces
export interface OnChainRouteHop {
  protocol: 'V2' | 'V3'
  poolAddress: Address
  fee?: number
}

export interface OnChainRoute {
  protocol: 'V2' | 'V3' | 'MIXED'
  path: Address[]
  pairs: OnChainRouteHop[]
  hops: number
  totalGasEstimate: bigint
}

interface UseOnChainRoutingResult {
  routes: OnChainRoute[]
  isLoading: boolean
  error: string | null
  refresh: () => Promise<OnChainRoute[]>
}

/**
 * Hook for discovering V2, V3, and Mixed routes on-chain.
 */
export const useOnChainRouting = (
  inputToken?: TokenInfo | null,
  outputToken?: TokenInfo | null,
  _inputAmount?: string // Preserved for potential future use (e.g., liquidity-based filtering)
): UseOnChainRoutingResult => {
  const [routes, setRoutes] = useState<OnChainRoute[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const publicClient = usePublicClient()
  const v3FactoryAddress = getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V3_FACTORY)
  const v2FactoryAddress = getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V2_FACTORY)

  const chainId = ChainId.XLAYER_TESTNET
  const bridgeTokens = useMemo(() => BRIDGE_TOKENS_ADDRESSES[chainId] || [], [chainId])

  const hasLiquidityV3 = useCallback(async (poolAddress: Address) => {
    if (!publicClient) return false
    try {
        const liquidity = await publicClient.readContract({
            address: poolAddress,
            abi: V3_POOL_ABI,
            functionName: 'liquidity',
        })
        return liquidity > BigInt(0)
    } catch (e) {
        return false
    }
  }, [publicClient])

  const hasLiquidityV2 = useCallback(async (pairAddress: Address) => {
      if (!publicClient) return false
      try {
          const reserves = await publicClient.readContract({
              address: pairAddress,
              abi: V2_PAIR_ABI,
              functionName: 'getReserves',
          })
          return reserves[0] > BigInt(0) && reserves[1] > BigInt(0)
      } catch (e) {
          return false
      }
  }, [publicClient])


  const findRoutes = useCallback(async () => {
    if (!publicClient || !inputToken || !outputToken || !v3FactoryAddress || !v2FactoryAddress) {
      return []
    }
    console.log('🔍 Starting on-chain route discovery...')
    
    const allRoutes: OnChainRoute[] = []
    const tokenIn = inputToken.address
    const tokenOut = outputToken.address

    // 1. Direct V3 routes
    if (v3FactoryAddress) {
        console.log('🔍 Checking V3 direct pools...')
        for (const fee of V3_FEE_TIERS) {
            const poolAddress = await publicClient.readContract({
                address: v3FactoryAddress,
                abi: V3_FACTORY_ABI,
                functionName: 'getPool',
                args: [tokenIn, tokenOut, fee],
            })
            if (poolAddress !== '0x0000000000000000000000000000000000000000' && await hasLiquidityV3(poolAddress)) {
                allRoutes.push({
                    protocol: 'V3',
                    path: [tokenIn, tokenOut],
                    pairs: [{ protocol: 'V3', poolAddress, fee }],
                    hops: 1,
                    totalGasEstimate: BigInt(150000),
                })
                console.log(`  ✅ Found V3 direct pool (${fee / 10000}%)`)
            }
        }
    }


    // 2. Direct V2 routes
    if (v2FactoryAddress) {
        console.log('🔍 Checking V2 direct pair...')
        const pairAddress = await publicClient.readContract({
            address: v2FactoryAddress,
            abi: V2_FACTORY_ABI,
            functionName: 'getPair',
            args: [tokenIn, tokenOut],
        })
        if (pairAddress !== '0x0000000000000000000000000000000000000000' && await hasLiquidityV2(pairAddress)) {
            allRoutes.push({
                protocol: 'V2',
                path: [tokenIn, tokenOut],
                pairs: [{ protocol: 'V2', poolAddress: pairAddress }],
                hops: 1,
                totalGasEstimate: BigInt(120000),
            })
            console.log('  ✅ Found V2 direct pair')
        }
    }

    // 3. Multi-hop routes (V3 -> V3, V2 -> V2, V3 -> V2, V2 -> V3)
    console.log(`🌉 Checking multi-hop routes via ${bridgeTokens.length} bridge tokens...`)
    for (const bridgeToken of bridgeTokens) {
        if (bridgeToken.toLowerCase() === tokenIn.toLowerCase() || bridgeToken.toLowerCase() === tokenOut.toLowerCase()) continue

        // First hop (TokenIn -> Bridge)
        const firstHopV3Pools: OnChainRouteHop[] = []
        if (v3FactoryAddress) {
            for (const fee of V3_FEE_TIERS) {
                const poolAddress = await publicClient.readContract({
                    address: v3FactoryAddress,
                    abi: V3_FACTORY_ABI,
                    functionName: 'getPool',
                    args: [tokenIn, bridgeToken, fee],
                })
                if (poolAddress !== '0x0000000000000000000000000000000000000000' && await hasLiquidityV3(poolAddress)) {
                    firstHopV3Pools.push({ protocol: 'V3', poolAddress, fee })
                }
            }
        }
        
        let firstHopV2Pair: OnChainRouteHop | null = null
        if (v2FactoryAddress) {
            const pairAddress = await publicClient.readContract({
                address: v2FactoryAddress,
                abi: V2_FACTORY_ABI,
                functionName: 'getPair',
                args: [tokenIn, bridgeToken],
            })
            if (pairAddress !== '0x0000000000000000000000000000000000000000' && await hasLiquidityV2(pairAddress)) {
                firstHopV2Pair = { protocol: 'V2', poolAddress: pairAddress }
            }
        }
        const firstHops = [...firstHopV3Pools, ...(firstHopV2Pair ? [firstHopV2Pair] : [])]
        if (firstHops.length === 0) continue
        
        // Second hop (Bridge -> TokenOut)
        const secondHopV3Pools: OnChainRouteHop[] = []
         if (v3FactoryAddress) {
            for (const fee of V3_FEE_TIERS) {
                const poolAddress = await publicClient.readContract({
                    address: v3FactoryAddress,
                    abi: V3_FACTORY_ABI,
                    functionName: 'getPool',
                    args: [bridgeToken, tokenOut, fee],
                })
                if (poolAddress !== '0x0000000000000000000000000000000000000000' && await hasLiquidityV3(poolAddress)) {
                    secondHopV3Pools.push({ protocol: 'V3', poolAddress, fee })
                }
            }
        }
        
        let secondHopV2Pair: OnChainRouteHop | null = null
        if (v2FactoryAddress) {
            const pairAddress = await publicClient.readContract({
                address: v2FactoryAddress,
                abi: V2_FACTORY_ABI,
                functionName: 'getPair',
                args: [bridgeToken, tokenOut],
            })
            if (pairAddress !== '0x0000000000000000000000000000000000000000' && await hasLiquidityV2(pairAddress)) {
                secondHopV2Pair = { protocol: 'V2', poolAddress: pairAddress }
            }
        }
        const secondHops = [...secondHopV3Pools, ...(secondHopV2Pair ? [secondHopV2Pair] : [])]
        if (secondHops.length === 0) continue

        // Create routes for all valid combinations
        for (const first of firstHops) {
            for (const second of secondHops) {
                const protocol = first.protocol === second.protocol ? first.protocol : 'MIXED'
                allRoutes.push({
                    protocol,
                    path: [tokenIn, bridgeToken, tokenOut],
                    pairs: [first, second],
                    hops: 2,
                    totalGasEstimate: BigInt(250000),
                })
                console.log(`  ✅ Found ${protocol} multi-hop: ${inputToken.symbol} -> Bridge -> ${outputToken.symbol}`)
            }
        }
    }

    console.log(`🏆 On-chain discovery complete. Found ${allRoutes.length} potential routes.`)
    return allRoutes

  }, [publicClient, inputToken, outputToken, v3FactoryAddress, v2FactoryAddress, bridgeTokens, hasLiquidityV2, hasLiquidityV3])


  const refresh = useCallback(async (): Promise<OnChainRoute[]> => {
    setIsLoading(true)
    setError(null)
    try {
      const foundRoutes = await findRoutes()
      setRoutes(foundRoutes)
      return foundRoutes
    } catch (e) {
      console.error('On-chain routing failed:', e)
      const errorMessage = e instanceof Error ? e.message : 'Unknown error'
      setError(`Failed to find on-chain routes: ${errorMessage}`)
      return []
    } finally {
      setIsLoading(false)
    }
  }, [findRoutes])

  return { routes, isLoading, error, refresh }
}
