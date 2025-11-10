import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { useAccount, useChainId, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseUnits, Address } from 'viem'
import styled from 'styled-components'
import { Flex, Text } from '@cometswap/uikit'
import { CurrencyInputPanel } from './CurrencyInputPanel'
import { SwapButton } from './SwapButton'  
import { SwapSettings } from './SwapSettings'
import { TokenSelectModal } from '../TokenSelectModal'
import { getChainTokens, ChainId, getContractAddress, ContractType } from '@comet-swap/core-config'
import type { TokenInfo } from '@comet-swap/core-config'
import { useSmartRouterCallback } from '@comet-swap/smart-router'

// ERC20 ABI for approval
const ERC20_ABI = [
  {
    "inputs": [
      { "name": "owner", "type": "address" },
      { "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const

// 使用我们自己的Token类型定义
interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

// Styled components with theme support
const Container = styled.div`
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(255, 255, 255, 0.02)'};
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(20px);
  box-shadow: 
    0px 20px 36px -8px rgba(14, 14, 44, 0.1), 
    0px 1px 1px rgba(0, 0, 0, 0.05),
    inset 0px 1px 0px rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.colors?.primary || '#667eea'}08 0%, 
      transparent 50%);
    border-radius: inherit;
    pointer-events: none;
  }
  
  /* 优雅的悬停效果 */
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0px 24px 44px -12px rgba(14, 14, 44, 0.15), 
      0px 2px 2px rgba(0, 0, 0, 0.08),
      inset 0px 1px 0px rgba(255, 255, 255, 0.15);
  }
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.text || '#1a202c'};
  margin: 0;
`

const SettingsButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(26, 32, 44, 0.6)'};
  cursor: pointer;
  font-size: 18px;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors?.text || '#1a202c'};
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(26, 32, 44, 0.05)'};
  }
`

const SwitchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`

const SwitchButton = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(26, 32, 44, 0.05)'};
  border: 2px solid ${({ theme }) => theme.colors?.background || '#fff'};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: ${({ theme }) => theme.colors?.text || '#1a202c'};
  font-size: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(26, 32, 44, 0.1)'};
    transform: rotate(180deg);
    color: ${({ theme }) => theme.colors?.primary || '#667eea'};
  }
`

const RouteInfo = styled.div`
  margin-top: 16px;
  padding: 12px;
  background: ${({ theme }) => theme.colors?.background || 'rgba(26, 32, 44, 0.02)'};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(26, 32, 44, 0.1)'};
`

const RouteTitle = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(26, 32, 44, 0.6)'};
  margin-bottom: 4px;
  font-weight: 500;
`

const RouteDetails = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors?.text || '#1a202c'};
  margin-bottom: 4px;
  font-weight: 600;
`

const PriceImpact = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors?.textSubtle || 'rgba(26, 32, 44, 0.6)'};
  font-weight: 500;
`

const ErrorBox = styled.div`
  margin-top: 12px;
  padding: 12px;
  background: ${({ theme }) => theme.colors?.failure ? `${theme.colors.failure}10` : 'rgba(255, 107, 107, 0.1)'};
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors?.failure || '#ff6b6b'};
  
  div {
    font-size: 14px;
    color: ${({ theme }) => theme.colors?.failure || '#ff6b6b'};
    font-weight: 500;
  }
`

export const SwapContainer: React.FC = () => {
  // 钱包连接
  const { address } = useAccount()
  
  // 状态管理
  const [inputToken, setInputToken] = useState<Token | undefined>()
  const [outputToken, setOutputToken] = useState<Token | undefined>()
  const [inputAmount, setInputAmount] = useState<string>('')
  const [outputAmount, setOutputAmount] = useState<string>('')
  const [slippage, setSlippage] = useState<number>(0.5)
  const [deadline, setDeadline] = useState<number>(20)
  const [showSettings, setShowSettings] = useState(false)
  
  // Token选择状态
  const [showTokenSelect, setShowTokenSelect] = useState<'input' | 'output' | null>(null)

  // 🔄 获取当前链ID，支持链切换
  const wagmiChainId = useChainId()
  const currentChainId = wagmiChainId || ChainId.XLAYER_TESTNET
  
  console.log('=' .repeat(50))
  console.log('🔗 Wallet chainId:', wagmiChainId)
  console.log('🔗 Current chainId:', currentChainId)

  // 从core-config获取当前链的Token数据（使用useMemo缓存）
  const tokens: Token[] = useMemo(() => {
    const chainTokens = getChainTokens(currentChainId as ChainId)
    
    console.log('📦 Loading tokens for chain:', currentChainId)
    console.log('📦 Found tokens:', chainTokens.map(t => t.symbol))
    
    return chainTokens.map(token => ({
      address: token.address,
      symbol: token.symbol,
      name: token.name,
      decimals: token.decimals,
      logoURI: token.logoURI,
      chainId: token.chainId,
    }))
  }, [currentChainId])
  
  console.log('✅ tokens array:', tokens.length)
  console.log('✅ Current inputToken:', inputToken?.symbol)
  console.log('✅ Current outputToken:', outputToken?.symbol)
  console.log('=' .repeat(50))

  // ✅ 使用真实Smart Router
  const smartRouter = useSmartRouterCallback(
    inputToken,
    outputToken,
    inputAmount
  )
  
  const { bestRoute, allRoutes, isLoading: routeLoading, error: routeError, executeSwap } = smartRouter

  // 🔐 授权状态
  const [isApproving, setIsApproving] = useState(false)
  const [isSwapping, setIsSwapping] = useState(false)

  // 获取Smart Router地址
  const smartRouterAddress = getContractAddress(currentChainId as ChainId, ContractType.SMART_ROUTER)

  // 🔍 检查代币授权额度
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: inputToken?.address as Address,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address && smartRouterAddress ? [address, smartRouterAddress as Address] : undefined,
    query: {
      enabled: !!inputToken && !!address && !!smartRouterAddress,
    }
  })

  // 🔐 授权交易
  const { writeContract: approveToken, data: approveTxHash } = useWriteContract()
  
  const { isSuccess: isApprovalSuccess } = useWaitForTransactionReceipt({
    hash: approveTxHash,
  })

  // 计算是否需要授权
  const needsApproval = useMemo(() => {
    if (!inputToken || !inputAmount || !allowance) return false
    try {
      const requiredAmount = parseUnits(inputAmount, inputToken.decimals)
      return BigInt(allowance) < requiredAmount
    } catch {
      return false
    }
  }, [inputToken, inputAmount, allowance])

  console.log('🔐 Approval check:', {
    needsApproval,
    allowance: allowance?.toString(),
    inputAmount,
    smartRouterAddress
  })

  // 处理token切换
  const handleSwitchTokens = useCallback(() => {
    setInputToken(outputToken)
    setOutputToken(inputToken)
    setInputAmount(outputAmount)
    setOutputAmount(inputAmount)
  }, [inputToken, outputToken, inputAmount, outputAmount])

  // 🔄 初始化和链切换时设置默认代币
  useEffect(() => {
    if (tokens.length === 0) return
    
    // 检查是否需要设置默认代币
    const needsDefaultTokens = !inputToken || inputToken.chainId !== currentChainId
    
    if (needsDefaultTokens) {
      console.log('🎯 Setting default tokens for chain:', currentChainId)
      console.log('   Available tokens:', tokens.map(t => t.symbol).join(', '))
      
      const defaultInput = tokens[0]
      const defaultOutput = tokens.length > 1 ? tokens[1] : tokens[0]
      
      console.log('   Selected:', defaultInput.symbol, '→', defaultOutput.symbol)
      
      setInputToken(defaultInput)
      setOutputToken(defaultOutput)
      setInputAmount('')
      setOutputAmount('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChainId, tokens.length]) // 监听链ID和代币列表长度

  // ✅ 使用Smart Router计算output amount
  useEffect(() => {
    if (bestRoute && bestRoute.outputAmount && outputToken) {
      // 转换bigint到string，考虑decimals
      const formatted = (Number(bestRoute.outputAmount) / Math.pow(10, outputToken.decimals)).toFixed(6)
      setOutputAmount(formatted)
    } else {
      setOutputAmount('')
    }
  }, [bestRoute, outputToken])

  // 处理输入金额变化
  const handleInputChange = useCallback((value: string) => {
    setInputAmount(value)
    // Smart Router会自动重新计算路由
  }, [])

  // 处理打开token选择器
  const handleInputTokenSelect = useCallback(() => {
    setShowTokenSelect('input')
  }, [])

  const handleOutputTokenSelect = useCallback(() => {
    setShowTokenSelect('output')
  }, [])

  // 🚀 执行Swap（参考老前端流程）
  const handleSwap = useCallback(async () => {
    if (!bestRoute || !executeSwap || !inputToken) {
      console.error('❌ No route or executeSwap function available')
      return
    }

    try {
      console.log('🚀 Starting swap flow:', {
        needsApproval,
        inputToken: inputToken.symbol,
        outputToken: outputToken?.symbol,
        inputAmount
      })

      // 🎯 第一阶段：代币授权（如果需要）
      if (needsApproval) {
        console.log('💰 Step 1: Approving token...')
        setIsApproving(true)
        
        try {
          const approvalAmount = parseUnits(inputAmount, inputToken.decimals)
          
          approveToken({
            address: inputToken.address as Address,
            abi: ERC20_ABI,
            functionName: 'approve',
            args: [smartRouterAddress as Address, approvalAmount],
          })
          
          console.log('⏳ Waiting for approval confirmation...')
          
          // 等待授权完成
          await new Promise<void>((resolve, reject) => {
            const checkInterval = setInterval(() => {
              if (isApprovalSuccess) {
                clearInterval(checkInterval)
                console.log('✅ Approval confirmed!')
                resolve()
              }
            }, 1000)
            
            // 超时处理
            setTimeout(() => {
              clearInterval(checkInterval)
              if (!isApprovalSuccess) {
                reject(new Error('Approval timeout'))
              }
            }, 60000) // 60秒超时
          })
          
          // 重新检查allowance
          await refetchAllowance()
          
        } catch (error) {
          console.error('❌ Approval failed:', error)
          throw error
        } finally {
          setIsApproving(false)
        }
      }

      // 🎯 第二阶段：执行Swap交易
      console.log('🔥 Step 2: Executing swap...')
      setIsSwapping(true)
      
      const txHash = await executeSwap(slippage)
      
      console.log('✅ Swap successful! TxHash:', txHash)
      
      // 清空输入
      setInputAmount('')
      setOutputAmount('')
      
    } catch (error) {
      console.error('❌ Swap failed:', error)
      alert(`Swap failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsApproving(false)
      setIsSwapping(false)
    }
  }, [bestRoute, executeSwap, slippage, needsApproval, inputToken, outputToken, inputAmount, smartRouterAddress, approveToken, isApprovalSuccess, refetchAllowance])

  return (
    <Container>
      {/* Header */}
      <Header>
        <Title>Swap</Title>
        <SettingsButton onClick={() => setShowSettings(!showSettings)}>
          ⚙️
        </SettingsButton>
      </Header>

      {/* Settings Panel */}
      {showSettings && (
        <SwapSettings
          slippage={slippage}
          deadline={deadline}
          onSlippageChange={setSlippage}
          onDeadlineChange={setDeadline}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Input Token Panel */}
      <CurrencyInputPanel
        id="swap-currency-input"
        value={inputAmount}
        onUserInput={handleInputChange}
        currency={inputToken}
        onCurrencySelect={handleInputTokenSelect}
        otherCurrency={outputToken}
        showMaxButton={true}
        label="From"
      />

      {/* Switch Button */}
      <SwitchContainer>
        <SwitchButton onClick={handleSwitchTokens}>
          ↓
        </SwitchButton>
      </SwitchContainer>

      {/* Output Token Panel */}
      <CurrencyInputPanel
        id="swap-currency-output"
        value={outputAmount}
        currency={outputToken}
        onCurrencySelect={handleOutputTokenSelect}
        otherCurrency={inputToken}
        label="To"
        readOnly={true}
      />

      {/* Route Info */}
      {bestRoute && (
        <RouteInfo>
          <RouteTitle>
            Best Route via {bestRoute.route.type}
          </RouteTitle>
          <RouteDetails>
            Price Impact: {bestRoute.priceImpact.toFixed(2)}%
          </RouteDetails>
          {bestRoute.route.path && (
            <RouteDetails style={{ fontSize: '12px', opacity: 0.8 }}>
              Path: {bestRoute.route.path.map((addr, i) => 
                i === 0 ? inputToken?.symbol : 
                i === bestRoute.route.path.length - 1 ? outputToken?.symbol :
                `...${addr.slice(-4)}`
              ).join(' → ')}
            </RouteDetails>
          )}
        </RouteInfo>
      )}

      {/* Error Display */}
      {routeError && (
        <ErrorBox>
          <div>{routeError}</div>
        </ErrorBox>
      )}

      {/* Swap Button */}
      <SwapButton
        tokenA={inputToken}
        tokenB={outputToken}
        amountA={inputAmount}
        quote={bestRoute}
        isLoading={routeLoading || isSwapping || isApproving}
        onSwap={handleSwap}
      />

      {/* Token Select Modal */}
      {showTokenSelect && (
        <TokenSelectModal
          isOpen={!!showTokenSelect}
          onClose={() => setShowTokenSelect(null)}
          onSelectToken={(token) => {
            if (showTokenSelect === 'input') {
              setInputToken(token)
            } else {
              setOutputToken(token)
            }
            setShowTokenSelect(null)
          }}
          tokens={tokens}
          selectedToken={showTokenSelect === 'input' ? inputToken : outputToken}
          title={showTokenSelect === 'input' ? 'Select Input Token' : 'Select Output Token'}
        />
      )}
    </Container>
  )
}

export default SwapContainer
