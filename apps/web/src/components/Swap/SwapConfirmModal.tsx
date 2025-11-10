import React, { useState } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { Modal } from '@cometswap/uikit'

// Token和Route类型定义
interface Token {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI?: string
  chainId: number
}

interface SwapRoute {
  protocol: string
  path?: string[]
  fee?: string
}

export interface SwapConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  inputToken: Token
  outputToken: Token
  inputAmount: string
  outputAmount: string
  priceImpact: number
  route?: SwapRoute
  slippage: number
  gasEstimate?: string
  isLoading?: boolean
}

// Styled components with theme support
const ModalContent = styled.div`
  padding: 0 24px 24px;
`

const SwapSummary = styled.div`
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors?.border};
`

const TokenRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const TokenInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const TokenSymbol = styled.span`
  color: ${({ theme }) => theme.colors?.text};
  font-weight: 600;
  font-size: 18px;
`

const TokenAmount = styled.span`
  color: ${({ theme }) => theme.colors?.text};
  font-weight: 700;
  font-size: 20px;
`

const ArrowIcon = styled.div`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 24px;
  text-align: center;
  margin: 12px 0;
`

const DetailsSection = styled.div`
  background: ${({ theme }) => theme.colors?.background};
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.colors?.border};
`

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors?.border};
  
  &:last-child {
    border-bottom: none;
  }
`

const DetailLabel = styled.span`
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 14px;
  font-weight: 500;
`

const DetailValue = styled.span<{ isWarning?: boolean }>`
  color: ${({ theme, isWarning }) => 
    isWarning ? theme.colors?.failure : theme.colors?.text
  };
  font-size: 14px;
  font-weight: 600;
`

const WarningBox = styled.div`
  background: ${({ theme }) => theme.colors?.failure}15;
  border: 1px solid ${({ theme }) => theme.colors?.failure}30;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`

const WarningText = styled.div`
  color: ${({ theme }) => theme.colors?.failure};
  font-size: 13px;
  line-height: 1.5;
  flex: 1;
`

const RouteToggle = styled.button`
  width: 100%;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors?.primary};
  font-size: 14px;
  font-weight: 600;
  padding: 8px 0;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${({ theme }) => theme.colors?.primaryHover};
  }
`

const RouteDetails = styled(motion.div)`
  padding: 12px;
  background: ${({ theme }) => theme.colors?.backgroundAlt};
  border-radius: 8px;
  margin-bottom: 16px;
`

const RoutePath = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  font-size: 13px;
  color: ${({ theme }) => theme.colors?.textSubtle};
`

const ConfirmButton = styled(motion.button)`
  width: 100%;
  background: ${({ theme }) => theme.colors?.primary};
  border: none;
  border-radius: 16px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 12px;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors?.primaryHover};
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors?.textDisabled};
    cursor: not-allowed;
    opacity: 0.5;
  }
`

const CancelButton = styled.button`
  width: 100%;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors?.border};
  border-radius: 16px;
  color: ${({ theme }) => theme.colors?.textSubtle};
  font-size: 16px;
  font-weight: 600;
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors?.text};
    color: ${({ theme }) => theme.colors?.text};
  }
`

export const SwapConfirmModal: React.FC<SwapConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  inputToken,
  outputToken,
  inputAmount,
  outputAmount,
  priceImpact,
  route,
  slippage,
  gasEstimate,
  isLoading = false
}) => {
  const [showRoute, setShowRoute] = useState(false)
  
  const isHighPriceImpact = priceImpact > 3
  const executionPrice = parseFloat(outputAmount) / parseFloat(inputAmount)
  const minimumReceived = (parseFloat(outputAmount) * (1 - slippage / 100)).toFixed(6)

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Swap"
      maxWidth="480px"
    >
      <ModalContent>
        {/* Swap Summary */}
        <SwapSummary>
          <TokenRow>
            <TokenInfo>
              <TokenSymbol>{inputToken.symbol}</TokenSymbol>
            </TokenInfo>
            <TokenAmount>{inputAmount}</TokenAmount>
          </TokenRow>
          
          <ArrowIcon>↓</ArrowIcon>
          
          <TokenRow>
            <TokenInfo>
              <TokenSymbol>{outputToken.symbol}</TokenSymbol>
            </TokenInfo>
            <TokenAmount>{outputAmount}</TokenAmount>
          </TokenRow>
        </SwapSummary>

        {/* High Price Impact Warning */}
        {isHighPriceImpact && (
          <WarningBox>
            <span>⚠️</span>
            <WarningText>
              High price impact! You will lose {priceImpact.toFixed(2)}% of your value due to price impact.
            </WarningText>
          </WarningBox>
        )}

        {/* Details */}
        <DetailsSection>
          <DetailRow>
            <DetailLabel>Exchange Rate</DetailLabel>
            <DetailValue>
              1 {inputToken.symbol} = {executionPrice.toFixed(6)} {outputToken.symbol}
            </DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Price Impact</DetailLabel>
            <DetailValue isWarning={isHighPriceImpact}>
              {priceImpact.toFixed(2)}%
            </DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Minimum Received</DetailLabel>
            <DetailValue>
              {minimumReceived} {outputToken.symbol}
            </DetailValue>
          </DetailRow>
          
          <DetailRow>
            <DetailLabel>Slippage Tolerance</DetailLabel>
            <DetailValue>{slippage}%</DetailValue>
          </DetailRow>
          
          {route && (
            <DetailRow>
              <DetailLabel>Route</DetailLabel>
              <DetailValue>{route.protocol}</DetailValue>
            </DetailRow>
          )}
          
          {gasEstimate && (
            <DetailRow>
              <DetailLabel>Est. Gas Fee</DetailLabel>
              <DetailValue>{gasEstimate}</DetailValue>
            </DetailRow>
          )}
        </DetailsSection>

        {/* Route Details Toggle */}
        {route?.path && route.path.length > 0 && (
          <>
            <RouteToggle onClick={() => setShowRoute(!showRoute)}>
              {showRoute ? 'Hide' : 'Show'} Route Details
            </RouteToggle>
            
            {showRoute && (
              <RouteDetails
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <RoutePath>
                  {route.path.map((token, index) => (
                    <React.Fragment key={index}>
                      <span>{token}</span>
                      {index < route.path.length - 1 && <span>→</span>}
                    </React.Fragment>
                  ))}
                </RoutePath>
                {route.fee && (
                  <div style={{ fontSize: '12px', marginTop: '8px' }}>
                    Protocol Fee: {route.fee}
                  </div>
                )}
              </RouteDetails>
            )}
          </>
        )}

        {/* Action Buttons */}
        <ConfirmButton
          disabled={isLoading}
          onClick={onConfirm}
          whileTap={{ scale: 0.98 }}
        >
          {isLoading ? 'Confirming...' : 'Confirm Swap'}
        </ConfirmButton>
        
        <CancelButton onClick={onClose}>
          Cancel
        </CancelButton>
      </ModalContent>
    </Modal>
  )
}

export default SwapConfirmModal
