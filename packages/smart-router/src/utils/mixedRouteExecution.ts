import { Address, encodeFunctionData, encodePacked } from 'viem'

// 常量
const ADDRESS_THIS = '0x0000000000000000000000000000000000000002' // 特殊地址，表示路由合约自己
const V2_FEE_PLACEHOLDER = 0

// 路由类型
export enum RouteType {
  V2_DIRECT = 'V2_DIRECT',
  V2_MULTIHOP = 'V2_MULTIHOP', 
  V3_DIRECT = 'V3_DIRECT',
  V3_MULTIHOP = 'V3_MULTIHOP',
  MIXED = 'MIXED'
}

// 池子接口
export interface PoolInfo {
  protocol: 'V2' | 'V3'
  fee?: number
  address: string
}

// 路由接口
export interface MixedRoute {
  path: Address[]
  pairs: PoolInfo[]
  type: RouteType
}

/**
 * 🌈 混合路径编码函数
 * 参考 PancakeSwap 的 encodeMixedRouteToPath 实现
 */
export function encodeMixedRouteToPath(route: MixedRoute): string {
  const { path, pairs } = route
  
  let encodedPath: (string | number)[] = []
  let types: string[] = []
  
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    const tokenIn = path[i]
    const tokenOut = path[i + 1]
    
    if (i === 0) {
      // 第一跳：tokenIn + fee + tokenOut
      const fee = pair.protocol === 'V3' ? (pair.fee || 10000) : V2_FEE_PLACEHOLDER
      encodedPath = [tokenIn, fee, tokenOut]
      types = ['address', 'uint24', 'address']
    } else {
      // 后续跳：fee + tokenOut
      const fee = pair.protocol === 'V3' ? (pair.fee || 10000) : V2_FEE_PLACEHOLDER
      encodedPath = [...encodedPath, fee, tokenOut]
      types = [...types, 'uint24', 'address']
    }
  }
  
  return encodePacked(types, encodedPath)
}

/**
 * 🔀 按协议分割混合路径
 * 参考 PancakeSwap 的 partitionMixedRouteByProtocol 实现
 */
export function partitionMixedRouteByProtocol(route: MixedRoute): PoolInfo[][] {
  const { pairs } = route
  const sections: PoolInfo[][] = []
  
  let left = 0
  let right = 0
  
  while (right < pairs.length) {
    if (pairs[left].protocol !== pairs[right].protocol) {
      sections.push(pairs.slice(left, right))
      left = right
    }
    right++
    
    if (right === pairs.length) {
      // 到达末尾，取剩余部分
      sections.push(pairs.slice(left, right))
    }
  }
  
  return sections
}

/**
 * 🚀 编码混合路径交换
 * 参考 PancakeSwap 的 encodeMixedRouteSwap 实现
 */
export function encodeMixedRouteSwap(
  route: MixedRoute,
  amountIn: bigint,
  amountOutMinimum: bigint,
  recipient: Address,
  smartRouterABI: any[]
): string[] {
  const calldatas: string[] = []
  const { path, pairs } = route
  
  // 检查是否为单跳
  const singleHop = pairs.length === 1
  
  if (singleHop) {
    // 单跳路径：直接使用对应协议的函数
    const pair = pairs[0]
    
    if (pair.protocol === 'V3') {
      // V3 单跳：使用 exactInput
      const encodedPath = encodeMixedRouteToPath(route)
      
      const exactInputParams = {
        path: encodedPath,
        recipient,
        amountIn,
        amountOutMinimum
      }
      
      const calldata = encodeFunctionData({
        abi: smartRouterABI,
        functionName: 'exactInput',
        args: [exactInputParams]
      })
      
      calldatas.push(calldata)
    } else {
      // V2 单跳：使用 swapExactTokensForTokens
      const calldata = encodeFunctionData({
        abi: smartRouterABI,
        functionName: 'swapExactTokensForTokens',
        args: [amountIn, amountOutMinimum, path, recipient]
      })
      
      calldatas.push(calldata)
    }
  } else {
    // 多跳路径：按协议分段处理
    const sections = partitionMixedRouteByProtocol(route)
    
    let currentInputToken = path[0]
    let pathIndex = 0
    
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i]
      const isLastSection = i === sections.length - 1
      
      // 计算这一段的路径
      const sectionPath = [currentInputToken]
      for (const pool of section) {
        pathIndex++
        sectionPath.push(path[pathIndex])
      }
      
      // 计算接收者地址
      const sectionRecipient = isLastSection ? recipient : ADDRESS_THIS
      
      // 计算输入输出金额
      const sectionAmountIn = i === 0 ? amountIn : 0n // 只有第一段需要指定输入金额
      const sectionAmountOut = isLastSection ? amountOutMinimum : 0n // 只有最后一段需要指定最小输出
      
      if (section[0].protocol === 'V3') {
        // V3 段：构造编码路径
        const sectionRoute: MixedRoute = {
          path: sectionPath,
          pairs: section,
          type: RouteType.V3_MULTIHOP
        }
        
        const encodedPath = encodeMixedRouteToPath(sectionRoute)
        
        const exactInputParams = {
          path: encodedPath,
          recipient: sectionRecipient,
          amountIn: sectionAmountIn,
          amountOutMinimum: sectionAmountOut
        }
        
        const calldata = encodeFunctionData({
          abi: smartRouterABI,
          functionName: 'exactInput',
          args: [exactInputParams]
        })
        
        calldatas.push(calldata)
      } else {
        // V2 段：使用地址数组
        const calldata = encodeFunctionData({
          abi: smartRouterABI,
          functionName: 'swapExactTokensForTokens',
          args: [sectionAmountIn, sectionAmountOut, sectionPath, sectionRecipient]
        })
        
        calldatas.push(calldata)
      }
      
      // 更新当前输入代币为这一段的输出代币
      currentInputToken = sectionPath[sectionPath.length - 1]
    }
  }
  
  return calldatas
}

/**
 * 🔧 编码 multicall
 */
export function encodeMulticall(calldatas: string[], smartRouterABI: any[]): string {
  // 单个 calldata 直接返回
  if (calldatas.length === 1) {
    return calldatas[0]
  }
  
  // 多个 calldata 使用 multicall
  const multicallCalldata = encodeFunctionData({
    abi: smartRouterABI,
    functionName: 'multicall',
    args: [calldatas]
  })
  
  return multicallCalldata
}
