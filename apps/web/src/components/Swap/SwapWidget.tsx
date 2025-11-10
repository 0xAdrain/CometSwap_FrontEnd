import React, { useState, useMemo } from 'react'
import { 
  Box, 
  Flex, 
  Text, 
  Button, 
  Card,
  styled,
  IconButton 
} from '@cometswap/uikit'
import { TokenSelector } from './TokenSelector'
import { SwapPreview } from './SwapPreview'
import { SwapButton } from './SwapButton'
import { useSwap } from '../../hooks/useSwap'

// Styled components using UIKit
const SwapContainer = styled(Card)`
  max-width: 420px;
  margin: 0 auto;
  padding: 24px;
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(255, 255, 255, 0.02)'};
  border: 1px solid ${({ theme }) => theme.colors?.border || 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(20px);
`

const SwapInputContainer = styled(Box)`
  position: relative;
  margin-bottom: 8px;
`

const SwapArrow = styled(Flex)`
  justify-content: center;
  margin: -8px 0;
  z-index: 1;
  position: relative;
`

const ArrowButton = styled(IconButton)`
  background: ${({ theme }) => theme.colors?.backgroundAlt || 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${({ theme }) => theme.colors?.background || '#fff'};
  color: ${({ theme }) => theme.colors?.text || '#000'};
  
  &:hover {
    background: ${({ theme }) => theme.colors?.backgroundHover || 'rgba(255, 255, 255, 0.1)'};
    transform: rotate(180deg);
  }
  
  transition: all 0.2s ease;
`

const SwapHeader = styled(Flex)`
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export interface SwapWidgetProps {
  className?: string
}

export const SwapWidget: React.FC<SwapWidgetProps> = ({ className }) => {
  const {
    tokenA,
    tokenB,
    amountA,
    amountB,
    setTokenA,
    setTokenB,
    setAmountA,
    swapTokens,
    swapQuote,
    isLoading,
    error
  } = useSwap()

  return (
    <SwapContainer className={className}>
      <SwapHeader>
        <Text fontSize="20px" fontWeight="600">
          Swap
        </Text>
        <IconButton variant="text" scale="sm">
          {/* 设置图标 */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1"/>
          </svg>
        </IconButton>
      </SwapHeader>

      {/* From Token */}
      <SwapInputContainer>
        <TokenSelector
          label="From"
          token={tokenA}
          amount={amountA}
          onTokenSelect={setTokenA}
          onAmountChange={setAmountA}
          showBalance
        />
      </SwapInputContainer>

      {/* Swap Arrow */}
      <SwapArrow>
        <ArrowButton
          variant="secondary"
          scale="sm"
          onClick={swapTokens}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
          </svg>
        </ArrowButton>
      </SwapArrow>

      {/* To Token */}
      <SwapInputContainer>
        <TokenSelector
          label="To"
          token={tokenB}
          amount={amountB}
          onTokenSelect={setTokenB}
          readOnly
        />
      </SwapInputContainer>

      {/* Swap Preview */}
      {swapQuote && (
        <Box mt="16px" mb="16px">
          <SwapPreview 
            quote={swapQuote}
            isLoading={isLoading}
          />
        </Box>
      )}

      {/* Error Display */}
      {error && (
        <Box mt="12px" mb="16px">
          <Text color="failure" fontSize="14px" textAlign="center">
            {error}
          </Text>
        </Box>
      )}

      {/* Swap Button */}
      <SwapButton
        tokenA={tokenA}
        tokenB={tokenB}
        amountA={amountA}
        quote={swapQuote}
        isLoading={isLoading}
        disabled={!tokenA || !tokenB || !amountA || !!error}
      />
    </SwapContainer>
  )
}

export default SwapWidget
