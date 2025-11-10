// @ts-nocheck - 临时禁用类型检查，viem v2 API兼容性问题
import { useState, useCallback, useMemo, useEffect } from 'react'
import { Address, encodePacked, encodeFunctionData, formatUnits, parseUnits } from 'viem'
import { useAccount, usePublicClient, useWalletClient, useChainId } from 'wagmi'
import { ChainId, getContractAddress, ContractType } from '@comet-swap/core-config/chains'
import { TokenInfo } from '@comet-swap/core-config/tokens'
import { MIXED_ROUTE_QUOTER_V1_ABI, SMART_ROUTER_ABI } from '@comet-swap/core-config/contracts'
import { useOnChainRouting, OnChainRoute } from './useOnChainRouting'

// 🎯 V2 Router ABI for gas estimation
const V2RouterABI = [
  {
    "constant": false,
    "inputs": [
      { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
      { "internalType": "uint256", "name": "amountOutMin", "type": "uint256" },
      { "internalType": "address[]", "name": "path", "type": "address[]" },
      { "internalType": "address", "name": "to", "type": "address" },
      { "internalType": "uint256", "name": "deadline", "type": "uint256" }
    ],
    "name": "swapExactTokensForTokens",
    "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

// 🎯 V3 Factory ABI for pool discovery
const V3_FACTORY_ABI = [
  {
    "constant": true,
    "inputs": [
      { "internalType": "address", "name": "tokenA", "type": "address" },
      { "internalType": "address", "name": "tokenB", "type": "address" },
      { "internalType": "uint24", "name": "fee", "type": "uint24" }
    ],
    "name": "getPool",
    "outputs": [{ "internalType": "address", "name": "pool", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// 🏭 V2 Factory ABI for pair discovery
const V2_FACTORY_ABI = [
  {
    "constant": true,
    "inputs": [
      { "internalType": "address", "name": "tokenA", "type": "address" },
      { "internalType": "address", "name": "tokenB", "type": "address" }
    ],
    "name": "getPair",
    "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// 🎯 V3 Pool ABI for liquidity check
const V3_POOL_ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "slot0",
    "outputs": [
      { "internalType": "uint160", "name": "sqrtPriceX96", "type": "uint160" },
      { "internalType": "int24", "name": "tick", "type": "int24" },
      { "internalType": "uint16", "name": "observationIndex", "type": "uint16" },
      { "internalType": "uint16", "name": "observationCardinality", "type": "uint16" },
      { "internalType": "uint16", "name": "observationCardinalityNext", "type": "uint16" },
      { "internalType": "uint32", "name": "feeProtocol", "type": "uint32" },
      { "internalType": "bool", "name": "unlocked", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "liquidity",
    "outputs": [{ "internalType": "uint128", "name": "", "type": "uint128" }],
    "stateMutability": "view",
    "type": "function"
  }
] as const

// 🌉 Bridge tokens for multi-hop routing (based on successful script)
const BRIDGE_TOKENS = {
  [ChainId.XLAYER_TESTNET]: [
    '0xFCF165C4C8925682aE5facEC596D474eB36CE825', // mWOKB
    '0xE196aaADEbAcCE2354Aa414D202E0AB1C907d8B5', // mUSDT
    '0x70b759Ba2ca756fAD20B232De07F583AA5E676FC', // mUSDC
    '0x4Ec24e2da05F7C6fC54C3234137E07d0A8826610'  // mDAI
  ]
}

// 🎯 已知有效的池子配置 (基于成功脚本的实际测试结果)
const KNOWN_VALID_POOLS = {
  [ChainId.XLAYER_TESTNET]: [
    // V3 池子 (已验证有流动性)
    { tokenA: '0xFCF165C4C8925682aE5facEC596D474eB36CE825', tokenB: '0xE196aaADEbAcCE2354Aa414D202E0AB1C907d8B5', fee: 10000 }, // mWOKB ↔ mUSDT (1%)
    { tokenA: '0xFCF165C4C8925682aE5facEC596D474eB36CE825', tokenB: '0x70b759Ba2ca756fAD20B232De07F583AA5E676FC', fee: 10000 }, // mWOKB ↔ mUSDC (1%)
    { tokenA: '0xE196aaADEbAcCE2354Aa414D202E0AB1C907d8B5', tokenB: '0x70b759Ba2ca756fAD20B232De07F583AA5E676FC', fee: 100 },   // mUSDT ↔ mUSDC (0.01%)
    { tokenA: '0xE196aaADEbAcCE2354Aa414D202E0AB1C907d8B5', tokenB: '0x826DB476956eE85D9b3807dE4889945f9dd81740', fee: 10000 }, // mUSDT ↔ mMEME (1%)
  ]
}

// 🎯 V3 Fee tiers (based on successful script findings)
const V3_FEE_TIERS = [100, 500, 2500, 10000] // 0.01%, 0.05%, 0.25%, 1%

export enum RouteType {
  V2_DIRECT = 'V2_DIRECT',
  V2_MULTIHOP = 'V2_MULTIHOP', 
  V3_DIRECT = 'V3_DIRECT',
  V3_MULTIHOP = 'V3_MULTIHOP',
  MIXED = 'MIXED'
}

export interface SwapRoute {
  type: RouteType
  path: Address[]
  pools: string[]
  pairs?: any[] // 原始池子信息，用于混合协议路径
  gasEstimate: bigint
  expectedOutput?: bigint
  feeTier?: number
  encodedPath?: string // For V3 routes
}

export interface RouteQuote {
  route: SwapRoute
  outputAmount: bigint
  priceImpact: number
  gasEstimate: bigint
  reliability: number
  score: number
}

export interface SmartRouterResult {
  bestRoute: RouteQuote | null
  allRoutes: RouteQuote[]
  isLoading: boolean
  error: string | null
  executeSwap: (slippagePercent?: number) => Promise<string | null>
  refresh: () => Promise<void>
}

/**
 * 🧠 SmartRouter Hook - 基于成功脚本的多跳路由实现
 * 
 * 功能：
 * 1. 发现 V2、V3 和混合路径
 * 2. 基于实际合约调用计算报价
 * 3. 智能选择最优路径
 * 4. 执行 SmartRouter 交易
 */
export function useSmartRouterCallback(
  inputToken: TokenInfo | null,
  outputToken: TokenInfo | null,
  inputAmount: string
): SmartRouterResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [routes, setRoutes] = useState<RouteQuote[]>([])

  const { address: account } = useAccount()
  const publicClient = usePublicClient()
  const { data: walletClient } = useWalletClient()
  const smartRouterAddress = getContractAddress(ChainId.XLAYER_TESTNET, ContractType.SMART_ROUTER)
  const quoterAddress = getContractAddress(ChainId.XLAYER_TESTNET, ContractType.MIXED_ROUTE_QUOTER_V1)

  // 🧠 集成 On-Chain 路由发现
  const onChainRouting = useOnChainRouting(inputToken, outputToken, inputAmount)

  // 🔍 发现所有可能的路径 (使用 On-Chain 路由发现)
  const discoverRoutes = useCallback(async (): Promise<SwapRoute[]> => {
    if (!inputToken || !outputToken || !inputAmount || !publicClient) return []

    console.log('🔍 Discovering routes using On-Chain routing for:', inputToken.symbol, '→', outputToken.symbol)
    
    try {
      // 🧠 使用 On-Chain 路由发现系统
      const foundRoutes = await onChainRouting.refresh()
      
      if (onChainRouting.error) {
        console.error('❌ On-Chain routing error:', onChainRouting.error)
        // 如果 on-chain 失败，回退到已知池子
        return await discoverFallbackRoutes(inputToken, outputToken)
      }

      // 🎯 转换 OnChainRoute 到 SwapRoute
      const discoveredRoutes: SwapRoute[] = foundRoutes.map(route => 
        convertOnChainRouteToSwapRoute(route, inputToken, outputToken)
      )

      console.log(`🔍 On-Chain discovery found ${discoveredRoutes.length} routes`)
      return discoveredRoutes

    } catch (err) {
      console.error('❌ On-Chain route discovery failed:', err)
      // 回退到已知池子
      return await discoverFallbackRoutes(inputToken, outputToken)
    }
  }, [inputToken, outputToken, inputAmount, publicClient, onChainRouting])

  // 🔄 转换 OnChainRoute 到 SwapRoute
  const convertOnChainRouteToSwapRoute = useCallback((
    onChainRoute: OnChainRoute, 
    inputToken: TokenInfo, 
    outputToken: TokenInfo
  ): SwapRoute => {
    // 🛡️ 调试：检查输入的 OnChainRoute 结构
    console.log(`🔄 Converting route:`, {
      protocol: onChainRoute.protocol,
      hops: onChainRoute.hops,
      path: onChainRoute.path,
      hasPairs: !!onChainRoute.pairs,
      pairsLength: onChainRoute.pairs?.length,
      pairs: onChainRoute.pairs
    })
    
    // 确定路由类型
    let routeType: RouteType
    if (onChainRoute.hops === 1) {
      routeType = onChainRoute.protocol === 'V3' ? RouteType.V3_DIRECT : RouteType.V2_DIRECT
    } else {
      if (onChainRoute.protocol === 'V3') {
        routeType = RouteType.V3_MULTIHOP
      } else if (onChainRoute.protocol === 'V2') {
        routeType = RouteType.V2_MULTIHOP
      } else {
        routeType = RouteType.MIXED
      }
    }

    // 构建池子描述
    const pools = onChainRoute.pairs.map(pair => {
      if (pair.protocol === 'V3') {
        return `V3-${pair.fee ? pair.fee/10000 : 0}%`
      } else {
        return 'V2-Direct'
      }
    })

    // 构建编码路径 (用于 V3)
    let encodedPath: string | undefined
    if (routeType === RouteType.V3_DIRECT || routeType === RouteType.V3_MULTIHOP) {
      if (onChainRoute.hops === 1 && onChainRoute.pairs[0]?.fee) {
        console.log(`🔍 编码直接路径: ${inputToken.symbol} → ${outputToken.symbol}, 费率: ${onChainRoute.pairs[0].fee}`)
        encodedPath = encodePacked(
          ['address', 'uint24', 'address'],
          [inputToken.address as Address, onChainRoute.pairs[0].fee, outputToken.address as Address]
        )
        console.log(`📝 编码结果: ${encodedPath}`)
      } else if (onChainRoute.hops > 1) {
        // 多跳编码路径
        const types = ['address']
        const values = [inputToken.address as Address]
        
        for (let i = 0; i < onChainRoute.pairs.length; i++) {
          const pair = onChainRoute.pairs[i]
          if (pair.fee) {
            types.push('uint24', 'address')
            values.push(pair.fee as any, onChainRoute.path[i + 1] as Address)
          }
        }
        
        encodedPath = encodePacked(types as any, values as any)
      }
    }

    return {
      type: routeType,
      path: onChainRoute.path,
      pools,
      pairs: onChainRoute.pairs, // 🌈 传递原始池子信息，用于混合协议路径
      gasEstimate: onChainRoute.totalGasEstimate,
      encodedPath
    }
  }, [])

  // 🔙 回退到已知池子的路由发现
  const discoverFallbackRoutes = async (tokenA: TokenInfo, tokenB: TokenInfo): Promise<SwapRoute[]> => {
    console.log('🔙 Using fallback route discovery...')
    const fallbackRoutes: SwapRoute[] = []

    try {
      // 使用已知有效池子
      const v3DirectRoutes = await discoverV3DirectRoutes(tokenA, tokenB)
      fallbackRoutes.push(...v3DirectRoutes)

      const v3MultiHopRoutes = await discoverV3MultiHopRoutes(tokenA, tokenB)
      fallbackRoutes.push(...v3MultiHopRoutes)

      console.log(`🔙 Fallback discovery found ${fallbackRoutes.length} routes`)
      return fallbackRoutes
    } catch (error) {
      console.error('❌ Fallback route discovery failed:', error)
      return []
    }
  }

  // 🎯 发现 V3 直接路径 (只检查已知有效的池子)
  const discoverV3DirectRoutes = async (tokenA: TokenInfo, tokenB: TokenInfo): Promise<SwapRoute[]> => {
    if (!publicClient) return []

    const routes: SwapRoute[] = []
    const knownPools = KNOWN_VALID_POOLS[ChainId.XLAYER_TESTNET] || []
    
    try {
      // 检查已知有效的池子
      for (const pool of knownPools) {
        const isDirectMatch = 
          (pool.tokenA.toLowerCase() === tokenA.address.toLowerCase() && pool.tokenB.toLowerCase() === tokenB.address.toLowerCase()) ||
          (pool.tokenA.toLowerCase() === tokenB.address.toLowerCase() && pool.tokenB.toLowerCase() === tokenA.address.toLowerCase())

        if (isDirectMatch) {
          // 构建 V3 编码路径
          const encodedPath = encodePacked(
            ['address', 'uint24', 'address'],
            [tokenA.address as Address, pool.fee, tokenB.address as Address]
          )

          const route: SwapRoute = {
            type: RouteType.V3_DIRECT,
            path: [tokenA.address as Address, tokenB.address as Address],
            pools: [`V3-${pool.fee/10000}%`], // 显示协议类型和费率
            gasEstimate: BigInt(150000),
            feeTier: pool.fee,
            encodedPath
          }

          routes.push(route)
          console.log(`   ✅ V3 Direct: ${tokenA.symbol}→${tokenB.symbol} (${pool.fee/10000}% fee) - 已知有效池子`)
        }
      }
    } catch (error) {
      console.error('❌ V3 direct route discovery failed:', error)
    }

    return routes
  }

  // 🌉 发现 V3 多跳路径 (基于已知有效池子)
  const discoverV3MultiHopRoutes = async (tokenA: TokenInfo, tokenB: TokenInfo): Promise<SwapRoute[]> => {
    if (!publicClient) return []

    const routes: SwapRoute[] = []
    const knownPools = KNOWN_VALID_POOLS[ChainId.XLAYER_TESTNET] || []
    const bridgeTokens = BRIDGE_TOKENS[ChainId.XLAYER_TESTNET] || []

    try {
      for (const bridgeTokenAddress of bridgeTokens) {
        // 跳过如果桥接代币就是输入或输出代币
        if (bridgeTokenAddress === tokenA.address || bridgeTokenAddress === tokenB.address) {
          continue
        }

        // 查找第一跳: tokenA → bridgeToken
        const firstHopPool = knownPools.find(pool => 
          (pool.tokenA.toLowerCase() === tokenA.address.toLowerCase() && pool.tokenB.toLowerCase() === bridgeTokenAddress.toLowerCase()) ||
          (pool.tokenA.toLowerCase() === bridgeTokenAddress.toLowerCase() && pool.tokenB.toLowerCase() === tokenA.address.toLowerCase())
        )
        
        // 查找第二跳: bridgeToken → tokenB
        const secondHopPool = knownPools.find(pool => 
          (pool.tokenA.toLowerCase() === bridgeTokenAddress.toLowerCase() && pool.tokenB.toLowerCase() === tokenB.address.toLowerCase()) ||
          (pool.tokenA.toLowerCase() === tokenB.address.toLowerCase() && pool.tokenB.toLowerCase() === bridgeTokenAddress.toLowerCase())
        )

        // 如果两跳都有可用池子，创建多跳路径
        if (firstHopPool && secondHopPool) {
          // 构建多跳编码路径 (基于成功脚本的逻辑)
          const encodedPath = encodePacked(
            ['address', 'uint24', 'address', 'uint24', 'address'],
            [
              tokenA.address as Address, 
              firstHopPool.fee, 
              bridgeTokenAddress as Address, 
              secondHopPool.fee, 
              tokenB.address as Address
            ]
          )

          const route: SwapRoute = {
            type: RouteType.V3_MULTIHOP,
            path: [tokenA.address as Address, bridgeTokenAddress as Address, tokenB.address as Address],
            pools: [`V3-${firstHopPool.fee/10000}%`, `V3-${secondHopPool.fee/10000}%`], // 显示协议类型和费率
            gasEstimate: BigInt(220000),
            encodedPath
          }

          routes.push(route)
          console.log(`   ✅ V3 MultiHop: ${tokenA.symbol}→Bridge→${tokenB.symbol} (${firstHopPool.fee/10000}%→${secondHopPool.fee/10000}%) - 已知有效路径`)
        }
      }
    } catch (error) {
      console.error('❌ V3 multi-hop route discovery failed:', error)
    }

    return routes
  }

  // 🔍 查找 V3 池子对 (已废弃，现在使用已知有效池子配置)
  // const findV3PoolsForPair = async (tokenA: Address, tokenB: Address): Promise<{address: string, fee: number}[]> => {
  //   // 此函数已被 KNOWN_VALID_POOLS 配置替代
  // }

  // 💱 发现 V2 路径 (fallback)
  const discoverV2Routes = async (tokenA: TokenInfo, tokenB: TokenInfo): Promise<SwapRoute[]> => {
    // V2 路径发现逻辑 (简化实现)
    const routes: SwapRoute[] = []
    
    // 直接路径
    const directRoute: SwapRoute = {
      type: RouteType.V2_DIRECT,
      path: [tokenA.address as Address, tokenB.address as Address],
      pools: [`V2-Direct`], // 显示协议类型
      gasEstimate: BigInt(120000)
    }
    routes.push(directRoute)

    return routes
  }

  // ⛽ 精确Gas估算函数
  const estimateRouteGas = useCallback(async (route: SwapRoute, parsedAmountIn: bigint, minAmountOut: bigint): Promise<bigint> => {
    if (!publicClient || !walletClient || !account) {
      console.log('⛽ Gas estimation skipped: missing client or account')
      return route.gasEstimate // 返回默认估算
    }

    try {
      console.log(`⛽ Estimating gas for ${route.type} route...`)
      
      if (route.type === RouteType.V2_DIRECT) {
        // V2 直接路径 Gas 估算
        const gasEstimate = await publicClient.estimateContractGas({
          account: account as Address,
          address: getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V2_ROUTER) as Address,
          abi: V2RouterABI,
          functionName: 'swapExactTokensForTokens',
          args: [
            parsedAmountIn,
            minAmountOut,
            route.path,
            account,
            BigInt(Math.floor(Date.now() / 1000) + 1200) // 20分钟后过期
          ]
        })
        console.log(`   ✅ V2 Gas estimate: ${gasEstimate.toString()}`)
        return gasEstimate
        
      } else if (route.type === RouteType.V3_DIRECT || route.type === RouteType.V3_MULTIHOP) {
        // V3 路径 Gas 估算
        const gasEstimate = await publicClient.estimateContractGas({
          account: account as Address,
          address: smartRouterAddress as Address,
          abi: SMART_ROUTER_ABI,
          functionName: 'exactInput',
          args: [{
            path: route.encodedPath!,
            recipient: account,
            amountIn: parsedAmountIn,
            amountOutMinimum: minAmountOut
          }]
        })
        console.log(`   ✅ V3 Gas estimate: ${gasEstimate.toString()}`)
        return gasEstimate
        
      } else if (route.type === RouteType.MIXED) {
        // 混合路径 Gas 估算 - 使用 multicall
        try {
          const { encodeMixedRouteSwap, encodeMulticall } = await import('../utils/mixedRouteExecution')
          const calldatas = encodeMixedRouteSwap(route as any, parsedAmountIn, minAmountOut, account as Address, SMART_ROUTER_ABI)
          const multicallData = encodeMulticall(calldatas, SMART_ROUTER_ABI)
          
          const gasEstimate = await publicClient.estimateContractGas({
            account: account as Address,
            address: smartRouterAddress as Address,
            abi: SMART_ROUTER_ABI,
            functionName: 'multicall',
            args: [multicallData]
          })
          console.log(`   ✅ Mixed Gas estimate: ${gasEstimate.toString()}`)
          return gasEstimate
        } catch (error) {
          console.warn('   ⚠️ Mixed route gas estimation failed:', error)
          return route.gasEstimate // 返回默认估算
        }
      }
      
      return route.gasEstimate // 默认返回
    } catch (error) {
      console.warn(`   ⚠️ Gas estimation failed for ${route.type}:`, error)
      return route.gasEstimate // 返回默认估算
    }
  }, [publicClient, walletClient, account, smartRouterAddress])

  // 💱 计算 V2 池子中间价
  const calculateV2MidPrice = useCallback(async (tokenA: Address, tokenB: Address): Promise<number> => {
    if (!publicClient || !getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V2_FACTORY)) return 0

    try {
      // 获取 V2 池子地址
      const pairAddress = await publicClient.readContract({
        address: getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V2_FACTORY) as Address,
        abi: V2_FACTORY_ABI,
        functionName: 'getPair',
        args: [tokenA, tokenB],
      }) as Address

      if (pairAddress === '0x0000000000000000000000000000000000000000') return 0

      // 获取储备量
      const reserves = await publicClient.readContract({
        address: pairAddress,
        abi: [{
          "constant": true,
          "inputs": [],
          "name": "getReserves",
          "outputs": [
            { "internalType": "uint112", "name": "reserve0", "type": "uint112" },
            { "internalType": "uint112", "name": "reserve1", "type": "uint112" },
            { "internalType": "uint32", "name": "blockTimestampLast", "type": "uint32" }
          ],
          "stateMutability": "view",
          "type": "function"
        }],
        functionName: 'getReserves',
      }) as [bigint, bigint, number]

      // 获取池子的 token0 和 token1
      const token0 = await publicClient.readContract({
        address: pairAddress,
        abi: [{
          "constant": true,
          "inputs": [],
          "name": "token0",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        }],
        functionName: 'token0',
      }) as Address

      // 确定储备量的顺序
      const isToken0Input = token0.toLowerCase() === tokenA.toLowerCase()
      const reserveIn = isToken0Input ? reserves[0] : reserves[1]
      const reserveOut = isToken0Input ? reserves[1] : reserves[0]

      if (reserveIn === BigInt(0) || reserveOut === BigInt(0)) return 0

      // V2 中间价 = reserveOut / reserveIn
      return Number(reserveOut) / Number(reserveIn)

    } catch (error) {
      console.warn('V2 中间价计算失败:', error)
      return 0
    }
  }, [publicClient, smartRouterAddress])

  // 🔷 计算 V3 池子中间价
  const calculateV3MidPrice = useCallback(async (tokenA: Address, tokenB: Address, fee: number): Promise<number> => {
    if (!publicClient || !getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V3_FACTORY)) return 0

    try {
      // 获取 V3 池子地址
      const poolAddress = await publicClient.readContract({
        address: getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V3_FACTORY) as Address,
        abi: V3_FACTORY_ABI,
        functionName: 'getPool',
        args: [tokenA, tokenB, fee],
      }) as Address

      if (poolAddress === '0x0000000000000000000000000000000000000000') return 0

      // 获取 slot0 信息
      const slot0 = await publicClient.readContract({
        address: poolAddress,
        abi: V3_POOL_ABI,
        functionName: 'slot0',
      }) as readonly [bigint, number, number, number, number, number, boolean]

      const sqrtPriceX96 = slot0[0]
      if (sqrtPriceX96 === BigInt(0)) return 0

      // 获取池子的 token0 和 token1
      const token0 = await publicClient.readContract({
        address: poolAddress,
        abi: [{
          "constant": true,
          "inputs": [],
          "name": "token0",
          "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
          "stateMutability": "view",
          "type": "function"
        }],
        functionName: 'token0',
      }) as Address

      // V3 价格计算：price = (sqrtPriceX96 / 2^96)^2
      const price = Math.pow(Number(sqrtPriceX96) / Math.pow(2, 96), 2)
      
      // 如果 tokenA 是 token1，需要取倒数
      const isToken0Input = token0.toLowerCase() === tokenA.toLowerCase()
      return isToken0Input ? price : 1 / price

    } catch (error) {
      console.warn('V3 中间价计算失败:', error)
      return 0
    }
  }, [publicClient, smartRouterAddress])

  // 🌉 计算多跳路径中间价
  const calculateMultiHopMidPrice = useCallback(async (route: SwapRoute): Promise<number> => {
    if (!route.pairs || route.pairs.length === 0) return 0

    try {
      let totalMidPrice = 1

      for (let i = 0; i < route.pairs.length; i++) {
        const pair = route.pairs[i]
        const tokenIn = route.path[i]
        const tokenOut = route.path[i + 1]

        let hopMidPrice = 0
        if (pair.protocol === 'V2') {
          hopMidPrice = await calculateV2MidPrice(tokenIn, tokenOut)
        } else if (pair.protocol === 'V3') {
          hopMidPrice = await calculateV3MidPrice(tokenIn, tokenOut, pair.fee || 10000)
        }

        if (hopMidPrice === 0) return 0
        totalMidPrice *= hopMidPrice
      }

      return totalMidPrice

    } catch (error) {
      console.warn('多跳中间价计算失败:', error)
      return 0
    }
  }, [calculateV2MidPrice, calculateV3MidPrice])

  // 🎯 计算价格影响
  const calculatePriceImpact = useCallback(async (route: SwapRoute, amountIn: bigint, amountOut: bigint): Promise<number> => {
    if (!publicClient || !inputToken || !outputToken) return 0.1

    try {
      console.log(`📊 计算价格影响: ${route.type}`)
      
      // 计算执行价格 (每个输入代币能换多少输出代币)
      const executionPrice = Number(amountOut) / Number(amountIn) * Math.pow(10, inputToken.decimals - outputToken.decimals)
      
      let midPrice = 0
      
      if (route.type === RouteType.V2_DIRECT) {
        // V2 直接路径：从储备量计算中间价
        midPrice = await calculateV2MidPrice(route.path[0], route.path[1])
      } else if (route.type === RouteType.V3_DIRECT) {
        // V3 直接路径：从 slot0 计算中间价
        midPrice = await calculateV3MidPrice(route.path[0], route.path[1], route.feeTier || 10000)
      } else if (route.type === RouteType.MIXED || route.type === RouteType.V2_MULTIHOP || route.type === RouteType.V3_MULTIHOP) {
        // 多跳路径：计算理论中间价（每一跳的中间价相乘）
        midPrice = await calculateMultiHopMidPrice(route)
      }
      
      if (midPrice === 0) {
        console.warn('⚠️ 无法计算中间价，使用默认价格影响')
        return 0.1
      }
      
      // 价格影响 = |1 - (执行价格 / 中间价格)| × 100%
      const priceImpact = Math.abs(1 - (executionPrice / midPrice)) * 100
      
      console.log(`  - 执行价格: ${executionPrice.toFixed(6)}`)
      console.log(`  - 中间价格: ${midPrice.toFixed(6)}`)
      console.log(`  - 价格影响: ${priceImpact.toFixed(3)}%`)
      
      return Math.min(priceImpact, 100) // 限制最大价格影响为 100%
      
    } catch (error) {
      console.warn('⚠️ 价格影响计算失败:', error)
      return 0.1 // 回退到默认值
    }
  }, [publicClient, inputToken, outputToken, calculateV2MidPrice, calculateV3MidPrice, calculateMultiHopMidPrice])

  // 📊 计算路径报价
  const calculateRouteQuote = useCallback(async (route: SwapRoute): Promise<RouteQuote | null> => {
    if (!publicClient || !inputToken || !outputToken) return null

    try {
      console.log('📊 Calculating quote for route:', route.type)

      const parsedAmountIn = parseUnits(inputAmount, inputToken.decimals)
      let outputAmount: bigint

      if (route.type === RouteType.V3_DIRECT || route.type === RouteType.V3_MULTIHOP) {
        // V3 路径使用 exactInput 进行报价 (callStatic 等效调用)
        try {
          // 使用 simulateContract 但指定正确的参数，模拟成功脚本的方法
          const simulation = await publicClient.simulateContract({
            account: account as Address,
            address: smartRouterAddress as Address,
            abi: SMART_ROUTER_ABI,
            functionName: 'exactInput',
            args: [{
              path: route.encodedPath!,
              recipient: account || '0x0000000000000000000000000000000000000000',
              amountIn: parsedAmountIn,
              amountOutMinimum: BigInt(0)
            }],
            gas: BigInt(3000000), // 使用与成功脚本相同的 gas limit
            value: BigInt(0) // 明确指定 value 为 0
          })

          outputAmount = simulation.result as bigint

          console.log(`   ✅ V3 Quote: ${inputAmount} ${inputToken.symbol} → ${formatUnits(outputAmount, outputToken.decimals)} ${outputToken.symbol}`)
        } catch (error) {
          console.warn('V3 quote failed:', error)
          return null
        }
      } else if (route.type === RouteType.MIXED) {
        // 🌈 混合路径报价 - 使用 MixedRouteQuoter 合约
        try {
          console.log(`   🌈 Mixed route quote: ${route.path.join(' → ')}`)
          
          // 🛡️ 安全检查：确保 pairs 字段存在
          if (!route.pairs || !Array.isArray(route.pairs)) {
            console.error(`   ❌ Mixed route missing pairs field:`, route)
            return null
          }
          
          console.log(`   🔄 协议序列: ${route.pairs.map(p => p.protocol).join(' → ')}`)
          
          // 🎯 构造混合协议路径编码 (参考 PancakeSwap)
          const V2_FEE_PLACEHOLDER = 0 // V2 池子使用占位符费率
          
          // 构造路径和类型数组
          let path: (string | number)[] = []
          let types: string[] = []
          
          for (let i = 0; i < route.pairs.length; i++) {
            const pair = route.pairs[i]
            const tokenIn = route.path[i]
            const tokenOut = route.path[i + 1]
            
            if (i === 0) {
              // 第一跳：tokenIn + fee + tokenOut
              const fee = pair.protocol === 'V3' ? (pair.fee || 10000) : V2_FEE_PLACEHOLDER
              path = [tokenIn, fee, tokenOut]
              types = ['address', 'uint24', 'address']
            } else {
              // 后续跳：fee + tokenOut
              const fee = pair.protocol === 'V3' ? (pair.fee || 10000) : V2_FEE_PLACEHOLDER
              path = [...path, fee, tokenOut]
              types = [...types, 'uint24', 'address']
            }
          }
          
          // 编码路径
          const encodedPath = encodePacked(types, path)
          
          // 构造 flag 数组 (0 = V3, 1 = V2)
          const flags = route.pairs.map(pair => pair.protocol === 'V3' ? 0 : 1)
          
          console.log(`   🔧 编码路径长度: ${encodedPath.length}`)
          console.log(`   🏳️ Flag 数组: [${flags.join(', ')}]`)
          
          // 调用 MixedRouteQuoter
          // @ts-expect-error viem v2 API compatibility
          const result = await publicClient.readContract({
            address: quoterAddress as Address,
            abi: MIXED_ROUTE_QUOTER_V1_ABI,
            functionName: 'quoteExactInput',
            args: [encodedPath, flags, parsedAmountIn],
          }) as [bigint, bigint[], number[], bigint]
          
          outputAmount = result[0] // amountOut
          console.log(`   ✅ Mixed Quote 完成: ${inputAmount} ${inputToken.symbol} → ${formatUnits(outputAmount, outputToken.decimals)} ${outputToken.symbol}`)
          console.log(`   📊 Gas 估算: ${result[3].toString()}`)
          
        } catch (error) {
          console.warn('Mixed route quote failed:', error)
          return null
        }
      } else {
        // V2 路径使用传统 getAmountsOut (只读调用，不需要模拟)
        try {
          console.log(`   🔍 V2 Quote path: ${route.path.join(' → ')}`)
          
          const amounts = await publicClient.readContract({
            address: smartRouterAddress as Address,
            abi: SMART_ROUTER_ABI,
            functionName: 'getAmountsOut',
            args: [parsedAmountIn, route.path],
          }) as bigint[]

          outputAmount = amounts[amounts.length - 1]
          console.log(`   ✅ V2 Quote: ${inputAmount} ${inputToken.symbol} → ${formatUnits(outputAmount, outputToken.decimals)} ${outputToken.symbol}`)
        } catch (error) {
          console.warn('V2 quote failed:', error)
          
          // 尝试使用 V2 Router 作为回退
          try {
            console.log(`   🔄 尝试 V2 Router 回退...`)
            // @ts-expect-error viem v2 API compatibility
            const amounts = await publicClient.readContract({
              address: getContractAddress(ChainId.XLAYER_TESTNET, ContractType.V2_ROUTER) as Address,
              abi: [{
                "constant": true,
                "inputs": [
                  { "internalType": "uint256", "name": "amountIn", "type": "uint256" },
                  { "internalType": "address[]", "name": "path", "type": "address[]" }
                ],
                "name": "getAmountsOut",
                "outputs": [{ "internalType": "uint256[]", "name": "amounts", "type": "uint256[]" }],
                "stateMutability": "view",
                "type": "function"
              }],
              functionName: 'getAmountsOut',
              args: [parsedAmountIn, route.path],
            }) as bigint[]

            outputAmount = amounts[amounts.length - 1]
            console.log(`   ✅ V2 Router Quote: ${inputAmount} ${inputToken.symbol} → ${formatUnits(outputAmount, outputToken.decimals)} ${outputToken.symbol}`)
          } catch (fallbackError) {
            console.warn('V2 Router fallback also failed:', fallbackError)
            return null
          }
        }
      }

      // 🎯 计算真实的价格影响
      const priceImpact = await calculatePriceImpact(route, parsedAmountIn, outputAmount)
      const reliability = calculateReliability(route)
      const score = Number(outputAmount) * reliability

      // ⛽ 进行精确的Gas估算（使用5%滑点作为最小输出）
      const minAmountOut = (outputAmount * BigInt(95)) / BigInt(100) // 5% 滑点
      const preciseGasEstimate = await estimateRouteGas(route, parsedAmountIn, minAmountOut)
      
      console.log(`   ⛽ Gas: ${route.gasEstimate.toString()} → ${preciseGasEstimate.toString()} (${preciseGasEstimate > route.gasEstimate ? '+' : ''}${((Number(preciseGasEstimate) - Number(route.gasEstimate)) / Number(route.gasEstimate) * 100).toFixed(1)}%)`)

      return {
        route,
        outputAmount,
        priceImpact,
        gasEstimate: preciseGasEstimate, // 使用精确估算的Gas
        reliability,
        score
      }

    } catch (error) {
      console.error('❌ Quote calculation failed:', error)
      return null
    }
  }, [inputAmount, inputToken, outputToken, publicClient, smartRouterAddress, account, estimateRouteGas, calculatePriceImpact])

  // 🔒 计算可靠性评分
  const calculateReliability = (route: SwapRoute): number => {
    let score = 1.0
    
    // V3 路径更可靠
    if (route.type === RouteType.V3_DIRECT) {
      score *= 0.98
    } else if (route.type === RouteType.V3_MULTIHOP) {
      score *= 0.95
    } else {
      score *= 0.90
    }
    
    // 路径长度影响
    if (route.path.length === 2) {
      score *= 0.98
    } else {
      score *= 0.95
    }
    
    return score
  }

  // 🧠 优化路径选择 (集成 On-Chain 路由)
  const optimizeRoutes = useCallback(async () => {
    if (!inputToken || !outputToken || !inputAmount) {
      setRoutes([])
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      console.log('🧠 Starting route optimization with On-Chain discovery...')
      
      // 1. 发现所有路径 (使用 On-Chain 路由发现)
      const discoveredRoutes = await discoverRoutes()
      
      if (discoveredRoutes.length === 0) {
        console.warn('⚠️ No routes discovered')
        setError('No trading routes found for this token pair')
        return
      }
      
      // 2. 计算每条路径的报价
      console.log(`📊 Calculating quotes for ${discoveredRoutes.length} routes...`)
      const quotePromises = discoveredRoutes.map(route => calculateRouteQuote(route))
      const quoteResults = await Promise.all(quotePromises)
      
      // 3. 过滤有效报价并排序
      const validQuotes = quoteResults
        .filter((quote): quote is RouteQuote => quote !== null)
        .sort((a, b) => b.score - a.score)
      
      setRoutes(validQuotes)
      console.log('🏆 On-Chain route optimization complete:', validQuotes.length, 'valid routes')
      
      if (validQuotes.length === 0) {
        setError('All routes failed to get quotes. Please try a different token pair.')
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Route optimization failed'
      setError(errorMessage)
      console.error('❌ Route optimization error:', err)
    } finally {
      setIsLoading(false)
    }
  }, [inputToken, outputToken, inputAmount, discoverRoutes, calculateRouteQuote])

  // 🔄 智能路由查找：输入变化后查一次，然后30秒自动刷新
  useEffect(() => {
    if (!inputToken || !outputToken || !inputAmount || parseFloat(inputAmount) <= 0) {
      setRoutes([])
      return
    }
    
    let refreshTimer: NodeJS.Timeout | null = null
    
    console.log('⏳ Debouncing route optimization... (3s)')
    
    // 防抖：3秒后首次执行
    const debounceTimer = setTimeout(async () => {
      console.log('🔄 Starting initial route optimization...')
      await optimizeRoutes()
      
      // 首次查找完成后，设置定时刷新（30秒）
      console.log('⏰ Setting up auto-refresh (30s interval)...')
      refreshTimer = setInterval(async () => {
        console.log('🔄 Auto-refreshing routes...')
        await optimizeRoutes()
      }, 30000) // 30秒
    }, 3000)
    
    // 清理函数：如果输入变化，取消所有定时器
    return () => {
      console.log('🚫 Cancelling timers due to input change')
      clearTimeout(debounceTimer)
      if (refreshTimer) {
        clearInterval(refreshTimer)
      }
    }
    // 只依赖稳定的值，避免无限循环
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    inputToken?.address,
    outputToken?.address,
    inputAmount,
  ])

  // 🎯 最优路径
  const bestRoute = useMemo(() => {
    return routes.length > 0 ? routes[0] : null
  }, [routes])

  // 🚀 执行交易
  const executeSwap = useCallback(async (slippagePercent: number = 0.5): Promise<string | null> => {
    if (!bestRoute || !walletClient || !account || !inputToken || !outputToken) {
      throw new Error('Missing required parameters for swap execution')
    }

    try {
      console.log('🚀 Executing swap via SmartRouter...')
      console.log(`  - 用户设置滑点: ${slippagePercent}%`)
      
      const parsedAmountIn = parseUnits(inputAmount, inputToken.decimals)
      
      // 🎯 动态滑点计算：用户设置的滑点百分比
      const slippageMultiplier = BigInt(Math.floor((100 - slippagePercent) * 100)) // 转换为基点 (basis points)
      const minAmountOut = (bestRoute.outputAmount * slippageMultiplier) / BigInt(10000)
      
      console.log(`  - 预期输出: ${formatUnits(bestRoute.outputAmount, outputToken.decimals)} ${outputToken.symbol}`)
      console.log(`  - 最小输出 (${slippagePercent}% 滑点): ${formatUnits(minAmountOut, outputToken.decimals)} ${outputToken.symbol}`)

      let txHash: string

      if (bestRoute.route.type === RouteType.V3_DIRECT || bestRoute.route.type === RouteType.V3_MULTIHOP) {
        // V3 路径使用 exactInput
        console.log('🔵 Executing V3 route via exactInput')
        console.log('  - Encoded path:', bestRoute.route.encodedPath)
        
        const v3SwapData = encodeFunctionData({
          abi: SMART_ROUTER_ABI,
          functionName: 'exactInput',
          args: [{
            path: bestRoute.route.encodedPath! as `0x${string}`,
            recipient: account,
            amountIn: parsedAmountIn,
            amountOutMinimum: minAmountOut
          }]
        })
        
        txHash = await walletClient.request({
          method: 'eth_sendTransaction',
          params: [{
            from: account as `0x${string}`,
            to: smartRouterAddress as `0x${string}`,
            data: v3SwapData,
            gas: `0x${bestRoute.gasEstimate.toString(16)}`
          }]
        })
      } else if (bestRoute.route.type === RouteType.MIXED) {
        // 🌈 混合协议路径执行
        console.log('🌈 Executing MIXED route via multicall')
        console.log('  - Route pairs:', bestRoute.route.pairs)
        console.log('  - Route path:', bestRoute.route.path)
        
        // 导入混合路径执行工具
        const { encodeMixedRouteSwap, encodeMulticall } = await import('../utils/mixedRouteExecution')
        
        // 构造混合路径对象
        const mixedRoute = {
          path: bestRoute.route.path,
          pairs: bestRoute.route.pairs || [],
          type: bestRoute.route.type
        }
        
        // 编码混合路径交换
        // @ts-expect-error ABI type compatibility
        const calldatas = encodeMixedRouteSwap(
          mixedRoute,
          parsedAmountIn,
          minAmountOut,
          account,
          SMART_ROUTER_ABI
        )
        
        console.log(`  - Generated ${calldatas.length} calldata(s)`)
        
        if (calldatas.length === 1) {
          // 单跳或单段：直接执行
          txHash = await walletClient.request({
            method: 'eth_sendTransaction',
            params: [{
              from: account as `0x${string}`,
              to: smartRouterAddress as `0x${string}`,
              data: calldatas[0] as `0x${string}`,
              gas: `0x${bestRoute.gasEstimate.toString(16)}`
            }]
          })
        } else {
          // 多段：使用 multicall
          const multicallData = encodeMulticall(calldatas, SMART_ROUTER_ABI)
          
          txHash = await walletClient.request({
            method: 'eth_sendTransaction',
            params: [{
              from: account as `0x${string}`,
              to: smartRouterAddress as `0x${string}`,
              data: multicallData as `0x${string}`,
              gas: `0x${bestRoute.gasEstimate.toString(16)}`
            }]
          })
        }
        
      } else {
        // V2 路径使用 swapExactTokensForTokens
        console.log('🟡 Executing V2 route via swapExactTokensForTokens')
        console.log('  - Path:', bestRoute.route.path)
        
        // 编码V2 swap调用
        const swapData = encodeFunctionData({
          abi: SMART_ROUTER_ABI,
          functionName: 'swapExactTokensForTokens',
          args: [parsedAmountIn, minAmountOut, bestRoute.route.path, account]
        })
        
        txHash = await walletClient.request({
          method: 'eth_sendTransaction',
          params: [{
            from: account as `0x${string}`,
            to: smartRouterAddress as `0x${string}`,
            data: swapData,
            gas: `0x${bestRoute.gasEstimate.toString(16)}`
          }]
        })
      }

      console.log(`✅ Swap transaction sent: ${txHash}`)
      return txHash

    } catch (error) {
      console.error('❌ Swap execution failed:', error)
      throw error
    }
  }, [bestRoute, walletClient, account, inputToken, outputToken, inputAmount, smartRouterAddress])

  // 🎯 缓存返回对象，避免无限重渲染
  return useMemo(() => ({
    bestRoute,
    allRoutes: routes,
    isLoading,
    error,
    executeSwap,
    refresh: optimizeRoutes
  }), [bestRoute, routes, isLoading, error, executeSwap, optimizeRoutes])
}
