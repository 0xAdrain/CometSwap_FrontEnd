import React from 'react'
import { Button, styled } from '@cometswap/uikit'
import { Token } from './TokenSelector'

export interface SwapQuote {
  amountOut: string
  priceImpact: number
  executionPrice: string
  route: string[]
  fee: string
}

export interface SwapButtonProps {
  tokenA?: Token
  tokenB?: Token  
  amountA?: string
  quote?: SwapQuote
  isLoading?: boolean
  disabled?: boolean
  onSwap?: () => void
  className?: string
}

const SwapMainButton = styled(Button)`
  width: 100%;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 16px;
  background: ${({ theme }) => 
    theme.colors?.primary || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  };
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => 
      theme.colors?.primaryHover || 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
    };
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: ${({ theme }) => 
      theme.colors?.backgroundDisabled || 'rgba(255, 255, 255, 0.1)'
    };
    color: ${({ theme }) => 
      theme.colors?.textSubtle || 'rgba(255, 255, 255, 0.4)'
    };
  }
  
  transition: all 0.2s ease;
`

export const SwapButton: React.FC<SwapButtonProps> = ({
  tokenA,
  tokenB,
  amountA,
  quote,
  isLoading = false,
  disabled = false,
  onSwap,
  className
}) => {
  const getButtonText = () => {
    if (isLoading) {
      return 'Finding Best Route...'
    }
    
    if (!tokenA || !tokenB) {
      return 'Select Tokens'
    }
    
    if (!amountA || amountA === '0') {
      return 'Enter Amount'
    }
    
    if (disabled) {
      return 'Insufficient Balance'
    }
    
    if (!quote) {
      return 'Get Quote'
    }
    
    return `Swap ${tokenA.symbol} for ${tokenB.symbol}`
  }

  const handleClick = () => {
    console.log('🔘 SwapButton clicked:', {
      disabled,
      hasTokenA: !!tokenA,
      hasTokenB: !!tokenB,
      hasAmount: !!amountA,
      hasQuote: !!quote,
      hasOnSwap: !!onSwap
    })
    
    if (!disabled && onSwap) {
      console.log('✅ Calling onSwap...')
      onSwap()
    } else {
      console.warn('⚠️ Button disabled or no onSwap callback')
    }
  }

  const isButtonDisabled = disabled || isLoading || !tokenA || !tokenB || !amountA || !quote

  return (
    <SwapMainButton
      className={className}
      onClick={handleClick}
      disabled={isButtonDisabled}
      variant="primary"
      scale="lg"
    >
      {isLoading && (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none"
          style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }}
        >
          <circle 
            cx="12" 
            cy="12" 
            r="10" 
            stroke="currentColor" 
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="60 40"
          />
        </svg>
      )}
      {getButtonText()}
    </SwapMainButton>
  )
}

export default SwapButton
