import React, { useState, useCallback, useEffect, useMemo } from 'react'
import { styled } from '../../styled-components'
import { Box } from '../Box'
import { Button } from '../Button'
import { Text } from '../Text'
import { ArrowUpDown, Settings, AlertCircle, ChevronDown } from 'lucide-react'

// 使用已迁移的smart-router包
import { 
  useSwapCallback, 
  SwapCallbackParams, 
  SwapCallbackState,
  useTokenApproval
} from '@comet-swap/smart-router'
import { Token } from '@comet-swap/smart-router'
import { RouteType } from '@comet-swap/smart-router'
import { useAccount } from 'wagmi'
import { Address } from 'viem'

export interface SwapInterfaceProps {
  className?: string
}

// Stellar UI styled components
const SwapContainer = styled(Box)`
  max-width: 480px;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: var(--stellar-borderRadius-lg);
  padding: var(--stellar-space-6);
  gap: var(--stellar-space-4);
  display: flex;
  flex-direction: column;
  
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
`

const SwapHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

const TokenInputCard = styled(Box)`
  background-color: #f8fafc;
  border-radius: var(--stellar-borderRadius-md);
  padding: var(--stellar-space-4);
  gap: var(--stellar-space-3);
  display: flex;
  flex-direction: column;
  border: 1px solid #e2e8f0;
  
  &:focus-within {
    border-color: var(--stellar-primary);
    box-shadow: 0 0 12px rgba(168, 85, 247, 0.1);
  }
`

const TokenInputRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`

const AmountInput = styled.input`
  flex: 1;
  font-size: var(--stellar-fontSize-xl);
  font-weight: 600;
  background-color: transparent;
  border: none;
  color: #1a202c;
  outline: none;
  
  &::placeholder {
    color: #a0aec0;
  }
  
  &:focus {
    outline: none;
  }
`

const TokenSelector = styled(Button)`
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: var(--stellar-borderRadius-sm);
  padding: var(--stellar-space-3) var(--stellar-space-4);
  gap: var(--stellar-space-2);
  display: flex;
  align-items: center;
  
  &:hover {
    background-color: #f7fafc;
  }
  
  &:active {
    background-color: #edf2f7;
    transform: scale(0.98);
  }
`

const SwapButton = styled(Box)`
  display: flex;
  justify-content: center;
  margin: var(--stellar-space-2) 0;
`

const SwapArrowButton = styled(Button)`
  width: var(--stellar-space-10);
  height: var(--stellar-space-10);
  border-radius: var(--stellar-borderRadius-sm);
  background-color: var(--stellar-primary);
  
  &:hover {
    background-color: var(--stellar-primaryHover);
  }
  
  &:active {
    background-color: var(--stellar-primaryPress);
    transform: scale(0.95) rotate(180deg);
  }
`

interface ActionButtonProps {
  variant?: 'primary' | 'warning' | 'success'
  disabled?: boolean
}

const ActionButton = styled(Button)<ActionButtonProps>`
  width: 100%;
  height: var(--stellar-space-12);
  border-radius: var(--stellar-borderRadius-md);
  font-size: var(--stellar-fontSize-md);
  font-weight: 600;
  
  /* Variant styles */
  ${({ variant = 'primary', disabled }: ActionButtonProps) => {
    if (disabled) {
      return `
        opacity: 0.6;
        cursor: not-allowed;
      `;
    }
    
    switch (variant) {
      case 'warning':
        return `
          background-color: var(--stellar-warning);
          &:hover { background-color: #FFB237; }
          &:active { background-color: #F59E0B; transform: scale(0.98); }
        `;
      case 'success':
        return `
          background-color: var(--stellar-success);
          &:hover { background-color: #2DD4AA; }
          &:active { background-color: #28A68A; transform: scale(0.98); }
        `;
      case 'primary':
      default:
        return `
          background-color: var(--stellar-primary500);
          &:hover { background-color: var(--stellar-primary400); }
          &:active { background-color: var(--stellar-primary600); transform: scale(0.98); }
        `;
    }
  }};
`;

const TradeDetails = styled(Box)`
  padding: var(--stellar-space-4);
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
  border-radius: var(--stellar-borderRadius-sm);
  gap: var(--stellar-space-2);
`;

const DetailRow = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 默认代币列表 (从core-config获取)
const DEFAULT_TOKENS: Token[] = [
  {
    chainId: 195, // XLayer Testnet
    address: '0x0000000000000000000000000000000000000000' as Address,
    symbol: 'ETH',
    name: 'Ethereum',
    decimals: 18,
  },
  {
    chainId: 195,
    address: '0xA0b86a33E6441E07D2953fEd8718c0E379A81b39' as Address,
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
  },
  {
    chainId: 195,
    address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063' as Address,
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 6,
  },
]

export const SwapInterface: React.FC<SwapInterfaceProps> = ({ className }) => {
  // Wagmi账户信息
  const { address: account, isConnected } = useAccount()
  
  // 状态管理
  const [inputAmount, setInputAmount] = useState<string>('')
  const [outputAmount, setOutputAmount] = useState<string>('')
  const [inputToken, setInputToken] = useState<Token>(DEFAULT_TOKENS[0])
  const [outputToken, setOutputToken] = useState<Token>(DEFAULT_TOKENS[1])
  const [showSettings, setShowSettings] = useState(false)
  const [slippage, setSlippage] = useState<number>(1.0) // 1%
  
  // Swap参数
  const swapParams = useMemo<SwapCallbackParams>(() => ({
    inputToken,
    outputToken,
    inputAmount,
    outputAmountMin: outputAmount, // 基于滑点计算
    recipient: account || '0x0000000000000000000000000000000000000000' as Address,
    deadline: Math.floor(Date.now() / 1000) + 20 * 60, // 20分钟
    routeType: RouteType.V2, // 默认使用V2路由
    path: [inputToken.address, outputToken.address], // 直接路径
  }), [inputToken, outputToken, inputAmount, outputAmount, account])
  
  // 使用已迁移的smart-router hooks
  const {
    state: swapState,
    callback: swapCallback,
    isLoading: isSwapLoading,
    error: swapError
  } = useSwapCallback(swapParams)
  
  const {
    approve,
    isLoading: isApproving,
    isSuccess: isApproved,
    error: approvalError
  } = useTokenApproval()
  
  // 计算输出金额（简化版，实际应该调用路由器获取报价）
  const calculateOutputAmount = useCallback((input: string) => {
    if (!input || parseFloat(input) === 0) {
      setOutputAmount('')
      return
    }
    
    // 简化计算：ETH -> USDC 假设汇率 1:2500
    if (inputToken.symbol === 'ETH' && outputToken.symbol === 'USDC') {
      const output = (parseFloat(input) * 2500).toString()
      setOutputAmount(output)
    } else if (inputToken.symbol === 'USDC' && outputToken.symbol === 'ETH') {
      const output = (parseFloat(input) / 2500).toString()
      setOutputAmount(output)
    } else {
      // 默认 1:1
      setOutputAmount(input)
    }
  }, [inputToken.symbol, outputToken.symbol])
  
  // 处理输入变化
  const handleInputChange = useCallback((value: string) => {
    setInputAmount(value)
    calculateOutputAmount(value)
  }, [calculateOutputAmount])
  
  // 处理货币切换
  const handleCurrencySwitch = useCallback(() => {
    setInputToken(outputToken)
    setOutputToken(inputToken)
    setInputAmount(outputAmount)
    setOutputAmount(inputAmount)
  }, [inputToken, outputToken, inputAmount, outputAmount])
  
  // 处理token授权
  const handleApprove = useCallback(async () => {
    if (!account) return
    
    try {
      await approve(
        inputToken,
        swapParams.recipient, // Router地址，实际应该从useRouterAddress获取
        inputAmount
      )
    } catch (error) {
      console.error('Approval failed:', error)
    }
  }, [approve, inputToken, account, inputAmount, swapParams.recipient])
  
  // 处理swap执行
  const handleSwap = useCallback(async () => {
    if (!swapCallback) return
    
    try {
      const result = await swapCallback()
      console.log('Swap successful:', result)
      // 清空输入
      setInputAmount('')
      setOutputAmount('')
    } catch (error) {
      console.error('Swap failed:', error)
    }
  }, [swapCallback])
  
  // 渲染token选择器
  const renderTokenSelector = (token: Token, onClick: () => void) => (
    <TokenSelector onPress={onClick}>
      <Box style={{ display: 'flex', alignItems: 'center', gap: 'var(--stellar-space-2)' }}>
        <div style={{ 
          width: 24, 
          height: 24, 
          borderRadius: '50%', 
          background: token.symbol === 'ETH' 
            ? 'linear-gradient(135deg, #627eea 0%, #4f46e5 100%)'
            : token.symbol === 'USDC'
            ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
            : 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        }} />
        <Text style={{ fontSize: 'var(--stellar-fontSize-md)', fontWeight: '600', color: '#1a202c' }}>
          {token.symbol}
        </Text>
        <ChevronDown size={16} color="#718096" />
      </Box>
    </TokenSelector>
  )
  
  // 确定按钮状态和文本
  const getButtonState = () => {
    if (!isConnected) {
      return { text: 'Connect Wallet', variant: 'primary' as const, disabled: false }
    }
    
    if (!inputAmount || parseFloat(inputAmount) === 0) {
      return { text: 'Enter Amount', variant: 'primary' as const, disabled: true }
    }
    
    if (swapState === SwapCallbackState.LOADING || isSwapLoading) {
      return { text: 'Loading...', variant: 'primary' as const, disabled: true }
    }
    
    if (!isApproved && inputToken.address !== '0x0000000000000000000000000000000000000000') {
      return { 
        text: isApproving ? 'Approving...' : `Approve ${inputToken.symbol}`,
        variant: 'warning' as const, 
        disabled: isApproving 
      }
    }
    
    if (swapState === SwapCallbackState.VALID) {
      return { text: 'Swap', variant: 'success' as const, disabled: false }
    }
    
    return { text: 'Insufficient Balance', variant: 'primary' as const, disabled: true }
  }
  
  const buttonState = getButtonState()
  
  return (
    <SwapContainer className={className}>
      {/* Header */}
      <SwapHeader>
        <Box style={{ display: 'flex', alignItems: 'center', gap: 'var(--stellar-space-2)' }}>
          <Text style={{ fontSize: 'var(--stellar-fontSize-lg)', fontWeight: '700', color: '#1a202c' }}>
            Swap
          </Text>
          <div style={{
            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            color: 'white',
            fontSize: '10px',
            fontWeight: '700',
            padding: '2px 6px',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            SMART
          </div>
        </Box>
        <Button 
          size="$3"
          variant="outlined"
          onPress={() => setShowSettings(!showSettings)}
        >
          <Settings size={20} />
        </Button>
      </SwapHeader>

      {/* From Token */}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stellar-space-2)' }}>
        <Text style={{ fontSize: 'var(--stellar-fontSize-sm)', color: '#718096', fontWeight: '500' }}>
          From
        </Text>
        <TokenInputCard>
          <TokenInputRow>
            <AmountInput 
              value={inputAmount}
              onChangeText={handleInputChange}
              placeholder="0.0"
            />
            {renderTokenSelector(inputToken, () => {})}
          </TokenInputRow>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 'var(--stellar-fontSize-xs)', color: '#a0aec0' }}>
              Balance: 0.0000
            </Text>
            <Text style={{ fontSize: 'var(--stellar-fontSize-xs)', color: '#a0aec0' }}>
              ~$0.00
            </Text>
          </Box>
        </TokenInputCard>
      </Box>

      {/* Swap Arrow */}
      <SwapButton>
        <SwapArrowButton onPress={handleCurrencySwitch}>
          <ArrowUpDown size={20} color="white" />
        </SwapArrowButton>
      </SwapButton>

      {/* To Token */}
      <Box style={{ display: 'flex', flexDirection: 'column', gap: 'var(--stellar-space-2)' }}>
        <Text style={{ fontSize: 'var(--stellar-fontSize-sm)', color: '#718096', fontWeight: '500' }}>
          To
        </Text>
        <TokenInputCard>
          <TokenInputRow>
            <AmountInput 
              value={outputAmount}
              placeholder="0.0"
              readOnly
            />
            {renderTokenSelector(outputToken, () => {})}
          </TokenInputRow>
          <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 'var(--stellar-fontSize-xs)', color: '#a0aec0' }}>
              Balance: 0.0000
            </Text>
            <Text style={{ fontSize: 'var(--stellar-fontSize-xs)', color: '#a0aec0' }}>
              ~${outputAmount || '0.00'}
            </Text>
          </Box>
        </TokenInputCard>
      </Box>

      {/* Action Button */}
      <ActionButton 
        variant={buttonState.variant}
        disabled={buttonState.disabled}
        onPress={
          !isConnected ? () => {} : // 连接钱包逻辑
          !isApproved && inputToken.address !== '0x0000000000000000000000000000000000000000' ? handleApprove :
          handleSwap
        }
      >
        <Text color="white" fontSize="$4" fontWeight="600">
          {buttonState.text}
        </Text>
      </ActionButton>

      {/* Trade Details */}
      {inputAmount && outputAmount && (
        <TradeDetails>
          <DetailRow>
            <Text fontSize="$3" color="#718096">Rate</Text>
            <Text fontSize="$3" color="#1a202c">
              1 {inputToken.symbol} = {(parseFloat(outputAmount) / parseFloat(inputAmount) || 0).toFixed(4)} {outputToken.symbol}
            </Text>
          </DetailRow>
          <DetailRow>
            <Text fontSize="$3" color="#718096">Route</Text>
            <Text fontSize="$3" color="#1a202c">{inputToken.symbol} → {outputToken.symbol}</Text>
          </DetailRow>
          <DetailRow>
            <Text fontSize="$3" color="#718096">Fee</Text>
            <Text fontSize="$3" color="#1a202c">0.3%</Text>
          </DetailRow>
          <DetailRow>
            <Text fontSize="$3" color="#718096">Slippage Tolerance</Text>
            <Text fontSize="$3" color="#1a202c">{slippage}%</Text>
          </DetailRow>
        </TradeDetails>
      )}

      {/* Error Display */}
      {(swapError || approvalError) && (
        <Box style={{ 
          padding: 'var(--stellar-space-3)', 
          backgroundColor: 'rgba(239, 68, 68, 0.1)', 
          borderRadius: 'var(--stellar-borderRadius-sm)',
          display: 'flex',
          alignItems: 'center', 
          gap: 'var(--stellar-space-2)'
        }}>
          <AlertCircle size={16} color="#ef4444" />
          <Text style={{ fontSize: 'var(--stellar-fontSize-sm)', color: '#ef4444' }}>
            {swapError || approvalError}
          </Text>
        </Box>
      )}
    </SwapContainer>
  )
}

export default SwapInterface

